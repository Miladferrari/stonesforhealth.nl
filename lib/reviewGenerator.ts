// Review generation system for realistic product reviews

interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  date: string;
  verified: boolean;
  text: string;
  reply?: {
    author: string;
    date: string;
    text: string;
  };
}

// Dutch first names for realistic reviews
const firstNames = [
  "Sarah", "Mark", "Lisa", "Peter", "Emma", "Johan", "Anna", "Thomas", "Sophie", "Daan",
  "Julia", "Luuk", "Eva", "Sem", "Lotte", "Tim", "Sanne", "Bram", "Fleur", "Jesse",
  "Maud", "Ruben", "Anne", "Lars", "Iris", "Nick", "Amber", "Thijs", "Isa", "Finn",
  "Nina", "Max", "Esmee", "Lucas", "Zoe", "Milan", "Noa", "Jasper", "Tess", "Levi"
];

const lastNames = [
  "van der Meer", "Jansen", "de Boer", "Bakker", "Visser", "van den Berg", "van Dijk",
  "de Vries", "van der Laan", "de Groot", "Hendriks", "Mulder", "Peters", "van Leeuwen",
  "Dekker", "van der Veen", "Willems", "Smit", "de Jong", "van der Heijden"
];

const cities = [
  "Amsterdam", "Rotterdam", "Den Haag", "Utrecht", "Eindhoven", "Tilburg", "Groningen",
  "Almere", "Breda", "Nijmegen", "Apeldoorn", "Haarlem", "Arnhem", "Enschede", "Amersfoort",
  "Zaanstad", "Den Bosch", "Zwolle", "Leiden", "Maastricht", "Dordrecht", "Ede", "Alphen aan den Rijn"
];

const reviewTexts = {
  5: [
    "Prachtige steen! Heel blij met mijn aankoop.",
    "Mooie kwaliteit en goede energie. Aanrader!",
    "Precies wat ik zocht, super tevreden.",
    "Geweldige kristal met fijne vibraties.",
    "Heel mooi exemplaar, snel geleverd ook.",
    "Perfect voor meditatie, ben er heel blij mee.",
    "Mooie heldere steen, zoals op de foto.",
    "Uitstekende kwaliteit, zeker de moeite waard.",
    "Prachtige kleuren en goede energie.",
    "Top kwaliteit! Heel tevreden met deze aankoop."
  ],
  4: [
    "Mooi kristal, goede kwaliteit.",
    "Tevreden met mijn aankoop, fijne steen.",
    "Goede prijs-kwaliteit verhouding.",
    "Mooie steen, gebruik hem regelmatig.",
    "Prima kristal voor de prijs.",
    "Netjes verpakt en snel geleverd.",
    "Zoals verwacht, ben er blij mee.",
    "Goede energie, mooi formaat.",
    "Fijne toevoeging aan mijn collectie.",
    "Zeker tevreden, mooie kleuren."
  ],
  3: [
    "Prima steen, doet wat het moet doen.",
    "Redelijk tevreden, goede basis kwaliteit.",
    "Okay voor de prijs, netjes.",
    "Voldoet aan verwachtingen.",
    "Aardig kristal, correct beschreven.",
    "Gemiddelde kwaliteit maar wel mooi.",
    "Voor beginners een goede keuze.",
    "Basis kwaliteit, netjes voor de prijs."
  ],
  2: [
    "Iets kleiner dan verwacht maar wel mooi.",
    "Had iets meer verwacht maar is okay.",
    "Redelijke kwaliteit, niet bijzonder.",
    "Voldoende maar niet super."
  ],
  1: [
    "Helaas niet wat ik verwacht had.",
    "Jammer, voldeed niet aan verwachtingen."
  ]
};

const timeAgo = [
  "2 dagen geleden", "3 dagen geleden", "5 dagen geleden",
  "1 week geleden", "2 weken geleden", "3 weken geleden",
  "1 maand geleden", "6 weken geleden", "2 maanden geleden",
  "3 maanden geleden"
];

