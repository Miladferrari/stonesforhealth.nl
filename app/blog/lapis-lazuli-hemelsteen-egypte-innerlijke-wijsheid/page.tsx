import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/app/components/JsonLd';
import Breadcrumbs from '@/app/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Lapis Lazuli – De Hemelsteen van het Oude Egypte en Innerlijke Wijsheid | StonesForHealth',
  description: 'Ontdek de kracht van Lapis Lazuli: van de tempels van het oude Egypte tot moderne spiritualiteit. Leer alles over de werking, chakra\'s, symboliek en gebruik van deze mystieke steen van wijsheid en waarheid.',
  keywords: [
    'lapis lazuli betekenis',
    'lapis lazuli werking',
    'lapis lazuli egypte',
    'lapis lazuli chakra',
    'derde oog chakra',
    'keelchakra steen',
    'lapis lazuli eigenschappen',
    'wijsheid edelsteen',
    'lapis lazuli meditatie',
    'spirituele stenen',
    'lapis lazuli kopen',
    'hemelsteen egypte',
  ],
  openGraph: {
    title: 'Lapis Lazuli – De Hemelsteen van het Oude Egypte en Innerlijke Wijsheid',
    description: 'Ontdek de kracht van Lapis Lazuli: van de tempels van het oude Egypte tot moderne spiritualiteit. De steen van wijsheid, waarheid en innerlijke rust.',
    type: 'article',
    publishedTime: '2025-10-20',
  },
  alternates: {
    canonical: 'https://stonesforhealth.nl/blog/lapis-lazuli-hemelsteen-egypte-innerlijke-wijsheid',
  }
};

const blogPostingSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Lapis Lazuli – De Hemelsteen van het Oude Egypte en Innerlijke Wijsheid",
  "description": "Ontdek de kracht van Lapis Lazuli: van de tempels van het oude Egypte tot moderne spiritualiteit. Leer alles over de werking, chakra's, symboliek en gebruik van deze mystieke steen.",
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
              { name: 'Home', url: '/' },
              { name: 'Blog', url: '/blog' },
              { name: 'Lapis Lazuli – De Hemelsteen', url: '' }
            ]}
          />

          {/* Header */}
          <header className="mb-8 pb-6 border-b border-gray-200">
            <h1 className="text-4xl md:text-5xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)]">
              Lapis Lazuli – De Hemelsteen van het Oude Egypte en Innerlijke Wijsheid
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <time dateTime="2025-10-20">20 oktober 2025</time>
              <span>•</span>
              <span>7 min leestijd</span>
            </div>
          </header>

          {/* Introductie */}
          <section className="mb-8">
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Lapis Lazuli is een van de meest mystieke en gewaardeerde edelstenen uit de geschiedenis. Van de tempels van het oude Egypte tot hedendaagse spiritualiteit – deze diepe blauwe steen met gouden spikkels blijft fascineren door zijn krachtige energie en symbolische betekenis. Ontdek de werking, geschiedenis en spirituele kracht van deze hemelsteen.
            </p>
          </section>

          {/* Inhoudsopgave */}
          <section className="mb-8 pb-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)]">
              Inhoudsopgave
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)]">
              <li><a href="#egypte" className="text-[#8B7355] hover:underline">Lapis Lazuli in het Oude Egypte</a></li>
              <li><a href="#spiritueel" className="text-[#8B7355] hover:underline">De Spirituele Betekenis van Lapis Lazuli</a></li>
              <li><a href="#werking" className="text-[#8B7355] hover:underline">De Helende Werking van Lapis Lazuli</a></li>
              <li><a href="#chakras" className="text-[#8B7355] hover:underline">Lapis Lazuli en Chakra's</a></li>
              <li><a href="#gebruik" className="text-[#8B7355] hover:underline">Gebruikstips voor Lapis Lazuli</a></li>
              <li><a href="#reiniging" className="text-[#8B7355] hover:underline">Reiniging en Opladen</a></li>
              <li><a href="#symboliek" className="text-[#8B7355] hover:underline">Symboliek in Oude Culturen</a></li>
              <li><a href="#conclusie" className="text-[#8B7355] hover:underline">Conclusie</a></li>
            </ol>
          </section>

          {/* Content Sections */}
          <div className="space-y-8">

            {/* Lapis Lazuli in het Oude Egypte */}
            <section id="egypte">
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
                Lapis Lazuli in het Oude Egypte
              </h2>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                In het oude Egypte was Lapis Lazuli een van de meest gewaardeerde stenen. De steen werd ingevoerd uit Afghanistan via lange handelsroutes en stond symbool voor wijsheid, bescherming en de stem van de hemel. De farao's droegen Lapis Lazuli als teken van goddelijke macht en Toetanchamon liet de steen verwerken in zijn dodenmasker.
              </p>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                Priesters gebruikten gemalen Lapis Lazuli in rituelen om contact te maken met de goden. De intense blauwe kleur werd gezien als een afspiegeling van de nachtelijke hemel en symboliseerde de oneindige kosmos en goddelijke wijsheid.
              </p>
            </section>

            {/* De Spirituele Betekenis */}
            <section id="spiritueel">
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
                De Spirituele Betekenis van Lapis Lazuli
              </h2>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                Lapis Lazuli wordt de <strong>steen van wijsheid en waarheid</strong> genoemd. Hij helpt bij het openen van het derde oog chakra en het keelchakra, bevordert zelfexpressie, intuïtie en innerlijke kracht. De steen verbindt je met je hogere bewustzijn en helpt je om je waarheid te spreken.
              </p>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <strong>Kleur:</strong> Diepblauw met gouden pyriet spikkels<br />
                <strong>Chakra:</strong> Keelchakra & Derde Oog<br />
                <strong>Element:</strong> Water<br />
                <strong>Vindplaatsen:</strong> Afghanistan, Chili, Rusland, Myanmar
              </p>
            </section>

            {/* De Helende Werking */}
            <section id="werking">
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
                De Helende Werking van Lapis Lazuli
              </h2>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                Lapis Lazuli heeft een veelzijdige helende werking op zowel lichamelijk, emotioneel als spiritueel vlak:
              </p>
              <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Fysieke werking
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <li>Ondersteunt het keelgebied en stembanden</li>
                <li>Helpt bij hoofdpijn en migraine</li>
                <li>Vermindert stress en spanning</li>
                <li>Bevordert een gezonde bloeddruk</li>
              </ul>
              <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Emotionele en spirituele werking
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <li>Brengt emotionele rust en innerlijke vrede</li>
                <li>Bevordert eerlijkheid en zelfbewustzijn</li>
                <li>Helpt oude emotionele pijn los te laten</li>
                <li>Vergroot helderziendheid en bewustwording</li>
                <li>Stimuleert creativiteit en zelfexpressie</li>
              </ul>
            </section>

            {/* Lapis Lazuli en Chakra's */}
            <section id="chakras">
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
                Lapis Lazuli en Chakra's
              </h2>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                De steen werkt vooral op twee belangrijke chakra's:
              </p>
              <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Keelchakra (Vishuddha)
              </h3>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                Lapis Lazuli activeert het keelchakra en bevordert eerlijke communicatie, zelfexpressie en de moed om je waarheid te spreken. Wanneer dit chakra in balans is, ervaar je meer zelfvertrouwen in sociale situaties.
              </p>
              <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Derde Oog Chakra (Ajna)
              </h3>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                Door het derde oog chakra te openen, vergroot Lapis Lazuli je intuïtie, inzicht en spirituele bewustzijn. Je ervaart meer helderheid in gedachten en hebt toegang tot je innerlijke wijsheid.
              </p>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                Wanneer deze chakra's in balans zijn, ervaar je rust, helderheid en zelfvertrouwen. Lees meer over chakra's in onze <Link href="/blog/chakras-uitgelegd-energiesysteem" className="text-[#8B7355] hover:underline">complete chakra gids</Link>.
              </p>
            </section>

            {/* Gebruikstips */}
            <section id="gebruik">
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
                Gebruikstips voor Lapis Lazuli
              </h2>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                Er zijn verschillende manieren om Lapis Lazuli in je dagelijkse leven te integreren:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <li><strong>Dragen als sieraad:</strong> Draag Lapis Lazuli als hanger of armband om communicatie en zelfexpressie te versterken</li>
                <li><strong>Tijdens meditatie:</strong> Plaats de steen op je voorhoofd om je derde oog chakra te activeren en intuïtie te versterken</li>
                <li><strong>Bij je bed:</strong> Leg hem op je nachtkastje om spirituele dromen en inzichten te stimuleren</li>
                <li><strong>Op je werkplek:</strong> Plaats hem op je bureau voor verhoogde focus, inzicht en creativiteit</li>
                <li><strong>Voor communicatie:</strong> Houd de steen vast tijdens belangrijke gesprekken om helderheid en zelfvertrouwen te vinden</li>
              </ul>
              <p className="mb-4">
                <Link
                  href="/alle-producten?search=lapis"
                  className="text-[#8B7355] hover:underline font-medium font-[family-name:var(--font-eb-garamond)]"
                >
                  Bekijk Lapis Lazuli sieraden →
                </Link>
              </p>
            </section>

            {/* Reiniging en Opladen */}
            <section id="reiniging">
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
                Reiniging en Opladen van Lapis Lazuli
              </h2>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <strong>Belangrijk:</strong> Reinig Lapis Lazuli <strong>niet met water</strong>, omdat de steen poreus is en kan verkleuren of beschadigen.
              </p>
              <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Reinigingsmethoden
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <li><strong>Witte Salie (Smudging):</strong> Beweeg de rook van witte salie over de steen</li>
                <li><strong>Palo Santo:</strong> Zuivert en brengt positieve energie</li>
                <li><strong>Seleniet:</strong> Leg de steen op een seleniet plaatje voor energetische reiniging</li>
                <li><strong>Klankschaal:</strong> Laat de trillingen van een klankschaal door de steen gaan</li>
              </ul>
              <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
                Oplaadmethoden
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <li><strong>Maanlicht:</strong> Leg de steen tijdens volle maan buiten of bij het raam (ideaal voor Lapis Lazuli)</li>
                <li><strong>Amethist cluster:</strong> Plaats de steen op een amethist cluster voor oplading</li>
                <li><strong>Bergkristal:</strong> Leg hem tussen bergkristallen voor energetische versterking</li>
              </ul>
              <p className="text-base text-gray-700 font-[family-name:var(--font-eb-garamond)] mb-4">
                <strong>Tip:</strong> Reinig en laad je Lapis Lazuli minimaal 1x per maand op, of vaker als je intensief met de steen werkt.
              </p>
            </section>

            {/* Symboliek in Oude Culturen */}
            <section id="symboliek">
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
                Symboliek van Lapis Lazuli in Oude Culturen
              </h2>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                Door de geschiedenis heen heeft Lapis Lazuli een bijzondere plaats ingenomen in verschillende culturen:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                <li><strong>Egypte:</strong> Symbool voor hemel, goddelijkheid en de stem van de goden. Gebruikt in sieraden, amuletten en het dodenmasker van Toetanchamon</li>
                <li><strong>Mesopotamië:</strong> Bescherming tegen boze geesten en ziekte. Gedragen door koningen en priesters</li>
                <li><strong>Boeddhisme:</strong> Steen van verlichting en innerlijke vrede. Gebruikt in meditatie en spirituele praktijken</li>
                <li><strong>Europa (Middeleeuwen & Renaissance):</strong> Gemalen tot ultramarijnpigment voor heilige kunst en iconen. Het blauw symboliseerde de hemel en goddelijke wijsheid</li>
                <li><strong>Sumerië:</strong> Geofferd aan godin Inanna als teken van eerbied en devotie</li>
              </ul>
            </section>

            {/* Conclusie */}
            <section id="conclusie">
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
                Conclusie
              </h2>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                Lapis Lazuli is een poort naar wijsheid, intuïtie en innerlijke rust. Van de tempels van Egypte tot hedendaagse spiritualiteit – deze steen blijft een symbool van waarheid en inzicht. Door zijn krachtige werking op het keelchakra en derde oog chakra helpt Lapis Lazuli je om je authentieke zelf te zijn, je waarheid te spreken en je innerlijke wijsheid te ontdekken.
              </p>
              <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
                Of je hem draagt als sieraad, gebruikt tijdens meditatie of simpelweg bij je hebt voor spirituele ondersteuning – Lapis Lazuli brengt helderheid, rust en verbinding met je hogere bewustzijn.
              </p>
            </section>

            {/* CTA Section */}
            <section className="border-t border-gray-200 pt-8 mt-8">
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)]">
                Ontdek Lapis Lazuli bij StonesForHealth
              </h2>
              <p className="text-base text-gray-800 mb-6 font-[family-name:var(--font-eb-garamond)]">
                Bij <strong>StonesForHealth.nl</strong> vind je een uitgebreide collectie Lapis Lazuli armbanden, hangers, ruwe stenen en chakra-sets. Onze stenen worden met zorg geselecteerd om jou te ondersteunen in spirituele groei en innerlijke kracht.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <Link
                  href="/alle-producten?search=lapis"
                  className="inline-block bg-[#8B7355] hover:bg-[#6D5A42] text-white px-8 py-3 text-center transition-colors font-medium font-[family-name:var(--font-eb-garamond)]"
                >
                  Bekijk Lapis Lazuli Collectie
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
                  <Link href="/blog/chakras-uitgelegd-energiesysteem" className="text-[#8B7355] hover:underline">
                    Chakra's Uitgelegd: Energiesysteem van je Lichaam
                  </Link>
                </li>
                <li>
                  <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#8B7355] hover:underline">
                    Complete Chakra Kristallen Gids
                  </Link>
                </li>
                <li>
                  <Link href="/blog/edelstenen-opladen-maanlicht" className="text-[#8B7355] hover:underline">
                    Edelstenen Opladen met Maanlicht
                  </Link>
                </li>
                <li>
                  <Link href="/blog/bergkristal-koning-kristallen" className="text-[#8B7355] hover:underline">
                    Bergkristal: De Koning onder de Kristallen
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
