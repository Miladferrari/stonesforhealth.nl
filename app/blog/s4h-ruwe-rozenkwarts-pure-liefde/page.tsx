import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumbs from '@/app/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'S4H Ruwe Rozenkwarts – Pure Liefde in Grote Brokken Natuurkracht | StonesForHealth',
  description: 'Ontdek S4H ruwe Rozenkwarts brokken (1,25-1,5 kg en 3,0-3,5 kg). Authentieke edelstenen voor liefde, hartchakra healing en emotionele balans. Handgeselecteerd en duurzaam.',
  keywords: [
    'ruwe rozenkwarts',
    'rozenkwarts brok',
    's4h rozenkwarts',
    'grote rozenkwarts',
    'rozenkwarts kopen',
    'hartchakra steen',
    'liefde edelsteen',
    'natuurlijke rozenkwarts',
    'rozenkwarts 1 kg',
    'rozenkwarts 3 kg',
    'ruwe kristallen',
    'edelstenen natuurlijk',
    'zelfliefde steen',
    'emotionele healing',
  ],
  openGraph: {
    title: 'S4H Ruwe Rozenkwarts – Pure Liefde in Grote Brokken Natuurkracht',
    description: 'Ontdek S4H ruwe Rozenkwarts brokken. Authentieke edelstenen voor liefde en hartchakra healing.',
    type: 'article',
    publishedTime: '2025-11-06',
  },
  alternates: {
    canonical: 'https://stonesforhealth.nl/blog/s4h-ruwe-rozenkwarts-pure-liefde',
  },
};

