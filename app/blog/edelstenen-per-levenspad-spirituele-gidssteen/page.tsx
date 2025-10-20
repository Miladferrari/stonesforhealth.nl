import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import JsonLd from '@/app/components/JsonLd';
import Breadcrumbs from '@/app/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Edelstenen per Levenspad – Ontdek Jouw Spirituele Gidssteen | StonesForHealth',
  description: 'Ontdek welke edelstenen perfect bij jouw levenspadnummer passen. Van Levenspad 1 tot 9 en meestergetallen 11 en 22 - bereken je getal en vind je spirituele gidsstenen voor balans en groei.',
  keywords: [
    'levenspadnummer berekenen',
    'edelstenen per levenspad',
    'numerologie edelstenen',
    'levenspad 1 edelstenen',
    'levenspad 2 edelstenen',
    'levenspad 3 edelstenen',
    'spirituele gidssteen',
    'meestergetal 11',
    'meestergetal 22',
    'numerologie kristallen',
    'levenspad berekenen',
    'persoonlijke edelsteen',
  ],
  openGraph: {
    title: 'Edelstenen per Levenspad – Ontdek Jouw Spirituele Gidssteen',
    description: 'Ontdek welke edelstenen perfect bij jouw levenspadnummer passen. Bereken je getal en vind je spirituele gidsstenen voor balans en groei.',
    type: 'article',
    publishedTime: '2025-10-20',
  },
  alternates: {
    canonical: 'https://stonesforhealth.nl/blog/edelstenen-per-levenspad-spirituele-gidssteen',
  }
};

const blogPostingSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Edelstenen per Levenspad – Ontdek Jouw Spirituele Gidssteen",
  "description": "Ontdek welke edelstenen perfect bij jouw levenspadnummer passen. Van Levenspad 1 tot 9 en meestergetallen 11 en 22 - complete gids met berekening en aanbevelingen.",
  "image": "https://stonesforhealth.nl/logo.webp",
  "datePublished": "2025-10-20T09:00:00Z",
  "dateModified": "2025-10-20T09:00:00Z",
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