// Custom reviews for specific products (Wierook brander - product ID 3234)
const customProductReviews: { [key: number]: Review[] } = {
  3234: [
    { id: 1, name: "Marieke, 35 jaar", location: "Amsterdam", rating: 5, date: "19 december 2024", verified: true, text: "Prachtige backflow-brander. De rook waterval is rustgevend om naar te kijken. Snelle levering en goed verpakt." },
    { id: 2, name: "Ahmed, 39 jaar", location: "Rotterdam", rating: 5, date: "23 december 2024", verified: true, text: "Mooi product, precies wat ik zocht. Gebruik hem elke avond in de woonkamer. Geeft echt sfeer en ontspanning. Ook stevig materiaal, voelt niet goedkoop aan." },
    { id: 3, name: "Sanne, 33 jaar", location: "Utrecht", rating: 5, date: "28 december 2024", verified: true, text: "Eerlijk gezegd had ik niet verwacht dat het zo'n mooi effect zou hebben. De rook valt echt naar beneden, heel bijzonder om te zien. En de levering was netjes binnen 2 dagen." },
    { id: 4, name: "Peter, 38 jaar", location: "Eindhoven", rating: 4, date: "6 januari 2025", verified: true, text: "Goede prijs/kwaliteit. Soms moet ik even prutsen met het kegeltje om de rook mooi te laten stromen. Verder gewoon tevreden." },
    { id: 5, name: "Judith, 40 jaar", location: "Den Haag", rating: 4, date: "15 januari 2025", verified: true, text: "Mooi ding, werkt goed. Alleen de kleur was net wat anders dan op de foto, wat lichter. Niet storend, maar daarom geen 5 sterren." },
    { id: 6, name: "Tom, 36 jaar", location: "Groningen", rating: 5, date: "22 januari 2025", verified: true, text: "Superblij mee! Staat prachtig in mijn meditatiehoek. Tip: gebruik kleinere kegeltjes, dan loopt de rook mooier naar beneden." },
    { id: 7, name: "Lotte, 34 jaar", location: "Breda", rating: 5, date: "1 februari 2025", verified: true, text: "Fantastisch product, geeft direct sfeer in huis. Ook netjes verpakt ontvangen, niks beschadigd." },
    { id: 8, name: "Bas, 45 jaar", location: "Nijmegen", rating: 4, date: "7 februari 2025", verified: true, text: "Werkt prima. Soms moet ik het kegeltje opnieuw aansteken, maar dat ligt misschien meer aan de wierook dan aan de brander zelf." },
    { id: 9, name: "Farida, 31 jaar", location: "Tilburg", rating: 5, date: "14 februari 2025", verified: true, text: "Echt een aanrader. Heel stijlvol in de woonkamer en de rookval is subtiel maar mooi. Klantenservice reageerde ook snel op mijn vraag." },
    { id: 10, name: "Mark, 43 jaar", location: "Arnhem", rating: 5, date: "20 februari 2025", verified: true, text: "Precies zoals omschreven. De steen is stevig en ziet er luxe uit. Gebruik hem nu bijna dagelijks, heel tevreden." },
    { id: 11, name: "Ellen, 37 jaar", location: "Almere", rating: 3, date: "26 februari 2025", verified: true, text: "Leuk idee, maar soms werkt het bij mij niet goed. Rook trekt omhoog in plaats van naar beneden. Misschien verkeerd soort kegels gebruikt? Verder prima levering." },
    { id: 12, name: "Mehmet, 41 jaar", location: "Haarlem", rating: 3, date: "3 maart 2025", verified: true, text: "Het design vind ik prachtig, maar de rook valt niet altijd netjes. Beetje wisselend resultaat dus. Voor de prijs wel oké." },
    { id: 13, name: "Ingrid, 39 jaar", location: "Apeldoorn", rating: 5, date: "11 maart 2025", verified: true, text: "Gebruik hem elke avond, geeft veel rust. Levering was snel en netjes. Erg blij mee." },
    { id: 14, name: "Jeroen, 44 jaar", location: "Enschede", rating: 4, date: "18 maart 2025", verified: true, text: "Mooi product, maar zet hem niet in een tochtige ruimte want dan werkt de rookstroom minder. In een rustige kamer is het echt top." },
    { id: 15, name: "Anouk, 32 jaar", location: "Leiden", rating: 5, date: "25 maart 2025", verified: true, text: "Heel tevreden! De rookwaterval ziet er prachtig uit, zeker in het donker met kaarslicht erbij." },
    {
      id: 16,
      name: "Rob, 40 jaar",
      location: "Maastricht",
      rating: 1,
      date: "15 oktober 2024",
      verified: true,
      text: "5 oktober 2 besteld, maar na 6 dagen nog steeds niks ontvangen, belachelijk. Wanneer krijg ik mijn product wel binnen? Anders wil ik mijn geld terug!!",
      reply: {
        author: "Team Stonesforhealth",
        date: "16 oktober 2024",
        text: "Beste Rob,\n\nBedankt voor het achterlaten van je review. We vinden het erg jammer dat dit zo is gelopen. Door de enorme drukte kan het helaas zijn dat jouw pakket per ongeluk is blijven liggen in ons magazijn. Onze excuses hiervoor!\n\nWe hebben jouw bestelling inmiddels direct opnieuw verzonden. Daarnaast ontvang je van ons een gratis S4H armband en een kortingsvoucher van 10% voor je volgende bestelling in onze webshop, als kleine tegemoetkoming voor het ongemak.\n\nGroetjes,\nTeam Stonesforhealth"
      }
    }
  ]
};

