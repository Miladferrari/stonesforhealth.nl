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
    question: 'Krijg ik een bevestiging van mijn bestelling?',
    answer: 'Ja, direct na uw bestelling ontvangt u een orderbevestiging per e-mail. Controleer ook uw spam/ongewenste e-mail map als u deze niet ziet. Wanneer uw bestelling is verzonden, ontvangt u een tweede e-mail met Track & Trace informatie.'
  },

  // Verzending & Levering
  {
    category: 'Verzending & Levering',
    question: 'Wat zijn de verzendkosten?',
    answer: 'Nederland: €3,95 | Gratis vanaf €30,- <br/> België: €5,95 | Gratis vanaf €50,- <br/> Duitsland & Frankrijk: €7,95 | Gratis vanaf €75,- <br/> Rest van Europa: €9,95 | Gratis vanaf €100,-'
  },
  {
    category: 'Verzending & Levering',
    question: 'Hoe lang duurt de levering?',
    answer: 'Nederland: 1-2 werkdagen <br/> België: 2-3 werkdagen <br/> Duitsland & Frankrijk: 3-5 werkdagen <br/> Rest van Europa: 4-7 werkdagen <br/> Bestellingen geplaatst voor 15:00 worden nog dezelfde dag verzonden (werkdagen).'
  },
  {
    category: 'Verzending & Levering',
    question: 'Kan ik mijn pakket volgen?',
    answer: 'Ja! Zodra uw bestelling is verzonden, ontvangt u een Track & Trace code per e-mail. Hiermee kunt u uw pakket realtime volgen tot aan de deur. Bij Nederlandse verzendingen ontvangt u ook een bezorgvenster via SMS.'
  },
  {
    category: 'Verzending & Levering',
    question: 'Wat als ik niet thuis ben bij levering?',
    answer: 'Als u niet thuis bent, laat de bezorger een kaartje achter. U kunt dan kiezen om het pakket op een ander moment te laten bezorgen of op te halen bij een PostNL of DPD afhaalpunt bij u in de buurt. Via de Track & Trace link kunt u ook vooraf een bezorgafspraak maken.'
  },

  // Retourneren & Garantie
  {
    category: 'Retourneren & Garantie',
    question: 'Wat is jullie retourbeleid?',
    answer: 'U heeft 30 dagen bedenktijd vanaf de ontvangst van uw bestelling. Als u niet tevreden bent, kunt u het product retourneren. Het product moet ongebruikt zijn en in de originele verpakking. Stuur een e-mail naar info@stonesforhealth.nl voor een retourlabel.'
  },
  {
    category: 'Retourneren & Garantie',
    question: 'Wie betaalt de retourkosten?',
    answer: 'Binnen Nederland zijn retourzendingen gratis - wij sturen u een retourlabel toe. Voor bestellingen buiten Nederland zijn de retourkosten voor eigen rekening. U ontvangt binnen 5-7 werkdagen na ontvangst van het retourproduct uw geld terug.'
  },
  {
    category: 'Retourneren & Garantie',
    question: 'Kan ik een product ruilen?',
    answer: 'Ja, dat kan! Neem contact met ons op via info@stonesforhealth.nl om een ruiling aan te vragen. Vermeld welk product u heeft ontvangen en welk product u graag wilt ontvangen. Wij regelen dan de ruiling voor u zonder extra kosten.'
  },
  {
    category: 'Retourneren & Garantie',
    question: 'Wat als mijn product beschadigd aankomt?',
    answer: 'Wij pakken al onze producten zorgvuldig in, maar soms kan er tijdens transport iets misgaan. Neem binnen 48 uur contact met ons op via info@stonesforhealth.nl met foto\'s van de schade. Wij sturen u dan direct een vervangend product of crediteren het volledige bedrag terug.'
  }
];

export default function FAQClient() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Alle');

  const categories = ['Alle', ...Array.from(new Set(faqData.map(item => item.category)))];
  const filteredFAQs = selectedCategory === 'Alle'
    ? faqData
    : faqData.filter(item => item.category === selectedCategory);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-[#f7f3ec] to-white py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-[family-name:var(--font-eb-garamond)]">
              Veelgestelde Vragen
            </h1>
            <p className="mt-4 text-lg text-gray-600 font-[family-name:var(--font-eb-garamond)]">
              Vind snel antwoord op uw vragen over onze edelstenen, bestellen, verzending en meer
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setOpenIndex(null);
              }}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all font-[family-name:var(--font-eb-garamond)] ${
                selectedCategory === category
                  ? 'bg-[#492c4a] text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-8 font-[family-name:var(--font-eb-garamond)]">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-[#492c4a] flex-shrink-0 transition-transform ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 text-gray-600 leading-relaxed font-[family-name:var(--font-eb-garamond)]">
                  <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 bg-gradient-to-r from-[#492c4a] to-[#6b4069] rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-3 font-[family-name:var(--font-eb-garamond)]">
            Vraag niet beantwoord?
          </h2>
          <p className="text-white/90 mb-6 font-[family-name:var(--font-eb-garamond)]">
            Ons klantenserviceteam staat klaar om u te helpen
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-[#492c4a] px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors font-[family-name:var(--font-eb-garamond)]"
          >
            Neem contact op
          </a>
        </div>
      </div>
    </div>
  );
}
