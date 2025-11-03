'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  // Producten & Kwaliteit
  {
    category: 'Producten & Kwaliteit',
    question: 'Zijn jullie kristallen en edelstenen echt?',
    answer: 'Ja, absoluut! Alle kristallen en edelstenen die wij verkopen zijn 100% natuurlijk en authentiek. Wij werken alleen met betrouwbare leveranciers die de echtheid van hun producten kunnen garanderen. Elke steen is uniek en kan daarom licht afwijken in kleur, vorm en grootte van de foto\'s op onze website.'
  },
  {
    category: 'Producten & Kwaliteit',
    question: 'Hoe weet ik welke steen bij mij past?',
    answer: 'Elke steen heeft zijn eigen unieke eigenschappen en energie. Op onze productpagina\'s vindt u uitgebreide informatie over de eigenschappen van elke steen. U kunt ook onze persoonlijke steen quiz doen om te ontdekken welke kristallen het beste bij uw behoeften passen. Vertrouw ook op uw intuïtie - vaak voelt u zich aangetrokken tot de steen die u op dat moment nodig heeft.'
  },
  {
    category: 'Producten & Kwaliteit',
    question: 'Kunnen kristallen genezen?',
    answer: 'Kristallen en edelstenen worden al eeuwenlang gebruikt voor hun vermeende spirituele en energetische eigenschappen. Echter, het is belangrijk te vermelden dat kristallen geen vervanging zijn voor medische behandeling. Ze kunnen wel een aanvulling zijn op uw welzijn en persoonlijke ontwikkeling. Raadpleeg altijd een arts voor gezondheidskwesties.'
  },
  {
    category: 'Producten & Kwaliteit',
    question: 'Hoe onderhoud ik mijn kristallen?',
    answer: 'Kristallen kunnen gereinigd worden met lauwwarm water en een zachte doek. Sommige kristallen kunnen niet tegen water (zoals seleniet), dus check altijd eerst de verzorgingsinstructies. Energetisch reinigen kan door ze in maanlicht te plaatsen, met wierook te smudgen of op een amethist cluster te leggen. Opladen doet u door ze in zonlicht te plaatsen (let op: sommige stenen kunnen verkleuren).'
  },

  // Bestellen & Betalen
  {
    category: 'Bestellen & Betalen',
    question: 'Hoe kan ik betalen?',
    answer: 'Wij accepteren verschillende veilige betaalmethoden: iDEAL (Nederland), Bancontact (België), Visa, Mastercard en andere creditcards. Alle betalingen worden veilig verwerkt via Stripe, een van de meest betrouwbare betalingsplatformen ter wereld.'
  },
  {
    category: 'Bestellen & Betalen',
    question: 'Is online betalen bij jullie veilig?',
    answer: 'Ja, zeer zeker! Onze website gebruikt SSL-beveiliging en alle betalingen worden verwerkt via Stripe, dat voldoet aan de hoogste veiligheidsnormen (PCI-DSS Level 1). Wij slaan geen creditcardgegevens op onze servers op. Uw betaalgegevens zijn dus volledig veilig.'
  },
  {
    category: 'Bestellen & Betalen',
    question: 'Kan ik mijn bestelling wijzigen of annuleren?',
    answer: 'U kunt uw bestelling wijzigen of annuleren zolang deze nog niet is verzonden. Neem zo snel mogelijk contact met ons op via info@stonesforhealth.nl met uw ordernummer. Als uw bestelling al is verzonden, kunt u gebruik maken van ons retourrecht van 30 dagen.'
  },
  {
    category: 'Bestellen & Betalen',
    question: 'Krijg ik een factuur bij mijn bestelling?',
    answer: 'Ja, u ontvangt automatisch een factuur per e-mail na het plaatsen van uw bestelling. Deze factuur kunt u gebruiken voor uw administratie. Heeft u de factuur niet ontvangen? Check uw spam folder of neem contact met ons op.'
  },

  // Verzending
  {
    category: 'Verzending',
    question: 'Naar welke landen verzenden jullie?',
    answer: 'Wij verzenden momenteel naar Nederland en België. We werken aan uitbreiding naar andere EU-landen. Voor vragen over verzending naar andere landen kunt u contact met ons opnemen.'
  },
  {
    category: 'Verzending',
    question: 'Hoeveel zijn de verzendkosten?',
    answer: 'Voor Nederland en België: €4,95 voor bestellingen onder €30, gratis verzending vanaf €30. Alle bestellingen worden verzonden met track & trace.'
  },
  {
    category: 'Verzending',
    question: 'Hoe lang duurt de verzending?',
    answer: 'Bestellingen geplaatst voor 16:00 uur worden dezelfde werkdag nog verzonden. Levertijd in Nederland: 1-2 werkdagen. Levertijd in België: 2-3 werkdagen. U ontvangt een track & trace code zodra uw pakket onderweg is.'
  },
  {
    category: 'Verzending',
    question: 'Hoe wordt mijn bestelling verpakt?',
    answer: 'Wij verpakken uw kristallen met de grootste zorg. Elk kristal wordt individueel verpakt in zacht materiaal om beschadiging tijdens transport te voorkomen. We gebruiken milieuvriendelijke verpakkingsmaterialen waar mogelijk. Grotere of breekbare stenen krijgen extra bescherming.'
  },

  // Retourneren
  {
    category: 'Retourneren',
    question: 'Wat is jullie retourbeleid?',
    answer: 'U heeft 30 dagen bedenktijd vanaf ontvangst van uw bestelling. Producten kunnen geretourneerd worden in originele staat en verpakking. De retourkosten zijn voor eigen rekening. Na ontvangst en goedkeuring van de retour, ontvangt u binnen 14 dagen uw geld terug.'
  },
  {
    category: 'Retourneren',
    question: 'Hoe stuur ik een bestelling terug?',
    answer: 'Stuur eerst een e-mail naar info@stonesforhealth.nl met uw ordernummer en de reden van retour. U ontvangt van ons instructies voor het retourneren. Verpak de producten goed en stuur ze naar: Stones for Health, Koperhoek 54, 3162 LA Rhoon. Gebruik bij voorkeur een verzendmethode met track & trace.'
  },
  {
    category: 'Retourneren',
    question: 'Wanneer krijg ik mijn geld terug?',
    answer: 'Zodra wij uw retour hebben ontvangen en goedgekeurd, storten wij binnen 14 dagen het aankoopbedrag terug via dezelfde betaalmethode als waarmee u heeft betaald. U ontvangt een bevestiging per e-mail zodra de terugbetaling is verwerkt.'
  },

  // Account & Privacy
  {
    category: 'Account & Privacy',
    question: 'Moet ik een account aanmaken om te bestellen?',
    answer: 'Nee, u kunt ook als gast bestellen zonder account aan te maken. Een account heeft wel voordelen: u kunt uw bestelgeschiedenis bekijken, sneller afrekenen bij een volgende bestelling en uw favoriete producten opslaan.'
  },
  {
    category: 'Account & Privacy',
    question: 'Hoe gaan jullie om met mijn gegevens?',
    answer: 'Wij behandelen uw persoonsgegevens met de grootste zorg en volgens de AVG/GDPR wetgeving. Uw gegevens worden alleen gebruikt voor het verwerken van uw bestelling en worden nooit verkocht aan derden. Lees ons volledige privacybeleid voor meer informatie.'
  },
  {
    category: 'Account & Privacy',
    question: 'Hoe kan ik mijn nieuwsbrief voorkeuren wijzigen?',
    answer: 'In elke nieuwsbrief vindt u onderaan een uitschrijflink. U kunt ook een e-mail sturen naar info@stonesforhealth.nl om uw voorkeuren aan te passen of u uit te schrijven. We respecteren uw keuze direct.'
  },

  // Contact & Service
  {
    category: 'Contact & Service',
    question: 'Hoe kan ik contact met jullie opnemen?',
    answer: 'U kunt ons bereiken via e-mail: info@stonesforhealth.nl. Wij streven ernaar om binnen 24 uur op werkdagen te reageren. Voor dringende vragen over uw bestelling vermeld dan altijd uw ordernummer.'
  },
  {
    category: 'Contact & Service',
    question: 'Hebben jullie een fysieke winkel?',
    answer: 'Momenteel opereren wij alleen online. Dit stelt ons in staat om de beste prijzen aan te bieden en een breed assortiment te hebben. Wel organiseren we regelmatig evenementen waar u onze kristallen kunt bekijken. Houd onze nieuwsbrief in de gaten voor aankondigingen!'
  },
  {
    category: 'Contact & Service',
    question: 'Bieden jullie groothandel of B2B diensten aan?',
    answer: 'Ja, wij leveren ook aan bedrijven, therapeuten en wederverkopers. Voor groothandel prijzen en voorwaarden kunt u contact opnemen via info@stonesforhealth.nl. Vermeld "B2B aanvraag" in het onderwerp.'
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Alle');

  const categories = ['Alle', ...Array.from(new Set(faqData.map(item => item.category)))];

  const filteredFAQ = selectedCategory === 'Alle'
    ? faqData
    : faqData.filter(item => item.category === selectedCategory);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-[family-name:var(--font-eb-garamond)] text-gray-900 mb-4">
            Veelgestelde Vragen
          </h1>
          <p className="text-lg font-[family-name:var(--font-eb-garamond)] text-gray-600">
            Vind snel antwoord op uw vragen over onze producten, bestellingen en services
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-[family-name:var(--font-eb-garamond)] transition-all ${
                selectedCategory === category
                  ? 'bg-[#492c4a] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQ.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-[#492c4a] focus:ring-opacity-50 rounded-lg"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold font-[family-name:var(--font-eb-garamond)] text-gray-900 pr-8">
                    {item.question}
                  </h3>
                  {selectedCategory === 'Alle' && (
                    <span className="text-sm text-[#492c4a] font-[family-name:var(--font-eb-garamond)] mt-1 inline-block">
                      {item.category}
                    </span>
                  )}
                </div>
                <svg
                  className={`w-5 h-5 text-gray-500 transform transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)] leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 p-8 bg-gradient-to-br from-[#492c4a]/5 to-[#6b4069]/5 rounded-lg text-center">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-eb-garamond)] text-gray-900 mb-4">
            Staat uw vraag er niet bij?
          </h2>
          <p className="text-gray-700 mb-6 font-[family-name:var(--font-eb-garamond)]">
            Geen probleem! Ons team staat klaar om al uw vragen te beantwoorden.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:info@stonesforhealth.nl"
              className="inline-block bg-[#492c4a] text-white px-8 py-3 rounded-xl font-[family-name:var(--font-eb-garamond)] font-semibold hover:bg-[#6b4069] transition-colors"
            >
              Stuur een e-mail
            </a>
            <a
              href="/contact"
              className="inline-block bg-white border-2 border-[#492c4a] text-[#492c4a] px-8 py-3 rounded-xl font-[family-name:var(--font-eb-garamond)] font-semibold hover:bg-[#492c4a] hover:text-white transition-colors"
            >
              Contactpagina
            </a>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex justify-center items-center space-x-8 text-gray-500">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-[family-name:var(--font-eb-garamond)]">Snelle reactie</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-sm font-[family-name:var(--font-eb-garamond)]">Betrouwbaar advies</span>
          </div>
        </div>
      </div>
    </div>
  );
}