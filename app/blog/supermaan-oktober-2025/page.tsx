import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import JsonLd from '@/app/components/JsonLd';
import Breadcrumbs from '@/app/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Supermaan 7 Oktober 2025 - Krachtige Maanenergie voor Balans & Vernieuwing | StonesForHealth',
  description: 'Ontdek de krachtige supermaan van 7 oktober 2025 in Ram. Spirituele betekenis, rituelen met edelstenen en tips voor balans, vernieuwing en persoonlijke groei.',
  keywords: 'supermaan oktober 2025, supermaan ram, volle maan rituelen, edelstenen volle maan, maansteen, bergkristal, carneool, supermoon 2025',
  openGraph: {
    title: 'Supermaan 7 Oktober 2025: Krachtige Maanenergie voor Balans',
    description: 'Alles over de supermaan van 7 oktober 2025 in Ram. Rituelen, edelstenen en spirituele betekenis.',
    type: 'article',
    publishedTime: '2025-10-07T09:00:00Z',
    authors: ['StonesForHealth'],
  },
  alternates: {
    canonical: 'https://stonesforhealth.nl/blog/supermaan-oktober-2025',
  }
};

const blogPostingSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Supermaan 7 Oktober 2025 – Krachtige Maanenergie voor Balans en Vernieuwing",
  "description": "Ontdek de krachtige supermaan van 7 oktober 2025 in Ram. Rituelen, edelstenen en spirituele betekenis voor balans, vernieuwing en persoonlijke groei.",
  "image": "https://stonesforhealth.nl/Blog images /Supermaan 7 Oktober 2025 – Krachtige Maanenergie voor Balans en Vernieuwing.jpeg",
  "datePublished": "2025-10-07T09:00:00Z",
  "dateModified": "2025-10-07T09:00:00Z",
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
    "@id": "https://stonesforhealth.nl/blog/supermaan-oktober-2025"
  }
};

