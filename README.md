# Nazwa kursu
Testowanie i Jakość Oprogramowania (Projekt)

# Autor
Marcin Król

# Temat projektu
Aplikacja do sprzedaży biletów

# Opis projektu
Projekt skupia się na przeprowadzeniu i implementacji testów logowania użytkownika do systemu oraz na innych funkcjonalnościach modułu użytkownika.

# Uruchomienie projektu
Aby, uruchomić projekt należy znajdować się w terminalu w odpowiednim folderze(ścieżce) i wywołać komendę '_npm start_' zarówno dla części serwerowej(backend) jak 
i klienckiej(frontend).

Ścieżka części serwerowej: <br>
```<..\TIJO-Projekt\Server>npm start```
<br>Ścieżka części frontendowej: <br>
```<..\TIJO-Projekt\App>npm start```

Część kliencka dostępna jest pod adresem: <br><br>
> http://localhost:4200/
<br>Część kliencka dostępna jest pod adresem: <br><br>
> http://localhost:3001/

***

# Uruchomienie testów jednostkowych
Aby, uruchomić testy jednostkowe należy z poziomu ścieżki <..\TIJO-Projekt\App> uruchomić komendę: ng test --include='**/user-auth.component.spec.ts'.

Testy jednostkowe skupiają się na kwestii poprawności działania części frontendowej. W szczególności metod związanych z poprawną weryfikacją pól formularza oraz wywoływaniem metod odpowiedzialnych za tworzenie nowych kont oraz logowanie. Testy jednostkowe zostały podzielone na 3. grupy.

## Spis testów jednostkowych (16):
### UserAuthComponent Validation Methods
| Lp. | Test                                             | Oczekiwany rezultat                                                                                   |
|-----|--------------------------------------------------|--------------------------------------------------------------------------------------------------------|
| 1   | should return false when **sign-in** form is invalid | Zwraca wartość `false` gdy formularz logowania jest nieprawidłowy.                                      |
| 2   | should return false when **sign-in** form is partially invalid | Zwraca wartość `false` gdy formularz logowania jest częściowo nieprawidłowy.                      |
| 3   | should return true when **sign-in** form is valid    | Zwraca wartość `true` gdy formularz logowania jest poprawny.                                           |
| 4   | should return true when **sign-up** form is invalid   | Zwraca wartość `true` gdy formularz rejestracji jest nieprawidłowy.                                     |
| 5   | should return true when **sign-up** form is partially invalid | Zwraca wartość `true` gdy formularz rejestracji jest częściowo nieprawidłowy.                      |
| 6   | should return false when **sign-up** form is valid     | Zwraca wartość `false` gdy formularz rejestracji jest poprawny.                                          |

### UserAuthService
| Lp. | Test                                             | Oczekiwany rezultat                                                                                   |
|-----|--------------------------------------------------|--------------------------------------------------------------------------------------------------------|
| 1   | should return false for too long strong password  | Zwraca wartość `false` dla zbyt długiego silnego hasła.                                                  |
| 2   | should return false for a weak password without uppercase letter | Zwraca wartość `false` dla słabego hasła bez wielkiej litery.                            |
| 3   | should return false for a weak password without special characters | Zwraca wartość `false` dla słabego hasła bez znaków specjalnych.                          |
| 4   | should return false for a password that is too short | Zwraca wartość `false` dla zbyt krótkiego hasła.                                                        |
| 5   | should return false for a password that is too long | Zwraca wartość `false` dla zbyt długiego hasła.                                                         |

### UserAuthComponent
| Lp. | Test                                             | Oczekiwany rezultat                                                                                   |
|-----|--------------------------------------------------|--------------------------------------------------------------------------------------------------------|
| 1   | should handle successful sign-in                 | Poprawna obsługa udanego logowania.                                                                    |
| 2   | should handle authentication failure             | Obsługa błędu uwierzytelniania.                                                                        |
| 3   | should handle authentication failure with invalid credentials | Obsługa błędu uwierzytelniania z nieprawidłowymi danymi.                                     |
| 4   | should create user if the form is valid         | Utworzenie użytkownika przy prawidłowo wypełnionym formularzu.                                       |
| 5   | should not create user if the form is invalid   | Brak utworzenia użytkownika przy nieprawidłowo wypełnionym formularzu.                                |

