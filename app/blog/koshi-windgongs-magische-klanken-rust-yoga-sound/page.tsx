import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumbs from '@/app/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Koshi Windgongs – Magische Klanken voor Rust, Yoga & Sound Healing | StonesForHealth',
  description: 'Ontdek de magische klanken van Koshi Windgongs. Handgemaakte chimes in 4 elementen: Terra, Aqua, Aria en Ignis. Perfect voor meditatie, yoga, sound healing en mindfulness.',
  keywords: [
    'koshi windgong',
    'koshi chimes',
    'windgong kopen',
    'sound healing',
    'meditatie klankschaal',
    'yoga accessoires',
    'koshi terra',
    'koshi aqua',
    'koshi aria',
    'koshi ignis',
    'windgong tuin',
    'klanktherapie',
    'mindfulness instrument',
    'handgemaakte windgong',
  ],
  openGraph: {
    title: 'Koshi Windgongs – Magische Klanken voor Rust, Yoga & Sound Healing',
    description: 'Ontdek de magische klanken van Koshi Windgongs. Handgemaakte chimes in 4 elementen voor meditatie en sound healing.',
    type: 'article',
    publishedTime: '2025-01-02',
  },
  alternates: {
    canonical: 'https://stonesforhealth.nl/blog/koshi-windgongs-magische-klanken-rust-yoga-sound',
  },
};