export default function S4HRuweRozenkwarts() {
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "S4H Ruwe Rozenkwarts – Pure Liefde in Grote Brokken Natuurkracht",
    "description": "Ontdek de kracht van S4H ruwe Rozenkwarts brokken. Authentieke, handgeselecteerde edelstenen voor liefde, zelfacceptatie en emotionele healing.",
    "image": "https://stonesforhealth.nl/blog-images/S4H Ruwe Rozenkwarts – Pure Liefde in Grote Brokken Natuurkracht .jpeg",
    "datePublished": "2025-11-06T10:00:00Z",
    "dateModified": "2025-11-06T10:00:00Z",
    "author": {
      "@type": "Organization",
      "name": "StonesForHealth"
    },
    "publisher": {
      "@type": "Organization",
      "name": "StonesForHealth",
      "logo": {
        "@type": "ImageObject",
        "url": "https://stonesforhealth.nl/logo.webp"
      }
    }
  };

  return (
    <article className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs
          customItems={[
            { name: 'Home', url: 'https://stonesforhealth.nl' },
            { name: 'Blog', url: 'https://stonesforhealth.nl/blog' },
            { name: 'S4H Ruwe Rozenkwarts', url: 'https://stonesforhealth.nl/blog/s4h-ruwe-rozenkwarts-pure-liefde' }
          ]}
        />

        <header className="mb-8 pb-6 border-b border-gray-200">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)]">
            S4H Ruwe Rozenkwarts – Pure Liefde in Grote Brokken Natuurkracht
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <time dateTime="2025-11-06">6 november 2025</time>
            <span>•</span>
            <span>7 min leestijd</span>
          </div>
        </header>

        {/* Blog Image */}
        <div className="relative w-full h-64 sm:h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src="/blog-images/S4H Ruwe Rozenkwarts – Pure Liefde in Grote Brokken Natuurkracht .jpeg"
            alt="S4H Ruwe Rozenkwarts – Pure Liefde in Grote Brokken Natuurkracht"
            fill
            className="object-cover"
            priority
          />
        </div>

        <section className="mb-8">
          <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
            De <strong>Rozenkwarts</strong> is al eeuwenlang de steen van liefde, zachtheid en emotionele heling. Deze prachtige roze edelsteen opent het hartchakra, bevordert zelfliefde, harmonie in relaties en straalt een rustgevende, warme energie uit die diep resoneert met het menselijk hart.
          </p>
          <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
            Onze <strong>S4H ruwe Rozenkwarts brokken</strong> zijn afkomstig uit duurzame bronnen en zorgvuldig geselecteerd op kleur, energie en kwaliteit. Elk stuk is uniek — gevormd door de aarde gedurende miljoenen jaren, met natuurlijke kristalstructuren, zachte roze tinten en een energie die nooit vervaagt.
          </p>
          <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
            In tegenstelling tot gepolijste stenen, behouden ruwe Rozenkwarts brokken hun oorspronkelijke, ongetemde kracht. Ze zijn niet bewerkt, niet behandeld — pure moeder aarde-energie in zijn meest authentieke vorm. Dit maakt ze bijzonder geschikt voor serieus energiewerk, healing praktijken en als krachtig middelpunt in je huis.
          </p>
        </section>

        <div className="space-y-8">
          <section id="waarom-ruw">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              Waarom Kiezen voor een Ruwe Rozenkwarts Brok van S4H?
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Ruwe edelstenen hebben een speciale plaats in de wereld van kristallen en spiritualiteit. Waar gepolijste stenen mooi en decoratief zijn, bieden ruwe stenen een diepere, ongefilterde verbinding met de aardse energie.
            </p>
          </section>

          <section id="puur-natuur">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              1. Puur Natuur, Zonder Bewerking
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              In tegenstelling tot gepolijste stenen behoudt een ruwe brok Rozenkwarts zijn <strong>oorspronkelijke, krachtige energie</strong>. De trillingen blijven zuiver en intens, omdat de steen niet is blootgesteld aan mechanische bewerking die de kristalstructuur kan verstoren.
            </p>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Wat maakt ruw zo speciaal?
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li><strong>Ongepolijste energie:</strong> De natuurlijke kristalvormingen zorgen voor een meerdimensionale energieafgifte</li>
              <li><strong>Authentieke trillingen:</strong> Geen kunstmatige gladheid — de steen blijft exact zoals de aarde hem vormde</li>
              <li><strong>Perfect voor healing:</strong> Therapeuten en energiewerkers prefereren ruwe stenen voor hun pure, directe werking</li>
              <li><strong>Meditatie-kracht:</strong> De ruwheid helpt je te gronden en te verbinden met de aarde</li>
            </ul>

            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Ruwe Rozenkwarts is ideaal voor <strong>reiki, chakra balancing, ruimte-energiereiniging en als meditatie-anker</strong>. De steen creëert een zachte maar krachtige aanwezigheid die liefde en harmonie in elke ruimte brengt.
            </p>
          </section>

          <section id="grote-formaten">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              2. Grote Formaten, Diepe Werking
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Onze Rozenkwarts brokken zijn verkrijgbaar in twee indrukwekkende formaten, zorgvuldig gekozen om maximale impact te creëren:
            </p>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Formaat 1: 1,25 tot 1,5 kg
            </h3>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Perfect voor persoonlijke ruimtes zoals:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li><strong>Slaapkamer:</strong> Plaats naast je bed voor vredige slaap en dromen vol liefde</li>
              <li><strong>Meditatiehoek:</strong> Als middelpunt voor hartchakra-werk en zelfliefde praktijken</li>
              <li><strong>Bureau/werkruimte:</strong> Om harmonie en mededogen te brengen in je dagelijkse werk</li>
              <li><strong>Altaar:</strong> Als centrale steen voor liefdesrituelen en intenties</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Formaat 2: 3,0 tot 3,5 kg
            </h3>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Een echte blikvanger met krachtige uitstraling voor:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li><strong>Woonkamer:</strong> Als statement piece dat de hele ruimte vult met liefdevolle energie</li>
              <li><strong>Praktijkruimte:</strong> Voor therapeuten, coaches en healers — de steen creëert een veilige, warme sfeer</li>
              <li><strong>Yoga/meditatiestudio:</strong> Om het hartchakra van alle aanwezigen te openen</li>
              <li><strong>Ontvangstruimte:</strong> Verwelkom bezoekers met de zachte, accepterende energie van Rozenkwarts</li>
            </ul>

            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <strong>Vuistregel:</strong> Hoe groter de steen, hoe breder het energieveld dat ze creëert. Een grote Rozenkwarts brok van 3+ kg kan een hele kamer vullen met rust, warmte en liefde. Je voelt het verschil wanneer je de ruimte binnenkomt — de energie wordt merkbaar zachter en harmonischer.
            </p>
          </section>

          <section id="handgeselecteerd">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              3. Handgeselecteerd door S4H
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Elke steen wordt met zorg gekozen door ons team van <strong>Stones for Health (S4H)</strong>. Ons private label staat voor authenticiteit, kwaliteit en spirituele kracht. We geloven dat kristallen levende energieën zijn die met respect behandeld moeten worden — van mijn tot jouw handen.
            </p>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Wat maakt S4H uniek?
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li><strong>Duurzame inkoop:</strong> We werken alleen met ethische leveranciers die de aarde respecteren</li>
              <li><strong>Energie-selectie:</strong> Elke steen wordt gevoeld en getest op zijn trilling voordat we hem aanbieden</li>
              <li><strong>Geen behandelingen:</strong> Geen kleurversterking, geen verhitting, geen kunstmatige bewerking</li>
              <li><strong>Authenticiteit gegarandeerd:</strong> 100% natuurlijke edelstenen — geen namaak, geen synthetics</li>
              <li><strong>Bewuste keuze:</strong> We selecteren op schoonheid, maar vooral op energetische kracht</li>
            </ul>

            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Wanneer je een S4H Rozenkwarts brok koopt, weet je dat je een steen in handen hebt die met intentie is gekozen — niet massaal ingekocht, maar bewust geselecteerd om liefde en heling te brengen.
            </p>
          </section>

          <section id="werking">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              Werking van Rozenkwarts
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Rozenkwarts is de <strong>ultieme steen voor het hart</strong>. Zijn zachte, moederlijke energie omhult je met onvoorwaardelijke liefde en helpt je emotionele wonden te helen.
            </p>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Emotionele & Spirituele Werking
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li><strong>Opent het hartchakra:</strong> Verwijdert blokkades en laat liefde vrij stromen — zowel naar jezelf als naar anderen</li>
              <li><strong>Bevordert zelfliefde:</strong> Helpt je jezelf te accepteren, waarderen en mild te zijn voor je eigen imperfecties</li>
              <li><strong>Heelt oude wonden:</strong> Verzacht pijn van hartbreuk, verlies en emotioneel trauma</li>
              <li><strong>Vergeving en acceptatie:</strong> Maakt het makkelijker om los te laten en vrede te vinden met het verleden</li>
              <li><strong>Harmonie in relaties:</strong> Verbetert communicatie, empathie en emotionele verbondenheid met geliefden</li>
              <li><strong>Rust en innerlijke vrede:</strong> Kalmeert angst, stress en emotionele onrust</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Fysieke Werking (Volgens Kristalhealing Tradities)
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li><strong>Ondersteunt het hart:</strong> Zou het cardiovasculaire systeem en bloedcirculatie kunnen versterken</li>
              <li><strong>Huidverzorging:</strong> Traditioneel gebruikt voor een gezonde, stralende huid</li>
              <li><strong>Slaapkwaliteit:</strong> Bevordert diepe, rustgevende slaap zonder nachtmerries</li>
              <li><strong>Vrouwelijke energie:</strong> Ondersteunt vrouwelijke cycli, vruchtbaarheid en balans</li>
            </ul>

            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <em>Let op: Kristallen zijn geen vervanging voor medische behandeling. Gebruik ze als aanvulling op een gezonde levensstijl.</em>
            </p>
          </section>

          <section id="gebruik">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              Gebruik & Verzorging van je Rozenkwarts Brok
            </h2>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Plaatsing in Huis
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li><strong>Slaapkamer:</strong> Naast je bed of op het nachtkastje voor rustgevende slaap en dromen vol liefde</li>
              <li><strong>Woonkamer:</strong> Op een centrale plek om harmonie te brengen in het gezinsleven</li>
              <li><strong>Relatie-altaar:</strong> Samen met rode rozen, foto's van geliefden en kaarsen</li>
              <li><strong>Meditatie-ruimte:</strong> Als focus punt tijdens hartchakra meditaties</li>
              <li><strong>Werkruimte:</strong> Om compassie en vriendelijkheid te brengen in professionele omgevingen</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Reiniging
            </h3>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Reinig je Rozenkwarts regelmatig om opgenomen energie te verwijderen:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li><strong>Witte salie of Palo Santo:</strong> Houd de steen in de rook en visualiseer hoe negatieve energie wegtrekt</li>
              <li><strong>Maanlicht:</strong> Leg buiten tijdens volle maan voor zuivering en oplading (veiligste methode)</li>
              <li><strong>Bergkristal cluster:</strong> Leg je Rozenkwarts op een Bergkristal geode om te reinigen en opladen</li>
              <li><strong>Klankschalen:</strong> Gebruik Tibetaanse klankschalen om de steen energetisch te resetten</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Opladen
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li><strong>Maanlicht (aanbevolen):</strong> Veilig en krachtig — leg buiten of op vensterbank tijdens volle maan</li>
              <li><strong>Ochtendzon:</strong> Korte blootstelling (max 30 min) aan zachte ochtendzon is oké, maar vermijd felle middagzon</li>
              <li><strong>Intentie:</strong> Houd de steen vast en vul hem met je intentie van liefde, vrede en heling</li>
            </ul>

            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <strong>Waarschuwing:</strong> Te veel direct zonlicht kan Rozenkwarts laten verkleuren. Gebruik liever maanlicht of indirecte oplading.
            </p>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Combinaties met Andere Kristallen
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li><strong>Bergkristal:</strong> Versterkt de werking van Rozenkwarts en brengt helderheid in liefde</li>
              <li><strong>Amethist:</strong> Combineert liefde met spiritualiteit en innerlijke rust</li>
              <li><strong>Groene Aventurijn:</strong> Samen creëren ze liefde + overvloed + hoop</li>
              <li><strong>Rhodoniet:</strong> Voor emotionele heling en diepe hartchakra transformatie</li>
            </ul>
          </section>

          <section id="s4h-collectie">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              S4H – Pure Kracht uit de Aarde
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Onze <strong>S4H collectie</strong> is een exclusieve lijn binnen Stonesforhealth.nl. Elke steen is geselecteerd op energie en trilling, duurzame herkomst en natuurlijke schoonheid. We werken niet met massa-inkoop, maar met bewuste keuzes — elke steen heeft een verhaal en een missie.
            </p>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Voor Wie is de S4H Ruwe Rozenkwarts?
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li><strong>Verzamelaars:</strong> Die waardering hebben voor natuurlijke, onbewerkte schoonheid</li>
              <li><strong>Spirituele beoefenaars:</strong> Yoga instructeurs, reiki masters, meditatie coaches, energiewerkers</li>
              <li><strong>Interior lovers:</strong> Die betekenisvolle, energetisch krachtige decoratie willen in huis</li>
              <li><strong>Cadeau-gevers:</strong> Op zoek naar een uniek, diepzinnig geschenk vol liefde en intentie</li>
              <li><strong>Hartchakra werkers:</strong> Wie bewust bezig is met emotionele heling en zelfliefde</li>
            </ul>

            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              De ruwe Rozenkwarts brokken (1,25–1,5 kg en 3,0–3,5 kg) zijn niet zomaar stenen — het zijn <strong>energetische bondgenoten</strong> die je ondersteunen op je pad van liefde, acceptatie en innerlijke vrede.
            </p>
          </section>

          <section id="conclusie">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              Conclusie: Laat Liefde Stromen met S4H Rozenkwarts
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              In een wereld die vaak hard en snel is, biedt Rozenkwarts een toevluchtsoord van <strong>zachtheid, warmte en onvoorwaardelijke liefde</strong>. Een grote, ruwe Rozenkwarts brok is meer dan een decoratie-item — het is een dagelijkse herinnering om je hart open te houden, jezelf te accepteren en liefde te laten stromen.
            </p>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              De S4H ruwe Rozenkwarts collectie brengt pure moeder aarde-energie in jouw huis. Elk stuk is uniek, authentiek en geselecteerd met zorg. Of je nu kiest voor het kleinere formaat (1,25-1,5 kg) of de indrukwekkende grote brok (3,0-3,5 kg) — je krijgt een kristal dat je leven zal verrijken met rust, harmonie en liefde.
            </p>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <strong>Open je hart. Voel de liefde. Laat Rozenkwarts je gids zijn naar zelfacceptatie en emotioneel welzijn.</strong>
            </p>
          </section>
        </div>

        <section className="border-t border-gray-200 pt-8 mt-8">
          <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)]">
            Shop S4H Ruwe Rozenkwarts bij StonesForHealth
          </h2>
          <p className="text-base text-gray-800 mb-6 font-[family-name:var(--font-eb-garamond)]">
            Ontdek onze exclusieve <strong>S4H Ruwe Rozenkwarts brokken</strong> in twee formaten: 1,25-1,5 kg en 3,0-3,5 kg. Elke steen is handgeselecteerd, 100% natuurlijk en gevuld met liefdesenergie. Perfect voor je huis, healing praktijk of als betekenisvol cadeau.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <Link
              href="/alle-producten"
              className="inline-block bg-[#8B7355] hover:bg-[#6D5A42] text-white px-8 py-3 text-center transition-colors font-medium font-[family-name:var(--font-eb-garamond)]"
            >
              Shop Rozenkwarts
            </Link>
            <Link
              href="/bestsellers"
              className="inline-block border border-[#8B7355] hover:bg-gray-50 text-[#8B7355] px-8 py-3 text-center transition-colors font-medium font-[family-name:var(--font-eb-garamond)]"
            >
              Bekijk Bestsellers
            </Link>
          </div>
          <p className="text-sm text-gray-600 font-[family-name:var(--font-eb-garamond)]">
            Gratis verzending vanaf €50 | 30 dagen retourrecht | 100% authentiek
          </p>
        </section>

        <section className="border-t border-gray-200 pt-8 mt-8">
          <h2 className="text-2xl font-bold text-[#2D2D2D] mb-6 font-[family-name:var(--font-eb-garamond)]">
            Zie ook
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)]">
            <li>
              <Link href="/blog/rozenkwarts-steen-van-de-liefde" className="text-[#8B7355] hover:underline">
                Rozenkwarts: De Steen van de Liefde en het Hartchakra
              </Link>
            </li>
            <li>
              <Link href="/blog/edelstenen-liefde-zelfliefde-hartchakra" className="text-[#8B7355] hover:underline">
                Edelstenen voor Liefde en Zelfliefde - Open Je Hart
              </Link>
            </li>
            <li>
              <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="text-[#8B7355] hover:underline">
                De Gouden Driehoek: Amethist, Bergkristal & Rozenkwarts
              </Link>
            </li>
            <li>
              <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#8B7355] hover:underline">
                Chakra Kristallen - Complete Gids
              </Link>
            </li>
          </ul>
        </section>

        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#8B7355] hover:text-[#6D5A42] font-medium transition-colors font-[family-name:var(--font-eb-garamond)]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Terug naar Blog Overzicht
          </Link>
        </div>
      </div>
    </article>
  );
}
