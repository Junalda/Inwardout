# CONTENT_REVIEW: InWardOut-website

Overzicht van alles wat nog bevestigd, aangeleverd of besloten moet worden vóór livegang.
Waar de website op dit moment om ontbrekende informatie heen schrijft, staat dat hieronder vermeld.

Legenda: ☐ open · ◐ voorlopig ingevuld, bevestiging nodig

---

## 1. Merk en identiteit

| | Punt | Huidige stand | Nodig |
| --- | --- | --- | --- |
| ◐ | **Merkspelling** | Overal "InWardOut" (hoofdletters W en O). Centraal in `src/data/settings.ts` (`brand.name`) en in de copy. | Bevestiging van de definitieve spelling. |
| ☐ | **Logo** | Voorlopig typografisch woordmerk (`Wordmark.astro`): serif met koperkleurige W en O. Het wordt nergens als definitief logo gepresenteerd. | Definitief logo (SVG) of akkoord op het woordmerk. |
| ◐ | **Kleuren** | Voorlopig: warm ivoor, diep bosgroen, gedempt koper/zand. Centraal in `src/styles/global.css` (`@theme`). Contrast is gecontroleerd (WCAG AA). | Akkoord of definitieve huisstijlkleuren. |
| ◐ | **Typografie** | Newsreader (serif, koppen) en Instrument Sans (tekst). Zelf gehost. | Akkoord of huisstijlfonts (inclusief licentie). |
| ☐ | **Fotografie** | Er is geen fotografie aangeleverd. Jan wordt getoond als compositie met monogram "JL" en abstracte vormen, zonder stock- of AI-persoon. | Professionele portretfoto(’s) van Jan; eventueel sfeerbeeld (geen stock met handdrukken of laptops). |
| ◐ | **Favicon en OG-afbeelding** | Afgeleid van de voorlopige stijl (`public/`). | Opnieuw genereren na een definitieve huisstijl (`scripts/generate-brand-assets.mjs`). |

## 2. Domein en bedrijfsgegevens

| | Punt | Huidige stand | Nodig |
| --- | --- | --- | --- |
| ☐ | **Domein** | Geen domein ingesteld; er is geen productiedomein verzonnen. Zonder `SITE_URL` zijn er geen canonical-URL’s en geen sitemap, en staat alles op noindex. | Definitief domein, daarna `SITE_URL` instellen. |
| ☐ | **Officiële bedrijfsgegevens** | Niet vermeld (geen rechtsvorm, KvK/KBO/Cypriotisch registratienummer, btw-nummer of adres). Footer: alleen "© jaar InWardOut · Jan Leyssens". | Officiële naam, rechtsvorm, registratie- en btw-nummer, vestigingsadres, en of deze gegevens getoond moeten worden. |
| ☐ | **Contactadres** | Er wordt geen e-mailadres of telefoonnummer getoond. | Ontvangstadres voor aanvragen (voor de formulierdienst) en eventueel een publiek contactadres. |
| ☐ | **Socialemedia-links** | Geen links opgenomen (ook geen LinkedIn-profiel van Jan). | URL van Jans LinkedIn-profiel, indien gewenst in de footer of op /about. |

## 3. Jan Leyssens: biografie

Gebruikt zijn uitsluitend de bekende gegevens: ervaring met complexe industriële projecten, ervaring met
leidinggeven, interesse in de verbinding tussen persoonlijke ontwikkeling, lichamelijk bewustzijn en
leiderschap, de waarden diepgang, vertrouwen en levenskracht, Cyprus als uitvalsbasis, een blijvende band
met België en affiniteit met IT en technologie.

| | Punt | Nodig |
| --- | --- | --- |
| ☐ | Er zijn **geen** jaartallen, werkgevers, sectoren van projecten, diploma’s, opleidingen of certificeringen vermeld. | Eventuele onderbouwde opleidingen of ervaring (alleen wat aantoonbaar is), bijvoorbeeld een opleiding in coaching of lichaamswerk. |
| ◐ | /start bevat een korte introductie in de **ik-vorm** ("Hello, I’m Jan") en de afsluiting "I will get back to you". | Akkoord van Jan op de toon en de ik-vorm. |
| ◐ | Formuleringen als "engaged, direct and calm" en "a deep interest in…" zijn een redactionele typering op basis van de intake. | Controle door Jan: herkent hij zich hierin? |
| ☐ | Geen testimonials, cases, klantlogo’s, aantallen of succespercentages. | Alleen toevoegen met schriftelijke toestemming van cliënten (bij voorkeur geanonimiseerd). |

## 4. Aanbod