# Uruchomienie testów integracyjnych
Aby, uruchomić testy integracyjne należy z poziomu ścieżki <..\TIJO-Projekt\Server> uruchomić komendę: <br>
```npm test```

Testy integracyjne skupiają się na kwestii poprawności działania części backendowej, a dokładniej poprawności działania modułów między sobą.

## Spis testów integracyjnych (11):
### Create user endpoint
| Lp. | Test                                                              | Oczekiwany rezultat                                                              |
|-----|-------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| 1   | should create user and respond with 200 status code               | Użytkownik zostaje utworzony, a serwer odpowiada z kodem stanu 200.         |
| 2   | should not create user if it already exists                       | Użytkownik nie zostaje utworzony, jeśli już istnieje.       |
| 3   | should not create user and respond with 400 status code for weak password  | Użytkownik nie zostaje utworzony i serwer odpowiada z kodem stanu 400 z powodu słabego hasła.              |

### User Authentication/Login Endpoint
| Lp. | Test                                                              | Oczekiwany rezultat                                                              |
|-----|-------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| 1   | should authenticate a user with valid credentials                | Użytkownik zostaje poprawnie uwierzytelniony z prawidłowymi danymi uwierzytelniającymi.     |
| 2   | should return an error for invalid credentials                   | Serwer zwraca błąd dla nieprawidłowych danych uwierzytelniających.           |

### Logout user
| Lp. | Test                                                              | Oczekiwany rezultat                                                              |
|-----|-------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| 1   | should logout user and respond with 200 status code              | Użytkownik zostaje poprawnie wylogowany, a serwer odpowiada kodem stanu 200.         |

### Get tickets by ID
| Lp. | Test                                                              | Oczekiwany rezultat                                                              |
|-----|-------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| 1   | should get tickets by ID and respond with 200 status code        | Pobranie biletów poprzez identyfikatory i odpowiedź serwera z kodem stanu 200.         |

### Users cart - Get users cart
| Lp. | Test                                                              | Oczekiwany rezultat                                                              |
|-----|-------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| 1   | should get users cart and respond with 200 status code           | Pobranie koszyka użytkownika i odpowiedź serwera z kodem stanu 200.         |

### Users cart - Add ticket(s) to cart
| Lp. | Test                                                              | Oczekiwany rezultat                                                              |
|-----|-------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| 1   | should add ticket to user cart and respond with 200 status code  | Dodanie biletu do koszyka użytkownika i odpowiedź serwera z kodem stanu 200.         |

### Users cart - Remove ticket(s) from cart
| Lp. | Test                                                              | Oczekiwany rezultat                                                              |
|-----|-------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| 1   | should remove ticket from users cart and respond with 200 status code  | Usunięcie biletu z koszyka użytkownika i odpowiedź serwera z kodem stanu 200.         |

### Like or Follow Event
| Lp. | Test                                                              | Oczekiwany rezultat                                                              |
|-----|-------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| 1   | should like or follow an event and respond with 200 status code  | Polubienie lub obserwowanie wydarzenia i odpowiedź serwera z kodem stanu 200.         |

