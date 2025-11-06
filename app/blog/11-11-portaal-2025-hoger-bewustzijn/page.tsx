import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumbs from '@/app/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Het 11/11 Portaal van 2025 – Poort naar Hoger Bewustzijn | StonesForHealth',
  description: 'Ontdek de kracht van het 11/11 portaal 2025. Meestergetal voor manifestatie, spiritueel inzicht en bewustwording. Inclusief rituelen en beste edelstenen voor dit energetische moment.',
  keywords: [
    '11/11 portaal',
    '11 november 2025',
    'meestergetal 11',
    'spiritueel portaal',
    'manifestatie ritueel',
    '11/11 betekenis',
    'edelstenen 11/11',
    'hoger bewustzijn',
    'numerologie 11',
    'spirituele dag',
    'manifesteren 2025',
    'kristallen ritueel',
    'jupiter retrograde',
    'derde oog chakra',
  ],
  openGraph: {
    title: 'Het 11/11 Portaal van 2025 – Poort naar Hoger Bewustzijn',
    description: 'Ontdek de kracht van het 11/11 portaal. Meestergetal voor manifestatie en spiritueel inzicht.',
    type: 'article',
    publishedTime: '2025-11-06',
  },
  alternates: {
    canonical: 'https://stonesforhealth.nl/blog/11-11-portaal-2025-hoger-bewustzijn',
  },
};

