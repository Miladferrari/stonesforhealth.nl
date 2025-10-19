import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/app/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Edelstenen per Chinees Sterrenbeeld – Ontdek Jouw Gelukssteen | StonesForHealth',
  description: 'Ontdek welke edelstenen perfect passen bij jouw Chinese dierenriemteken. Van Rat tot Varken - elke steen versterkt jouw unieke energie en brengt geluk.',
  keywords: [
    'chinese astrologie',
    'chinese dierenriem',
    'edelstenen per sterrenbeeld',
    'chinese sterrenbeelden',
    'gelukssteen',
    'chinese horoscoop',
    'dierenriemtekens',
    'jaar van de rat',
    'jaar van de draak',
    'chinese elementen',
    'amuletten geluk',
    'sterrenbeeld stenen',
  ],
  openGraph: {
    title: 'Edelstenen per Chinees Sterrenbeeld – Ontdek Jouw Gelukssteen | StonesForHealth',
    description: 'Ontdek welke edelstenen perfect passen bij jouw Chinese dierenriemteken. Van Rat tot Varken - elke steen versterkt jouw unieke energie en brengt geluk.',
    type: 'article',
    publishedTime: '2025-10-20',
  },
  alternates: {
    canonical: 'https://stonesforhealth.nl/blog/edelstenen-chinees-sterrenbeeld-gelukssteen',
  },
};