export default function BlogPost() {
  return (
    <>
      <JsonLd data={blogPostingSchema} />

      <article className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* Breadcrumbs */}
          <Breadcrumbs
            customItems={[
              { name: 'Home', url: 'https://stonesforhealth.nl' },
              { name: 'Blog', url: 'https://stonesforhealth.nl/blog' },
              { name: 'Edelstenen per Levenspad', url: 'https://stonesforhealth.nl/blog/edelstenen-per-levenspad-spirituele-gidssteen' }
            ]}
          />

          {/* Header */}
          <header className="mb-8 pb-6 border-b border-gray-200">
            <h1 className="text-4xl md:text-5xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)]">
              Edelstenen per Levenspad – Ontdek Jouw Spirituele Gidssteen
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <time dateTime="2025-10-20">20 oktober 2025</time>
              <span>•</span>
              <span>12 min leestijd</span>
            </div>
          </header>

          {/* Blog Image */}
          <div className="relative w-full h-64 sm:h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src="/blog-images/Edelstenen per Levenspad – Ontdek Jouw Spirituele Gidssteen.jpeg"
              alt="Edelstenen per Levenspad"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Introductie */}
          <section className="mb-8">
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              In de numerologie heeft elke ziel een uniek levenspadnummer dat je persoonlijkheid, talenten en levensdoel weerspiegelt. Door je levenspadnummer te combineren met de juiste edelstenen, kun je je natuurlijke krachten versterken, uitdagingen overwinnen en spirituele groei bevorderen. Ontdek in deze gids welke kristallen perfect bij jouw levenspad passen.
            </p>
          </section>

          {/* Content Sections */}
          <div className="space-y-8">

            {/* Hoe bereken je je levenspadnummer */}
            <section id="berekenen">
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
                Hoe bereken je je levenspadnummer?
              </h2>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                Je levenspadnummer bereken je door alle cijfers van je volledige geboortedatum bij elkaar op te tellen en vervolgens te reduceren tot één enkel cijfer. Er zijn echter twee uitzonderingen: <strong>11</strong> en <strong>22</strong> zijn <em>meestergetallen</em> en worden niet verder gereduceerd.
              </p>
              <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Voorbeeld berekening
              </h3>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                Geboortedatum: <strong>7 augustus 1988</strong>
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <li>Tel alle cijfers op: 7 + 8 + 1 + 9 + 8 + 8 = <strong>41</strong></li>
                <li>Reduceer tot één cijfer: 4 + 1 = <strong>5</strong></li>
                <li>Levenspadnummer = <strong>5</strong></li>
              </ol>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <strong>Let op:</strong> Als je tijdens de berekening uitkomt op 11 of 22, stop dan met reduceren. Dit zijn meestergetallen met een speciale betekenis.
              </p>
            </section>

            {/* Levenspad 1 */}
            <section id="levenspad-1">
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
                Levenspad 1 – De Leider
              </h2>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <strong>Eigenschappen:</strong> Onafhankelijk, doelgericht, moedig, pioniersgeest<br />
                <strong>Uitdaging:</strong> Perfectionisme en stress
              </p>
              <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Ideale edelstenen voor Levenspad 1
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <li><strong>Granaat:</strong> Geeft kracht, moed en motivatie om doelen te bereiken</li>
                <li><strong>Rode Jaspis:</strong> Brengt aarding en helpt bij het behouden van focus</li>
                <li><strong>Tijgeroog:</strong> Versterkt zelfvertrouwen en beschermt tegen twijfel</li>
              </ul>
            </section>

            {/* Levenspad 2 */}
            <section id="levenspad-2">
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
                Levenspad 2 – De Diplomaat
              </h2>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <strong>Eigenschappen:</strong> Gevoelig, vredelievend, empathisch, samenwerkend<br />
                <strong>Uitdaging:</strong> Onzekerheid en te veel afhankelijkheid van anderen
              </p>
              <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Ideale edelstenen voor Levenspad 2
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <li><strong>Rozenkwarts:</strong> Bevordert zelfliefde en emotionele balans</li>
                <li><strong>Maansteen:</strong> Versterkt intuïtie en innerlijke kalmte</li>
                <li><strong>Groene Aventurijn:</strong> Brengt geluk en helpt bij het nemen van beslissingen</li>
              </ul>
            </section>

            {/* Levenspad 3 */}
            <section id="levenspad-3">
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
                Levenspad 3 – De Communicator
              </h2>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <strong>Eigenschappen:</strong> Creatief, expressief, positief, sociaal<br />
                <strong>Uitdaging:</strong> Oppervlakkigheid en gebrek aan focus
              </p>
              <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Ideale edelstenen voor Levenspad 3
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <li><strong>Citrien:</strong> Stimuleert creativiteit en positiviteit</li>
                <li><strong>Carneool:</strong> Geeft energie en zelfvertrouwen bij expressie</li>
                <li><strong>Blauwe Chalcedoon:</strong> Bevordert heldere communicatie en rust</li>
              </ul>
            </section>

            {/* Levenspad 4 */}
            <section id="levenspad-4">
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
                Levenspad 4 – De Bouwer
              </h2>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <strong>Eigenschappen:</strong> Betrouwbaar, praktisch, stabiel, gedisciplineerd<br />
                <strong>Uitdaging:</strong> Starheid en moeite met verandering
              </p>
              <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Ideale edelstenen voor Levenspad 4
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <li><strong>Hematiet:</strong> Brengt aarding en stabiliteit</li>
                <li><strong>Rode Jaspis:</strong> Versterkt doorzettingsvermogen en vitaliteit</li>
                <li><strong>Zwarte Toermalijn:</strong> Beschermt en helpt bij het loslaten van oude patronen</li>
              </ul>
            </section>

            {/* Levenspad 5 */}
            <section id="levenspad-5">
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
                Levenspad 5 – De Vrijheidszoeker
              </h2>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <strong>Eigenschappen:</strong> Avontuurlijk, leergierig, energiek, flexibel<br />
                <strong>Uitdaging:</strong> Onrust en gebrek aan commitment
              </p>
              <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Ideale edelstenen voor Levenspad 5
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <li><strong>Lapis Lazuli:</strong> Bevordert wijsheid en innerlijke rust</li>
                <li><strong>Turkoois:</strong> Beschermt tijdens reizen en nieuwe ervaringen</li>
                <li><strong>Amazoniet:</strong> Brengt balans tussen avontuur en stabiliteit</li>
              </ul>
            </section>

            {/* Levenspad 6 */}
            <section id="levenspad-6">
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
                Levenspad 6 – De Verzorger
              </h2>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <strong>Eigenschappen:</strong> Liefdevol, zorgzaam, harmonieus, verantwoordelijk<br />
                <strong>Uitdaging:</strong> Te veel verantwoordelijkheid op zich nemen
              </p>
              <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Ideale edelstenen voor Levenspad 6
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <li><strong>Rozenkwarts:</strong> Versterkt zelfliefde en compassie</li>
                <li><strong>Smaragd:</strong> Opent het hartchakra en bevordert genezing</li>
                <li><strong>Prehniet:</strong> Helpt grenzen stellen en zorgt voor innerlijke vrede</li>
              </ul>
            </section>

            {/* Levenspad 7 */}
            <section id="levenspad-7">
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
                Levenspad 7 – De Zoeker van Wijsheid
              </h2>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <strong>Eigenschappen:</strong> Spiritueel, analytisch, intuïtief, contemplatief<br />
                <strong>Uitdaging:</strong> Isolatie en te veel in het hoofd zitten
              </p>
              <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Ideale edelstenen voor Levenspad 7
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <li><strong>Amethist:</strong> Verdiept spirituele verbinding en intuïtie</li>
                <li><strong>Bergkristal:</strong> Brengt helderheid en versterkt meditatie</li>
                <li><strong>Sodaliet:</strong> Stimuleert logisch denken en innerlijk weten</li>
              </ul>
            </section>

            {/* Levenspad 8 */}
            <section id="levenspad-8">
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
                Levenspad 8 – De Manifestor
              </h2>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <strong>Eigenschappen:</strong> Ambitieus, krachtig, vastberaden, succesgericht<br />
                <strong>Uitdaging:</strong> Stress en te veel controle willen
              </p>
              <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Ideale edelstenen voor Levenspad 8
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <li><strong>Pyriet:</strong> Trekt overvloed en succes aan</li>
                <li><strong>Obsidiaan:</strong> Beschermt en helpt bij het loslaten van controle</li>
                <li><strong>Citrien:</strong> Versterkt manifestatiekracht en zelfvertrouwen</li>
              </ul>
            </section>

            {/* Levenspad 9 */}
            <section id="levenspad-9">
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
                Levenspad 9 – De Humanist
              </h2>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <strong>Eigenschappen:</strong> Empathisch, spiritueel, idealistisch, altruïstisch<br />
                <strong>Uitdaging:</strong> Loslaten en grenzen stellen
              </p>
              <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Ideale edelstenen voor Levenspad 9
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <li><strong>Labradoriet:</strong> Beschermt tegen energieverlies en versterkt intuïtie</li>
                <li><strong>Amethist:</strong> Helpt bij spirituele transformatie en loslaten</li>
                <li><strong>Rhodoniet:</strong> Ondersteunt emotionele heling en zelfliefde</li>
              </ul>
            </section>

            {/* Meestergetallen */}
            <section id="meestergetallen">
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
                Meestergetallen 11 en 22
              </h2>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                Meestergetallen hebben een hogere spirituele trilling en brengen zowel grotere gaven als grotere uitdagingen met zich mee.
              </p>
              <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Levenspad 11 – De Verlichte Inspirator
              </h3>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <strong>Eigenschappen:</strong> Zeer intuïtief, spiritueel geleid, inspirerend<br />
                <strong>Uitdaging:</strong> Overgevoeligheid en zelfkritiek
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <li><strong>Seleniet:</strong> Zuivert energie en versterkt spirituele verbinding</li>
                <li><strong>Amethist:</strong> Beschermt tegen overprikkeling en bevordert rust</li>
                <li><strong>Bergkristal:</strong> Amplifier van intuïtie en helderheid</li>
              </ul>
              <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Levenspad 22 – De Meesterbouwer
              </h3>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <strong>Eigenschappen:</strong> Visionaire bouwer, krachtige manifestor<br />
                <strong>Uitdaging:</strong> Overweldigende ambities en druk
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <li><strong>Pyriet:</strong> Helpt grote visies manifesteren</li>
                <li><strong>Granaat:</strong> Geeft energie en doorzettingsvermogen</li>
                <li><strong>Zwarte Toermalijn:</strong> Beschermt en aard tijdens grote projecten</li>
              </ul>
            </section>

            {/* Reiniging en Opladen */}
            <section id="reiniging">
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
                Reiniging en Opladen van Jouw Levenspad Edelstenen
              </h2>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                Om je edelstenen optimaal te laten werken, is het belangrijk ze regelmatig te reinigen en op te laden.
              </p>
              <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Reinigingsmethoden
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <li><strong>Witte Salie:</strong> Beweeg de rook over je stenen voor energetische zuivering</li>
                <li><strong>Palo Santo:</strong> Zuivert en brengt positieve energie</li>
                <li><strong>Seleniet:</strong> Leg je stenen op een seleniet plaatje voor automatische reiniging</li>
                <li><strong>Klankschaal:</strong> Laat de trillingen negatieve energie wegjagen</li>
              </ul>
              <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Oplaadmethoden
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <li><strong>Maanlicht:</strong> Leg je stenen tijdens volle maan buiten voor krachtige oplading</li>
                <li><strong>Aarde:</strong> Begraaf ze 24 uur in de grond voor diepe reiniging en grounding</li>
                <li><strong>Bergkristal cluster:</strong> Plaats je stenen erop voor energetische versterking</li>
              </ul>
              <p className="text-base text-gray-700 font-[family-name:var(--font-eb-garamond)] mb-4">
                <strong>Tip:</strong> Reinig en laad je levenspad edelstenen minimaal 1x per maand op, vooral na intensief gebruik of emotionele periodes.
              </p>
            </section>

            {/* Conclusie */}
            <section id="conclusie">
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
                Conclusie
              </h2>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                Elke ziel heeft een unieke trilling en levenspad. Door te werken met edelstenen die resoneren met jouw persoonlijke nummer, versterk je je natuurlijke talenten, vind je balans in uitdagingen en creëer je een diepere verbinding met je spirituele pad.
              </p>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                Of je nu Levenspad 1 bent met je leiderschapsenergie, of Levenspad 9 met je humanitaire missie – de juiste kristallen kunnen je helpen om jouw hoogste potentieel te bereiken en in harmonie te leven met je levensdoel.
              </p>
            </section>

            {/* CTA Section */}
            <section className="border-t border-gray-200 pt-8 mt-8">
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)]">
                Ontdek Jouw Persoonlijke Levenspad Set bij StonesForHealth
              </h2>
              <p className="text-base text-gray-800 mb-6 font-[family-name:var(--font-eb-garamond)]">
                Bij <strong>StonesForHealth.nl</strong> kun je edelstenen sets vinden die perfect passen bij jouw levenspadnummer. Elk met natuurlijke energie voor spirituele groei, balans en persoonlijke ontwikkeling. Ontdek de kracht van kristallen die speciaal zijn afgestemd op jouw unieke pad.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <Link
                  href="/alle-producten"
                  className="inline-block bg-[#8B7355] hover:bg-[#6D5A42] text-white px-8 py-3 text-center transition-colors font-medium font-[family-name:var(--font-eb-garamond)]"
                >
                  Bekijk Alle Edelstenen
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

            {/* Gerelateerde Artikelen */}
            <section className="border-t border-gray-200 pt-8 mt-8">
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-6 font-[family-name:var(--font-eb-garamond)]">
                Zie ook
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)]">
                <li>
                  <Link href="/blog/edelstenen-per-sterrenbeeld-numerologie" className="text-[#8B7355] hover:underline">
                    Edelstenen per Sterrenbeeld en Numerologie
                  </Link>
                </li>
                <li>
                  <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#8B7355] hover:underline">
                    Complete Chakra Kristallen Gids
                  </Link>
                </li>
                <li>
                  <Link href="/blog/bergkristal-koning-kristallen" className="text-[#8B7355] hover:underline">
                    Bergkristal: De Koning onder de Kristallen
                  </Link>
                </li>
                <li>
                  <Link href="/blog/edelstenen-opladen-maanlicht" className="text-[#8B7355] hover:underline">
                    Edelstenen Opladen met Maanlicht
                  </Link>
                </li>
              </ul>
            </section>

          </div>

          {/* Back to Blog */}
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
    </>
  );
}
