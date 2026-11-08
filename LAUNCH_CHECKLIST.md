# LAUNCH_CHECKLIST: InWardOut-website

Doorloop deze lijst in volgorde. Niets hiervan is al uitgevoerd: er is nog niets gepubliceerd en er zijn
geen domeininstellingen gewijzigd.

## A. Inhoud en akkoord (zie CONTENT_REVIEW.md)

- [ ] Merkspelling, logo/woordmerk, kleuren en fonts akkoord
- [ ] Portretfoto van Jan aangeleverd en verwerkt (`astro:assets`, vaste afmetingen, `alt`-tekst)
- [ ] Alle Engelse teksten gelezen en goedgekeurd door Jan (inclusief de ik-vorm op /start)
- [ ] Programma-inhoud bevestigd; besluit over groepssessies (`groupSessions` in `src/data/programmes.ts`)
- [ ] Besluit over prijspublicatie; btw-status, betaalvoorwaarden en reis-/verblijfskosten bevestigd
- [ ] Locatie en praktische afspraken voor lichaamswerk bevestigd
- [ ] Officiële bedrijfsgegevens bekend; besluit of ze in de footer komen
- [ ] Definitieve privacyverklaring geschreven; `/privacy` bijgewerkt en het concept-label verwijderd
      (daarna eventueel `noindex` op die pagina opheffen en de pagina uit `SITEMAP_EXCLUDE` halen in `astro.config.mjs`)

## B. Vercel-project

- [ ] Repository koppelen aan een Vercel-project (framework: Astro; build: `npm run build`; Node 22)
- [ ] Een preview-deploy controleren (noindex blijft actief)
- [ ] Omgevingsvariabelen instellen (Production; voor Preview bewust níet `PUBLIC_ALLOW_INDEXING`):
  - [ ] `SITE_URL=https://<definitief-domein>`
  - [ ] Formulier: `RESEND_API_KEY` + `CONTACT_TO_EMAIL` + `CONTACT_FROM_EMAIL`, **of** `CONTACT_WEBHOOK_URL` (+ `CONTACT_WEBHOOK_TOKEN`)
  - [ ] Optioneel `PUBLIC_BOOKING_URL`
  - [ ] Optioneel `PUBLIC_ANALYTICS_ENABLED=true` (en Web Analytics aanzetten in het dashboard)
- [ ] Bij Resend: afzenderdomein geverifieerd (SPF/DKIM)
- [ ] Opnieuw deployen na wijziging van de variabelen (ze worden tijdens de build gelezen)

## C. Formulier testen op de preview

- [ ] De melding "This form is not active yet" is verdwenen
- [ ] Een echte testaanvraag komt aan op het ontvangstadres; reply-to is het adres van de afzender
- [ ] Een foute configuratie (bijvoorbeeld een verkeerde sleutel) geeft een foutmelding en **geen** succesmelding
- [ ] Werkt zonder JavaScript: na verzenden volgt een redirect naar `/contact/sent`
- [ ] Overweeg rate limiting of bot-bescherming (bijvoorbeeld Vercel Firewall-regel op `/api/contact`) als er spam binnenkomt

## D. Domein en indexering (pas na akkoord)

- [ ] Domein toevoegen in Vercel en DNS instellen
- [ ] HTTPS actief; kiezen tussen www en zonder www, met redirect
- [ ] `PUBLIC_ALLOW_INDEXING=true` alleen voor Production, daarna redeployen
- [ ] Controleren: `/robots.txt` staat crawlen toe en verwijst naar `/sitemap-index.xml`
- [ ] Controleren: pagina’s hebben `index, follow` en de juiste canonical; `/privacy` (zolang het een concept is), `/contact/sent` en `/contact/not-sent` blijven noindex
- [ ] Google Search Console: domein verifiëren, sitemap indienen
- [ ] OG-preview testen (bijvoorbeeld LinkedIn Post Inspector) met de URL van `/start`

## E. Technische eindcontrole

- [ ] `npm run verify` (typecontrole, build, link- en SEO-check) zonder fouten
- [ ] Na indexering: `EXPECT_INDEXABLE=true npm run check:links`
- [ ] Mobiel, tablet en desktop doorlopen; mobiel menu; FAQ met het toetsenbord
- [ ] Lighthouse en toegankelijkheid (bijvoorbeeld axe) op de productie-URL
- [ ] 404-pagina bekeken op een niet-bestaande URL

## F. Na livegang

- [ ] LinkedIn-profiel en outreach van Jan laten verwijzen naar `https://<domein>/start`
- [ ] Na een week Search Console controleren op dekking en fouten
