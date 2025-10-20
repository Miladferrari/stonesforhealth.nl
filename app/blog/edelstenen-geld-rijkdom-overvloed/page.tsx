import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import JsonLd from '@/app/components/JsonLd';
import Breadcrumbs from '@/app/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Edelstenen voor Geld, Rijkdom en Overvloed | Manifestatie & Welvaart',
  description: 'Ontdek de krachtigste edelstenen voor geld en overvloed: citrien, pyriet, groene aventurijn en tijgeroog. Leer hoe je met kristallen rijkdom en succes kunt manifesteren.',
  keywords: [
    'edelstenen voor geld',
    'stenen voor rijkdom',
    'citrien geld',
    'pyriet welvaart',
    'groene aventurijn geluk',
    'tijgeroog succes',
    'geldstenen',
    'overvloed kristallen',
    'manifestatie edelstenen',
    'wet van aantrekking stenen',
    'rijkdom aantrekken',
    'financieel succes kristallen',
    'geluksstenen',
    'manifestatie stenen',
    'abundance crystals'
  ],
  openGraph: {
    title: 'Edelstenen voor Geld, Rijkdom en Overvloed | Manifesteer Welvaart',
    description: 'De krachtigste edelstenen voor financieel succes: citrien, pyriet, groene aventurijn, tijgeroog en bergkristal. Complete gids voor manifestatie en overvloed.',
    type: 'article',
    publishedTime: '2025-10-20',
  },
  alternates: {
    canonical: 'https://stonesforhealth.nl/blog/edelstenen-geld-rijkdom-overvloed',
  }
};

const blogPostingSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Edelstenen om Geld, Rijkdom en Overvloed aan te Trekken",
  "description": "Ontdek de krachtigste edelstenen voor geld en overvloed: citrien, pyriet, groene aventurijn en tijgeroog. Leer hoe je met kristallen rijkdom en succes kunt manifesteren.",
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
              { name: 'Edelstenen voor Geld en Overvloed', url: 'https://stonesforhealth.nl/blog/edelstenen-geld-rijkdom-overvloed' }
            ]}
          />

          {/* Header */}
          <header className="mb-8 pb-6 border-b border-gray-200">
            <h1 className="text-4xl md:text-5xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)]">
              Edelstenen om Geld, Rijkdom en Overvloed aan te Trekken
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <time dateTime="2025-10-20">20 oktober 2025</time>
              <span>•</span>
              <span>8 min leestijd</span>
            </div>
          </header>

          {/* Blog Image */}
          <div className="relative w-full h-64 sm:h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src="/blog-images/Edelstenen om Geld, Rijkdom en Overvloed aan te Trekken.jpeg"
              alt="Edelstenen voor Geld en Overvloed"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Introductie */}
          <section className="mb-8">
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Wil je meer welvaart, financieel succes en overvloed in je leven aantrekken? Edelstenen kunnen krachtige
              hulpmiddelen zijn bij het manifesteren van rijkdom en het versterken van je intenties. In deze uitgebreide
              gids ontdek je welke kristallen het meest effectief zijn voor geld en overvloed, en hoe je ermee kunt werken.
            </p>
          </section>

          {/* Content Sections */}
          <div className="space-y-8">

            {/* De Spirituele Wet van Aantrekking */}
            <section>
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
                De Spirituele Wet van Aantrekking en Edelstenen
              </h2>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                De <strong>wet van aantrekking</strong> stelt dat je aantrekt wat je uitstraalt. Je gedachten, emoties
                en energie bepalen wat je in je leven manifesteert. Edelstenen werken als <strong>energetische versterkers</strong> die
                jouw trilling verhogen en je helpen in een staat van overvloed te komen.
              </p>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                Wanneer je met de juiste intentie met edelstenen werkt, versterk je niet alleen je financiële situatie,
                maar ook je <strong>zelfvertrouwen</strong>, <strong>daadkracht</strong> en vermogen om kansen te herkennen.
                De stenen helpen je om beperkende overtuigingen over geld los te laten en een positieve relatie met welvaart te creëren.
              </p>
            </section>

            {/* Citrien */}
            <section>
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
                Citrien - De Steen van Rijkdom en Succes
              </h2>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <strong>Citrien</strong> is dé klassieker onder de geldstenen en wordt niet voor niets de
                "koopmanssteen" genoemd. Deze zonnige gele steen symboliseert <strong>welvaart</strong>, <strong>positiviteit</strong> en
                <strong>manifestatiekracht</strong>. Zijn warme, energetische trilling trekt overvloed aan als een magneet.
              </p>
              <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Werking van Citrien
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <li>Trekt geld, welvaart en kansen aan</li>
                <li>Verhoogt zelfvertrouwen en motivatie</li>
                <li>Laat beperkende geldovertuigingen los</li>
                <li>Stimuleert creativiteit en ondernemerschap</li>
                <li>Werkt op het zonnevlechtchakra (persoonlijke kracht)</li>
              </ul>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <strong>Hoe te gebruiken:</strong> Leg een citrien in je portemonnee, geldlade of op je werkplek.
                Houd de steen tijdens meditatie vast en visualiseer financieel succes.
              </p>
              <p className="mb-4">
                <Link
                  href="/alle-producten?search=citrien"
                  className="text-[#8B7355] hover:underline font-medium font-[family-name:var(--font-eb-garamond)]"
                >
                  Bekijk citrien producten →
                </Link>
              </p>
            </section>

            {/* Groene Aventurijn */}
            <section>
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
                Groene Aventurijn - Gelukssteen voor Financiële Groei
              </h2>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <strong>Groene aventurijn</strong> wordt ook wel de <em>"steen van het geluk en succes"</em> genoemd.
                Deze prachtige groene steen helpt je om nieuwe kansen te zien en moedigt aan om actie te ondernemen.
                Ideaal voor ondernemers, carrièremensen en iedereen die groei zoekt.
              </p>
              <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Werking van Groene Aventurijn
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <li>Trekt geluk en nieuwe kansen aan</li>
                <li>Stimuleert optimisme en vooruitgang</li>
                <li>Versterkt doorzettingsvermogen</li>
                <li>Brengt rust bij financiële beslissingen</li>
                <li>Werkt op het hartchakra (emotioneel evenwicht)</li>
              </ul>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <strong>Perfect voor:</strong> Sollicitaties, nieuwe projecten, zakelijke deals en het aantrekken
                van geluksmomentjes in je financiële leven.
              </p>
              <p className="mb-4">
                <Link
                  href="/alle-producten?search=aventurijn"
                  className="text-[#8B7355] hover:underline font-medium font-[family-name:var(--font-eb-garamond)]"
                >
                  Bekijk groene aventurijn producten →
                </Link>
              </p>
            </section>

            {/* Pyriet */}
            <section>
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
                Pyriet - De Steen van Goud en Manifestatie
              </h2>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <strong>Pyriet</strong>, ook wel "dwaalgoud" genoemd, is een krachtige beschermsteen en gelukssteen
                die rijkdom aantrekt. Zijn goudkleurige metallic glans doet denken aan muntgeld en symboliseert
                <strong>overvloed</strong> en <strong>welvaart</strong>. Pyriet stimuleert zelfvertrouwen, wilskracht en daadkracht.
              </p>
              <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Werking van Pyriet
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <li>Trekt rijkdom en materieel succes aan</li>
                <li>Versterkt wilskracht en doorzettingsvermogen</li>
                <li>Beschermt tegen financieel verlies</li>
                <li>Stimuleert logisch denken en strategie</li>
                <li>Boost zelfvertrouwen en leiderschap</li>
              </ul>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <strong>Manifestatie tip:</strong> Schrijf je financiële doelen op en leg een pyriet erop.
                Lees je intenties dagelijks hardop voor om de manifestatie te versterken.
              </p>
              <p className="mb-4">
                <Link
                  href="/alle-producten?search=pyriet"
                  className="text-[#8B7355] hover:underline font-medium font-[family-name:var(--font-eb-garamond)]"
                >
                  Bekijk pyriet producten →
                </Link>
              </p>
            </section>

            {/* Tijgeroog */}
            <section>
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
                Tijgeroog - Voor Focus en Succes
              </h2>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <strong>Tijgeroog</strong> is een krachtige aardende steen die helpt bij het behouden van
                <strong>focus</strong> en <strong>discipline</strong> — eigenschappen die onmisbaar zijn voor financieel succes.
                Deze gouden-bruine steen met zijn kenmerkende glans brengt moed, balans en bescherming bij belangrijke
                beslissingen over geld.
              </p>
              <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Werking van Tijgeroog
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <li>Versterkt focus en concentratie</li>
                <li>Brengt moed en zelfvertrouwen</li>
                <li>Beschermt tegen financiële risico's</li>
                <li>Helpt bij het nemen van weloverwogen beslissingen</li>
                <li>Grounding energie bij stress</li>
              </ul>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <strong>Zakelijk gebruik:</strong> Draag tijgeroog tijdens belangrijke vergaderingen,
                onderhandelingen of presentaties voor extra zelfvertrouwen en helderheid.
              </p>
              <p className="mb-4">
                <Link
                  href="/alle-producten?search=tijgeroog"
                  className="text-[#8B7355] hover:underline font-medium font-[family-name:var(--font-eb-garamond)]"
                >
                  Bekijk tijgeroog producten →
                </Link>
              </p>
            </section>

            {/* Bergkristal */}
            <section>
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
                Bergkristal - De Universele Versterker
              </h2>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <strong>Bergkristal</strong> is de ultieme versterker van energie en intenties. Deze heldere, pure steen
                versterkt de werking van andere edelstenen. Als je hem combineert met geldstenen zoals pyriet of citrien,
                verhoogt hij hun trilling en manifestatiekracht exponentieel.
              </p>
              <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Werking van Bergkristal
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <li>Versterkt alle andere edelstenen</li>
                <li>Brengt helderheid over financiële doelen</li>
                <li>Zuivert negatieve gedachten over geld</li>
                <li>Verhoogt je manifestatiekracht</li>
                <li>Werkt op alle chakra's</li>
              </ul>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <strong>Combinatie tip:</strong> Leg bergkristal in het midden van een cirkel van geldstenen
                om een krachtige manifestatie grid te creëren.
              </p>
              <p className="mb-4">
                <Link
                  href="/alle-producten?search=bergkristal"
                  className="text-[#8B7355] hover:underline font-medium font-[family-name:var(--font-eb-garamond)]"
                >
                  Bekijk bergkristal producten →
                </Link>
              </p>
            </section>

            {/* Edelstenen Set */}
            <section>
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
                Edelstenen Set voor Geld, Rijkdom en Overvloed
              </h2>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                Voor maximale manifestatiekracht kun je een krachtige combinatie maken van de volgende stenen:
              </p>
              <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
                De Ultieme Geld & Overvloed Set
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <li><strong>Citrien</strong> - Voor welvaart en succes</li>
                <li><strong>Pyriet</strong> - Voor rijkdom en manifestatie</li>
                <li><strong>Groene Aventurijn</strong> - Voor geluk en kansen</li>
                <li><strong>Tijgeroog</strong> - Voor focus en daadkracht</li>
                <li><strong>Bergkristal</strong> - Voor versterking van alle energie</li>
              </ul>
              <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Hoe te gebruiken
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <li>Leg de stenen samen in een glazen schaaltje op je werkplek of bureau</li>
                <li>Creëer een manifestatie grid in de vorm van een cirkel of pentagram</li>
                <li>Draag ze in een zakje in je tas of zak</li>
                <li>Mediteer dagelijks met de stenen en visualiseer overvloed</li>
                <li>Spreek affirmaties uit zoals: <em>"Ik trek moeiteloos overvloed aan"</em></li>
              </ol>
              <p className="mb-4">
                <Link
                  href="/alle-producten"
                  className="text-[#8B7355] hover:underline font-medium font-[family-name:var(--font-eb-garamond)]"
                >
                  Bekijk alle edelstenen →
                </Link>
              </p>
            </section>

            {/* Reiniging en Opladen */}
            <section>
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
                Reiniging en Opladen van Geldstenen
              </h2>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                Edelstenen nemen energie op uit hun omgeving en moeten regelmatig worden gereinigd en opgeladen
                om optimaal te blijven werken. Dit is extra belangrijk voor geldstenen, omdat ze veel energie
                verbruiken bij manifestatie.
              </p>
              <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Reinigingsmethoden
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <li><strong>Witte Salie (Smudging):</strong> Beweeg de rook over je stenen</li>
                <li><strong>Palo Santo:</strong> Zuivert en brengt positieve energie</li>
                <li><strong>Seleniet:</strong> Leg je stenen op een seleniet plaatje</li>
                <li><strong>Klankschaal:</strong> Laat de trillingen door de stenen gaan</li>
                <li><strong>Stromend water:</strong> Spoel onder koud water (niet voor alle stenen geschikt)</li>
              </ul>
              <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Oplaadmethoden
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <li><strong>Zonlicht:</strong> 2-3 uur in de ochtendzon (ideaal voor citrien en tijgeroog)</li>
                <li><strong>Maanlicht:</strong> Leg ze tijdens volle maan buiten (voor alle stenen)</li>
                <li><strong>Aarde:</strong> Begraaf ze 24 uur in de grond voor diepe reiniging</li>
                <li><strong>Bergkristal cluster:</strong> Leg je stenen erop voor oplading</li>
              </ul>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <strong>Intentie Spreken:</strong> Na het reinigen en opladen, houd je stenen vast en spreek een krachtige intentie uit:
                <em> "Ik open mij voor overvloed, voorspoed en financiële vrijheid. Geld stroomt moeiteloos naar mij toe."</em>
              </p>
              <p className="text-base text-gray-700 font-[family-name:var(--font-eb-garamond)] mb-4">
                <strong>Tip:</strong> Reinig je geldstenen minimaal 1x per maand, of vaker als je intensief met ze werkt.
              </p>
            </section>

            {/* Praktische Tips */}
            <section>
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
                Praktische Tips voor Maximale Manifestatie
              </h2>
              <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Plaatsing in Huis
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <li>Linkerboven hoek (welvaarthoek volgens Feng Shui)</li>
                <li>Op je bureau of werkplek</li>
                <li>In je portemonnee of geldlade</li>
                <li>Bij de voordeur voor nieuwe kansen</li>
              </ul>
              <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Dagelijkse Routine
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <li>Ochtend: Houd je stenen vast + affirmaties</li>
                <li>Overdag: Draag als sieraad of in je zak</li>
                <li>Avond: Mediteer met je geldstenen</li>
                <li>Visualiseer overvloed voor het slapen</li>
              </ul>
              <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Manifestatie Technieken
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <li>Schrijf financiële doelen op en leg een steen erop</li>
                <li>Maak een vision board met je stenen</li>
                <li>Gebruik de 369-methode met geldstenen</li>
                <li>Houd een dankbaarheidsjournal voor overvloed</li>
              </ul>
              <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Zakelijke Toepassingen
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <li>Leg stenen bij belangrijke contracten</li>
                <li>Draag tijdens onderhandelingen</li>
                <li>Plaats in je winkel of kantoor</li>
                <li>Geef als zakelijk cadeau</li>
              </ul>
            </section>

            {/* Conclusie */}
            <section>
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
                Conclusie
              </h2>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                Edelstenen voor geld en overvloed zijn krachtige hulpmiddelen bij het <strong>aantrekken van rijkdom</strong>,
                <strong>financieel succes</strong> en <strong>nieuwe kansen</strong>. Door bewust met hun energie te werken —
                via meditatie, visualisatie en dagelijks gebruik — versterk je jouw manifestatiekracht en creëer je
                een positieve, overvloedige relatie met geld.
              </p>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                Of je nu kiest voor <strong>citrien</strong>, <strong>pyriet</strong>, <strong>groene aventurijn</strong>,
                <strong>tijgeroog</strong> of een combinatie van meerdere stenen — het belangrijkste is dat je
                met <em>intentie</em>, <em>vertrouwen</em> en <em>dankbaarheid</em> werkt. De energie volgt jouw focus.
              </p>
            </section>

            {/* CTA Section */}
            <section className="border-t border-gray-200 pt-8 mt-8">
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)]">
                Ontdek Edelstenen voor Geld en Overvloed bij StonesForHealth
              </h2>
              <p className="text-base text-gray-800 mb-6 font-[family-name:var(--font-eb-garamond)]">
                Bij <strong>StonesForHealth.nl</strong> vind je een ruime collectie van authentieke citrien armbanden,
                pyriet stenen, groene aventurijn hangers, tijgeroog sieraden en complete edelsteen sets voor
                geld en overvloed. Alle stenen zijn ethisch gewonnen en van de hoogste kwaliteit.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <Link
                  href="/alle-producten"
                  className="inline-block bg-[#8B7355] hover:bg-[#6D5A42] text-white px-8 py-3 text-center transition-colors font-medium font-[family-name:var(--font-eb-garamond)]"
                >
                  Shop Alle Edelstenen
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
                  <Link href="/blog/citrien-amethist-zon-maan-edelstenen" className="text-[#8B7355] hover:underline">
                    Citrien & Amethist: Zon en Maan
                  </Link>
                </li>
                <li>
                  <Link href="/blog/bergkristal-koning-kristallen" className="text-[#8B7355] hover:underline">
                    Bergkristal: De Koning der Kristallen
                  </Link>
                </li>
                <li>
                  <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#8B7355] hover:underline">
                    Complete Chakra Kristallen Gids
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
