import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/app/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Edelstenen voor Liefde en Zelfliefde | StonesForHealth',
  description: 'Ontdek de krachtigste edelstenen voor liefde en zelfliefde: rozenkwarts, rhodoniet, smaragd, kunziet en meer. Open je hartchakra en trek liefde aan.',
  keywords: [
    'edelstenen voor liefde',
    'rozenkwarts liefde',
    'zelfliefde kristallen',
    'hartchakra stenen',
    'rhodoniet werking',
    'smaragd betekenis',
    'kunziet edelsteen',
    'groene aventurijn',
    'rhodochrosiet',
    'liefde aantrekken',
    'zelfacceptatie stenen',
    'liefdesritueel',
  ],
  openGraph: {
    title: 'Edelstenen voor Liefde en Zelfliefde | StonesForHealth',
    description: 'Ontdek de krachtigste edelstenen voor liefde en zelfliefde: rozenkwarts, rhodoniet, smaragd, kunziet en meer. Open je hartchakra en trek liefde aan.',
    type: 'article',
    publishedTime: '2025-10-20',
  },
  alternates: {
    canonical: 'https://stonesforhealth.nl/blog/edelstenen-liefde-zelfliefde-hartchakra',
  },
};

export default function EdelstenenLiefdeZelfliefde() {
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Edelstenen voor Liefde en Zelfliefde – Open Je Hart en Trek Liefde Aan",
    "description": "Ontdek de krachtigste edelstenen voor liefde en zelfliefde: rozenkwarts, rhodoniet, smaragd, kunziet en meer. Leer hoe je met hartchakra kristallen liefde aantrekt en zelfacceptatie versterkt.",
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
            { name: 'Edelstenen voor Liefde en Zelfliefde', url: 'https://stonesforhealth.nl/blog/edelstenen-liefde-zelfliefde-hartchakra' }
          ]}
        />

        <header className="mb-8 pb-6 border-b border-gray-200">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)]">
            Edelstenen voor Liefde en Zelfliefde – Open Je Hart en Trek Liefde Aan
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <time dateTime="2025-10-20">20 oktober 2025</time>
            <span>•</span>
            <span>8 min leestijd</span>
          </div>
        </header>

        <section className="mb-8">
          <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
            Liefde is de meest fundamentele kracht in het universum. Het begint bij jezelf, bij het openen van je hart en het accepteren van wie je bent. Edelstenen die resoneren met het hartchakra kunnen je helpen oude pijn los te laten, je eigenwaarde te versterken en echte liefde aan te trekken.
          </p>
          <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
            In deze gids ontdek je de krachtigste kristallen voor liefde en zelfliefde, hoe ze werken en hoe je ze kunt gebruiken om je hart te openen voor meer liefde, compassie en harmonie.
          </p>
        </section>

        <div className="space-y-8">
          <section id="waarom-werken">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              Waarom Edelstenen Werken bij Liefde
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Edelstenen dragen een natuurlijke trilling die invloed kan hebben op onze energievelden. Stenen die resoneren met het hartchakra – meestal roze en groene kristallen – helpen bij het helen van oude wonden, het aantrekken van liefde en het versterken van zelfacceptatie.
            </p>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Het hartchakra (Anahata) is het energetische centrum van liefde, compassie en verbinding. Wanneer dit chakra geblokkeerd is door pijn, verdriet of angst, kan het moeilijk zijn om liefde te geven en te ontvangen. Hartchakra-stenen helpen deze blokkades op te heffen en de natuurlijke flow van liefde te herstellen.
            </p>
          </section>

          <section id="rozenkwarts">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              Rozenkwarts – De Steen van Onvoorwaardelijke Liefde
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <strong>Rozenkwarts</strong> is dé steen van liefde en het meest bekende kristal voor het hartchakra. Zijn zachte roze energie opent het hart en verzacht emoties. Hij helpt bij liefdesverdriet, versterkt eigenwaarde en brengt harmonie in relaties.
            </p>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Werking van Rozenkwarts
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li>Opent het hart voor liefde en compassie</li>
              <li>Helpt bij het helen van emotionele wonden en liefdesverdriet</li>
              <li>Versterkt zelfliefde en zelfacceptatie</li>
              <li>Brengt harmonie en vrede in relaties</li>
              <li>Bevordert vergeving en loslaten van oude pijn</li>
            </ul>

            <p className="mb-4">
              <Link
                href="/alle-producten?search=rozenkwarts"
                className="text-[#8B7355] hover:underline font-medium font-[family-name:var(--font-eb-garamond)]"
              >
                Bekijk Rozenkwarts producten →
              </Link>
            </p>
          </section>

          <section id="aventurijn">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              Groene Aventurijn – Voor Hartelijke Harmonie
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <strong>Groene Aventurijn</strong> is de steen van geluk, groei en emotionele kalmte. Hij kalmeert emoties en bevordert vergeving. Hij helpt bij het loslaten van angst en jaloezie en brengt rust in het hart.
            </p>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Werking van Groene Aventurijn
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li>Kalmeert emoties en brengt innerlijke rust</li>
              <li>Bevordert vergeving en begrip</li>
              <li>Helpt bij het loslaten van jaloezie en angst</li>
              <li>Stimuleert emotionele groei en balans</li>
              <li>Ondersteunt bij het aantrekken van nieuwe liefde</li>
            </ul>

            <p className="mb-4">
              <Link
                href="/alle-producten?search=aventurijn"
                className="text-[#8B7355] hover:underline font-medium font-[family-name:var(--font-eb-garamond)]"
              >
                Bekijk Aventurijn producten →
              </Link>
            </p>
          </section>

          <section id="rhodoniet">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              Rhodoniet – Voor Vergeving en Innerlijke Genezing
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <strong>Rhodoniet</strong> is de steen van compassie en vergeving. Met zijn roze en zwarte aders combineert hij liefde met gronding. Hij helpt oude pijn los te laten en bevordert innerlijke balans en zelfliefde.
            </p>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Werking van Rhodoniet
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li>Helpt bij emotionele genezing en verwerking van trauma</li>
              <li>Bevordert vergeving naar jezelf en anderen</li>
              <li>Brengt balans tussen emoties en rationaliteit</li>
              <li>Versterkt zelfliefde en zelfvertrouwen</li>
              <li>Ondersteunt bij het doorbreken van negatieve patronen</li>
            </ul>

            <p className="mb-4">
              <Link
                href="/alle-producten?search=rhodoniet"
                className="text-[#8B7355] hover:underline font-medium font-[family-name:var(--font-eb-garamond)]"
              >
                Bekijk Rhodoniet producten →
              </Link>
            </p>
          </section>

          <section id="rhodochrosiet">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              Rhodochrosiet – De Steen van Zelfliefde
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <strong>Rhodochrosiet</strong> straalt warmte en tederheid uit met zijn prachtige roze en witte banden. Hij versterkt eigenwaarde en helpt negatieve patronen te doorbreken. Dit is een krachtige steen voor wie worstelt met zelfkritiek of lage eigenwaarde.
            </p>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Werking van Rhodochrosiet
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li>Versterkt zelfliefde en eigenwaarde op diep niveau</li>
              <li>Helpt bij het doorbreken van negatieve overtuigingen</li>
              <li>Bevordert emotionele expressie en authenticiteit</li>
              <li>Ondersteunt bij het helen van jeugdtrauma's</li>
              <li>Brengt vreugde, warmte en tederheid in je leven</li>
            </ul>

            <p className="mb-4">
              <Link
                href="/alle-producten?search=rhodochrosiet"
                className="text-[#8B7355] hover:underline font-medium font-[family-name:var(--font-eb-garamond)]"
              >
                Bekijk Rhodochrosiet producten →
              </Link>
            </p>
          </section>

          <section id="smaragd">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              Smaragd – Voor Echte, Duurzame Liefde
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <strong>Smaragd</strong> is de edelsteen van diepe, oprechte liefde en spirituele verbondenheid. Door de eeuwen heen beschouwd als de steen van trouw en eeuwige liefde. Hij bevordert vertrouwen, eerlijkheid en spirituele verbondenheid tussen partners.
            </p>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Werking van Smaragd
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li>Verdiept liefde en bevordert trouw in relaties</li>
              <li>Ondersteunt eerlijkheid en open communicatie</li>
              <li>Bevordert spirituele verbondenheid tussen zielspartners</li>
              <li>Helpt bij het herstellen van vertrouwen</li>
              <li>Brengt harmonie en balans in langdurige relaties</li>
            </ul>

            <p className="mb-4">
              <Link
                href="/alle-producten?search=smaragd"
                className="text-[#8B7355] hover:underline font-medium font-[family-name:var(--font-eb-garamond)]"
              >
                Bekijk Smaragd producten →
              </Link>
            </p>
          </section>

          <section id="kunziet">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              Kunziet – Liefde vanuit het Hart
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <strong>Kunziet</strong> heeft een zachte, troostende energie die helpt om liefde en compassie te voelen. Met zijn delicate roze tot lila kleur verbindt hij je met universele liefde en geeft rust en vertrouwen. Perfect voor wie emotioneel afstand heeft genomen en opnieuw wil leren voelen.
            </p>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Werking van Kunziet
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li>Verbindt je met universele en onvoorwaardelijke liefde</li>
              <li>Troost bij emotionele pijn en verdriet</li>
              <li>Helpt bij het openstellen voor kwetsbaarheid</li>
              <li>Bevordert innerlijke rust en vertrouwen</li>
              <li>Ondersteunt bij meditatie en hartverbinding</li>
            </ul>

            <p className="mb-4">
              <Link
                href="/alle-producten?search=kunziet"
                className="text-[#8B7355] hover:underline font-medium font-[family-name:var(--font-eb-garamond)]"
              >
                Bekijk Kunziet producten →
              </Link>
            </p>
          </section>

          <section id="combinaties">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              Edelsteencombinaties voor Liefde
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Door verschillende hartchakra-stenen te combineren, kun je hun werking versterken en afstemmen op jouw specifieke behoefte. Hier zijn drie krachtige combinaties:
            </p>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              1. Rozenkwarts + Rhodoniet
            </h3>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <strong>Voor zelfacceptatie en innerlijke genezing:</strong> Rozenkwarts opent het hart met zachte energie, terwijl Rhodoniet helpt oude pijn te verwerken en los te laten. Samen creëren ze een krachtig veld voor emotionele heeling en zelfliefde.
            </p>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              2. Groene Aventurijn + Smaragd
            </h3>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <strong>Voor balans en duurzame liefde:</strong> Aventurijn brengt kalmte en emotionele groei, terwijl Smaragd diepe, trouwe liefde bevordert. Ideaal voor wie aan langdurige relaties werkt of nieuwe liefde wil manifesteren.
            </p>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              3. Kunziet + Bergkristal
            </h3>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <strong>Voor hogere liefde en spirituele verbinding:</strong> Kunziet verbindt je met universele liefde, terwijl Bergkristal deze energie versterkt en zuivert. Perfect voor meditatie en het verbinden met je hogere zelf.
            </p>
          </section>

          <section id="ritueel">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              Ritueel voor Zelfliefde
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Dit eenvoudige maar krachtige ritueel helpt je om je hart te openen voor zelfliefde en compassie. Voer het uit wanneer je je afgewezen, onzeker of emotioneel leeg voelt.
            </p>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Wat je nodig hebt
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li>Rozenkwarts (voor onvoorwaardelijke liefde)</li>
              <li>Rhodoniet (voor vergeving en genezing)</li>
              <li>Bergkristal (voor versterking)</li>
              <li>Een roze of witte kaars</li>
              <li>Rustige ruimte waar je niet gestoord wordt</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Het Ritueel
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li>Steek de kaars aan en neem enkele diepe ademhalingen</li>
              <li>Plaats de drie kristallen in een driehoek voor je, met Rozenkwarts bovenaan</li>
              <li>Leg je hand op je hart en sluit je ogen</li>
              <li>Zeg hardop of in gedachten: <em>"Ik ben liefde. Ik ben genoeg. Ik accepteer mezelf volledig."</em></li>
              <li>Voel de zachtheid in je hart groeien en het kristal onder je hand warm worden</li>
              <li>Blijf 5-10 minuten in deze energie zitten</li>
              <li>Bedank de kristallen en jezelf voor deze tijd van zelfliefde</li>
            </ol>

            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Herhaal dit ritueel dagelijks of wanneer je behoefte hebt aan extra zelfcompassie en liefde.
            </p>
          </section>

          <section id="reiniging">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              Reiniging en Opladen van Liefdesstenen
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Hartchakra-kristallen nemen veel emotionele energie op. Het is belangrijk om ze regelmatig te reinigen en op te laden, zodat ze afgestemd blijven op liefdevolle energie.
            </p>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Reinigen
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li><strong>Witte salie of Palo Santo:</strong> Beweeg de rook over de steen om zware energie te verwijderen</li>
              <li><strong>Seleniet:</strong> Plaats je liefdesstenen op een seleniet plaat voor natuurlijke zuivering</li>
              <li><strong>Klankschaal:</strong> Speel een klankschaal boven de kristallen voor energetische reiniging</li>
              <li><strong>Visualisatie:</strong> Stel je wit of roze licht voor dat door de steen stroomt en alle blokkades oplost</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Opladen
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li><strong>Maanlicht:</strong> Plaats de stenen tijdens volle maan buiten of op een vensterbank</li>
              <li><strong>Seleniet:</strong> Laat de kristallen minimaal 4 uur op een seleniet plaat liggen</li>
              <li><strong>Intentie:</strong> Houd de steen in je handen en visualiseer hem gevuld met roze, liefdevolle energie</li>
              <li><strong>Rozenkwarts cluster:</strong> Plaats kleinere liefdesstenen op een grote rozenkwarts cluster</li>
            </ul>

            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <strong>Belangrijk:</strong> Vermijd water voor Rhodochrosiet en Kunziet, omdat deze stenen gevoelig kunnen zijn voor vocht. Gebruik droge reinigingsmethoden.
            </p>
          </section>

          <section id="conclusie">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              Conclusie
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Liefde begint bij jezelf. Wanneer je liefde en zachtheid voelt van binnenuit, trek je automatisch meer liefde aan in je leven. Edelstenen zijn geen magische oplossing, maar krachtige ondersteuners op je reis naar meer zelfacceptatie, compassie en verbinding.
            </p>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Of je nu werkt aan het helen van oude pijn met Rhodoniet, je hart opent met Rozenkwarts, of diepe liefde cultiveert met Smaragd – elk kristal biedt zijn eigen unieke ondersteuning. Vertrouw je intuïtie bij het kiezen van jouw liefdesstenen en laat de energie van het hartchakra stromen.
            </p>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <strong>Onthoud:</strong> Je bent al liefde. De kristallen helpen je alleen herinneren aan wat altijd al in je aanwezig was.
            </p>
          </section>
        </div>

        <section className="border-t border-gray-200 pt-8 mt-8">
          <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)]">
            Ontdek Edelstenen voor Liefde bij StonesForHealth
          </h2>
          <p className="text-base text-gray-800 mb-6 font-[family-name:var(--font-eb-garamond)]">
            Bij <strong>StonesForHealth.nl</strong> vind je een ruime collectie Rozenkwarts, Rhodoniet, Groene Aventurijn, Smaragd en Kunziet. Elk stuk is zorgvuldig geselecteerd om jouw hart te openen en liefde te versterken. Van armbanden en kettingen tot losse stenen en meditatie-sets – alles om je reis naar meer zelfliefde en verbinding te ondersteunen.
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
              <Link href="/blog/chakras-uitgelegd-energiesysteem" className="text-[#8B7355] hover:underline">
                Chakra's Uitgelegd: Zo Werkt het Energiesysteem van je Lichaam
              </Link>
            </li>
            <li>
              <Link href="/blog/gouden-driehoek-amethist-bergkristal-rozenkwarts" className="text-[#8B7355] hover:underline">
                De Gouden Driehoek: Amethist, Bergkristal & Rozenkwarts
              </Link>
            </li>
            <li>
              <Link href="/blog/morganiet-rhodoniet-liefde-heling" className="text-[#8B7355] hover:underline">
                Morganiet & Rhodoniet: Edelstenen van Liefde & Heling
              </Link>
            </li>
            <li>
              <Link href="/blog/rozenkwarts-steen-van-de-liefde" className="text-[#8B7355] hover:underline">
                Rozenkwarts: De Steen van de Liefde en het Hartchakra
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
