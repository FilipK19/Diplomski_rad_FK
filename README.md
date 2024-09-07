# Metode rješavanja konflikta u stvarnom vremenu za kolaborativno uređivanje teksta

## Autor diplomskog rada: Filip Kukić

## Mentor: doc. dr. sc. Nikola Tanković

## Sveučilište Jurja Dobrile u Puli, Fakultet Računarstva 

## Sažetak
U ovom radu su opisane metode rješavanja konflikta prilikom kolaborativnog pisanja. 
Definira se što su to konflikti i kako nastaju prilikom zajedničkog pisanja. Detaljno se 
opisuje svaka metoda rješavanja konflikta i pokazuje način rada kroz jednostavne 
primjere. Pokazuje se pokušaj implementacije tih metoda na stvarnom kodu gdje se 
pokreću i testiraju. Na temelju toga se detaljno uspoređuju i navode prednosti i 
nedostatci svake metode. Na kraju se definira najbolja metoda i objašnjavaju razlozi 
njenog odabira.
Ključne riječi: kolaborativno pisanje, konflikt, metode rješavanja konflikta, OT, CRDT, 
Locking


### Način pokretanja:
- Backend: `cd .\Backend\`, `python -m uvicorn main:app --reload --port 8000`
- Frontend: `cd .\Frontend\`, `npm run serve`

### Korisnički podatci u sličaju neuspješne prijave:
- User: filip
- pass: filip
