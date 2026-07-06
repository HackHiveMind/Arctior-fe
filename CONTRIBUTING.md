# Contributing

## Workflow

1. Creeaza branch nou din `main`.
2. Fa modificarile in bucati mici.
3. Ruleaza `npm run lint`, `npm run typecheck`, `npm test` si `npm run build`.
4. Commit cu mesaj clar.
5. Push si Pull Request catre `main`.

## Commituri

Folosim prefixe simple:

- `feat:` functionalitate noua
- `fix:` reparatie bug
- `refactor:` reorganizare fara schimbare de comportament
- `chore:` mentenanta
- `docs:` documentatie
- `test:` teste

## Code Style

- Pastreaza componentele mici si clare.
- Foloseste `id` sau `slug` pentru `key`, nu indexul listei.
- Toate inputurile au label.
- Butoanele doar cu icon au `aria-label`.
- Nu afisa mesaje brute de server catre user.
- Nu pune secrete in cod sau in variabile `VITE_*`.

## Pull Request Checklist

- [ ] Lint trece
- [ ] Typecheck trece
- [ ] Testele trec
- [ ] Build-ul trece
- [ ] Am testat manual flow-ul modificat
- [ ] Documentatia este actualizata daca e cazul