export default function KoshiWindgongs() {
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Koshi Windgongs – Magische Klanken voor Rust, Yoga & Sound Healing",
    "description": "Ontdek de magische klanken van Koshi Windgongs. Handgemaakte chimes in 4 elementen: Terra, Aqua, Aria en Ignis. Perfect voor meditatie, yoga en sound healing.",
    "image": "https://stonesforhealth.nl/blog-images/Koshi Windgongs – Magische Klanken voor Rust, Yoga & Sound Healing.jpeg",
    "datePublished": "2025-01-02T10:00:00Z",
    "dateModified": "2025-01-02T10:00:00Z",
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
            { name: 'Koshi Windgongs', url: 'https://stonesforhealth.nl/blog/koshi-windgongs-magische-klanken-rust-yoga-sound' }
          ]}
        />

        <header className="mb-8 pb-6 border-b border-gray-200">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)]">
            Koshi Windgongs – Magische Klanken voor Rust, Yoga & Sound Healing
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <time dateTime="2025-01-02">2 januari 2025</time>
            <span>•</span>
            <span>6 min leestijd</span>
          </div>
        </header>

        {/* Blog Image */}
        <div className="relative w-full h-64 sm:h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src="/blog-images/Koshi Windgongs – Magische Klanken voor Rust, Yoga & Sound Healing.jpeg"
            alt="Koshi Windgongs – Magische Klanken voor Rust, Yoga en Sound Healing"
            fill
            className="object-cover"
            priority
          />
        </div>

        <section className="mb-8">
          <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
            <strong>Koshi windgongs</strong> (ook wel Koshi Chimes genoemd) staan wereldwijd bekend om hun zuivere, harmonische klanken. Deze handgemaakte klankinstrumenten zijn gebaseerd op de vier elementen: <strong>Aarde (Terra)</strong>, <strong>Water (Aqua)</strong>, <strong>Lucht (Aria)</strong> en <strong>Vuur (Ignis)</strong>. Elk element heeft zijn eigen unieke resonantie en sfeer.
          </p>
          <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
            Of je nu op zoek bent naar een instrument voor sound healing sessies, een rustgevende toevoeging aan je yogapraktijk, of een prachtige windgong voor je tuin — Koshi chimes brengen harmonie en sereniteit in elke ruimte.
          </p>
        </section>

        <div className="space-y-8">
          <section id="waarom-populair">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              Waarom Koshi Windgongs zo Populair Zijn
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Koshi windgongs hebben een reputatie opgebouwd die zijn weerga niet kent in de wereld van klankinstrumenten. Maar wat maakt ze zo bijzonder?
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li><strong>Handgemaakt vakmanschap:</strong> Elke Koshi wordt met de hand vervaardigd en perfect gestemd voor optimale resonantie</li>
              <li><strong>Langdurige klanken:</strong> De tonen zijn rustgevend en blijven lang nazingen, wat een meditatieve staat bevordert</li>
              <li><strong>Veelzijdig gebruik:</strong> Ideaal voor meditatie, yoga, mindfulness, sound healing en klanktherapie</li>
              <li><strong>Decoratief en functioneel:</strong> Prachtig als windgong in de tuin, op het balkon of in huis</li>
              <li><strong>Vier elementen:</strong> Kies het element dat het beste bij jou en je intentie past</li>
            </ul>
          </section>

          <section id="vier-elementen">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              De 4 Elementen en Hun Klank
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Elke Koshi windgong is afgestemd op één van de vier klassieke elementen. De klanken verschillen subtiel maar merkbaar, en elk element heeft zijn eigen energetische werking.
            </p>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Aqua (Water)
            </h3>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              De <strong>Koshi Aqua</strong> heeft een vloeiende, zachte klank die doet denken aan stromend water en zachte regen. De tonen golven als water over je heen en wassen spanning weg.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li><strong>Energie:</strong> Ontspanning, emotionele heling, stressvermindering</li>
              <li><strong>Chakra:</strong> Heilig been chakra (Svadhisthana)</li>
              <li><strong>Ideaal voor:</strong> Rustmomenten, bad rituelen, slaapmeditatie</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Aria (Lucht)
            </h3>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              De <strong>Koshi Aria</strong> klinkt licht en helder, met een speelse melodie die danst als een briesje. Deze chime brengt frisheid en vernieuwing.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li><strong>Energie:</strong> Helderheid, communicatie, frisse energie</li>
              <li><strong>Chakra:</strong> Hartchakra (Anahata) en keelchakra (Vishuddha)</li>
              <li><strong>Ideaal voor:</strong> Ademwerk, yoga, creatieve sessies</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Terra (Aarde)
            </h3>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              De <strong>Koshi Terra</strong> geeft diepe, warme tonen die stabiliteit en rust ondersteunen. De klank is aards en grondend, als de hartslag van moeder aarde.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li><strong>Energie:</strong> Grounding, stabiliteit, innerlijke balans</li>
              <li><strong>Chakra:</strong> Wortelchakra (Muladhara)</li>
              <li><strong>Ideaal voor:</strong> Grounding meditatie, aarding na intensief werk</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Ignis (Vuur)
            </h3>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              De <strong>Koshi Ignis</strong> brengt een energieke, levendige klank met warmte en passie. Deze chime ontsteekt je innerlijke vuur en versterkt je wilskracht.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li><strong>Energie:</strong> Motivatie, transformatie, kracht</li>
              <li><strong>Chakra:</strong> Zonnevlecht chakra (Manipura)</li>
              <li><strong>Ideaal voor:</strong> Intentie-setting, manifestatie, energieke start van de dag</li>
            </ul>
          </section>

          <section id="gebruik">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              Waar Kun Je Koshi Windgongs Gebruiken?
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Koshi chimes zijn ongelooflijk veelzijdig. Hier zijn de meest populaire toepassingen:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li><strong>In huis:</strong> Voor een kalme, serene sfeer in je woon- of slaapkamer</li>
              <li><strong>Praktijkruimte:</strong> Bij coaching, therapie, massage of reiki sessies</li>
              <li><strong>Yogalessen:</strong> Om de les te openen, sluiten of overgangen te markeren</li>
              <li><strong>Meditatie:</strong> Als focus punt of om een meditatieve staat te induceren</li>
              <li><strong>Sound healing:</strong> In combinatie met klankschalen, gongs en andere instrumenten</li>
              <li><strong>Buiten:</strong> Als windgong in de tuin of op het balkon</li>
              <li><strong>Als cadeau:</strong> Een bijzonder, betekenisvol geschenk voor spirituele zielen</li>
            </ul>
          </section>

          <section id="tips">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              Tips voor Ophangen en Onderhoud
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Om lang van je Koshi windgong te genieten, volg deze praktische tips:
            </p>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Ophangen
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li><strong>Vrije beweging:</strong> Hang je Koshi op een plek waar hij vrij kan bewegen en resoneren</li>
              <li><strong>Vermijd harde wind:</strong> Constante harde windstoten kunnen de klank beïnvloeden en slijtage veroorzaken</li>
              <li><strong>Hoogte:</strong> Hang op een hoogte waar je hem gemakkelijk kunt aanraken en laten klinken</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Onderhoud
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li><strong>Bescherm tegen regen:</strong> Bij langdurige regen of vorst is het verstandig om hem binnen te halen</li>
              <li><strong>Overkapping:</strong> Buiten ophangen onder een afdak verlengt de levensduur aanzienlijk</li>
              <li><strong>Af en toe reinigen:</strong> Veeg af met een droge doek om stof te verwijderen</li>
              <li><strong>Energetische reiniging:</strong> Gebruik witte salie of Palo Santo om opgeladen energie te clearen</li>
            </ul>
          </section>

          <section id="complete-set">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              De Complete Koshi Set
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Veel liefhebbers kiezen ervoor om alle vier de Koshi elementen te verzamelen. Wanneer je ze samen bespeelt, creëer je een complete, harmonische klankenwereld die alle elementen van de natuur vertegenwoordigt.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li><strong>Balans:</strong> Elk element vult de anderen aan voor volledige harmonie</li>
              <li><strong>Variatie:</strong> Kies het element dat past bij je stemming of intentie van de dag</li>
              <li><strong>Sound healing:</strong> Professionele therapeuten gebruiken vaak de complete set</li>
              <li><strong>Rituelen:</strong> Werk met verschillende elementen tijdens seizoensrituelen</li>
            </ul>
          </section>

          <section id="conclusie">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              Conclusie: Breng Harmonie in Je Leven met Koshi
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Koshi windgongs zijn meer dan alleen mooie instrumenten — het zijn <strong>poorten naar innerlijke rust en harmonie</strong>. De zuivere, handgemaakte klanken resoneren diep in je ziel en helpen je te verbinden met de elementen van de natuur.
            </p>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Of je nu kiest voor de vloeiende Aqua, de lichte Aria, de grondende Terra of de energieke Ignis — elke Koshi brengt zijn eigen unieke magie in je leven. Gebruik ze tijdens meditatie, yoga, sound healing, of hang ze simpelweg in je tuin om te genieten van hun betoverende klanken.
            </p>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <strong>Laat de magische klanken van Koshi je begeleiden naar diepe rust en innerlijke harmonie.</strong>
            </p>
          </section>
        </div>

        <section className="border-t border-gray-200 pt-8 mt-8">
          <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)]">
            Shop Koshi Windgongs bij StonesForHealth
          </h2>
          <p className="text-base text-gray-800 mb-6 font-[family-name:var(--font-eb-garamond)]">
            Ontdek de originele <strong>Koshi Chimes</strong> in alle vier de elementen: Terra, Aqua, Aria en Ignis. Of je nu kiest voor één element of de complete set – je haalt altijd een prachtig, zuiver instrument in huis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <Link
              href="/alle-producten"
              className="inline-block bg-[#8B7355] hover:bg-[#6D5A42] text-white px-8 py-3 text-center transition-colors font-medium font-[family-name:var(--font-eb-garamond)]"
            >
              Shop Koshi Windgongs
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
              <Link href="/blog/chakra-kristallen-complete-gids" className="text-[#8B7355] hover:underline">
                Chakra Kristallen - Complete Gids
              </Link>
            </li>
            <li>
              <Link href="/blog/bergkristal-koning-kristallen" className="text-[#8B7355] hover:underline">
                Bergkristal: De Koning onder de Kristallen
              </Link>
            </li>
            <li>
              <Link href="/blog/amethist-soorten-werking-spirituele-tips" className="text-[#8B7355] hover:underline">
                Amethist: Soorten, Werking en Spirituele Tips
              </Link>
            </li>
            <li>
              <Link href="/blog/edelstenen-opladen-maanlicht" className="text-[#8B7355] hover:underline">
                Edelstenen Opladen in Maanlicht
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
