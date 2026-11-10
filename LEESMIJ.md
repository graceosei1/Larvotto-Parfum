# Larvotto – landingspagina

Statische pagina (HTML, CSS, JS, geen framework), klaar voor GitHub Pages.

```
landingspagina/
├── index.html        hero · verhaal + video · geurnoten · cadeau · galerij · inschrijven · footer
├── css/style.css     huisstijl (alleen kleuren en fonts uit de brand kit)
├── js/main.js        formuliercontrole + verzenden naar MailerLite, video
├── img/              beelden (.webp + .jpg als reserve)
└── media/            video (mp4) + posterbeeld
```

## Online zetten (GitHub Pages)
1. Ga naar github.com → **New repository** → naam `larvotto` → **Public** → Create.
2. Klik op **uploading an existing file** en sleep de **inhoud** van deze map (index.html, css, js, img, media) in het venster. Dus niet de map zelf: `index.html` moet in de hoofdmap van de repo staan.
3. **Commit changes**.
4. **Settings → Pages → Build and deployment**: Source = *Deploy from a branch*, Branch = `main` / `(root)` → Save.
5. Na 1 à 2 minuten staat de pagina op `https://<gebruikersnaam>.github.io/larvotto/`.
6. Test op desktop en gsm, en schrijf je in met je eigen e-mailadres. Kijk in MailerLite → Subscribers of je erbij staat en of de flow start.

## Formulier en MailerLite
- Het formulier stuurt `fields[name]` en `fields[email]` naar
  `https://assets.mailerlite.com/jsonp/2735616/forms/203717007416231823/subscribe` (account- en formulier-ID uit de share-url).
- De opt-in-checkbox is **niet vooraf aangevinkt** en verplicht. Zet **double opt-in** aan in MailerLite.
- De keuze kust/reiziger is optioneel. Om die mee te sturen: open in MailerLite *Embed form → HTML*, zoek `groups[]` en plak de twee `value`-nummers in `js/main.js` bij `CONFIG.groups`.
- Komt er geen inschrijving binnen? Controleer in de embed-code of het `action`-adres hetzelfde is als in `js/main.js` en pas het daar aan.

## Toegankelijkheid (WCAG AA)
- Lopende tekst in Diepzee #1F4A55 op Zeezout (8,47:1), Zand (6,39), Goud (5,83), Zeeglas (5,11).
- Knoppen in Terracotta #C07259 met Zeezout-tekst: 3,17:1. Dat mag alleen voor grote tekst, daarom zijn de knoppen 19 px vet.
- Goud #FABF52 en Sunset oranje #FAA652 alleen als vlak of zon, met Diepzee-tekst erop.
- Alt-teksten bij alle beelden, skip-link, zichtbare focus, foutmeldingen bij het veld (aria-invalid), de video speelt niet automatisch bij "beperkte beweging".
