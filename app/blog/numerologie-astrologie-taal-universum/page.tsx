import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumbs from '@/app/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Numerologie & Astrologie – De Taal van het Universum | StonesForHealth',
  description: 'Ontdek hoe numerologie en astrologie samen je levensdoel onthullen. Van Pythagoras tot Vedische wijsheid - leer de taal van het universum en jouw zielsmissie.',
  keywords: [
    'numerologie',
    'astrologie',
    'pythagoreïsche numerologie',
    'vedische astrologie',
    'chinese astrologie',
    'levenspadnummer',
    'geboortehoroscoop',
    'kabbalistische numerologie',
    'chaldeeuwse numerologie',
    'jyotish',
    'spirituele ontwikkeling',
    'edelstenen numerologie',
  ],
  openGraph: {
    title: 'Numerologie & Astrologie – De Taal van het Universum | StonesForHealth',
    description: 'Ontdek hoe numerologie en astrologie samen je levensdoel onthullen. Van Pythagoras tot Vedische wijsheid - leer de taal van het universum en jouw zielsmissie.',
    type: 'article',
    publishedTime: '2025-10-20',
  },
  alternates: {
    canonical: 'https://stonesforhealth.nl/blog/numerologie-astrologie-taal-universum',
  },
};

export default function NumerologieAstrologie() {
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Numerologie & Astrologie – De Taal van het Universum",
    "description": "Ontdek hoe numerologie en astrologie samen je levensdoel onthullen. Een complete gids over verschillende systemen en hun samenhang met edelstenen.",
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
            { name: 'Numerologie & Astrologie', url: 'https://stonesforhealth.nl/blog/numerologie-astrologie-taal-universum' }
          ]}
        />

        <header className="mb-8 pb-6 border-b border-gray-200">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)]">
            Numerologie & Astrologie – De Taal van het Universum
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <time dateTime="2025-10-20">20 oktober 2025</time>
            <span>•</span>
            <span>11 min leestijd</span>
          </div>
        </header>

        {/* Blog Image */}
        <div className="relative w-full h-64 sm:h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src="/blog-images/Numerologie & Astrologie – De Taal van het Universum.jpeg"
            alt="Numerologie & Astrologie – De Taal van het Universum"
            fill
            className="object-cover"
            priority
          />
        </div>

        <section className="mb-8">
          <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
            Sinds mensenheugenis kijken we naar de sterren en zoeken we naar patronen in getallen. Numerologie en astrologie zijn twee eeuwenoude wijsheidstradities die ons helpen begrijpen wie we zijn, waarom we hier zijn en welke weg we moeten bewandelen.
          </p>
          <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
            Deze systemen zijn niet slechts bijgeloof of toeval - ze zijn de taal van het universum. Door numerologie en astrologie te combineren, krijg je een compleet beeld van je innerlijke blauwdruk en je kosmische timing. En wanneer je dit versterkt met de kracht van edelstenen, ontstaat er een krachtige synergie voor spirituele groei.
          </p>
        </section>

        <div className="space-y-8">
          <section id="numerologie">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              Wat is Numerologie?
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Numerologie is de leer van getallen en hun energetische betekenis. Het is gebaseerd op het principe dat elk getal een unieke vibratie draagt die invloed heeft op jouw karakter, gedrag, talenten en zielenpad. Door je geboortedatum en naam te analyseren, kun je diepgaande inzichten krijgen over je levensbestemming.
            </p>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              De meest belangrijke getallen in numerologie zijn:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li><strong>Levenspadnummer:</strong> Je kernbestemming en grootste levenslessen</li>
              <li><strong>Uitdrukkingsgetal:</strong> Je natuurlijke talenten en gaven</li>
              <li><strong>Zielenverlangensgetal:</strong> Wat je innerlijk nastreeft</li>
              <li><strong>Persoonlijkheidsgetal:</strong> Hoe de buitenwereld je ziet</li>
              <li><strong>Geboortedaggetal:</strong> Specifieke vaardigheden en kwaliteiten</li>
            </ul>
          </section>

          <section id="soorten-numerologie">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              Soorten Numerologie
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Er bestaan verschillende vormen van numerologie, elk met zijn eigen focus en rekenmethode. Hier zijn de belangrijkste systemen:
            </p>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Pythagoreïsche (Westerse) Numerologie
            </h3>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              De bekendste vorm in het Westen, gebaseerd op de leer van de Griekse filosoof en wiskundige Pythagoras (6e eeuw v.Chr.). Hij geloofde dat "alles getal is" en dat de werkelijkheid kan worden begrepen door numerieke patronen. Dit systeem gebruikt de getallen 1 tot 9, plus de meestergetallen 11, 22 en 33.
            </p>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Kabbalistische Numerologie
            </h3>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Afkomstig uit de Joodse mystieke traditie van de Kabbala. Dit systeem is vooral gericht op de naam (niet de geboortedatum) en onderzoekt zielsdoelen en spirituele ontwikkeling. Het gebruikt het Hebreeuwse alfabet en de Boom des Levens als basis.
            </p>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Chaldeeuwse Numerologie
            </h3>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              De oudste vorm van numerologie, afkomstig uit het oude Babylonië (Chaldea). Dit systeem legt meer nadruk op de trillingsenergie van getallen en gebruikt cijfers 1 tot 8 (9 wordt als heilig beschouwd). Het wordt gezien als accurater voor naam-analyse en wordt vaak gebruikt voor bescherming en geluk.
            </p>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Chinese Numerologie
            </h3>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Gebaseerd op feng shui principes en de uitspraak van getallen in het Chinees. Sommige getallen worden als geluksgetal beschouwd (8 = voorspoed, 6 = geluk), terwijl andere als ongeluk worden gezien (4 klinkt als "dood"). Dit systeem wordt veel gebruikt bij het kiezen van telefoonnummers, huisnummers en belangrijke data.
            </p>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Tantrische of Vedische Numerologie
            </h3>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Afkomstig uit India, gekoppeld aan het chakrasysteem en karma. Dit systeem werkt nauw samen met Vedische astrologie en gebruikt planeetinvloeden om getallen te interpreteren. Elke planeet heeft een overeenkomstig getal (Zon = 1, Maan = 2, Jupiter = 3, etc.).
            </p>
          </section>

          <section id="astrologie">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              Wat is Astrologie?
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Astrologie onderzoekt de invloed van planeten, sterren en kosmische energieën op het menselijk leven. Je geboortehoroscoop - een momentopname van de hemel op het moment van je geboorte - laat zien wie je bent, welke energieën je pad beïnvloeden en welke cyclussen zich in je leven ontvouwen.
            </p>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Waar numerologie je innerlijke blauwdruk onthult, laat astrologie zien <em>wanneer</em> en <em>hoe</em> bepaalde energieën actief worden. Het geeft timing, context en richting aan je levenslessen.
            </p>
          </section>

          <section id="westerse-astrologie">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              Westerse Astrologie
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              De Westerse astrologie is gebaseerd op de 12 dierenriemtekens (Ram, Stier, Tweelingen, Kreeft, Leeuw, Maagd, Weegschaal, Schorpioen, Boogschutter, Steenbok, Waterman, Vissen). Deze tekens worden bepaald door de positie van de zon ten opzichte van de aarde op het moment van je geboorte.
            </p>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              De Grote Drie
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li><strong>Zonneteken:</strong> Je kernidentiteit en ego (meest bekend)</li>
              <li><strong>Maanteken:</strong> Je emoties, innerlijke wereld en behoeften</li>
              <li><strong>Ascendant (Rijzend teken):</strong> Hoe je overkomt op anderen, je masker</li>
            </ul>

            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Daarnaast speelt de positie van Mercurius (communicatie), Venus (liefde), Mars (actie), Jupiter (groei), Saturnus (discipline) en andere planeten een belangrijke rol in je persoonlijkheid en levenslessen.
            </p>
          </section>

          <section id="chinese-astrologie">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              Chinese Astrologie
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              De Chinese astrologie is gebaseerd op het maanjaar en de 12 dierentekens (Rat, Os, Tijger, Konijn, Draak, Slang, Paard, Geit, Aap, Haan, Hond, Varken). Elk jaar wordt ook beïnvloed door een van de vijf elementen (Hout, Vuur, Aarde, Metaal, Water), wat een cyclus van 60 jaar creëert.
            </p>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Chinese astrologie richt zich meer op het begrijpen van je karakter, compatibiliteit met anderen en het voorspellen van gunstige tijden voor belangrijke beslissingen. Het wordt vaak gecombineerd met feng shui om harmonie en voorspoed te creëren.
            </p>

            <p className="mb-4">
              <Link
                href="/blog/edelstenen-chinees-sterrenbeeld-gelukssteen"
                className="text-[#8B7355] hover:underline font-medium font-[family-name:var(--font-eb-garamond)]"
              >
                Lees meer over Edelstenen per Chinees Sterrenbeeld →
              </Link>
            </p>
          </section>

          <section id="vedische-astrologie">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              Vedische Astrologie (Jyotish)
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Vedische astrologie, ook wel Jyotish genoemd (wat "licht" betekent in het Sanskriet), is een oud Indiaas systeem dat meer dan 5000 jaar oud is. In tegenstelling tot de Westerse astrologie, die werkt met de tropische dierenriem, gebruikt Jyotish de siderische dierenriem - gebaseerd op de werkelijke sterrenhemel.
            </p>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Belangrijkste Kenmerken
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li><strong>Karma en dharma:</strong> Focus op levenslessen en spirituele ontwikkeling</li>
              <li><strong>Nakshatras:</strong> 27 maanhuizen die diepere inzichten geven</li>
              <li><strong>Dasha systeem:</strong> Voorspellende cyclussen gebaseerd op planeetperiodes</li>
              <li><strong>Edelstenen therapie:</strong> Het voorschrijven van specifieke edelstenen om planetaire invloeden te balanceren</li>
            </ul>

            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Vedische astrologen gebruiken edelstenen als remedie om zwakke of moeilijke planetaire invloeden te versterken of te verzachten. Elke planeet correspondeert met een specifieke edelsteen die zijn energie draagt.
            </p>
          </section>

          <section id="samen">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              Numerologie en Astrologie Samen
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Numerologie en astrologie zijn twee kanten van dezelfde medaille - de kosmische code die je leven vormgeeft. Waar ze elk afzonderlijk krachtig zijn, creëren ze samen een compleet beeld van je spirituele blauwdrink.
            </p>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Hoe Ze Elkaar Aanvullen
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li><strong>Numerologie</strong> geeft inzicht in je innerlijke blauwdruk - wat je meebrengt, je kernkwaliteiten en je zielsmissie</li>
              <li><strong>Astrologie</strong> laat zien wanneer en hoe deze energieën actief worden - de timing, cyclussen en externe invloeden</li>
              <li><strong>Samen</strong> vormen ze een complete gids voor zelfontwikkeling, bewustwording en het navigeren van je levenspad</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Praktisch Voorbeeld
            </h3>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Stel je hebt <strong>Levenspad 7</strong> (de spirituele zoeker) en bent geboren als <strong>Vissen</strong> (intuïtief, mystiek). Deze combinatie versterkt je natuurlijke aanleg voor spiritualiteit, meditatie en innerlijke wijsheid. Je Vedische horoscoop toont misschien een sterke Neptunus (planeet van illusie en transcendentie), wat deze energie verder benadrukt.
            </p>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Door deze systemen te combineren, begrijp je niet alleen <em>dat</em> je spiritueel gericht bent, maar ook <em>hoe</em> dit zich manifesteert, <em>wanneer</em> belangrijke spirituele doorbraken kunnen plaatsvinden en <em>welke</em> edelstenen (zoals Amethist voor Levenspad 7) je kunnen ondersteunen.
            </p>
          </section>

          <section id="edelstenen-numerologie">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              Edelstenen en Numerologie
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Edelstenen dragen hun eigen unieke trilling, net als getallen. Door de juiste steen te kiezen op basis van je numerologische profiel, kun je je natuurlijke energie versterken, uitdagingen verzachten en meer in harmonie komen met je levenspad.
            </p>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Edelstenen per Levenspadnummer
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li><strong>Levenspad 1:</strong> Granaat, Robijn - voor leiderschap en moed</li>
              <li><strong>Levenspad 2:</strong> Rozenkwarts, Maansteen - voor gevoeligheid en harmonie</li>
              <li><strong>Levenspad 3:</strong> Citrien, Gele Topaas - voor creativiteit en expressie</li>
              <li><strong>Levenspad 4:</strong> Jade, Groene Aventurijn - voor stabiliteit en gronding</li>
              <li><strong>Levenspad 5:</strong> Turkoois, Aquamarijn - voor vrijheid en avontuur</li>
              <li><strong>Levenspad 6:</strong> Smaragd, Rozenkwarts - voor liefde en zorg</li>
              <li><strong>Levenspad 7:</strong> Amethist, Lapis Lazuli - voor spiritualiteit en wijsheid</li>
              <li><strong>Levenspad 8:</strong> Pyriet, Tijgeroog - voor macht en overvloed</li>
              <li><strong>Levenspad 9:</strong> Rhodoniet, Bloedsteen - voor universele liefde en dienstverlening</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Meestergetallen
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li><strong>Levenspad 11:</strong> Seleniet, Labradoriet - voor intuïtie en spirituele gaven</li>
              <li><strong>Levenspad 22:</strong> Lapis Lazuli, Granaat - voor meesterschap en manifestatie</li>
              <li><strong>Levenspad 33:</strong> Ametrien, Regenboog Obsidiaan - voor universeel meesterschap</li>
            </ul>

            <p className="mb-4">
              <Link
                href="/blog/edelstenen-per-levenspad-spirituele-gidssteen"
                className="text-[#8B7355] hover:underline font-medium font-[family-name:var(--font-eb-garamond)]"
              >
                Lees meer over Edelstenen per Levenspad →
              </Link>
            </p>
          </section>

          <section id="edelstenen-astrologie">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              Edelstenen en Astrologie
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              In de Vedische astrologie speelt edelstenentherapie een centrale rol. Elke planeet correspondeert met een specifieke edelsteen die zijn energie draagt en kan balanceren.
            </p>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Planeet-Edelsteen Correspondentie
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li><strong>Zon:</strong> Robijn - voor vitaliteit en zelfvertrouwen</li>
              <li><strong>Maan:</strong> Parel, Maansteen - voor emoties en intuïtie</li>
              <li><strong>Mars:</strong> Rode Koraal - voor energie en moed</li>
              <li><strong>Mercurius:</strong> Smaragd - voor communicatie en intelligentie</li>
              <li><strong>Jupiter:</strong> Gele Saffier - voor wijsheid en groei</li>
              <li><strong>Venus:</strong> Diamant, Rozenkwarts - voor liefde en schoonheid</li>
              <li><strong>Saturnus:</strong> Blauwe Saffier - voor discipline en structuur</li>
              <li><strong>Rahu:</strong> Hessoniet Granaat - voor transformatie</li>
              <li><strong>Ketu:</strong> Cat's Eye - voor spirituele bevrijding</li>
            </ul>

            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <strong>Belangrijk:</strong> In de Vedische traditie worden edelstenen voorgeschreven door een gekwalificeerde astroloog na grondige analyse van je geboortehoroscoop. De timing en manier van dragen zijn ook belangrijk voor optimale effectiviteit.
            </p>
          </section>

          <section id="toepassen">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              Hoe Je Deze Kennis Toepast
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              De combinatie van numerologie, astrologie en edelstenen biedt een krachtig gereedschap voor zelfontwikkeling en spirituele groei. Hier is hoe je kunt beginnen:
            </p>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Stap 1: Ken Je Getallen
            </h3>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Bereken je levenspadnummer, uitdrukkingsgetal en andere belangrijke numerologische getallen. Dit geeft je inzicht in je kernkwaliteiten en levensmissie.
            </p>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Stap 2: Begrijp Je Sterren
            </h3>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Leer je zonneteken, maanteken en ascendant kennen. Overweeg een volledige geboortehoroscoop analyse voor diepere inzichten in je planetaire invloeden en timing.
            </p>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Stap 3: Kies Je Stenen
            </h3>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Selecteer edelstenen die resoneren met je levenspadnummer en astrologische configuratie. Begin met één of twee stenen en observeer hoe je je voelt wanneer je ze draagt of bij je hebt.
            </p>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Stap 4: Integreer in Je Dagelijks Leven
            </h3>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Draag je stenen als sieraad, plaats ze op je altaar of mediteer ermee. Gebruik je numerologische en astrologische kennis om bewuste keuzes te maken over timing, richting en persoonlijke groei.
            </p>
          </section>

          <section id="conclusie">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              Conclusie
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Numerologie en astrologie zijn geen superstities of vage voorspellingen - ze zijn diepgaande systemen van zelfkennis en kosmisch begrip. Ze helpen je begrijpen wie je bent, waarom je hier bent en wat je levenspad is.
            </p>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Door deze oude wijsheidstradities te combineren met de kracht van edelstenen, creëer je een krachtige synergie. De kristallen versterken je natuurlijke energie, helpen je uitdagingen te overwinnen en ondersteunen je op je reis naar meer bewustzijn, harmonie en spirituele groei.
            </p>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Of je nu werkt met Pythagoreïsche numerologie, Vedische astrologie of Chinese wijsheid - de taal van het universum spreekt door getallen, sterren en stenen. Luister naar deze oude taal en ontdek de magie van je eigen kosmische code.
            </p>
          </section>
        </div>

        <section className="border-t border-gray-200 pt-8 mt-8">
          <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)]">
            Ontdek Jouw Spirituele Profiel bij StonesForHealth
          </h2>
          <p className="text-base text-gray-800 mb-6 font-[family-name:var(--font-eb-garamond)]">
            Bij <strong>StonesForHealth.nl</strong> vind je edelstenen, chakra-sets en sieraden afgestemd op jouw numerologie en astrologie. Of je nu zoekt naar een steen voor je levenspadnummer, je sterrenbeeld of je planetaire invloeden - ontdek jouw unieke trilling en leef vanuit je ware essentie.
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
              <Link href="/blog/edelstenen-per-levenspad-spirituele-gidssteen" className="text-[#8B7355] hover:underline">
                Edelstenen per Levenspad – Ontdek Jouw Spirituele Gidssteen
              </Link>
            </li>
            <li>
              <Link href="/blog/edelstenen-chinees-sterrenbeeld-gelukssteen" className="text-[#8B7355] hover:underline">
                Edelstenen per Chinees Sterrenbeeld – Ontdek Jouw Gelukssteen
              </Link>
            </li>
            <li>
              <Link href="/blog/edelstenen-per-sterrenbeeld-numerologie" className="text-[#8B7355] hover:underline">
                Edelstenen per Sterrenbeeld en Numerologie
              </Link>
            </li>
            <li>
              <Link href="/blog/chakras-uitgelegd-energiesysteem" className="text-[#8B7355] hover:underline">
                Chakra's Uitgelegd: Zo Werkt het Energiesysteem van je Lichaam
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