// Generate review data based on product ID
export function generateProductReviewData(productId: number) {
  // Check if this product has custom reviews
  if (customProductReviews[productId]) {
    const customReviews = customProductReviews[productId];
    const reviewCount = customReviews.length;

    // Calculate average rating from custom reviews
    const totalRating = customReviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = totalRating / reviewCount;

    // Calculate distribution
    const distribution = [
      { stars: 5, count: customReviews.filter(r => r.rating === 5).length },
      { stars: 4, count: customReviews.filter(r => r.rating === 4).length },
      { stars: 3, count: customReviews.filter(r => r.rating === 3).length },
      { stars: 2, count: customReviews.filter(r => r.rating === 2).length },
      { stars: 1, count: customReviews.filter(r => r.rating === 1).length }
    ];

    return {
      totalReviews: reviewCount,
      averageRating: averageRating.toFixed(1),
      distribution: distribution.map((d, i) => ({
        stars: 5 - i,
        percentage: Math.round((d.count / reviewCount) * 100),
        count: d.count
      })),
      reviews: customReviews
    };
  }

  // Default: Generate reviews dynamically
  const seed = productId || 1;

  // Generate review count between 3-60
  const minReviews = 3;
  const maxReviews = 60;
  const reviewCount = minReviews + (seed * 7) % (maxReviews - minReviews + 1);

  // Generate rating between 4.0-5.0 (always positive reviews)
  const baseRating = 4.0;
  const ratingVariation = ((seed * 3) % 11) / 10; // 0.0 to 1.0
  const averageRating = Math.min(baseRating + ratingVariation, 5.0);

  // Calculate realistic star distribution
  const distribution = calculateDistribution(reviewCount, averageRating);

  // Generate individual reviews
  const reviews = generateIndividualReviews(productId, reviewCount, distribution, averageRating);

  return {
    totalReviews: reviewCount,
    averageRating: averageRating.toFixed(1),
    distribution: distribution.map((d, i) => ({
      stars: 5 - i,
      percentage: Math.round((d.count / reviewCount) * 100),
      count: d.count
    })),
    reviews: reviews
  };
}

