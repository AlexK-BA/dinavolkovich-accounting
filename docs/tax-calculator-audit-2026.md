# Audyt kalkulatora JDG 2026 — kontrola przed publikacją

## Zakres
Kalkulator jest wyłącznie symulacją orientacyjną dla jednoosobowej działalności gospodarczej, nie kalkulatorem CIT sp. z o.o. Nie daje rekomendacji podatkowej. Trzy reżimy: skala, liniowy, ryczałt.

## Potwierdzone parametry bazowe
- ZUS pełny: 1 926,76 zł miesięcznie z chorobowym; 1 788,29 zł bez.
- ZUS preferencyjny: 456,18 zł z chorobowym; 420,86 zł bez.
- Ryczałt — zdrowotna: 498,35 / 830,58 / 1 495,04 zł; progi 60 000 i 300 000 zł.
- Minimalna zdrowotna skala/liniowy: styczeń 2026: 314,96 zł, od lutego: 432,54 zł.
- Skala: 12% do 120 000 zł, 32% nadwyżki, kwota zmniejszająca 3 600 zł.
- Liniowy: 19%, limit odliczenia zdrowotnej 14 100 zł w 2026.

## Źródła do cyklicznego sprawdzania
- https://www.zus.pl/pl/baza-wiedzy/skladki-wskazniki-odsetki/skladki/wysokosc-skladek-na-ubezpieczenia-spoleczne
- https://www.zus.pl/-/przedsi%C4%99biorcy-opodatkowani-na-zasadach-og%C3%B3lnych-lub-w-formie-karty-podatkowej.-minimalna-sk%C5%82adka-na-ubezpieczenie-zdrowotne-w-2026-r.
- https://biznes.gov.pl/pl/portal/001052
- https://podatki.gov.pl/

## Automatyczne testy
Zobacz src/test/taxCalculator.test.ts: testy kwot referencyjnych ZUS, progów, PIT, Ulga na start, porównanie 162 wariantów. Każda modyfikacja formuł musi przejść npm test oraz npm run build.

## Otwarte ryzyka — przed udostępnieniem jako wiążącego wyliczenia
1. Roczne rozliczenie zdrowotnej na skali/liniowym jest aproksymacją opartą na rocznym dochodzie, a rzeczywiste wpłaty zależą od miesięcznej podstawy z poprzedniego miesiąca.
2. Nieobsługiwane: Mały ZUS Plus, wakacje składkowe, zbiegi tytułów ubezpieczenia, składki pracowników, inne źródła dochodów, wspólne rozliczenie, pełny katalog ulg.
3. Model części roku zakłada miesiące od stycznia; nie obsługuje innego miesiąca rozpoczęcia.
4. Dodatkowe odliczenie jest parametrem ilustracyjnym, a jego dopuszczalność zależy od formy opodatkowania i podstawy prawnej.
5. Nie uwzględnia szczegółowych zaokrągleń deklaracyjnych PIT/ZUS i terminu zapłaty składek.
6. Stawka ryczałtu wymaga weryfikacji rodzaju usług/PKWiU, uprawnienia do reżimu i limitów.
7. Przychód i koszty są traktowane jako kwoty bez VAT; kalkulator nie wylicza VAT.
8. Ryczałt i liniowy mogą podlegać dodatkowym ograniczeniom zależnym od relacji z obecnym/byłym pracodawcą.
9. Potrzebna akceptacja Diny Volkovich przed publikacją jako doradczego narzędzia.

## Zasada publikacji
Wyłącznie jako estymator, z widocznym zastrzeżeniem przy polach i wynikach. Brak oznaczania „najlepszej” formy podatkowej. Wynik końcowy potwierdza profesjonalny księgowy.