# Scenariusze testowe dla testera manualnego (19):
| Test Case ID | Opis                                        | Warunki wstępne                                            | Kroki testowe                                                                      | Oczekiwany wynik                                                                                      |
|-----|--------------------------------------------------------|-------------------------------------------------------------|--------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|
| TC_01   | Otwarcie strony logowania                              | Dostęp do strony logowania.                                  | 1. Kliknij w ikonę awatara w menu nawigacyjnym. <br> 2. Kliknij w rozsuwanym menu przycisk "Zaloguj"                                            | Strona logowania poprawnie się otwiera.                                                                  |
| TC_02   | Otwarcie strony rejestracji                            | Dostęp do strony rejestracji.                                | 1. Kliknij w ikonę awatara w menu nawigacyjnym. <br> 2. Kliknij w rozsuwanym menu przycisk "Zarejestruj się"                                                      | Strona rejestracji poprawnie się otwiera.                                                                |
| TC_03   | Przejście między formularzami logowania i rejestracji  | Strona logowania lub rejestracji jest już otwarta.           | 1. Kliknij przycisk "Zarejestruj się" mając otwarty panel logowania lub przycisk "Zaloguj się" mając otwarty panel rejestracji          | Animacja przenoszenia panelu działa, formularze logowania i rejestracji są widoczne po zmianie.          |
| TC_04   | Logowanie poprzez wprowadzenie poprawnych danych       | Strona logowania jest już otwarta.                           | 1. Wypełnij prawdiłowo wszystkie pola formularza. <br> 2. Kliknij przycisk "Zaloguj się".              | Użytkownik zostaje poprawnie zalogowany.                                                                 |
| TC_05   | Zabezpieczenie przed nieprawidłowymi danymi logowania | Strona logowania jest już otwarta.                           | 1. Wprowadź niepoprawne dane logowania. <br> 2. Kliknij przycisk "Zaloguj się".                        | Formularz nie pozwala na zalogowanie z nieprawidłowymi danymi.                                             |
| TC_06   | Rejestracja użytkownika z poprawnymi danymi           | Strona rejestracji jest już otwarta.                         | 1. Wypełnij formularz rejestracyjny poprawnymi danymi. <br> 2. Kliknij przycisk "Zarejestruj się".     | Użytkownik zostaje pomyślnie zarejestrowany. System tworzy nowe konto w bazie danych. System wyświetla monit o utworzeniu konta.                                                             |
| TC_07   | Zabezpieczenie przed nieprawidłowymi danymi rejestracyjnymi | Strona rejestracji jest już otwarta.                   | 1. Wypełnij formularz rejestracyjny nieprawidłowymi danymi. <br> 2. Kliknij przycisk "Zarejestruj się". | Formularz nie pozwala na rejestrację z nieprawidłowymi danymi.                                             |
| TC_08   | Sprawdzenie unikalności nazwy użytkownika              | Formularz rejestracji.          | 1. Próba utworzenia konta z istniejącą już nazwą użytkownika.                        | System wyświetla odpowiednie ostrzeżenie o niedostępności nazwy użytkownika.                               |
| TC_09   | Wylogowanie użytkownika                                | Użytkownik jest zalogowany.                                 | 1. Zaloguj się na konto użytkownika. <br> 2. Kliknij w ikonę awatara w menu nawigacyjnym. <br> 3. Kliknij w rozsuwanym menu przycisk wylogowania.                      | Użytkownik jest poprawnie wylogowany i panel logowania jest ponownie dostępny.                            |
| TC_10  | Sprawdzenie reakcji formularza na puste pole          | Formularz logowania lub rejestracji posiada puste pola.     | 1. Pozostaw jedno z pól formularza pustym, np. pole loginu lub hasła. <br> 2. Kliknij przycisk "Zaloguj się". | Formularz informuje użytkownika o konieczności wypełnienia wszystkich pól lub blokuje wysłanie danych.  |
| TC_11  | Dodawanie biletu do koszyka                           | Użytkownik jest zalogowany.                                 | 1. Przejdź do strony wydarzenia. <br> 2. Kliknij przycisk "Dodaj do koszyka".                       | Bilet zostaje dodany do koszyka oraz widoczna jest odpowiednia informacja.                                  |
| TC_12  | Usunięcie biletu z koszyka                            | Użytkownik jest zalogowany oraz koszyk zawiera przynajmniej jeden bilet.                      | 1. Kliknij w ikonę awatara w menu nawigacyjnym. <br> 2. Kliknij w rozsuwanym menu przycisk "Koszyk" <br> 3. Kliknij ikonę symbolizującą kosz, aby usunąć bilet.                 | Bilet zostaje usunięty z koszyka. |
| TC_13  | Przeglądanie koszyka                                  | Użytkownik jest zalogowany.                     | 1. Kliknij w ikonę awatara w menu nawigacyjnym. <br> 2. Kliknij w rozsuwanym menu przycisk "Koszyk"                                                                                   | Użytkownik może zobaczyć zawartość koszyka z wybranymi biletami lub informację o braku jakichkolwiek biletów.                                         |
| TC_14  | Dodanie wydarzenia do ulubionych                       | Użytkownik jest zalogowany.                                 | 1. Przejdź do strony wydarzenia. <br> 2. Kliknij ikonę symbolizującą serce.                  | Wydarzenie zostaje dodane do listy ulubionych, a licznik polubionych zwiększa się o 1.                   |
| TC_15  | Usunięcie wydarzenia z ulubionych                      | Użytkownik jest zalogowany.                 | 1. Przejdź do listy ulubionych wydarzeń. <br> 2. Znajdź dane wydarzenie. <br> 3. Kliknij ikonę symbolizującą serce. | Wydarzenie zostaje usunięte z listy ulubionych.                                     |
| TC_16  | Dodanie wydarzenia do obserwowanych                    | Użytkownik jest zalogowany.                                 | 1. Przejdź do strony wydarzenia. <br> 2. Kliknij ikonę symbolizującą dzwonek.                             | Wydarzenie zostaje dodane do listy obserwowanych.                |
| TC_17  | Usunięcie wydarzenia z obserwowanych                   | Użytkownik jest zalogowany.             | 1. Przejdź do listy obserwowanych wydarzeń. <br> 2. Znajdź dane wydarzenie. <br> 3. Kliknij ikonę symbolizującą kosz. | Wydarzenie zostaje usunięte z listy obserwowanych.                                 |
| TC_18  | Przeglądanie ulubionych wydarzeń                       | Użytkownik jest zalogowany. <br>Użytkownik posiada min. 1 ulubione wydarzenie                           | 1. Przejdź do listy ulubionych wydarzeń.                                                      | Użytkownik może zobaczyć zawartość listy ulubionych wydarzeń.                                             |
| TC_19  | Przeglądanie obserwowanych wydarzeń                    | Użytkownik jest zalogowany. <br>Użytkownik posiada min. 1 obserwowane wydarzenie                       | 1. Przejdź do listy obserwowanych wydarzeń.                                                   | Użytkownik może zobaczyć zawartość listy obserwowanych wydarzeń.                                          |

