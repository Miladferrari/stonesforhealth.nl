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

      <article className="min-h-screen bg-gradient-to-b from-[#F5F1E8] to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* Breadcrumbs */}
          <Breadcrumbs
            customItems={[
              { name: 'Home', url: '/' },
              { name: 'Blog', url: '/blog' },
              { name: 'Edelstenen voor Geld en Overvloed', url: '' }
            ]}
          />

          {/* Header */}
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)]">
              Edelstenen om Geld, Rijkdom en Overvloed aan te Trekken
            </h1>
            <p className="text-xl text-gray-600 font-[family-name:var(--font-eb-garamond)]">
              Manifesteer welvaart en financieel succes met de kracht van kristallen
            </p>
            <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-500">
              <time dateTime="2025-10-20">20 oktober 2025</time>
              <span>•</span>
              <span>8 min leestijd</span>
            </div>
          </header>

          {/* Hero Image */}
          <div className="relative w-full h-[400px] mb-12 rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/logo.webp"
              alt="Edelstenen voor geld en overvloed - citrien, pyriet en groene aventurijn"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Introductie */}
          <section className="prose prose-lg max-w-none mb-12">
            <p className="text-lg leading-relaxed text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              Wil je meer welvaart, financieel succes en overvloed in je leven aantrekken? Edelstenen kunnen krachtige
              hulpmiddelen zijn bij het manifesteren van rijkdom en het versterken van je intenties. In deze uitgebreide
              gids ontdek je welke kristallen het meest effectief zijn voor geld en overvloed, en hoe je ermee kunt werken.
            </p>
          </section>

          {/* Content Sections */}
          <div className="space-y-16">

            {/* De Spirituele Wet van Aantrekking */}
            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-3xl font-bold text-[#2D2D2D] mb-6 font-[family-name:var(--font-eb-garamond)]">
                De Spirituele Wet van Aantrekking en Edelstenen
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed font-[family-name:var(--font-eb-garamond)]">
                  De <strong>wet van aantrekking</strong> stelt dat je aantrekt wat je uitstraalt. Je gedachten, emoties
                  en energie bepalen wat je in je leven manifesteert. Edelstenen werken als <strong>energetische versterkers</strong> die
                  jouw trilling verhogen en je helpen in een staat van overvloed te komen.
                </p>
                <p className="text-gray-700 leading-relaxed font-[family-name:var(--font-eb-garamond)] mt-4">
                  Wanneer je met de juiste intentie met edelstenen werkt, versterk je niet alleen je financiële situatie,
                  maar ook je <strong>zelfvertrouwen</strong>, <strong>daadkracht</strong> en vermogen om kansen te herkennen.
                  De stenen helpen je om beperkende overtuigingen over geld los te laten en een positieve relatie met welvaart te creëren.
                </p>
                <div className="bg-[#F5F1E8] border-l-4 border-[#8B7355] p-6 my-6 rounded-r-lg">
                  <p className="text-[#2D2D2D] font-medium italic font-[family-name:var(--font-eb-garamond)]">
                    💡 <strong>Tip:</strong> Combineer het werken met edelstenen met visualisatie en affirma ties voor
                    maximaal effect. Stel je voor hoe overvloed al in je leven aanwezig is.
                  </p>
                </div>
              </div>
            </section>

            {/* Citrien */}
            <section className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-8 shadow-lg border border-yellow-200">
              <h2 className="text-3xl font-bold text-[#2D2D2D] mb-6 font-[family-name:var(--font-eb-garamond)]">
                🌟 Citrien – De Steen van Rijkdom en Succes
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed font-[family-name:var(--font-eb-garamond)]">
                  <strong>Citrien</strong> is dé klassieker onder de geldstenen en wordt niet voor niets de
                  "koopmanssteen" genoemd. Deze zonnige gele steen symboliseert <strong>welvaart</strong>, <strong>positiviteit</strong> en
                  <strong>manifestatiekracht</strong>. Zijn warme, energetische trilling trekt overvloed aan als een magneet.
                </p>
                <h3 className="text-xl font-bold text-[#2D2D2D] mt-6 mb-3 font-[family-name:var(--font-eb-garamond)]">
                  Werking van Citrien:
                </h3>
                <ul className="space-y-2 text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                  <li>✨ Trekt geld, welvaart en kansen aan</li>
                  <li>✨ Verhoogt zelfvertrouwen en motivatie</li>
                  <li>✨ Laat beperkende geldovertuigingen los</li>
                  <li>✨ Stimuleert creativiteit en ondernemerschap</li>
                  <li>✨ Werkt op het zonnevlechtchakra (persoonlijke kracht)</li>
                </ul>
                <div className="bg-white p-6 rounded-lg mt-6 border-2 border-yellow-300">
                  <p className="text-[#2D2D2D] font-medium font-[family-name:var(--font-eb-garamond)]">
                    💰 <strong>Hoe te gebruiken:</strong> Leg een citrien in je portemonnee, geldlade of op je werkplek.
                    Houd de steen tijdens meditatie vast en visualiseer financieel succes.
                  </p>
                </div>
                <div className="mt-6">
                  <Link
                    href="/alle-producten?search=citrien"
                    className="inline-block bg-[#8B7355] hover:bg-[#6D5A42] text-white px-8 py-3 rounded-full transition-colors font-medium font-[family-name:var(--font-eb-garamond)]"
                  >
                    Ontdek Citrien Sieraden →
                  </Link>
                </div>
              </div>
            </section>

            {/* Groene Aventurijn */}
            <section className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 shadow-lg border border-green-200">
              <h2 className="text-3xl font-bold text-[#2D2D2D] mb-6 font-[family-name:var(--font-eb-garamond)]">
                🍀 Groene Aventurijn – Gelukssteen voor Financiële Groei
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed font-[family-name:var(--font-eb-garamond)]">
                  <strong>Groene aventurijn</strong> wordt ook wel de <em>"steen van het geluk en succes"</em> genoemd.
                  Deze prachtige groene steen helpt je om nieuwe kansen te zien en moedigt aan om actie te ondernemen.
                  Ideaal voor ondernemers, carrièremensen en iedereen die groei zoekt.
                </p>
                <h3 className="text-xl font-bold text-[#2D2D2D] mt-6 mb-3 font-[family-name:var(--font-eb-garamond)]">
                  Werking van Groene Aventurijn:
                </h3>
                <ul className="space-y-2 text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                  <li>🌱 Trekt geluk en nieuwe kansen aan</li>
                  <li>🌱 Stimuleert optimisme en vooruitgang</li>
                  <li>🌱 Versterkt doorzettingsvermogen</li>
                  <li>🌱 Brengt rust bij financiële beslissingen</li>
                  <li>🌱 Werkt op het hartchakra (emotioneel evenwicht)</li>
                </ul>
                <div className="bg-white p-6 rounded-lg mt-6 border-2 border-green-300">
                  <p className="text-[#2D2D2D] font-medium font-[family-name:var(--font-eb-garamond)]">
                    🎯 <strong>Perfect voor:</strong> Sollicitaties, nieuwe projecten, zakelijke deals en het aantrekken
                    van geluksmomentjes in je financiële leven.
                  </p>
                </div>
                <div className="mt-6">
                  <Link
                    href="/alle-producten?search=aventurijn"
                    className="inline-block bg-[#8B7355] hover:bg-[#6D5A42] text-white px-8 py-3 rounded-full transition-colors font-medium font-[family-name:var(--font-eb-garamond)]"
                  >
                    Bekijk Groene Aventurijn →
                  </Link>
                </div>
              </div>
            </section>

            {/* Pyriet */}
            <section className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-8 shadow-lg border border-amber-200">
              <h2 className="text-3xl font-bold text-[#2D2D2D] mb-6 font-[family-name:var(--font-eb-garamond)]">
                ✨ Pyriet – De Steen van Goud en Manifestatie
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed font-[family-name:var(--font-eb-garamond)]">
                  <strong>Pyriet</strong>, ook wel "dwaalgoud" genoemd, is een krachtige beschermsteen en gelukssteen
                  die rijkdom aantrekt. Zijn goudkleurige metallic glans doet denken aan muntgeld en symboliseert
                  <strong>overvloed</strong> en <strong>welvaart</strong>. Pyriet stimuleert zelfvertrouwen, wilskracht en daadkracht.
                </p>
                <h3 className="text-xl font-bold text-[#2D2D2D] mt-6 mb-3 font-[family-name:var(--font-eb-garamond)]">
                  Werking van Pyriet:
                </h3>
                <ul className="space-y-2 text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                  <li>💎 Trekt rijkdom en materieel succes aan</li>
                  <li>💎 Versterkt wilskracht en doorzettingsvermogen</li>
                  <li>💎 Beschermt tegen financieel verlies</li>
                  <li>💎 Stimuleert logisch denken en strategie</li>
                  <li>💎 Boost zelfvertrouwen en leiderschap</li>
                </ul>
                <div className="bg-white p-6 rounded-lg mt-6 border-2 border-amber-300">
                  <p className="text-[#2D2D2D] font-medium font-[family-name:var(--font-eb-garamond)]">
                    ⚡ <strong>Manifestatie tip:</strong> Schrijf je financiële doelen op en leg een pyriet erop.
                    Lees je intenties dagelijks hardop voor om de manifestatie te versterken.
                  </p>
                </div>
                <div className="mt-6">
                  <Link
                    href="/alle-producten?search=pyriet"
                    className="inline-block bg-[#8B7355] hover:bg-[#6D5A42] text-white px-8 py-3 rounded-full transition-colors font-medium font-[family-name:var(--font-eb-garamond)]"
                  >
                    Shop Pyriet Stenen →
                  </Link>
                </div>
              </div>
            </section>

            {/* Tijgeroog */}
            <section className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 shadow-lg border border-orange-200">
              <h2 className="text-3xl font-bold text-[#2D2D2D] mb-6 font-[family-name:var(--font-eb-garamond)]">
                🐅 Tijgeroog – Voor Focus en Succes
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed font-[family-name:var(--font-eb-garamond)]">
                  <strong>Tijgeroog</strong> is een krachtige aardende steen die helpt bij het behouden van
                  <strong>focus</strong> en <strong>discipline</strong> — eigenschappen die onmisbaar zijn voor financieel succes.
                  Deze gouden-bruine steen met zijn kenmerkende glans brengt moed, balans en bescherming bij belangrijke
                  beslissingen over geld.
                </p>
                <h3 className="text-xl font-bold text-[#2D2D2D] mt-6 mb-3 font-[family-name:var(--font-eb-garamond)]">
                  Werking van Tijgeroog:
                </h3>
                <ul className="space-y-2 text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                  <li>🎯 Versterkt focus en concentratie</li>
                  <li>🎯 Brengt moed en zelfvertrouwen</li>
                  <li>🎯 Beschermt tegen financiële risico's</li>
                  <li>🎯 Helpt bij het nemen van weloverwogen beslissingen</li>
                  <li>🎯 Grounding energie bij stress</li>
                </ul>
                <div className="bg-white p-6 rounded-lg mt-6 border-2 border-orange-300">
                  <p className="text-[#2D2D2D] font-medium font-[family-name:var(--font-eb-garamond)]">
                    🛡️ <strong>Zakelijk gebruik:</strong> Draag tijgeroog tijdens belangrijke vergaderingen,
                    onderhandelingen of presentaties voor extra zelfvertrouwen en helderheid.
                  </p>
                </div>
                <div className="mt-6">
                  <Link
                    href="/alle-producten?search=tijgeroog"
                    className="inline-block bg-[#8B7355] hover:bg-[#6D5A42] text-white px-8 py-3 rounded-full transition-colors font-medium font-[family-name:var(--font-eb-garamond)]"
                  >
                    Ontdek Tijgeroog Sieraden →
                  </Link>
                </div>
              </div>
            </section>

            {/* Bergkristal */}
            <section className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-8 shadow-lg border border-gray-200">
              <h2 className="text-3xl font-bold text-[#2D2D2D] mb-6 font-[family-name:var(--font-eb-garamond)]">
                💎 Bergkristal – De Universele Versterker
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed font-[family-name:var(--font-eb-garamond)]">
                  <strong>Bergkristal</strong> is de ultieme versterker van energie en intenties. Deze heldere, pure steen
                  versterkt de werking van andere edelstenen. Als je hem combineert met geldstenen zoals pyriet of citrien,
                  verhoogt hij hun trilling en manifestatiekracht exponentieel.
                </p>
                <h3 className="text-xl font-bold text-[#2D2D2D] mt-6 mb-3 font-[family-name:var(--font-eb-garamond)]">
                  Werking van Bergkristal:
                </h3>
                <ul className="space-y-2 text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                  <li>⚪ Versterkt alle andere edelstenen</li>
                  <li>⚪ Brengt helderheid over financiële doelen</li>
                  <li>⚪ Zuivert negatieve gedachten over geld</li>
                  <li>⚪ Verhoogt je manifestatiekracht</li>
                  <li>⚪ Werkt op alle chakra's</li>
                </ul>
                <div className="bg-white p-6 rounded-lg mt-6 border-2 border-gray-300">
                  <p className="text-[#2D2D2D] font-medium font-[family-name:var(--font-eb-garamond)]">
                    🔮 <strong>Combinatie tip:</strong> Leg bergkristal in het midden van een cirkel van geldstenen
                    om een krachtige manifestatie grid te creëren.
                  </p>
                </div>
                <div className="mt-6">
                  <Link
                    href="/alle-producten?search=bergkristal"
                    className="inline-block bg-[#8B7355] hover:bg-[#6D5A42] text-white px-8 py-3 rounded-full transition-colors font-medium font-[family-name:var(--font-eb-garamond)]"
                  >
                    Shop Bergkristal →
                  </Link>
                </div>
              </div>
            </section>

            {/* Edelstenen Set */}
            <section className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-lg border border-purple-200">
              <h2 className="text-3xl font-bold text-[#2D2D2D] mb-6 font-[family-name:var(--font-eb-garamond)]">
                🎁 Edelstenen Set voor Geld, Rijkdom en Overvloed
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed font-[family-name:var(--font-eb-garamond)]">
                  Voor maximale manifestatiekracht kun je een krachtige combinatie maken van de volgende stenen:
                </p>
                <div className="bg-white rounded-xl p-6 my-6 border-2 border-purple-300">
                  <h3 className="text-xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)]">
                    De Ultieme Geld & Overvloed Set:
                  </h3>
                  <ul className="space-y-3 text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                    <li>✅ <strong>Citrien</strong> – Voor welvaart en succes</li>
                    <li>✅ <strong>Pyriet</strong> – Voor rijkdom en manifestatie</li>
                    <li>✅ <strong>Groene Aventurijn</strong> – Voor geluk en kansen</li>
                    <li>✅ <strong>Tijgeroog</strong> – Voor focus en daadkracht</li>
                    <li>✅ <strong>Bergkristal</strong> – Voor versterking van alle energie</li>
                  </ul>
                </div>
                <h3 className="text-xl font-bold text-[#2D2D2D] mt-6 mb-3 font-[family-name:var(--font-eb-garamond)]">
                  Hoe te gebruiken:
                </h3>
                <ol className="space-y-3 text-gray-700 font-[family-name:var(--font-eb-garamond)] list-decimal list-inside">
                  <li>Leg de stenen samen in een glazen schaaltje op je werkplek of bureau</li>
                  <li>Creëer een manifestatie grid in de vorm van een cirkel of pentagram</li>
                  <li>Draag ze in een zakje in je tas of zak</li>
                  <li>Mediteer dagelijks met de stenen en visualiseer overvloed</li>
                  <li>Spreek affirm aties uit zoals: <em>"Ik trek moeiteloos overvloed aan"</em></li>
                </ol>
                <div className="mt-8">
                  <Link
                    href="/alle-producten"
                    className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full transition-colors font-medium font-[family-name:var(--font-eb-garamond)] shadow-lg"
                  >
                    Bekijk Alle Edelstenen Sets →
                  </Link>
                </div>
              </div>
            </section>

            {/* Reiniging en Opladen */}
            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-3xl font-bold text-[#2D2D2D] mb-6 font-[family-name:var(--font-eb-garamond)]">
                🌙 Reiniging en Opladen van Geldstenen
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed font-[family-name:var(--font-eb-garamond)]">
                  Edelstenen nemen energie op uit hun omgeving en moeten regelmatig worden gereinigd en opgeladen
                  om optimaal te blijven werken. Dit is extra belangrijk voor geldstenen, omdat ze veel energie
                  verbruiken bij manifestatie.
                </p>
                <h3 className="text-xl font-bold text-[#2D2D2D] mt-6 mb-3 font-[family-name:var(--font-eb-garamond)]">
                  Reinigingsmethoden:
                </h3>
                <ul className="space-y-3 text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                  <li>🪶 <strong>Witte Salie (Smudging):</strong> Beweeg de rook over je stenen</li>
                  <li>🌿 <strong>Palo Santo:</strong> Zuivert en brengt positieve energie</li>
                  <li>✨ <strong>Seleniet:</strong> Leg je stenen op een seleniet plaatje</li>
                  <li>💨 <strong>Klankschaal:</strong> Laat de trillingen door de stenen gaan</li>
                  <li>💧 <strong>Stromend water:</strong> Spooel onder koud water (niet voor alle stenen geschikt)</li>
                </ul>
                <h3 className="text-xl font-bold text-[#2D2D2D] mt-6 mb-3 font-[family-name:var(--font-eb-garamond)]">
                  Oplaadmethoden:
                </h3>
                <ul className="space-y-3 text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                  <li>☀️ <strong>Zonlicht:</strong> 2-3 uur in de ochtendzon (ideaal voor citrien en tijgeroog)</li>
                  <li>🌕 <strong>Maanlicht:</strong> Leg ze tijdens volle maan buiten (voor alle stenen)</li>
                  <li>🌍 <strong>Aarde:</strong> Begraaf ze 24 uur in de grond voor diepe reiniging</li>
                  <li>🔮 <strong>Bergkristal cluster:</strong> Leg je stenen erop voor oplading</li>
                </ul>
                <div className="bg-[#F5F1E8] border-l-4 border-[#8B7355] p-6 my-6 rounded-r-lg">
                  <h4 className="font-bold text-[#2D2D2D] mb-2 font-[family-name:var(--font-eb-garamond)]">
                    Intentie Spreken:
                  </h4>
                  <p className="text-[#2D2D2D] font-[family-name:var(--font-eb-garamond)] italic">
                    Na het reinigen en opladen, houd je stenen vast en spreek een krachtige intentie uit:
                  </p>
                  <p className="text-[#2D2D2D] font-bold mt-3 font-[family-name:var(--font-eb-garamond)]">
                    "Ik open mij voor overvloed, voorspoed en financiële vrijheid. Geld stroomt moeiteloos naar mij toe."
                  </p>
                </div>
                <p className="text-sm text-gray-600 mt-6 font-[family-name:var(--font-eb-garamond)]">
                  💡 <strong>Tip:</strong> Reinig je geldstenen minimaal 1x per maand, of vaker als je intensief met ze werkt.
                </p>
              </div>
            </section>

            {/* Praktische Tips */}
            <section className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 shadow-lg border border-blue-200">
              <h2 className="text-3xl font-bold text-[#2D2D2D] mb-6 font-[family-name:var(--font-eb-garamond)]">
                💡 Praktische Tips voor Maximale Manifestatie
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-6 border border-blue-200">
                  <h3 className="font-bold text-lg text-[#2D2D2D] mb-3 font-[family-name:var(--font-eb-garamond)]">
                    📍 Plaatsing in Huis
                  </h3>
                  <ul className="space-y-2 text-gray-700 text-sm font-[family-name:var(--font-eb-garamond)]">
                    <li>• Linkerboven hoek (welvaarthoek volgens Feng Shui)</li>
                    <li>• Op je bureau of werkplek</li>
                    <li>• In je portemonnee of geldlade</li>
                    <li>• Bij de voordeur voor nieuwe kansen</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-6 border border-blue-200">
                  <h3 className="font-bold text-lg text-[#2D2D2D] mb-3 font-[family-name:var(--font-eb-garamond)]">
                    🧘 Dagelijkse Routine
                  </h3>
                  <ul className="space-y-2 text-gray-700 text-sm font-[family-name:var(--font-eb-garamond)]">
                    <li>• Ochtend: Houd je stenen vast + affirmaties</li>
                    <li>• Overdag: Draag als sieraad of in je zak</li>
                    <li>• Avond: Mediteer met je geldstenen</li>
                    <li>• Visualiseer overvloed voor het slapen</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-6 border border-blue-200">
                  <h3 className="font-bold text-lg text-[#2D2D2D] mb-3 font-[family-name:var(--font-eb-garamond)]">
                    ✍️ Manifestatie Technieken
                  </h3>
                  <ul className="space-y-2 text-gray-700 text-sm font-[family-name:var(--font-eb-garamond)]">
                    <li>• Schrijf financiële doelen op + leg steen erop</li>
                    <li>• Maak een vision board met je stenen</li>
                    <li>• 369-methode met geldstenen</li>
                    <li>• Dankbaarheidsjournal voor overvloed</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-6 border border-blue-200">
                  <h3 className="font-bold text-lg text-[#2D2D2D] mb-3 font-[family-name:var(--font-eb-garamond)]">
                    🎯 Zakelijke Toepassingen
                  </h3>
                  <ul className="space-y-2 text-gray-700 text-sm font-[family-name:var(--font-eb-garamond)]">
                    <li>• Leg stenen bij belangrijke contracten</li>
                    <li>• Draag tijdens onderhandelingen</li>
                    <li>• Plaats in je winkel of kantoor</li>
                    <li>• Geef als zakelijk cadeau</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Conclusie */}
            <section className="bg-gradient-to-br from-[#492c4a] to-[#3b223b] text-white rounded-2xl p-8 shadow-2xl">
              <h2 className="text-3xl font-bold mb-6 font-[family-name:var(--font-eb-garamond)]">
                ✨ Conclusie: Manifesteer Jouw Welvaart
              </h2>
              <div className="prose prose-lg max-w-none prose-invert">
                <p className="text-white leading-relaxed font-[family-name:var(--font-eb-garamond)]">
                  Edelstenen voor geld en overvloed zijn krachtige hulpmiddelen bij het <strong>aantrekken van rijkdom</strong>,
                  <strong>financieel succes</strong> en <strong>nieuwe kansen</strong>. Door bewust met hun energie te werken —
                  via meditatie, visualisatie en dagelijks gebruik — versterk je jouw manifestatiekracht en creëer je
                  een positieve, overvloedige relatie met geld.
                </p>
                <p className="text-white leading-relaxed font-[family-name:var(--font-eb-garamond)] mt-4">
                  Of je nu kiest voor <strong>citrien</strong>, <strong>pyriet</strong>, <strong>groene aventurijn</strong>,
                  <strong>tijgeroog</strong> of een combinatie van meerdere stenen — het belangrijkste is dat je
                  met <em>intentie</em>, <em>vertrouwen</em> en <em>dankbaarheid</em> werkt. De energie volgt jouw focus.
                </p>
                <div className="mt-8 text-center">
                  <p className="text-2xl font-bold mb-4 font-[family-name:var(--font-eb-garamond)]">
                    🌟 Jouw overvloed begint vandaag! 🌟
                  </p>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-[#F5F1E8] to-[#E8DCC6] rounded-2xl p-8 shadow-lg text-center border-2 border-[#8B7355]">
              <h2 className="text-3xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)]">
                Ontdek Edelstenen voor Geld en Overvloed bij StonesForHealth
              </h2>
              <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto font-[family-name:var(--font-eb-garamond)]">
                Bij <strong>StonesForHealth.nl</strong> vind je een ruime collectie van authentieke citrien armbanden,
                pyriet stenen, groene aventurijn hangers, tijgeroog sieraden en complete edelsteen sets voor
                geld en overvloed. Alle stenen zijn ethisch gewonnen en van de hoogste kwaliteit.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/alle-producten"
                  className="inline-block bg-[#492c4a] hover:bg-[#3b223b] text-white px-10 py-4 rounded-full transition-colors font-bold text-lg font-[family-name:var(--font-eb-garamond)] shadow-xl"
                >
                  Shop Alle Edelstenen
                </Link>
                <Link
                  href="/bestsellers"
                  className="inline-block bg-white hover:bg-gray-50 text-[#492c4a] border-2 border-[#492c4a] px-10 py-4 rounded-full transition-colors font-bold text-lg font-[family-name:var(--font-eb-garamond)] shadow-lg"
                >
                  Bekijk Bestsellers
                </Link>
              </div>
              <p className="text-sm text-gray-600 mt-6 font-[family-name:var(--font-eb-garamond)]">
                ✨ Gratis verzending vanaf €50 | 30 dagen retourrecht | 100% authentiek
              </p>
            </section>

            {/* Gerelateerde Artikelen */}
            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-6 font-[family-name:var(--font-eb-garamond)]">
                📚 Gerelateerde Artikelen
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Link
                  href="/blog/citrien-amethist-zon-maan-edelstenen"
                  className="block p-4 rounded-lg border border-gray-200 hover:border-[#8B7355] hover:shadow-md transition-all"
                >
                  <h3 className="font-bold text-[#2D2D2D] mb-2 font-[family-name:var(--font-eb-garamond)]">
                    Citrien & Amethist: Zon en Maan
                  </h3>
                  <p className="text-sm text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    Ontdek de kracht van deze complementaire stenen
                  </p>
                </Link>
                <Link
                  href="/blog/bergkristal-koning-kristallen"
                  className="block p-4 rounded-lg border border-gray-200 hover:border-[#8B7355] hover:shadow-md transition-all"
                >
                  <h3 className="font-bold text-[#2D2D2D] mb-2 font-[family-name:var(--font-eb-garamond)]">
                    Bergkristal: De Koning der Kristallen
                  </h3>
                  <p className="text-sm text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    Alles over de universele versterker
                  </p>
                </Link>
                <Link
                  href="/blog/chakra-kristallen-complete-gids"
                  className="block p-4 rounded-lg border border-gray-200 hover:border-[#8B7355] hover:shadow-md transition-all"
                >
                  <h3 className="font-bold text-[#2D2D2D] mb-2 font-[family-name:var(--font-eb-garamond)]">
                    Complete Chakra Kristallen Gids
                  </h3>
                  <p className="text-sm text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    Balanceer je energiecentra met kristallen
                  </p>
                </Link>
              </div>
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