function calculateDistribution(total: number, targetAvg: number): {stars: number, count: number}[] {
  // Start with a realistic distribution
  let distribution = [
    { stars: 5, count: 0 },
    { stars: 4, count: 0 },
    { stars: 3, count: 0 },
    { stars: 2, count: 0 },
    { stars: 1, count: 0 }
  ];

  // Calculate distribution to achieve target average (always 4.0 or higher)
  if (targetAvg >= 4.8) {
    // Almost all 5 stars
    distribution[0].count = Math.floor(total * 0.85);
    distribution[1].count = Math.floor(total * 0.12);
    distribution[2].count = Math.floor(total * 0.03);
    distribution[3].count = 0;
    distribution[4].count = 0;
  } else if (targetAvg >= 4.6) {
    // Mostly 5 stars, some 4 stars
    distribution[0].count = Math.floor(total * 0.70);
    distribution[1].count = Math.floor(total * 0.25);
    distribution[2].count = Math.floor(total * 0.05);
    distribution[3].count = 0;
    distribution[4].count = 0;
  } else if (targetAvg >= 4.3) {
    // Good mix of 5 and 4 stars
    distribution[0].count = Math.floor(total * 0.50);
    distribution[1].count = Math.floor(total * 0.40);
    distribution[2].count = Math.floor(total * 0.08);
    distribution[3].count = Math.floor(total * 0.02);
    distribution[4].count = 0;
  } else {
    // Minimum case (4.0-4.3) - still very positive
    distribution[0].count = Math.floor(total * 0.35);
    distribution[1].count = Math.floor(total * 0.50);
    distribution[2].count = Math.floor(total * 0.12);
    distribution[3].count = Math.floor(total * 0.03);
    distribution[4].count = 0;
  }

  // Adjust to match exact total
  const currentTotal = distribution.reduce((sum, d) => sum + d.count, 0);
  if (currentTotal < total) {
    distribution[0].count += total - currentTotal;
  } else if (currentTotal > total) {
    distribution[0].count -= currentTotal - total;
  }

  return distribution;
}

function generateIndividualReviews(productId: number, count: number, distribution: any[], targetAvg: number): Review[] {
  const reviews: Review[] = [];
  let reviewId = 1;

  // Create a pool of ratings based on distribution
  const ratingPool: number[] = [];
  distribution.forEach(d => {
    for (let i = 0; i < d.count; i++) {
      ratingPool.push(d.stars);
    }
  });

  // Shuffle rating pool deterministically based on productId
  for (let i = ratingPool.length - 1; i > 0; i--) {
    const j = Math.floor(((productId + i * 13) % (i + 1)));
    [ratingPool[i], ratingPool[j]] = [ratingPool[j], ratingPool[i]];
  }

  // Generate reviews
  for (let i = 0; i < count; i++) {
    const rating = ratingPool[i] || 5;
    const nameIndex = (productId + i * 7) % firstNames.length;
    const lastNameIndex = (productId + i * 5) % lastNames.length;
    const cityIndex = (productId + i * 3) % cities.length;
    const timeIndex = i % timeAgo.length;

    const possibleTexts = reviewTexts[rating as keyof typeof reviewTexts] || reviewTexts[5];
    const textIndex = (productId + i) % possibleTexts.length;

    reviews.push({
      id: reviewId++,
      name: `${firstNames[nameIndex]} ${lastNames[lastNameIndex].charAt(0)}.`,
      location: cities[cityIndex],
      rating: rating,
      date: timeAgo[timeIndex],
      verified: ((productId + i * 11) % 10) > 2, // 80% verified, deterministic
      text: possibleTexts[textIndex]
    });
  }

  return reviews;
}

// Export function for use in product cards
export function getProductReviewSummary(productId: number) {
  const data = generateProductReviewData(productId);
  return {
    rating: parseFloat(data.averageRating),
    count: data.totalReviews
  };
}