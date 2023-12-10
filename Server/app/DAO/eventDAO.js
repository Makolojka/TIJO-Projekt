import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import mongoConverter from '../service/mongoConverter';
import * as _ from "lodash";
import {ObjectId} from "mongodb";
import applicationException from "../service/applicationException";

const eventSchema = new mongoose.Schema({
    // Basic event info
    title: {type: String},
    image: {type: String},
    text: {type: String},
    additionalText: {type: String},
    organiser: {type: String},
    date: {type: String},
    location: {type: String},
    category: { type: [String] },
    subCategory: { type: [String] },
    createdAt: { type: String, default: () => new Date().toISOString() },

    //Tickets array
    tickets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tickets'
    }],

    // Artists array
    artists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'artists',
    }],

    // Likes and follows
    likes: { type: [mongoose.Schema.Types.ObjectId] },
    followers: { type: [mongoose.Schema.Types.ObjectId] },

    // Views of one event
    views: { type: Number, default: 0 },
}, {
    collection: 'events'
});
eventSchema.plugin(uniqueValidator);

const EventModel = mongoose.model('events', eventSchema);

async function query() {
    const result = await EventModel.find({});
    {
        if (result) {
            return mongoConverter(result);
        }
    }
}

async function get(id) {
    return EventModel.findOne({_id: id}).then(function (result) {
        if (result) {
            return mongoConverter(result);
        }
    });
}

async function createNewOrUpdate(data) {
    return Promise.resolve().then(() => {
        if (!data.id) {
            return new EventModel(data).save().then(result => {
                if (result) {
                    return mongoConverter(result);
                }
            });
        } else {
            return EventModel.findByIdAndUpdate(data.id, _.omit(data, 'id'), {new: true});
        }
    });
}

// Followers and Likes
// TODO: zabezpieczyć przed innymi akcjami
async function addLikeOrFollower(eventId, userId, actionType) {
    try {
        const event = await EventModel.findOne({ _id: eventId });
        if(actionType && actionType==='like'){
            const checkLikes = await EventModel.findOne({ _id: eventId, likes: userId});
            if (event) {
                if(!checkLikes)
                {
                    //If recipe is not liked, like it
                    return EventModel.updateOne({ _id : eventId }, {$push: {likes: userId}}, {new: true})
                }
                else
                {
                    //If recipe is liked, dislike it
                    return EventModel.updateOne({ _id : eventId }, {$pull: {likes: userId}})
                }
            } else {
                throw applicationException.new(applicationException.NOT_FOUND, 'Event not found');
            }
        }
        else
        {
            const checkFollows = await EventModel.findOne({ _id: eventId, followers: userId});
            if (event) {
                if(!checkFollows)
                {
                    //If recipe is not liked, like it
                    return EventModel.updateOne({ _id : eventId }, {$push: {followers: userId}}, {new: true})
                }
                else
                {
                    //If recipe is liked, dislike it
                    return EventModel.updateOne({ _id : eventId }, {$pull: {followers: userId}})
                }
            } else {
                throw applicationException.new(applicationException.NOT_FOUND, 'Event not found');
            }
        }

    } catch (error) {
        throw error;
    }
}

async function getLikesOrFollowersCount(eventId, actionType, res) {
    try {
        let fieldToCount;

        if (actionType === 'like') {
            fieldToCount = 'likes';
        } else if (actionType === 'follow') {
            fieldToCount = 'followers';
        } else {
            throw new Error('Invalid action. Please provide either "like" or "follow".');
        }

        const event = await EventModel.findById(eventId).select(fieldToCount);

        if (!event) {
            throw new Error('Event not found.');
        }

        const count = event[fieldToCount].length;

        // Send the count as a response
        res.status(200).json({ count });
    } catch (error) {
        // Handle errors and send an error response
        res.status(500).json({ error: error.message });
    }
}

async function incrementEventViews(eventId) {
    try {
        const event = await EventModel.findOne({ _id: eventId });
        if (event) {
            // Increment the views property by 1
            const updatedEvent = await EventModel.updateOne(
                { _id: eventId },
                { $inc: { views: 1 } }
            );
            return updatedEvent;
        } else {
            throw new Error('Event not found');
        }
    } catch (error) {
        throw error;
    }
}

export default {
    query: query,
    get: get,
    createNewOrUpdate: createNewOrUpdate,
    getLikesOrFollowersCount: getLikesOrFollowersCount,
    addLikeOrFollower: addLikeOrFollower,
    incrementEventViews: incrementEventViews,

    model: EventModel
};