export default function SupermaanOktober2025Page() {
  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={blogPostingSchema} />
      <Breadcrumbs />
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Supermaan 7 Oktober 2025 – Krachtige Maanenergie voor Balans en Vernieuwing
        </h1>

        {/* Meta Info */}
        <div className="flex items-center gap-4 pb-8 border-b border-gray-200">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#492c4a] to-[#6b4069] flex items-center justify-center text-white font-bold text-lg">
            S4H
          </div>
          <div>
            <p className="font-semibold text-gray-900">StonesForHealth</p>
            <p className="text-sm text-gray-600">7 oktober 2025 • 9 min leestijd</p>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative w-full h-64 sm:h-96 my-8 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200">
          <Image
            src="/Blog images /Supermaan 7 Oktober 2025 – Krachtige Maanenergie voor Balans en Vernieuwing.jpeg"
            alt="Supermaan 7 oktober 2025 - Krachtige maanenergie in Ram met edelstenen"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Introduction */}
        <div className="prose prose-lg max-w-none">
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 font-[family-name:var(--font-eb-garamond)]">
            Op <strong>7 oktober 2025</strong> mogen we opnieuw genieten van een betoverende <strong>supermaan</strong>. De maan staat op haar dichtste punt bij de aarde, waardoor ze groter, helderder en energetisch krachtiger lijkt dan gewoonlijk. Deze volle maan valt in het <strong>vuur-teken Ram</strong>, tegenover de zon in Weegschaal – een krachtige combinatie die balans, passie en persoonlijke groei activeert.
          </p>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 font-[family-name:var(--font-eb-garamond)]">
            Bij <Link href="/" className="text-[#492c4a] hover:underline font-semibold">Stones for Health</Link> geloven we dat maanstanden invloed hebben op onze energie, emoties en bewustzijn. Deze supermaan nodigt je uit om oude patronen los te laten, je innerlijke vuur te omarmen en ruimte te maken voor nieuwe intenties.
          </p>

          {/* Lees Ook Section */}
          <div className="bg-purple-50 border-l-4 border-purple-500 p-6 my-8 rounded">
            <h3 className="text-lg font-bold text-gray-900 mb-3">📚 Lees Ook</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog/volle-maan-oktober-2025" className="text-purple-600 hover:text-purple-800 underline font-medium">
                  Volle Maan Oktober 2025 (Jagermaan)
                </Link> - Ontdek de andere volle maan van oktober
              </li>
              <li>
                <Link href="/blog/volle-maan-november-2025" className="text-purple-600 hover:text-purple-800 underline font-medium">
                  Volle Maan November 2025
                </Link> - De volgende supermaan van 2025
              </li>
              <li>
                <Link href="/blog/bergkristal-koning-kristallen" className="text-purple-600 hover:text-purple-800 underline font-medium">
                  Bergkristal - De Koning der Kristallen
                </Link> - Perfect voor het opladen tijdens volle maan
              </li>
            </ul>
          </div>

          {/* Table of Contents */}
          <div className="bg-gray-50 border-l-4 border-gray-900 p-6 my-12 rounded">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 mt-0 font-[family-name:var(--font-eb-garamond)]">
              Inhoudsopgave
            </h2>
            <ul className="space-y-2 text-base sm:text-lg font-[family-name:var(--font-eb-garamond)]">
              <li><a href="#wat-is-supermaan" className="text-gray-700 hover:text-gray-900 underline">Wat is een Supermaan?</a></li>
              <li><a href="#ram-energie" className="text-gray-700 hover:text-gray-900 underline">Supermaan in Ram – Het Vuur in Jou Ontwaakt</a></li>
              <li><a href="#edelstenen" className="text-gray-700 hover:text-gray-900 underline">Edelstenen en Kristallen voor de Supermaan</a></li>
              <li><a href="#rituelen" className="text-gray-700 hover:text-gray-900 underline">Rituelen voor de Supermaan van 7 Oktober</a></li>
              <li><a href="#spirituele-betekenis" className="text-gray-700 hover:text-gray-900 underline">Spirituele Betekenis</a></li>
              <li><a href="#samenvatting" className="text-gray-700 hover:text-gray-900 underline">Samenvatting</a></li>
            </ul>
          </div>

          {/* Wat is een Supermaan */}
          <h2 id="wat-is-supermaan" className="text-xl sm:text-2xl font-bold text-gray-900 mt-12 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            Wat is een Supermaan?
          </h2>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 font-[family-name:var(--font-eb-garamond)]">
            Een <strong>supermaan</strong> ontstaat wanneer de volle maan samenvalt met het <strong>perigeum</strong> – het moment waarop de maan het dichtst bij de aarde staat. Hierdoor lijkt ze tot wel <strong>14% groter</strong> en <strong>30% helderder</strong> aan de hemel.
          </p>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 font-[family-name:var(--font-eb-garamond)]">
            Hoewel dit een astronomisch fenomeen is, voelt de energie vaak intenser. Veel mensen ervaren tijdens een supermaan meer emoties, levendige dromen, inzichten of onrust. Dit komt omdat de maan het water op aarde beïnvloedt – en ook ons lichaam bestaat grotendeels uit water. De maan weerspiegelt dus letterlijk en figuurlijk onze innerlijke stroming.
          </p>

          {/* Ram Energie */}
          <h2 id="ram-energie" className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            Supermaan in Ram – Het Vuur in Jou Ontwaakt
          </h2>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 font-[family-name:var(--font-eb-garamond)]">
            De volle supermaan in <strong>Ram</strong> brengt vurige, vernieuwende energie. Ram symboliseert actie, moed, initiatief en zelfvertrouwen. Toch staat deze maan tegenover de zon in <strong>Weegschaal</strong> – het teken van balans, harmonie en relaties.
          </p>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 font-[family-name:var(--font-eb-garamond)]">
            Dit maakt 7 oktober een dag van <strong>innerlijke afstemming</strong>. De vurige Ram-energie helpt je om actie te ondernemen, terwijl Weegschaal je eraan herinnert om te luisteren naar het hart en harmonie te zoeken tussen geven en ontvangen.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              Kernenergie van deze Supermaan:
            </h3>
            <ul className="space-y-3 text-base sm:text-lg text-gray-700 pl-5 list-disc font-[family-name:var(--font-eb-garamond)]">
              <li><strong>Actie & Initiatief:</strong> Durf grote stappen te zetten</li>
              <li><strong>Balans & Harmonie:</strong> Vind evenwicht tussen hoofd en hart</li>
              <li><strong>Zelfvertrouwen:</strong> Claim je kracht en authenticiteit</li>
              <li><strong>Vernieuwing:</strong> Laat oude patronen los en maak ruimte voor het nieuwe</li>
              <li><strong>Passie & Vuur:</strong> Voel je levenskracht en volg je intuïtie</li>
            </ul>
          </div>

          {/* Edelstenen */}
          <h2 id="edelstenen" className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            Edelstenen en Kristallen voor de Supermaan
          </h2>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 font-[family-name:var(--font-eb-garamond)]">
            Tijdens de supermaan is de energie perfect om <strong>edelstenen te reinigen, op te laden of te programmeren</strong> met nieuwe intenties. Enkele aanbevolen stenen voor de supermaan van 7 oktober:
          </p>

          {/* Bergkristal */}
          <div className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
              💎 <Link href="/alle-producten?search=bergkristal" className="hover:text-[#492c4a] transition-colors">Bergkristal</Link>
            </h3>
            <p className="text-base sm:text-lg text-gray-600 mb-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Energie:</strong> Versterkt intenties, zuivert energie
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Bergkristal</strong> is de universele meestersteen. Het versterkt alle energieën en intenties die je tijdens de supermaan zet. Perfect om op te laden onder het maanlicht en te gebruiken voor manifestatie. Lees meer in onze <Link href="/blog/bergkristal-koning-kristallen" className="text-[#492c4a] hover:underline">complete gids over Bergkristal</Link>.
            </p>
            <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <strong>Gebruik:</strong> Leg buiten onder de supermaan met je intentie.
            </p>
          </div>

          {/* Carneool */}
          <div className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
              🔥 <Link href="/alle-producten?search=carneool" className="hover:text-[#492c4a] transition-colors">Carneool</Link>
            </h3>
            <p className="text-base sm:text-lg text-gray-600 mb-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Energie:</strong> Stimuleert daadkracht en motivatie
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Carneool</strong> is de steen van actie en moed – perfect voor de vurige Ram energie. Deze oranje-rode steen activeert je sacrale chakra en helpt je om je doelen met passie na te jagen.
            </p>
            <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <strong>Gebruik:</strong> Draag als armband of mediteer ermee voor actie en motivatie.
            </p>
          </div>

          {/* Rozenkwarts */}
          <div className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
              💗 <Link href="/alle-producten?search=rozenkwarts" className="hover:text-[#492c4a] transition-colors">Rozenkwarts</Link>
            </h3>
            <p className="text-base sm:text-lg text-gray-600 mb-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Energie:</strong> Herstelt harmonie tussen hart en hoofd
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Rozenkwarts</strong> brengt de zachte Weegschaal energie – liefde, compassie en emotionele balans. Deze steen helpt je om de vurige Ram energie te temperen met zelfliefde en acceptatie. Ontdek meer in ons artikel over <Link href="/blog/rozenkwarts-steen-van-de-liefde" className="text-[#492c4a] hover:underline">Rozenkwarts als steen van de liefde</Link>.
            </p>
            <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <strong>Gebruik:</strong> Plaats op je hartchakra tijdens meditatie.
            </p>
          </div>

          {/* Rode Jaspis */}
          <div className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
              🪨 <Link href="/alle-producten?search=rode+jaspis" className="hover:text-[#492c4a] transition-colors">Rode Jaspis</Link>
            </h3>
            <p className="text-base sm:text-lg text-gray-600 mb-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Energie:</strong> Aardend en krachtig bij nieuwe stappen
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Rode Jaspis</strong> grond je tijdens de intense supermaan energie. Deze aardende steen geeft je stabiliteit en doorzettingsvermogen om je nieuwe plannen daadwerkelijk uit te voeren.
            </p>
            <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <strong>Gebruik:</strong> Draag in je zak of mediteer ermee voor grounding.
            </p>
          </div>

          {/* Maansteen */}
          <div className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
              🌙 <Link href="/alle-producten?search=maansteen" className="hover:text-[#492c4a] transition-colors">Maansteen</Link>
            </h3>
            <p className="text-base sm:text-lg text-gray-600 mb-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Energie:</strong> Versterkt intuïtie en vrouwelijke energie
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
              <strong>Maansteen</strong> is natuurlijk verbonden met de maan en alle maancycli. Deze steen versterkt je intuïtie en helpt je om de emotionele golven van de supermaan met grace te navigeren.
            </p>
            <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <strong>Gebruik:</strong> Draag als sieraad of leg onder je kussen voor dromen.
            </p>
          </div>

          {/* Rituelen */}
          <h2 id="rituelen" className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            Rituelen voor de Supermaan van 7 Oktober
          </h2>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 font-[family-name:var(--font-eb-garamond)]">
            Gebruik deze nacht voor zelfreflectie en spirituele vernieuwing. Hier zijn vier krachtige rituelen:
          </p>

          {/* Ritueel 1 */}
          <div className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              1. Loslaten – Schrijf en Verbrand
            </h3>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
              Schrijf op wat je wilt loslaten en verbrand het symbolisch onder het maanlicht. Laat de rook je oude energie meenemen en maak ruimte voor het nieuwe.
            </p>
            <p className="text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <strong>Tip:</strong> Gebruik <Link href="/alle-producten?search=rookkwarts" className="text-[#492c4a] hover:underline">Rookkwarts</Link> om de transformatie te versterken.
            </p>
          </div>

          {/* Ritueel 2 */}
          <div className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              2. Neem een Maanbad of Mediteer bij het Maanlicht
            </h3>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
              Vul je bad met water en voeg Himalaya zout toe. Laat het maanlicht door het raam schijnen terwijl je baadt. Of ga buiten zitten en mediteer onder de supermaan.
            </p>
          </div>

          {/* Ritueel 3 */}
          <div className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              3. Laad je Kristallen Op
            </h3>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
              Leg je kristallen buiten of op de vensterbank met een duidelijke intentie. De supermaan laadt ze extra krachtig op. Bekijk onze collectie <Link href="/alle-producten" className="text-[#492c4a] hover:underline">edelstenen voor supermaan rituelen</Link>.
            </p>
          </div>

          {/* Ritueel 4 */}
          <div className="border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              4. Dankbaarheidsritueel
            </h3>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 font-[family-name:var(--font-eb-garamond)]">
              Schrijf drie dingen op waar je dankbaar voor bent. Dankbaarheid verhoogt je trilling en helpt je om de positieve energie van de supermaan te ontvangen.
            </p>
          </div>

          {/* Spirituele Betekenis */}
          <h2 id="spirituele-betekenis" className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            Spirituele Betekenis
          </h2>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 font-[family-name:var(--font-eb-garamond)]">
            De supermaan van oktober 2025 staat symbool voor <strong>vernieuwing, zelfliefde en het terugvinden van balans</strong>. De vurige Ram-energie helpt je om actie te ondernemen, terwijl Weegschaal je eraan herinnert om te luisteren naar het hart.
          </p>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 font-[family-name:var(--font-eb-garamond)]">
            Deze supermaan vraagt je om de balans te vinden tussen <strong>actie en rust, geven en ontvangen, hoofd en hart</strong>. Het is een tijd van diepgaande transformatie en het loslaten van oude patronen die je niet meer dienen.
          </p>

          {/* Samenvatting */}
          <h2 id="samenvatting" className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)] scroll-mt-24">
            Samenvatting
          </h2>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
            <ul className="space-y-3 text-base sm:text-lg text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              <li><strong>Datum:</strong> 7 oktober 2025</li>
              <li><strong>Maanfase:</strong> Supervolle maan in Ram</li>
              <li><strong>Element:</strong> Vuur</li>
              <li><strong>Kernenergie:</strong> Actie, balans, zelfvertrouwen, vernieuwing</li>
              <li><strong>Edelstenen:</strong> <Link href="/alle-producten?search=carneool" className="text-[#492c4a] hover:underline">Carneool</Link>, <Link href="/alle-producten?search=bergkristal" className="text-[#492c4a] hover:underline">Bergkristal</Link>, <Link href="/alle-producten?search=rozenkwarts" className="text-[#492c4a] hover:underline">Rozenkwarts</Link>, <Link href="/alle-producten?search=rode+jaspis" className="text-[#492c4a] hover:underline">Rode Jaspis</Link>, <Link href="/alle-producten?search=maansteen" className="text-[#492c4a] hover:underline">Maansteen</Link></li>
            </ul>
          </div>

          {/* Slot */}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-16 mb-6 font-[family-name:var(--font-eb-garamond)]">
            Slot
          </h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 font-[family-name:var(--font-eb-garamond)]">
            De supermaan van 7 oktober 2025 herinnert ons eraan dat licht en donker, actie en rust, geven en ontvangen altijd in balans mogen zijn. Kijk naar de hemel, adem diep in en voel hoe deze krachtige maan jou ondersteunt in jouw persoonlijke en spirituele groei.
          </p>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-[family-name:var(--font-eb-garamond)]">
            Ontdek meer over edelstenen en maanenergie op <Link href="/" className="text-[#492c4a] hover:underline font-semibold">Stonesforhealth.nl</Link>
          </p>

          {/* CTA Section */}
          <div className="border-2 border-gray-900 rounded-lg p-8 my-12">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
              Bereid je Voor op de Supermaan
            </h3>
            <p className="text-base sm:text-lg text-gray-700 mb-6 font-[family-name:var(--font-eb-garamond)]">
              Vind de perfecte edelstenen voor je supermaan rituelen. Bergkristal, Carneool, Rozenkwarts, Maansteen en meer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/alle-producten" className="inline-block text-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold font-[family-name:var(--font-eb-garamond)]">
                Bekijk Alle Edelstenen
              </Link>
              <Link href="/bestsellers" className="inline-block text-center px-6 py-3 border-2 border-gray-900 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors font-semibold font-[family-name:var(--font-eb-garamond)]">
                Onze Bestsellers
              </Link>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-16 pt-12 border-t-2 border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 font-[family-name:var(--font-eb-garamond)]">
              Gerelateerde Artikelen
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/blog/volle-maan-oktober-2025" className="group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]">
                    Volle Maan Oktober 2025 (Jagermaan)
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    De andere krachtige volle maan van oktober
                  </p>
                </div>
              </Link>
              <Link href="/blog/chakra-kristallen-complete-gids" className="group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]">
                    Chakra Kristallen Gids
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    Welke kristallen passen bij welk chakra
                  </p>
                </div>
              </Link>
              <Link href="/blog/edelstenen-per-sterrenbeeld-numerologie" className="group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-[family-name:var(--font-eb-garamond)]">
                    Edelstenen per Sterrenbeeld
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    Vind jouw perfecte steen op basis van Ram energie
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
