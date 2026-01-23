import type { Metadata } from 'next';
import FAQClient from './FAQClient';
import JsonLd from '@/app/components/JsonLd';

export const metadata: Metadata = {
  title: 'Veelgestelde Vragen (FAQ) - Edelstenen & Kristallen | StonesForHealth',
  description: 'Vind antwoorden op al uw vragen over edelstenen, kristallen, verzending, retourneren en meer. Ontdek alles wat u moet weten bij StonesForHealth.',
  keywords: [
    'faq edelstenen',
    'veelgestelde vragen kristallen',
    'edelstenen info',
    'kristallen verzending',
    'retourbeleid edelstenen'
  ],
  openGraph: {
    title: 'Veelgestelde Vragen (FAQ) | StonesForHealth',
    description: 'Vind antwoorden op al uw vragen over edelstenen, kristallen, verzending en meer.',
    url: 'https://stonesforhealth.nl/faq',
    siteName: 'Stones for Health',
    locale: 'nl_NL',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 1024,
        height: 1024,
        alt: 'Stones for Health - FAQ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Veelgestelde Vragen (FAQ) | StonesForHealth',
    description: 'Vind antwoorden op al uw vragen over edelstenen, kristallen, verzending en meer.',
    images: ['/logo.png'],
  },
  alternates: {
    canonical: 'https://stonesforhealth.nl/faq',
  },
};