| | Punt | Huidige stand | Nodig |
| --- | --- | --- | --- |
| ◐ | **Definitieve programma-inhoud** | Online coaching: 12 weken, 12 online sessies van 1 uur. Online coaching & bodywork: 12 weken, 9 online sessies en 3 fysieke lichaamssessies van 1 uur; een lichaamssessie vervangt de online sessie van die week. Facts staan in `src/data/programmes.ts`, de beschrijvingen in `src/content/en/programmes.ts`. | Bevestiging van de inhoud, en of "one session a week" altijd geldt of dat het ritme flexibel is. |
| ☐ | **Groepssessies** | **Niet gepubliceerd.** De intake noemt 6 gezamenlijke online sessies, eens per twee weken, met maximaal 10 deelnemers uit beide trajecten; een eerder verslag noemt een andere frequentie. Schakelaar: `groupSessions.publish = false`. | Definitieve frequentie, aantal, maximale groepsgrootte, of deelname gegarandeerd is, en de Engelse tekst. |
| ☐ | **Verlenging** | Alleen genoemd als mogelijkheid: "an extension to six months in total can be explored". | Inhoud en prijs van de verlenging, indien die gepubliceerd moeten worden. |
| ☐ | **Prijzen publiceren** | **Uit** (`pricing.publish = false`). Getoond wordt: "Programme details and investment are discussed during your introductory conversation." Intern opgeslagen: Online coaching **€5.000**, Online coaching & bodywork **€7.000**. | Besluit of prijzen online komen. |
| ☐ | **Btw-status** | Niet vermeld. | Is de btw inbegrepen, uitgesloten of niet van toepassing (bijvoorbeeld bij B2B)? Welke vermelding is nodig? Daarna `pricing.note` invullen. |
| ☐ | **Betaalvoorwaarden** | Niet vermeld. | Termijnen, betaalmoment, annulerings- en verzetbeleid. |
| ☐ | **Reis- en verblijfskosten** | Niet vermeld en niet als "inbegrepen" gepresenteerd. | Wie betaalt reis en verblijf bij fysieke sessies (voor de cliënt en/of voor Jan)? |
| ☐ | **Locatie en praktische afspraken voor lichaamswerk** | "Cyprus is the main base for in-person work. Location, availability and practical arrangements are agreed with you personally." België en Nederland worden genoemd als bespreekbaar ("you can discuss the possibilities"). | Concrete locatie(s) op Cyprus; of fysieke sessies in België of Nederland echt mogelijk zijn; praktische afspraken (ruimte, kleding, duur). |
| ◐ | **Kennismakingsgesprek** | Er is geen duur, prijs (gratis of niet), vorm of responstermijn beloofd. | Duur, kosten, vorm (online/telefonisch) en eventuele responstermijn, als die vermeld mogen worden. |
| ◐ | **Disclaimer** | Op /approach en in de FAQ: "not medical or psychological treatment and do not replace it". Dit is een zorgvuldigheidsformulering, geen geverifieerde juridische tekst. | Akkoord, of juridisch getoetste formulering. |
| ☐ | Vertrouwelijkheid / beroepsgeheim | Bewust **niet** beloofd. | Mag vertrouwelijkheid worden toegezegd, en in welke bewoording? |

Toekomstige ideeën (retreats, relatiebegeleiding, gezinsprogramma’s) zijn **niet** opgenomen.

## 5. Formulier, boeking en privacy

| | Punt | Huidige stand | Nodig |
| --- | --- | --- | --- |
| ☐ | **Formulierdienst** | Niet geconfigureerd, dus het formulier is inactief en toont een melding. Ondersteund: Resend (e-mail) of een HTTPS-webhook (bijvoorbeeld Formspree, Make, Zapier, n8n). | Keuze van de dienst, API-sleutel of webhook-URL, ontvangstadres en een geverifieerd afzenderdomein (voor Resend). |
| ☐ | **Boekingslink** | Geen; alle primaire CTA’s gaan naar `/contact`. Instelbaar via `PUBLIC_BOOKING_URL`. | Eventuele boekingslink (bijvoorbeeld een agendatool). |
| ☐ | **Privacytekst** | Conceptpagina `/privacy`: noindex, niet in de sitemap, gemarkeerd als "Draft". Onderdelen met "to be completed" ontbreken nog. | Definitieve privacyverklaring (AVG/GDPR): verwerkingsverantwoordelijke, verwerkers (Vercel, formulierdienst), bewaartermijn, rechten, contact. |
| ☐ | Cookie-/analyticsmelding | Er is geen analytics en zijn geen cookies, dus er is geen banner nodig. | Opnieuw beoordelen als analytics wordt ingeschakeld. |

## 6. Analytics

| | Punt | Huidige stand | Nodig |
| --- | --- | --- | --- |
| ☐ | **Analytics-instellingen** | Uit (`PUBLIC_ANALYTICS_ENABLED=false`); er wordt geen script geladen. CTA-events zijn voorbereid via `data-cta` (event `cta_click` met alleen `cta` en `page`). | Besluit of Vercel Web Analytics (cookieloos) aan moet; zo ja, ook inschakelen in het Vercel-dashboard en de privacytekst bijwerken. |

## 7. Tekst en taal

- ◐ De volledige Engelse copy is geschreven op basis van de intake. Gebruikt is Brits Engels ("programme", "organisation", "behaviour"). **Controle door Jan en eventueel een native speaker.**
- ◐ De vijf thema’s op /approach zijn een **redactionele uitleg**, geen gecertificeerde methode. Dat staat ook letterlijk op de pagina.
- ☐ Nederlandse vertaling: de structuur is voorbereid (`src/content/<locale>/`). Er is nog geen taalwisselaar.