export default function ElevenElevenPortaal2025() {
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Het 11/11 Portaal van 2025 – De Poort naar Hoger Bewustzijn en Manifestatiekracht",
    "description": "Ontdek de spirituele betekenis van het 11/11 portaal, de beste edelstenen voor dit moment en een krachtig ritueel voor manifestatie en bewustwording.",
    "image": "https://stonesforhealth.nl/blog-images/Het 11:11 Portaal van 2025 – De Poort naar Hoger Bewustzijn en Manifestatiekracht.jpeg",
    "datePublished": "2025-11-06T11:00:00Z",
    "dateModified": "2025-11-06T11:00:00Z",
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
            { name: '11/11 Portaal 2025', url: 'https://stonesforhealth.nl/blog/11-11-portaal-2025-hoger-bewustzijn' }
          ]}
        />

        <header className="mb-8 pb-6 border-b border-gray-200">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)]">
            Het 11/11 Portaal van 2025 – De Poort naar Hoger Bewustzijn en Manifestatiekracht
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <time dateTime="2025-11-06">6 november 2025</time>
            <span>•</span>
            <span>9 min leestijd</span>
          </div>
        </header>

        {/* Blog Image */}
        <div className="relative w-full h-64 sm:h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src="/blog-images/Het 11:11 Portaal van 2025 – De Poort naar Hoger Bewustzijn en Manifestatiekracht.jpeg"
            alt="Het 11/11 Portaal van 2025 – De Poort naar Hoger Bewustzijn en Manifestatiekracht"
            fill
            className="object-cover"
            priority
          />
        </div>

        <section className="mb-8">
          <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
            Elk jaar op <strong>11 november (11/11)</strong> opent zich een krachtig energetisch portaal dat spiritueel gezien symbool staat voor verlichting, intuïtie en manifestatie vanuit de ziel. Het is een dag waarop de sluier tussen de fysieke en spirituele wereld dunner wordt, waardoor hogere frequenties gemakkelijker toegankelijk zijn.
          </p>
          <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
            In de numerologie is het getal <strong>11 een meestergetal</strong> — het getal van spiritueel inzicht, ontwaking en verbinding met hogere dimensies. Het draagt een dubbele vibratie van het getal 1 (nieuwe begin, leiderschap, individuele kracht), waardoor het een versterkte energie van bewustwording en potentieel met zich meebrengt.
          </p>
          <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
            Wanneer dit getal zich verdubbelt tot <strong>11/11</strong>, ontstaat er een energetische poort die de kracht van manifestatie, intuïtie en spirituele groei exponentieel versterkt. Het is een dag om te manifesteren vanuit je hoogste zelf, oude patronen los te laten en nieuwe realiteiten te creëren.
          </p>
          <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
            In <strong>2025</strong> is dit portaal extra krachtig, omdat het samenvalt met <strong>Jupiter retrograde in Kreeft</strong>, wat de nadruk legt op innerlijke groei, emotionele heling en thuiskomen bij jezelf. Het universum nodigt je uit om naar binnen te keren en te manifesteren vanuit liefde en authenticiteit.
          </p>
        </section>

        <div className="space-y-8">
          <section id="spirituele-betekenis">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              Spirituele Betekenis van 11/11/2025
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Het <strong>11/11-portaal van 2025</strong> is een energetisch kruispunt — een moment waarop meerdere astrologische en numerologische krachten samenkomen om een uitzonderlijk krachtig veld te creëren.
            </p>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Wat gebeurt er tijdens het 11/11 Portaal?
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li><strong>Versnelde manifestatie:</strong> Gedachten, intenties en gevoelens krijgen sneller vorm in de fysieke realiteit</li>
              <li><strong>Helderziende momenten:</strong> Plotselinge inzichten, antwoorden op lange tijd gestelde vragen, synchroniciteiten</li>
              <li><strong>Emotionele doorbraken:</strong> Oude pijn komt naar boven om geheeld te worden — dit is géén toeval, maar deel van je groeiproces</li>
              <li><strong>Dromen en visioenen:</strong> Intensere dromen, astrale projecties, contact met gidsen of overledenen</li>
              <li><strong>Fysieke symptomen:</strong> Hoofdpijn (derde oog opening), hartkloppingen (hartchakra expansie), vermoeidheid (energetische upgrades)</li>
            </ul>

            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Deze periode voelt vaak <strong>intenser</strong>: je kunt emotioneler zijn, meer dromen of plotseling inzichten krijgen over je leven, relaties of zielsmissie. Dit is normaal — het portaal brengt alles naar de oppervlakte wat klaar is om getransformeerd te worden.
            </p>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              De Rol van Jupiter Retrograde in Kreeft
            </h3>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              In 2025 staat Jupiter retrograde in het teken Kreeft, wat de volgende thema's versterkt:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li><strong>Thuiskomen bij jezelf:</strong> Terug naar je innerlijke kern, je ware natuur</li>
              <li><strong>Emotionele heling:</strong> Familie patronen, jeugdtrauma's en oude wonden mogen genezen</li>
              <li><strong>Moederlijke energie:</strong> Zelfzorg, voeding, compassie voor jezelf en anderen</li>
              <li><strong>Veiligheid creëren:</strong> In jezelf, je huis, je relaties — alles wat "thuis" betekent</li>
            </ul>

            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Spiritueel gezien opent dit portaal de <strong>hogere chakra's</strong> (vooral het derde oog en kruinchakra) en brengt het kansen om oude zielscontracten te helen, karmische cycli af te ronden en je bewustzijn naar een hoger niveau te tillen.
            </p>
          </section>

          <section id="edelstenen">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              De Beste Edelstenen voor het 11/11 Portaal
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Kristallen zijn krachtige bondgenoten tijdens energetische portalen. Ze versterken je intenties, beschermen je energieveld en helpen de hogere frequenties te integreren. Hier zijn de <strong>5 essentiële edelstenen voor 11/11</strong>:
            </p>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              1. Bergkristal – Versterker van Intenties
            </h3>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              De ultieme manifestatiesteen. Bergkristal vergroot je focus en versterkt <em>elke</em> intentie die je uitspreekt. Zijn heldere, zuivere energie ampliceert alles waar hij mee in contact komt — daarom is het cruciaal om bewust te zijn van je gedachten en intenties wanneer je met Bergkristal werkt.
            </p>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <strong>Gebruik tijdens 11/11:</strong> Houd een Bergkristal punt vast tijdens meditatie terwijl je je intenties visualiseert. Of plaats hem in het midden van een kristalraster om de energie van alle andere stenen te versterken.
            </p>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              2. Amethist – Poort naar je Hogere Bewustzijn
            </h3>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Amethist is de perfecte steen om de krachtige energie van het 11/11-portaal rustig te integreren. Hij opent het derde oog en kroonchakra, waardoor je toegang krijgt tot spirituele inzichten, dromen en hogere wijsheid.
            </p>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <strong>Gebruik tijdens 11/11:</strong> Leg Amethist op je derde oog tijdens meditatie, of plaats hem op je nachtkastje voor helderziende dromen en boodschappen van je gidsen.
            </p>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              3. Labradoriet – Bescherming tegen Overprikkeling
            </h3>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Tijdens energetische portalen kan je gevoeliger zijn voor externe energie. Labradoriet beschermt tegen overprikkeling, energieën van anderen en negatieve invloeden. Hij versterkt je eigen aura en creëert een beschermend schild, terwijl hij tegelijkertijd je psychische vermogens activeert.
            </p>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <strong>Gebruik tijdens 11/11:</strong> Draag Labradoriet als hanger op hartchakra niveau, of houd hem vast wanneer je je overweldigd voelt door de intense energie.
            </p>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              4. Rozenkwarts – Manifesteren vanuit het Hart
            </h3>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Het 11/11 portaal is niet alleen voor mentale manifestatie — de krachtigste creaties komen vanuit het <strong>hart</strong>. Rozenkwarts helpt je om te manifesteren vanuit liefde, compassie en zuiverheid in plaats van angst of ego. Hij brengt harmonie in relaties en zachtheid in je energie.
            </p>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <strong>Gebruik tijdens 11/11:</strong> Leg Rozenkwarts op je hartchakra tijdens het ritueel, of schrijf je intenties op papier en leg de steen erop om ze te activeren met liefdesenergie.
            </p>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              5. Seleniet – Kanaal van Zuiver Licht
            </h3>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Seleniet heeft een extreem hoge trilling die directe toegang geeft tot engelen, gidsen en hogere dimensies. Het reinigt aura's en ruimtes en laat de hogere energie van 11/11 soepel doorstromen zonder blokkades. Seleniet werkt als een antenne voor kosmisch licht.
            </p>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <strong>Gebruik tijdens 11/11:</strong> Leg Seleniet staaf boven je hoofd tijdens meditatie om een directe verbinding te maken met hogere frequenties. Of gebruik hem om je andere kristallen te reinigen en opladen.
            </p>
          </section>

          <section id="ritueel">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              Krachtig Ritueel voor het 11/11 Portaal
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Dit ritueel helpt je om de energie van het 11/11 portaal bewust te activeren en te richten op wat je wilt manifesteren en loslaten. Plan <strong>minimaal 30-45 minuten</strong> ongestoorde tijd in.
            </p>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Voorbereiding
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li>Kies een rustige, schone ruimte waar je niet gestoord wordt</li>
              <li>Reinig de ruimte met witte salie, Palo Santo of wierook</li>
              <li>Steek een witte kaars aan (symbool voor zuiverheid en nieuw begin)</li>
              <li>Verzamel je edelstenen: Bergkristal, Amethist, Labradoriet, Rozenkwarts, Seleniet</li>
              <li>Neem pen en papier voor je intenties</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Het Ritueel (Stap voor Stap)
            </h3>
            <ol className="list-decimal list-inside space-y-3 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li>
                <strong>Reinig je stenen</strong> met witte salie of Palo Santo. Houd elke steen in de rook en stel je voor dat alle oude energie wegtrekt.
              </li>
              <li>
                <strong>Schrijf drie dingen op die je loslaat</strong> — dit kunnen zijn: oude overtuigingen, toxic relaties, angsten, gedragspatronen, of alles wat niet meer dient. Wees specifiek en eerlijk.
              </li>
              <li>
                <strong>Schrijf drie intenties die je wilt manifesteren</strong> — formuleer ze in de tegenwoordige tijd alsof ze al werkelijkheid zijn. Bijvoorbeeld: "Ik ben gezond en vol energie" in plaats van "Ik wil gezond worden".
              </li>
              <li>
                <strong>Leg je stenen in een heilige driehoek:</strong>
                <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                  <li>Bergkristal (boven) — voor versterking</li>
                  <li>Amethist (linksonder) — voor intuïtie</li>
                  <li>Labradoriet (rechtsonder) — voor bescherming</li>
                  <li>Rozenkwarts (midden) — voor liefde en hartenergie</li>
                  <li>Seleniet (boven Bergkristal) — als antenne naar hogere dimensies</li>
                </ul>
              </li>
              <li>
                <strong>Mediteer 11 minuten</strong> — Ga zitten, sluit je ogen en adem rustig. Visualiseer een straal van gouden licht dat vanuit het universum door je kroonchakra naar binnen stroomt. Voel hoe dit licht door je hele lichaam stroomt en elke cel vult met hogere frequenties.
              </li>
              <li>
                <strong>Spreek je intenties hardop uit</strong> — Lees je drie manifestatie-intenties voor. Voel de emotie alsof ze al werkelijkheid zijn. Dankbaarheid is de sleutel.
              </li>
              <li>
                <strong>Verbrand je loslaat-papier</strong> (veilig in een schaal) — Laat symbolisch los wat niet meer dient. Kijk hoe de rook opstijgt en transformeert.
              </li>
              <li>
                <strong>Sluit af met dankbaarheid en stilte</strong> — Bedank het universum, je gidsen en jezelf. Blijf nog 5-10 minuten zitten om de energie te integreren.
              </li>
            </ol>

            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <strong>Na het ritueel:</strong> Bewaar je manifestatie-papier onder een Bergkristal of Rozenkwarts. Laat je kristalraster minimaal 24 uur staan. De energie blijft doorwerken.
            </p>
          </section>

          <section id="na-portaal">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              Energie na het Portaal: Integratie & Nawerking
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              De energie van het 11/11-portaal werkt <strong>nog 10 tot 14 dagen door</strong>. Dit betekent dat je in de weken na 11 november nog steeds synchroniciteiten, inzichten en emotionele shifts kunt ervaren.
            </p>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Wat kun je verwachten?
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li><strong>Intense dromen:</strong> Je onderbewustzijn verwerkt de energetische upgrades</li>
              <li><strong>Plotselinge inzichten:</strong> Antwoorden, oplossingen, creatieve ideeën die "zomaar" komen</li>
              <li><strong>Vermoeidheid:</strong> Je lichaam integreert hogere frequenties — rust veel, drink water</li>
              <li><strong>Emotionele releases:</strong> Huilen, woede, of intense vreugde — alles mag er zijn</li>
              <li><strong>Synchroniciteiten:</strong> Je ziet 11:11 op de klok, ontmoet de juiste mensen op het juiste moment</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
              Ondersteunende Edelstenen voor Integratie
            </h3>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Gebruik zachte, grondende stenen om het proces te ondersteunen:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <li><strong>Howliet:</strong> Kalmeert een overactief brein en helpt je te slapen</li>
              <li><strong>Groene Aventurijn:</strong> Brengt hoop, groei en zachte hartenergie</li>
              <li><strong>Rozenkwarts:</strong> Blijft essentieel voor zelfliefde en emotionele balans</li>
              <li><strong>Rookkwarts:</strong> Grondt de hogere energie in je fysieke lichaam</li>
              <li><strong>Zwarte Toermalijn:</strong> Beschermt en absorbeert overtollige energie</li>
            </ul>

            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <strong>Vertrouw het proces:</strong> Alles wat naar boven komt — emoties, herinneringen, inzichten — komt omdat het klaar is om geheeld en getransformeerd te worden. Het 11/11 portaal werkt altijd voor je hoogste goed, zelfs als het even oncomfortabel voelt.
            </p>
          </section>

          <section id="conclusie">
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
              Conclusie: Omarm de Kracht van 11/11
            </h2>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Het <strong>11/11-portaal van 2025</strong> is geen gewone dag — het is een uitnodiging van het universum om te manifesteren vanuit liefde, vertrouwen en bewustzijn. Of je nu kiest voor een uitgebreid ritueel, stille meditatie of gewoon bewuste aandacht voor je gedachten en gevoelens, dit moment heeft de kracht om je leven te transformeren.
            </p>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              De combinatie van het meestergetal 11, Jupiter retrograde in Kreeft en de natuurlijke cyclus van herfst creëert een perfect klimaat voor <strong>innerlijke groei, emotionele heling en spirituele expansie</strong>. Dit is jouw moment om oude pijn los te laten, je hart te openen en de werkelijkheid te creëren die je ziel verlangt.
            </p>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              Gebruik de kracht van edelstenen — Bergkristal voor versterking, Amethist voor inzicht, Labradoriet voor bescherming, Rozenkwarts voor liefde en Seleniet voor verbinding met het goddelijke. Deze kristallen zijn niet alleen mooi — ze zijn <strong>levende energieën die jouw intenties amplificeren</strong> en je ondersteunen op je spirituele pad.
            </p>
            <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
              <strong>Dit portaal activeert je zielsenergie en opent de poort naar hoger bewustzijn. Vertrouw. Manifesteer. Ontwijk.</strong>
            </p>
          </section>
        </div>

        <section className="border-t border-gray-200 pt-8 mt-8">
          <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)]">
            Ontdek de Edelstenen voor het 11/11 Portaal bij StonesForHealth
          </h2>
          <p className="text-base text-gray-800 mb-6 font-[family-name:var(--font-eb-garamond)]">
            Bij <strong>StonesForHealth.nl</strong> vind je alle kristallen die je nodig hebt voor het 11/11 portaal en daarbuiten. Van Bergkristal en Amethist tot Seleniet en Rozenkwarts — elke steen is zorgvuldig geselecteerd op energie, kwaliteit en authentieke kracht. Bereid je voor op deze bijzondere dag en omarm de transformatie.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <Link
              href="/alle-producten"
              className="inline-block bg-[#8B7355] hover:bg-[#6D5A42] text-white px-8 py-3 text-center transition-colors font-medium font-[family-name:var(--font-eb-garamond)]"
            >
              Shop Alle Kristallen
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
              <Link href="/blog/volle-maan-november-2025" className="text-[#8B7355] hover:underline">
                Volle Maan November 2025: Beaver Moon Supermaan
              </Link>
            </li>
            <li>
              <Link href="/blog/amethist-soorten-werking-spirituele-tips" className="text-[#8B7355] hover:underline">
                Amethist: Soorten, Werking en Spirituele Tips
              </Link>
            </li>
            <li>
              <Link href="/blog/bergkristal-koning-kristallen" className="text-[#8B7355] hover:underline">
                Bergkristal - De Koning der Kristallen
              </Link>
            </li>
            <li>
              <Link href="/blog/numerologie-astrologie-taal-universum" className="text-[#8B7355] hover:underline">
                Numerologie & Astrologie - De Taal van het Universum
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
