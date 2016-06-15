# Ledetekst editor

   ## Utvikling

   * Start Java-serveren fra `StartJetty.java`
   * Start scriptovervåking med `npm run watch` fra katalogen `web/src/frontend`


   ## Oppsett

   Prosjektet har egne githooks som ligger i mappa `.githooks`.
   Ta disse i bruk ved å kjøre følgende kommandoer fra roten av prosjektet.
   Det vil ta backup av eksisterende hooks under `.git/hooks`, men disse vil ikke lengre være i bruk.

   setup-scriptet er testet i cygwin og gitbash

   ```
   ./.githooks/.setup.sh
   ```

## Javascript og CSS

### Konvensjoner for html-klassenavn

For elementer som skal bruker for *funksjonelle/integrasjons-tester* brukes prefixet `e2e-`, f.eks `e2e-page-mistet-jobben-oversikt`.

For elementer som skal trackes med GA elle GTM brukes prefixet `gtm-`, f.eks `gtm-scroll-link`.

For elementer som skal brukes av javascript (e.g `querySelector`) brukes prefixet `js-`, f.eks `js-dato-velger`