***

# Dokumentacja API
| Adres usługi                           | Typ   | Przyjmuje                               | Zwraca              |
|----------------------------------------|-------|-----------------------------------------|---------------------|
| /api/user/auth                         | POST  | {"login": "string", "password": "string"}| true (kod stanu 200)|
| /api/user/create                       | POST  | {"email": "string", "password": "string"}| true (kod stanu 200)|
| /api/user/logout/{userId}              | DELETE| -                                       | true (kod stanu 200)|
| /api/user/:userId/cart/add-ticket/:eventId/:ticketId | POST  | {"quantity": "number"}                   | true (kod stanu 200)|
| /api/user/:userId/cart/remove-ticket/:eventId/:ticketId | POST | {"quantity": "number"}                  | true (kod stanu 200)|
| /api/user/:userId/cart                 | GET   | -                                       | true (kod stanu 200)|
| /api/profile/like-follow/:userId/:eventId/:actionType | POST | -                                       | true (kod stanu 200)|
| /api/profile/likes-follows/:userId/:actionType | GET | -                                       | [array of events]   |
| /api/profile/likes-follows/:userId     | GET   | -                                       | {"followedEventsCount": "integer", "likedEventsCount": "integer"} |
| /api/profile/check-if-event-liked/:userId/:eventId/:actionType | POST | -                              | {"isLiked": "boolean"}|
| /api/user/:userId                     | GET   | -                                       | {"id": "string", "name": "string", "email": "string"} |


## Alternatywnie. Dokumentacja swagger'a w .yaml
Szczegółowa dokumentacja API dostępna jest również z poziomu interfejsu swagger.io. 
<br>Po włączeniu serwera dokumentację można znaleźć pod adresem: > http://localhost:3001/api-docs/#/.<br><br>

[Link to Swagger YAML File](./Sources/swagger.yaml)

# Technologie użyte w projekcie
- node.js
- express.js
- swagger.io
- angular 16
- mongo.db
- jasmine
- supertest
- jest

# Prezentacja aplikacji
https://youtu.be/TaqddrTQ0sc