// FAQ data for schema markup
const faqDataForSchema = [
  {
    question: 'Zijn jullie kristallen en edelstenen echt?',
    answer: 'Ja, absoluut! Alle kristallen en edelstenen die wij verkopen zijn 100% natuurlijk en authentiek. Wij werken alleen met betrouwbare leveranciers die de echtheid van hun producten kunnen garanderen. Elke steen is uniek en kan daarom licht afwijken in kleur, vorm en grootte van de foto\'s op onze website.'
  },
  {
    question: 'Hoe weet ik welke steen bij mij past?',
    answer: 'Elke steen heeft zijn eigen unieke eigenschappen en energie. Op onze productpagina\'s vindt u uitgebreide informatie over de eigenschappen van elke steen. U kunt ook onze persoonlijke steen quiz doen om te ontdekken welke kristallen het beste bij uw behoeften passen. Vertrouw ook op uw intuïtie - vaak voelt u zich aangetrokken tot de steen die u op dat moment nodig heeft.'
  },
  {
    question: 'Kunnen kristallen genezen?',
    answer: 'Kristallen en edelstenen worden al eeuwenlang gebruikt voor hun vermeende spirituele en energetische eigenschappen. Echter, het is belangrijk te vermelden dat kristallen geen vervanging zijn voor medische behandeling. Ze kunnen wel een aanvulling zijn op uw welzijn en persoonlijke ontwikkeling. Raadpleeg altijd een arts voor gezondheidskwesties.'
  },
  {
    question: 'Hoe onderhoud ik mijn kristallen?',
    answer: 'Kristallen kunnen gereinigd worden met lauwwarm water en een zachte doek. Sommige kristallen kunnen niet tegen water (zoals seleniet), dus check altijd eerst de verzorgingsinstructies. Energetisch reinigen kan door ze in maanlicht te plaatsen, met wierook te smudgen of op een amethist cluster te leggen. Opladen doet u door ze in zonlicht te plaatsen (let op: sommige stenen kunnen verkleuren).'
  },
  {
    question: 'Hoe kan ik betalen?',
    answer: 'Wij accepteren verschillende veilige betaalmethoden: iDEAL (Nederland), Bancontact (België), Visa, Mastercard en andere creditcards. Alle betalingen worden veilig verwerkt via Stripe, een van de meest betrouwbare betalingsplatformen ter wereld.'
  },
  {
    question: 'Is online betalen bij jullie veilig?',
    answer: 'Ja, zeer zeker! Onze website gebruikt SSL-beveiliging en alle betalingen worden verwerkt via Stripe, dat voldoet aan de hoogste veiligheidsnormen (PCI-DSS Level 1). Wij slaan geen creditcardgegevens op onze servers op. Uw betaalgegevens zijn dus volledig veilig.'
  },
  {
    question: 'Kan ik mijn bestelling wijzigen of annuleren?',
    answer: 'U kunt uw bestelling wijzigen of annuleren zolang deze nog niet is verzonden. Neem zo snel mogelijk contact met ons op via info@stonesforhealth.nl met uw ordernummer. Als uw bestelling al is verzonden, kunt u gebruik maken van ons retourrecht van 30 dagen.'
  },
  {
    question: 'Krijg ik een bevestiging van mijn bestelling?',
    answer: 'Ja, direct na uw bestelling ontvangt u een orderbevestiging per e-mail. Controleer ook uw spam/ongewenste e-mail map als u deze niet ziet. Wanneer uw bestelling is verzonden, ontvangt u een tweede e-mail met Track & Trace informatie.'
  },
  {
    question: 'Wat zijn de verzendkosten?',
    answer: 'Nederland: €3,95 (Gratis vanaf €30). België: €5,95 (Gratis vanaf €50). Duitsland & Frankrijk: €7,95 (Gratis vanaf €75). Rest van Europa: €9,95 (Gratis vanaf €100).'
  },
  {
    question: 'Hoe lang duurt de levering?',
    answer: 'Nederland: 1-2 werkdagen. België: 2-3 werkdagen. Duitsland & Frankrijk: 3-5 werkdagen. Rest van Europa: 4-7 werkdagen. Bestellingen geplaatst voor 15:00 worden nog dezelfde dag verzonden (werkdagen).'
  },
  {
    question: 'Kan ik mijn pakket volgen?',
    answer: 'Ja! Zodra uw bestelling is verzonden, ontvangt u een Track & Trace code per e-mail. Hiermee kunt u uw pakket realtime volgen tot aan de deur. Bij Nederlandse verzendingen ontvangt u ook een bezorgvenster via SMS.'
  },
  {
    question: 'Wat als ik niet thuis ben bij levering?',
    answer: 'Als u niet thuis bent, laat de bezorger een kaartje achter. U kunt dan kiezen om het pakket op een ander moment te laten bezorgen of op te halen bij een PostNL of DPD afhaalpunt bij u in de buurt. Via de Track & Trace link kunt u ook vooraf een bezorgafspraak maken.'
  },
  {
    question: 'Wat is jullie retourbeleid?',
    answer: 'U heeft 30 dagen bedenktijd vanaf de ontvangst van uw bestelling. Als u niet tevreden bent, kunt u het product retourneren. Het product moet ongebruikt zijn en in de originele verpakking. Stuur een e-mail naar info@stonesforhealth.nl voor een retourlabel.'
  },
  {
    question: 'Wie betaalt de retourkosten?',
    answer: 'Binnen Nederland zijn retourzendingen gratis - wij sturen u een retourlabel toe. Voor bestellingen buiten Nederland zijn de retourkosten voor eigen rekening. U ontvangt binnen 5-7 werkdagen na ontvangst van het retourproduct uw geld terug.'
  },
  {
    question: 'Kan ik een product ruilen?',
    answer: 'Ja, dat kan! Neem contact met ons op via info@stonesforhealth.nl om een ruiling aan te vragen. Vermeld welk product u heeft ontvangen en welk product u graag wilt ontvangen. Wij regelen dan de ruiling voor u zonder extra kosten.'
  },
  {
    question: 'Wat als mijn product beschadigd aankomt?',
    answer: 'Wij pakken al onze producten zorgvuldig in, maar soms kan er tijdens transport iets misgaan. Neem binnen 48 uur contact met ons op via info@stonesforhealth.nl met foto\'s van de schade. Wij sturen u dan direct een vervangend product of crediteren het volledige bedrag terug.'
  }
];

// FAQPage Schema for Google Rich Snippets
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqDataForSchema.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};

export default function FAQPage() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <FAQClient />
    </>
  );
}
