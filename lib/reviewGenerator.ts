// Review generation system for realistic product reviews

interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  date: string;
  verified: boolean;
  text: string;
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

// Generate review data based on product ID
export function generateProductReviewData(productId: number) {
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

  // Shuffle rating pool for random distribution
  for (let i = ratingPool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
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
      verified: Math.random() > 0.2, // 80% verified
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