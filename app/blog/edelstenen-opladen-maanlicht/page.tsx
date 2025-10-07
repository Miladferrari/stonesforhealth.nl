import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import JsonLd from '@/app/components/JsonLd';
import Breadcrumbs from '@/app/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Edelstenen Schoonmaken en Opladen in Maanlicht: Complete Gids | StonesForHealth',
  description: 'Leer hoe je edelstenen reinigt en oplaadt met maanlicht. Complete gids met timing, methodes, beste stenen en rituelen voor optimale kristalenergie.',
  keywords: 'edelstenen opladen, kristallen reinigen, maanlicht, volle maan, edelstenen onderhoud, kristallen schoonmaken, maansteen, bergkristal',
  openGraph: {
    title: 'Edelstenen Schoonmaken en Opladen in Maanlicht: Zo Doe Je Dat!',
    description: 'Complete gids voor het reinigen en opladen van edelstenen met maanlicht. Praktische tips en welke stenen perfect reageren.',
    type: 'article',
    publishedTime: '2025-10-05T09:00:00Z',
    authors: ['StonesForHealth'],
  },
  alternates: {
    canonical: 'https://stonesforhealth.nl/blog/edelstenen-opladen-maanlicht',
  }
};

const blogPostingSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Edelstenen Schoonmaken en Opladen in Maanlicht: Zo Doe Je Dat!",
  "description": "Leer hoe je edelstenen reinigt en oplaadt met maanlicht. Complete gids met timing, methodes en welke stenen perfect reageren op maanenergie.",
  "image": "https://stonesforhealth.nl/Blog images /Edelstenen Schoonmaken en Opladen in Maanlicht- Zo Doe Je Dat!.jpeg",
  "datePublished": "2025-10-05T09:00:00Z",
  "dateModified": "2025-10-05T09:00:00Z",
  "author": {
    "@type": "Organization",
    "name": "StonesForHealth"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Stones for Health",
    "logo": {
      "@type": "ImageObject",
      "url": "https://stonesforhealth.nl/logo.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://stonesforhealth.nl/blog/edelstenen-opladen-maanlicht"
  }
};