export default function EdelstenenChineeseSterrenbeeld() {
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Edelstenen per Chinees Sterrenbeeld – Ontdek Jouw Energie & Gelukssteen",
    "description": "Ontdek welke edelstenen perfect passen bij jouw Chinese dierenriemteken. Van Rat tot Varken - elk teken heeft unieke edelstenen die geluk, kracht en harmonie brengen.",
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
            { name: 'Edelstenen per Chinees Sterrenbeeld', url: 'https://stonesforhealth.nl/blog/edelstenen-chinees-sterrenbeeld-gelukssteen' }
          ]}
        />

        <header className="mb-8 pb-6 border-b border-gray-200">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)]">
            Edelstenen per Chinees Sterrenbeeld – Ontdek Jouw Energie & Gelukssteen
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <time dateTime="2025-10-20">20 oktober 2025</time>
            <span>•</span>
            <span>10 min leestijd</span>
          </div>
        </header>

        <section className="mb-8">
          <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
            De Chinese astrologie biedt een diepgaand inzicht in je persoonlijkheid, krachten en uitdagingen op basis van je geboortejaar. Elk van de twaalf dierenriemtekens heeft unieke eigenschappen en een eigen energieveld. Edelstenen kunnen deze energie versterken, balanceren en geluk aantrekken.
          </p>
          <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
            In deze gids ontdek je welke edelstenen perfect passen bij jouw Chinese sterrenbeeld, hoe de vijf elementen invloed hebben en hoe je deze geluksstenen kunt gebruiken om harmonie en voorspoed aan te trekken.
          </p>
        </section>

        <div className="space-y-8">
          <section id="chinese-astrologie">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              Over de Chinese Astrologie
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              In de Chinese astrologie vertegenwoordigt elk geboortejaar een van de twaalf dierenriemtekens in een cyclus die zich elke 12 jaar herhaalt. Elk teken heeft unieke eigenschappen, krachten en uitdagingen. Daarnaast wordt elk jaar ook beïnvloed door een van de vijf elementen (Hout, Vuur, Aarde, Metaal, Water), wat een extra laag van betekenis toevoegt.
            </p>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Edelstenen kunnen helpen om deze energieën in balans te brengen, je natuurlijke krachten te versterken en uitdagingen te verzachten. Door de juiste steen te dragen of bij je te hebben, kun je geluk aantrekken en je levenspad met meer harmonie bewandelen.
            </p>
          </section>

          <section id="rat">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              Rat (1948, 1960, 1972, 1984, 1996, 2008, 2020)
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <strong>Eigenschappen:</strong> Intelligent, charmant, ambitieus, vindingrijk en sociaal. De Rat is snel van geest en heeft een natuurlijk talent voor strategie en communicatie.
            </p>
            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Aanbevolen Edelstenen
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li><strong>Amethist:</strong> Verhoogt intuïtie en helpt bij heldere beslissingen</li>
              <li><strong>Citrien:</strong> Trekt overvloed en succes aan, versterkt ambitie</li>
              <li><strong>Bergkristal:</strong> Zuivert energie en brengt mentale helderheid</li>
            </ul>
          </section>

          <section id="os">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              Os (1949, 1961, 1973, 1985, 1997, 2009, 2021)
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <strong>Eigenschappen:</strong> Geduldig, betrouwbaar, sterk, hardwerkend en methodisch. De Os is een rots in de branding, stabiel en vastberaden.
            </p>
            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Aanbevolen Edelstenen
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li><strong>Rode Jaspis:</strong> Versterkt doorzettingsvermogen en aarding</li>
              <li><strong>Hematiet:</strong> Biedt gronding en bescherming, houdt je gefocust</li>
              <li><strong>Groene Aventurijn:</strong> Brengt balans en emotionele rust</li>
            </ul>
          </section>

          <section id="tijger">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              Tijger (1950, 1962, 1974, 1986, 1998, 2010, 2022)
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <strong>Eigenschappen:</strong> Moedig, avontuurlijk, competitief, energiek en leiderschap. De Tijger is een natuurlijke aanvoerder die niet bang is voor uitdagingen.
            </p>
            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Aanbevolen Edelstenen
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li><strong>Tijgeroog:</strong> Versterkt moed en beschermt tegen negativiteit</li>
              <li><strong>Onyx:</strong> Biedt kracht en stabiliteit in turbulente tijden</li>
              <li><strong>Carneool:</strong> Stimuleert creativiteit en actie</li>
            </ul>
          </section>

          <section id="konijn">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              Konijn (1951, 1963, 1975, 1987, 1999, 2011, 2023)
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <strong>Eigenschappen:</strong> Gevoelig, vriendelijk, elegant, intuïtief en diplomaat. Het Konijn is zachtzinnig en waardeert harmonie en schoonheid.
            </p>
            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Aanbevolen Edelstenen
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li><strong>Rozenkwarts:</strong> Opent het hart voor liefde en compassie</li>
              <li><strong>Maansteen:</strong> Versterkt intuïtie en emotionele balans</li>
              <li><strong>Rhodoniet:</strong> Helpt bij emotionele genezing en zelfliefde</li>
            </ul>
          </section>

          <section id="draak">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              Draak (1952, 1964, 1976, 1988, 2000, 2012, 2024)
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <strong>Eigenschappen:</strong> Krachtig, charismatisch, ambitieus, zelfverzekerd en visionaire leider. De Draak straalt autoriteit en succes uit.
            </p>
            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Aanbevolen Edelstenen
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li><strong>Lapis Lazuli:</strong> Versterkt wijsheid en spirituele kracht</li>
              <li><strong>Pyriet:</strong> Trekt rijkdom en succes aan</li>
              <li><strong>Obsidiaan:</strong> Biedt bescherming en helpt bij loslaten van ego</li>
            </ul>
          </section>

          <section id="slang">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              Slang (1953, 1965, 1977, 1989, 2001, 2013, 2025)
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <strong>Eigenschappen:</strong> Wijs, mystiek, intuïtief, charmant en filosofisch. De Slang heeft een diepgaande spirituele verbinding en zoekt naar waarheid.
            </p>
            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Aanbevolen Edelstenen
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li><strong>Malachiet:</strong> Ondersteunt transformatie en beschermt</li>
              <li><strong>Amethist:</strong> Verdiept spirituele verbinding en intuïtie</li>
              <li><strong>Turkoois:</strong> Brengt wijsheid en spirituele communicatie</li>
            </ul>
          </section>

          <section id="paard">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              Paard (1954, 1966, 1978, 1990, 2002, 2014, 2026)
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <strong>Eigenschappen:</strong> Energiek, onafhankelijk, enthousiast, vrij en optimistisch. Het Paard houdt van beweging, avontuur en vrijheid.
            </p>
            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Aanbevolen Edelstenen
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li><strong>Amazoniet:</strong> Brengt emotionele balans en kalmte</li>
              <li><strong>Sodaliet:</strong> Helpt bij rationele beslissingen en communicatie</li>
              <li><strong>Granaat:</strong> Geeft energie en passie voor het leven</li>
            </ul>
          </section>

          <section id="geit">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              Geit (1955, 1967, 1979, 1991, 2003, 2015, 2027)
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <strong>Eigenschappen:</strong> Creatief, gevoelig, artistiek, zorgzaam en harmonieus. De Geit waardeert schoonheid, kunst en emotionele verbinding.
            </p>
            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Aanbevolen Edelstenen
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li><strong>Rozenkwarts:</strong> Opent het hart voor liefde en zelfacceptatie</li>
              <li><strong>Prehniet:</strong> Brengt innerlijke vrede en harmonie</li>
              <li><strong>Smaragd:</strong> Versterkt creativiteit en diepe liefde</li>
            </ul>
          </section>

          <section id="aap">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              Aap (1956, 1968, 1980, 1992, 2004, 2016, 2028)
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <strong>Eigenschappen:</strong> Slim, vindingrijk, speels, nieuwsgierig en flexibel. De Aap is een probleemoplosser met een scherpe geest en humor.
            </p>
            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Aanbevolen Edelstenen
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li><strong>Citrien:</strong> Stimuleert creativiteit en succes</li>
              <li><strong>Fluoriet:</strong> Verhoogt focus en mentale helderheid</li>
              <li><strong>Tijgeroog:</strong> Helpt bij het nemen van slimme beslissingen</li>
            </ul>
          </section>

          <section id="haan">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              Haan (1957, 1969, 1981, 1993, 2005, 2017, 2029)
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <strong>Eigenschappen:</strong> Eerlijk, perfectionistisch, hardwerkend, trots en punctueel. De Haan heeft hoge standaarden en streeft naar excellentie.
            </p>
            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Aanbevolen Edelstenen
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li><strong>Sodaliet:</strong> Brengt logica en emotionele balans</li>
              <li><strong>Hematiet:</strong> Grondt en houdt je gefocust op doelen</li>
              <li><strong>Amethist:</strong> Helpt bij loslaten van perfectionisme</li>
            </ul>
          </section>

          <section id="hond">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              Hond (1958, 1970, 1982, 1994, 2006, 2018, 2030)
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <strong>Eigenschappen:</strong> Loyaal, trouw, eerlijk, beschermend en rechtschapen. De Hond is betrouwbaar en heeft een sterk rechtvaardigheidsgevoel.
            </p>
            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Aanbevolen Edelstenen
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li><strong>Zwarte Toermalijn:</strong> Biedt krachtige bescherming tegen negativiteit</li>
              <li><strong>Rhodoniet:</strong> Ondersteunt emotionele genezing en compassie</li>
              <li><strong>Groene Aventurijn:</strong> Brengt rust en vertrouwen</li>
            </ul>
          </section>

          <section id="varken">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              Varken (1959, 1971, 1983, 1995, 2007, 2019, 2031)
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <strong>Eigenschappen:</strong> Vriendelijk, zorgzaam, genereus, oprecht en optimistisch. Het Varken is warm, sociaal en geeft om het welzijn van anderen.
            </p>
            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Aanbevolen Edelstenen
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li><strong>Rozenkwarts:</strong> Versterkt liefde en zelfzorg</li>
              <li><strong>Labradoriet:</strong> Beschermt je energie en versterkt intuïtie</li>
              <li><strong>Kunziet:</strong> Brengt emotionele rust en compassie</li>
            </ul>
          </section>

          <section id="elementen">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              Elementen en Kleuren
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Elk dierenriemteken wordt ook beïnvloed door een van de vijf elementen die in een cyclus van 60 jaar roteren. Je element wordt bepaald door het laatste cijfer van je geboortejaar. Deze elementen hebben elk hun eigen energie en bijbehorende edelsteenkleuren:
            </p>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Hout (eindigend op 4 of 5)
            </h3>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <strong>Eigenschappen:</strong> Groei, creativiteit, flexibiliteit<br/>
              <strong>Kleuren:</strong> Groen<br/>
              <strong>Edelstenen:</strong> Groene Aventurijn, Smaragd, Jade, Malachiet, Prehniet
            </p>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Vuur (eindigend op 6 of 7)
            </h3>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <strong>Eigenschappen:</strong> Passie, energie, transformatie<br/>
              <strong>Kleuren:</strong> Rood, Oranje<br/>
              <strong>Edelstenen:</strong> Granaat, Carneool, Rode Jaspis, Vuuragaat, Robijn
            </p>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Aarde (eindigend op 8 of 9)
            </h3>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <strong>Eigenschappen:</strong> Stabiliteit, betrouwbaarheid, gronding<br/>
              <strong>Kleuren:</strong> Geel, Bruin<br/>
              <strong>Edelstenen:</strong> Citrien, Tijgeroog, Gele Jaspis, Amber, Bruine Agaat
            </p>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Metaal (eindigend op 0 of 1)
            </h3>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <strong>Eigenschappen:</strong> Structuur, discipline, kracht<br/>
              <strong>Kleuren:</strong> Wit, Zilver, Goud<br/>
              <strong>Edelstenen:</strong> Bergkristal, Seleniet, Hematiet, Pyriet, Diamant
            </p>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Water (eindigend op 2 of 3)
            </h3>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <strong>Eigenschappen:</strong> Intuïtie, emotie, aanpassing<br/>
              <strong>Kleuren:</strong> Blauw, Zwart<br/>
              <strong>Edelstenen:</strong> Lapis Lazuli, Aquamarijn, Sodaliet, Maansteen, Obsidiaan
            </p>
          </section>

          <section id="gebruiken">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              Hoe Je Jouw Gelukssteen Gebruikt
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Nu je weet welke edelstenen bij jouw Chinese sterrenbeeld horen, kun je ze op verschillende manieren gebruiken om hun energie te benutten:
            </p>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Als Sieraad Dragen
            </h3>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Draag je gelukssteen als armband, ketting of ring om de hele dag verbonden te blijven met zijn beschermende en versterkende energie. Vooral effectief voor continu geluk en harmonie.
            </p>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Als Amulet of Talisman
            </h3>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Draag een kleine steen in je zak of tas als beschermend amulet. Perfect voor belangrijke momenten zoals sollicitatiegesprekken, presentaties of nieuwe beginnen.
            </p>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              In Je Woon- of Werkruimte
            </h3>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Plaats je geluksstenen op je bureau, nachtkastje of altaar. Dit creëert een harmonieus energieveld en trekt positieve krachten aan in je omgeving.
            </p>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Voor Meditatie en Manifestatie
            </h3>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Houd je steen tijdens meditatie vast of leg hem voor je. Visualiseer je doelen en laat de energie van de steen je intenties versterken.
            </p>
          </section>

          <section id="conclusie">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              Conclusie
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              De Chinese astrologie biedt een rijk en eeuwenoud systeem om je persoonlijke energie te begrijpen en te versterken. Door de juiste edelstenen te kiezen die resoneren met jouw dierenriemteken en element, kun je je natuurlijke krachten versterken, uitdagingen verzachten en meer harmonie en geluk aantrekken.
            </p>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Of je nu geboren bent in het jaar van de wijze Slang, de loyale Hond of de charismatische Draak – elk teken heeft zijn eigen unieke geschenken en elke edelsteen biedt zijn eigen ondersteuning. Gebruik deze oude wijsheid om je levenspad met meer bewustzijn en voorspoed te bewandelen.
            </p>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <strong>Onthoud:</strong> De kracht van edelstenen werkt het beste wanneer je ze kiest met intentie en ze gebruikt met respect voor hun natuurlijke energie.
            </p>
          </section>
        </div>

        <section className="border-t border-gray-200 pt-8 mt-8">
          <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)]">
            Ontdek Jouw Gelukssteen bij StonesForHealth
          </h2>
          <p className="text-base text-gray-800 mb-6 font-[family-name:var(--font-eb-garamond)]">
            Bij <strong>StonesForHealth.nl</strong> vind je edelstenen voor elk Chinees sterrenbeeld, inclusief amuletten, sets en prachtige sieraden. Ontdek jouw persoonlijke gelukssteen en laat de energie van de Chinese astrologie jouw pad verlichten met harmonie, voorspoed en spirituele groei.
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

        <section className="border-t border-gray-200 pt-8 mt-8">
          <h2 className="text-2xl font-bold text-[#2D2D2D] mb-6 font-[family-name:var(--font-eb-garamond)]">
            Zie ook
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)]">
            <li>
              <Link href="/blog/jaar-van-de-houten-slang-2025" className="text-[#8B7355] hover:underline">
                2025: Het Jaar van de Houten Slang
              </Link>
            </li>
            <li>
              <Link href="/blog/jaar-van-het-vuurpaard-2026" className="text-[#8B7355] hover:underline">
                2026: Het Jaar van het Vuurpaard
              </Link>
            </li>
            <li>
              <Link href="/blog/edelstenen-per-sterrenbeeld-numerologie" className="text-[#8B7355] hover:underline">
                Edelstenen per Sterrenbeeld en Numerologie
              </Link>
            </li>
            <li>
              <Link href="/blog/edelstenen-per-levenspad-spirituele-gidssteen" className="text-[#8B7355] hover:underline">
                Edelstenen per Levenspad – Ontdek Jouw Spirituele Gidssteen
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