export default function EdelstenenOpladenMaanlichtPage() {
  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={blogPostingSchema} />
      <Breadcrumbs />
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Edelstenen Schoonmaken en Opladen in Maanlicht: Zo Doe Je Dat!
        </h1>

        {/* Meta Info */}
        <div className="flex items-center gap-4 pb-8 border-b border-gray-200">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#492c4a] to-[#6b4069] flex items-center justify-center text-white font-bold text-lg">
            S4H
          </div>
          <div>
            <p className="font-semibold text-gray-900">StonesForHealth</p>
            <p className="text-sm text-gray-600">5 oktober 2025 • 8 min leestijd</p>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative w-full h-64 sm:h-96 my-8 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200">
          <Image
            src="/Blog images /Edelstenen Schoonmaken en Opladen in Maanlicht- Zo Doe Je Dat!.jpeg"
            alt="Edelstenen opladen in maanlicht - Complete gids voor kristallen reinigen"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Introduction */}
        <div className="prose prose-lg max-w-none">
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 font-[family-name:var(--font-eb-garamond)]">
            Edelstenen nemen energie op uit hun omgeving. Wanneer je ze draagt, gebruikt of in huis plaatst, absorberen ze emoties, gedachten en invloeden van buitenaf. Om hun werking zuiver en krachtig te houden, is het belangrijk om ze regelmatig <strong>energetisch te reinigen en op te laden</strong>.
          </p>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 font-[family-name:var(--font-eb-garamond)]">
            Een van de meest natuurlijke en zachte manieren om dat te doen, is met het licht van de maan. In deze complete gids leer je precies hoe je je <Link href="/alle-producten" className="text-[#492c4a] hover:underline font-semibold">edelstenen</Link> reinigt en oplaadt met maanlicht.
          </p>

          {/* Lees Ook Section */}
          <div className="bg-purple-50 border-l-4 border-purple-500 p-6 my-8 rounded">
            <h3 className="text-lg font-bold text-gray-900 mb-3">📚 Lees Ook</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog/supermaan-oktober-2025" className="text-purple-600 hover:text-purple-800 underline font-medium">
                  Supermaan 7 Oktober 2025
                </Link> - Perfect moment om je kristallen op te laden
              </li>
              <li>
                <Link href="/blog/volle-maan-oktober-2025" className="text-purple-600 hover:text-purple-800 underline font-medium">
                  Volle Maan Oktober 2025
                </Link> - Nog een krachtige volle maan om te benutten
              </li>
              <li>
                <Link href="/blog/bergkristal-koning-kristallen" className="text-purple-600 hover:text-purple-800 underline font-medium">
                  Bergkristal - De Koning der Kristallen
                </Link> - Ideaal voor opladen in maanlicht
              </li>
            </ul>
          </div>

          {/* Table of Contents */}
          <div className="bg-gray-50 border-l-4 border-gray-900 p-6 my-12 rounded">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 mt-0 font-[family-name:var(--font-eb-garamond)]">
              Inhoudsopgave
            </h2>
            <ul className="space-y-2 text-base sm:text-lg font-[family-name:var(--font-eb-garamond)]">
              <li><a href="#waarom-reinigen" className="text-gray-700 hover:text-gray-900 underline">Waarom Edelstenen Reinigen en Opladen?</a></li>
              <li><a href="#beste-moment" className="text-gray-700 hover:text-gray-900 underline">Wanneer is het Beste Moment?</a></li>
              <li><a href="#hoe-opladen" className="text-gray-700 hover:text-gray-900 underline">Hoe Reinig en Laad je Edelstenen Op?</a></li>
              <li><a href="#welke-stenen" className="text-gray-700 hover:text-gray-900 underline">Welke Edelstenen kun je in Maanlicht Opladen?</a></li>
              <li><a href="#andere-methodes" className="text-gray-700 hover:text-gray-900 underline">Andere Manieren van Reinigen</a></li>
              <li><a href="#maanritueel" className="text-gray-700 hover:text-gray-900 underline">Extra Tip: Maanritueel met Intentie</a></li>
            </ul>
          </div>

          {/* Waarom Reinigen */}
          <h2 id="waarom-reinigen" className="text-xl sm:text-2xl font-bold text-gray-900 mt-12 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            Waarom Edelstenen Reinigen en Opladen?
          </h2>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 font-[family-name:var(--font-eb-garamond)]">
            Elke edelsteen heeft een eigen <strong>trilling en energetische frequentie</strong>. Wanneer je een steen vaak gebruikt of deze in contact komt met negatieve energie, kan die trilling uit balans raken.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              Het verschil tussen reinigen en opladen:
            </h3>
            <ul className="space-y-3 text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <li><strong>■ Reinigen</strong> = oude, zware energie verwijderen</li>
              <li><strong>■ Opladen</strong> = nieuwe, frisse energie toevoegen</li>
            </ul>
          </div>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 font-[family-name:var(--font-eb-garamond)]">
            Het <strong>maanlicht</strong> – vooral tijdens de volle maan – is hiervoor ideaal omdat het een zachte maar krachtige vrouwelijke energie heeft. Het helpt stenen hun natuurlijke trilling te herstellen zonder ze te beschadigen.
          </p>

          {/* Beste Moment */}
          <h2 id="beste-moment" className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            Wanneer is het Beste Moment?
          </h2>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 font-[family-name:var(--font-eb-garamond)]">
            Het beste moment om je edelstenen in het maanlicht te reinigen en op te laden, is tijdens de <strong>volle maan</strong> of de nacht ervoor en erna. De energie van de maan is dan op haar sterkst en werkt zuiverend en vernieuwend.
          </p>

          <div className="border-l-4 border-[#492c4a] pl-6 my-8">
            <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <strong>Perfecte timing:</strong> De <Link href="/blog/supermaan-oktober-2025" className="text-[#492c4a] hover:underline">volle maan in oktober 2025</Link> valt op <strong>7 oktober</strong> – ook een supermaan! Dit is een extra krachtig moment om je kristallen op te laden.
            </p>
          </div>

          {/* Hoe Opladen */}
          <h2 id="hoe-opladen" className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            Hoe Reinig en Laad je Edelstenen Op in Maanlicht?
          </h2>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 font-[family-name:var(--font-eb-garamond)]">
            Volg deze eenvoudige stappen voor optimale resultaten:
          </p>

          <div className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              Stap 1: Maak de Stenen Fysiek Schoon
            </h3>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-[family-name:var(--font-eb-garamond)]">
              Verwijder stof of vuil met een zachte doek of spoel ze kort af onder lauw water. <strong>Let op:</strong> niet alle stenen kunnen tegen water (zie sectie "Welke stenen" hieronder).
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              Stap 2: Leg ze Buiten of op de Vensterbank
            </h3>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
              Plaats je <Link href="/alle-producten" className="text-[#492c4a] hover:underline">edelstenen</Link> waar ze direct maanlicht ontvangen. Dit kan buiten in de tuin zijn of op een vensterbank.
            </p>
            <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <strong>Tip:</strong> Gebruik een natuurlijke ondergrond zoals hout, schelpen of een glazen schaaltje. Vermijd metaal omdat dit de energie kan blokkeren.
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              Stap 3: Laat ze Liggen van Zonsondergang tot Zonsopkomst
            </h3>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
              Minimaal 4 uur maanlicht is ideaal, maar een hele nacht is het beste. Haal gevoelige stenen op vóór zonsopkomst om verkleuring te voorkomen.
            </p>
            <div className="bg-gray-50 border-l-4 border-gray-300 p-4 rounded">
              <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                <strong>Let op:</strong> Stenen zoals <Link href="/alle-producten?search=amethist" className="text-[#492c4a] hover:underline">Amethist</Link>, <Link href="/alle-producten?search=rozenkwarts" className="text-[#492c4a] hover:underline">Rozenkwarts</Link> en Citrien kunnen verkleuren in direct zonlicht.
              </p>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              Stap 4: Bedank de Maan
            </h3>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-[family-name:var(--font-eb-garamond)]">
              Neem een kort moment van dankbaarheid. Dit versterkt de intentie en verbinding met de maanenergie.
            </p>
          </div>

          {/* Welke Stenen */}
          <h2 id="welke-stenen" className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            Welke Edelstenen kun je in Maanlicht Opladen?
          </h2>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 font-[family-name:var(--font-eb-garamond)]">
            Bijna alle stenen kunnen veilig in maanlicht worden opgeladen. Vooral de volgende reageren <strong>extra goed</strong> op maanenergie:
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              Beste Stenen voor Maanlicht:
            </h3>
            <ul className="space-y-2 text-base sm:text-lg text-gray-700 pl-5 list-disc font-[family-name:var(--font-eb-garamond)]">
              <li><Link href="/alle-producten?search=maansteen" className="text-[#492c4a] hover:underline font-semibold">Maansteen</Link> - Natuurlijk verbonden met de maan</li>
              <li><Link href="/alle-producten?search=seleniet" className="text-[#492c4a] hover:underline font-semibold">Seleniet</Link> - Zelfreinigend en zeer gevoelig voor maanlicht</li>
              <li><Link href="/alle-producten?search=bergkristal" className="text-[#492c4a] hover:underline font-semibold">Bergkristal</Link> - Universele steen, amplificator van energie</li>
              <li><Link href="/alle-producten?search=rozenkwarts" className="text-[#492c4a] hover:underline font-semibold">Rozenkwarts</Link> - Liefdesenergie wordt versterkt door de maan</li>
              <li><Link href="/alle-producten?search=amethist" className="text-[#492c4a] hover:underline font-semibold">Amethist</Link> - Spirituele rust en intuïtie</li>
              <li><Link href="/alle-producten?search=labradoriet" className="text-[#492c4a] hover:underline font-semibold">Labradoriet</Link> - Bescherming en transformatie</li>
              <li>Celestien - Hemelse verbinding</li>
              <li>Opaliet - Zachte kalmeringsenergie</li>
              <li>Angeliet - Engelen verbinding</li>
            </ul>
          </div>

          <div className="border-l-4 border-red-500 bg-red-50 pl-6 p-4 my-8 rounded">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
              ⚠️ Let Op: Stenen die NIET met Water Kunnen
            </h3>
            <p className="text-base sm:text-lg text-gray-700 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Deze stenen kun je beter niet met water reinigen – gebruik hiervoor liever rook van salie, palo santo of enkel het maanlicht zelf:
            </p>
            <ul className="space-y-1 text-base sm:text-lg text-gray-700 pl-5 list-disc font-[family-name:var(--font-eb-garamond)]">
              <li>Seleniet (lost op in water)</li>
              <li>Lepidoliet (kan beschadigen)</li>
              <li>Turkoois (verkleurt)</li>
              <li>Malachiet (bevat koper, kan roesten)</li>
              <li>Pyriet (roest)</li>
            </ul>
          </div>

          {/* Andere Methodes */}
          <h2 id="andere-methodes" className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            Andere Manieren van Reinigen
          </h2>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 font-[family-name:var(--font-eb-garamond)]">
            Naast maanlicht kun je edelstenen ook reinigen met:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                🌿 Witte Salie of Palo Santo
              </h3>
              <p className="text-base text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Reinigt met rook en intentie. Perfect voor stenen die niet met water kunnen. Bekijk onze <Link href="/alle-producten?search=salie" className="text-[#492c4a] hover:underline">salie producten</Link>.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                🔔 Klankschalen of Belletjes
              </h3>
              <p className="text-base text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Geluidstrilling herstelt balans en verwijdert negatieve energie door vibratie.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                💧 Water of Zout
              </h3>
              <p className="text-base text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Voor stevige stenen zoals <Link href="/alle-producten?search=bergkristal" className="text-[#492c4a] hover:underline">Bergkristal</Link> of Jaspis. Spoel onder stromend water of leg in zeezout.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                🌍 Aarde
              </h3>
              <p className="text-base text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                Leg de steen 24 uur in de grond om te ontladen. De aarde neemt alle oude energie op.
              </p>
            </div>
          </div>

          {/* Maanritueel */}
          <h2 id="maanritueel" className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            Extra Tip: Maanritueel met Intentie
          </h2>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 font-[family-name:var(--font-eb-garamond)]">
            Gebruik de volle maan als moment van <strong>persoonlijke reiniging en manifestatie</strong>. Terwijl je je stenen neerlegt, kun je affirmaties uitspreken.
          </p>

          <div className="bg-purple-50 border-l-4 border-[#492c4a] rounded-lg p-6 md:p-8 my-8">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              💫 Voorbeeld Affirmatie
            </h3>
            <p className="text-base sm:text-lg text-gray-700 italic leading-relaxed font-[family-name:var(--font-eb-garamond)]">
              "Met het licht van de maan zuiver ik mijn stenen en laad ik ze met liefdevolle energie."
            </p>
          </div>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 font-[family-name:var(--font-eb-garamond)]">
            Je kunt ook specifieke intenties programmeren in je stenen terwijl ze opladen. Bijvoorbeeld: "Deze <Link href="/alle-producten?search=rozenkwarts" className="text-[#492c4a] hover:underline">rozenkwarts</Link> draagt de energie van zelfliefde en acceptatie."
          </p>

          {/* Samenvatting */}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)]">
            Samenvatting
          </h2>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 font-[family-name:var(--font-eb-garamond)]">
            Het opladen van edelstenen in maanlicht is een <strong>liefdevolle manier</strong> om verbinding te maken met de natuur en je eigen energie te herstellen. Of je nu werkt met <Link href="/alle-producten?search=rozenkwarts" className="text-[#492c4a] hover:underline">rozenkwarts</Link> voor liefde, <Link href="/alle-producten?search=amethist" className="text-[#492c4a] hover:underline">amethist</Link> voor rust of <Link href="/alle-producten?search=bergkristal" className="text-[#492c4a] hover:underline">bergkristal</Link> voor helderheid – het maanlicht helpt elke steen zijn natuurlijke kracht terug te vinden.
          </p>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-[family-name:var(--font-eb-garamond)]">
            Bekijk bij <Link href="/" className="text-[#492c4a] hover:underline font-semibold">Stonesforhealth.nl</Link> onze collectie <Link href="/alle-producten" className="text-[#492c4a] hover:underline">edelstenen</Link>, <Link href="/alle-producten?search=maansteen" className="text-[#492c4a] hover:underline">maansteen sieraden</Link> en reinigingsproducten zoals <Link href="/alle-producten?search=salie" className="text-[#492c4a] hover:underline">salie</Link> en <Link href="/alle-producten?search=palo+santo" className="text-[#492c4a] hover:underline">Palo Santo</Link>.
          </p>

          {/* CTA Section */}
          <div className="border-2 border-gray-900 rounded-lg p-8 my-12">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              Klaar om je Edelstenen Op te Laden?
            </h3>
            <p className="text-base sm:text-lg text-gray-700 mb-6 font-[family-name:var(--font-eb-garamond)]">
              Ontdek onze collectie edelstenen en reinigingsproducten. Maansteen, Bergkristal, Rozenkwarts, Salie en meer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/alle-producten" className="inline-block text-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold font-[family-name:var(--font-eb-garamond)]">
                Bekijk Alle Edelstenen
              </Link>
              <Link href="/alle-producten?search=salie" className="inline-block text-center px-6 py-3 border-2 border-gray-900 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors font-semibold font-[family-name:var(--font-eb-garamond)]">
                Reinigingsproducten
              </Link>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-16 pt-12 border-t-2 border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 font-[family-name:var(--font-eb-garamond)]">
              Gerelateerde Artikelen
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/blog/supermaan-oktober-2025" className="group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]">
                    Supermaan 7 Oktober 2025
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    Perfect moment om kristallen op te laden
                  </p>
                </div>
              </Link>
              <Link href="/blog/bergkristal-koning-kristallen" className="group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]">
                    Bergkristal - De Koning
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    Alles over de krachtigste kristal
                  </p>
                </div>
              </Link>
              <Link href="/blog/chakra-kristallen-complete-gids" className="group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]">
                    Chakra Kristallen Gids
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    Welke kristallen bij welk chakra
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Author Bio */}
          <div className="mt-12 bg-gray-50 border border-gray-200 rounded-lg p-8">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              Over StonesForHealth
            </h3>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-[family-name:var(--font-eb-garamond)]">
              Bij StonesForHealth geloven we in de kracht van natuurlijke kristallen en edelstenen voor holistisch welzijn. Onze missie is om hoogwaardige, ethisch gewonnen kristallen toegankelijk te maken voor iedereen die werkt aan persoonlijke groei en spirituele ontwikkeling. Alle producten in onze collectie zijn 100% authentiek en met liefde geselecteerd.
            </p>
          </div>
        </div>
      </article>
    </main>
  );
}
