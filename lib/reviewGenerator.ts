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

// Custom reviews for specific products
const customProductReviews: { [key: number]: Review[] } = {
  // Wierook brander - product ID 3234
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
  ],

  // Product ID 2994 - S4H Rozenkwarts Wierook Set (Lotus & Sandelhout Ritueelpakket)
  2994: [
    {
      id: 1,
      name: "Femke, 34 jaar",
      location: "Amsterdam",
      rating: 5,
      date: "5 januari 2025",
      verified: true,
      text: "Prachtige set! De geur van lotus en sandelhout samen is echt heerlijk rustgevend. En de rozenkwarts maakt het helemaal compleet. Heel fijn voor mijn meditatie.",
      reply: {
        author: "Team Stonesforhealth",
        date: "6 januari 2025",
        text: "Beste Femke,\n\nWat fijn dat de set je helpt tijdens je meditatie 🙏. Dankjewel voor je mooie woorden!\n\nGroetjes, Team Stonesforhealth"
      }
    },
    { id: 2, name: "Khalid, 39 jaar", location: "Rotterdam", rating: 5, date: "8 januari 2025", verified: true, text: "De wierookstokjes ruiken heerlijk en branden lang. De rozenkwarts voelt krachtig, ik gebruik het tijdens mijn avondritueel. Aanrader." },
    { id: 3, name: "Manon, 33 jaar", location: "Utrecht", rating: 4, date: "12 januari 2025", verified: true, text: "Set is mooi verpakt en compleet. De geur is wat zoeter dan ik gewend ben, maar wel heel ontspannend. Voor mij 4 sterren." },
    { id: 4, name: "Yasmin, 31 jaar", location: "Eindhoven", rating: 5, date: "15 januari 2025", verified: true, text: "Wat een fijne combinatie! De wierookgeur geeft me meteen rust en de rozenkwarts draagt bij aan een gevoel van liefde en harmonie." },
    { id: 5, name: "Peter, 42 jaar", location: "Den Haag", rating: 3, date: "20 januari 2025", verified: true, text: "Leuke set en netjes geleverd. Alleen de geur van lotus is niet helemaal mijn ding, iets te bloemig voor mijn smaak." },
    { id: 6, name: "Noor, 36 jaar", location: "Groningen", rating: 5, date: "25 januari 2025", verified: true, text: "Echt een prachtige set voor self-care. Ik gebruik het tijdens een warm bad en voel meteen meer ontspanning. Heel blij mee." },
    { id: 7, name: "Aylin, 30 jaar", location: "Breda", rating: 5, date: "29 januari 2025", verified: true, text: "Het ritueel voelt heel compleet: wierook, rozenkwarts, houder. Alles klopt. Ik heb er al een vriendin mee verrast als cadeau." },
    { id: 8, name: "Thomas, 38 jaar", location: "Nijmegen", rating: 4, date: "2 februari 2025", verified: true, text: "Goede kwaliteit, fijne geur. Ik had zelf de rozenkwarts net wat groter verwacht, maar verder prima set." },
    { id: 9, name: "Lotte, 35 jaar", location: "Tilburg", rating: 5, date: "6 februari 2025", verified: true, text: "Heel tevreden! Ik gebruik de wierook bij yoga en voel dat de sfeer in huis echt zachter en liefdevoller wordt." },
    {
      id: 10,
      name: "Fatima, 37 jaar",
      location: "Arnhem",
      rating: 5,
      date: "11 februari 2025",
      verified: true,
      text: "De geur is fantastisch en de energie van de rozenkwarts is voelbaar. Perfect voor mijn hartchakra meditaties.",
      reply: {
        author: "Team Stonesforhealth",
        date: "11 februari 2025",
        text: "Beste Fatima,\n\nWat mooi dat je de set gebruikt bij hartchakra meditaties 🌸. Dank voor je review!\n\nGroet, Team Stonesforhealth"
      }
    },
    { id: 11, name: "Ruben, 41 jaar", location: "Almere", rating: 5, date: "16 februari 2025", verified: true, text: "Een cadeautje voor mezelf. De wierookstokjes branden goed en de houder is handig en mooi. Heel blij dat ik dit heb besteld." },
    { id: 12, name: "Sarah, 32 jaar", location: "Haarlem", rating: 4, date: "20 februari 2025", verified: true, text: "Mooie verpakking en fijne set. Alleen jammer dat de houder wat klein is, maar verder werkt alles goed." },
    { id: 13, name: "Ingrid, 40 jaar", location: "Apeldoorn", rating: 5, date: "25 februari 2025", verified: true, text: "Gebruik dit ritueel nu dagelijks bij mijn self-care momentjes. Het voelt echt zachter en rustiger in huis." },
    { id: 14, name: "Ayoub, 34 jaar", location: "Enschede", rating: 5, date: "2 maart 2025", verified: true, text: "Zeer tevreden. De wierookstokjes ruiken natuurlijk en niet te zwaar. De steen voelt zuiver. Aanrader." },
    { id: 15, name: "Mariska, 39 jaar", location: "Leiden", rating: 3, date: "7 maart 2025", verified: true, text: "De set is netjes geleverd, maar de geur van sandelhout is voor mij iets te sterk. Mijn man vindt het wel lekker." },
    { id: 16, name: "Denise, 31 jaar", location: "Maastricht", rating: 5, date: "12 maart 2025", verified: true, text: "Echt een mooie combinatie van steen en geur. Het geeft direct een liefdevolle sfeer in huis. Ik ga dit vaker bestellen." },
    { id: 17, name: "Ricardo, 42 jaar", location: "Zwolle", rating: 4, date: "18 maart 2025", verified: true, text: "Prima set, werkt goed. Ik gebruik het vooral tijdens meditatiesessies. Zou leuk zijn als er wat meer stokjes bij zaten." },
    { id: 18, name: "Sofia, 33 jaar", location: "Amersfoort", rating: 5, date: "22 maart 2025", verified: true, text: "Fantastisch pakket! Ik had meteen het gevoel dat de energie in huis veranderde. Heel liefdevol." },
    { id: 19, name: "Jeroen, 44 jaar", location: "Dordrecht", rating: 5, date: "26 maart 2025", verified: true, text: "Mooi samengesteld ritueelpakket. De rozenkwarts ligt nu in mijn slaapkamer, en de wierook gebruik ik in de woonkamer. Top combinatie." },
    { id: 20, name: "Layla, 30 jaar", location: "Ede", rating: 5, date: "30 maart 2025", verified: true, text: "Een aanrader voor iedereen die meer rust en liefde in huis wil brengen. De lotusgeur is echt bijzonder." },
    { id: 21, name: "Ellen, 37 jaar", location: "Alphen aan den Rijn", rating: 4, date: "3 april 2025", verified: true, text: "Mooie set. De wierookstokjes branden wel wat sneller op dan ik dacht, maar de geur blijft lang hangen. Verder heel tevreden." },
    {
      id: 22,
      name: "Mustafa, 35 jaar",
      location: "Zaanstad",
      rating: 5,
      date: "8 april 2025",
      verified: true,
      text: "Supermooie set. Ik gebruik het vooral bij volle maan rituelen en het geeft me een gevoel van zachtheid en verbinding.",
      reply: {
        author: "Team Stonesforhealth",
        date: "9 april 2025",
        text: "Beste Mustafa,\n\nWat mooi dat je de set gebruikt bij je maanrituelen 🌙. Heel bijzonder om te lezen. Dank voor je fijne review!\n\nTeam Stonesforhealth"
      }
    },
    {
      id: 23,
      name: "Robbert, 40 jaar",
      location: "Den Bosch",
      rating: 1,
      date: "12 april 2025",
      verified: true,
      text: "Bestelling ontvangen zonder wierookhouder, terwijl dat wel in de beschrijving stond. Erg jammer. Graag alsnog opsturen of geld terug.",
      reply: {
        author: "Team Stonesforhealth",
        date: "12 april 2025",
        text: "Beste Robbert,\n\nOnze excuses dat de houder ontbrak 😔. We sturen je vandaag nog direct een nieuwe houder toe en voegen er een set extra wierookstokjes bij voor het ongemak.\n\nGroet, Team Stonesforhealth"
      }
    }
  ],

  // Product ID 2984 - Rozenkwarts
  2984: [
    {
      id: 1,
      name: "Anouk, 34 jaar",
      location: "Amsterdam",
      rating: 5,
      date: "4 januari 2025",
      verified: true,
      text: "De steen voelt zacht en warm aan, precies zoals ik had gehoopt. Sinds ik hem in mijn slaapkamer heb neergelegd, merk ik dat ik rustiger slaap.",
      reply: {
        author: "Team Stonesforhealth",
        date: "5 januari 2025",
        text: "Beste Anouk,\n\nWat fijn dat de rozenkwarts je helpt om meer rust te vinden 🌸. Bedankt dat je dit met ons deelt!\n\nGroetjes, Team Stonesforhealth"
      }
    },
    { id: 2, name: "Samira, 36 jaar", location: "Rotterdam", rating: 5, date: "8 januari 2025", verified: true, text: "Hele mooie rozenkwarts, prachtige kleur roze. Geeft echt een fijne energie. Heb hem cadeau gedaan aan mijn zus, ze was er superblij mee." },
    { id: 3, name: "Pieter, 42 jaar", location: "Utrecht", rating: 4, date: "12 januari 2025", verified: true, text: "Mooi stuk, goede kwaliteit. Ik had hem iets groter verwacht, daarom 4 sterren. Verder heel tevreden." },
    {
      id: 4,
      name: "Leila, 31 jaar",
      location: "Eindhoven",
      rating: 5,
      date: "18 januari 2025",
      verified: true,
      text: "Gebruik de steen tijdens meditatie en merk echt verschil in hoe rustig ik me daarna voel. Heel blij dat ik dit heb aangeschaft.",
      reply: {
        author: "Team Stonesforhealth",
        date: "18 januari 2025",
        text: "Beste Leila,\n\nWat mooi dat je de steen gebruikt bij meditatie en dat je verschil voelt 🙏. Dank voor je review!\n\nTeam Stonesforhealth"
      }
    },
    { id: 5, name: "Jasper, 39 jaar", location: "Den Haag", rating: 3, date: "22 januari 2025", verified: true, text: "Steen ziet er mooi uit maar ik merk zelf weinig van de werking. Misschien moet ik hem langer bij me dragen." },
    { id: 6, name: "Charlotte, 33 jaar", location: "Groningen", rating: 5, date: "27 januari 2025", verified: true, text: "Prachtig! Ik heb hem op mijn nachtkastje gelegd en voel echt meer rust in mijn hoofd. Ook heel mooi om naar te kijken." },
    { id: 7, name: "Ahmed, 44 jaar", location: "Breda", rating: 5, date: "2 februari 2025", verified: true, text: "De kleur is zacht en natuurlijk, precies zoals ik wilde. De levering was ook netjes en snel. Aanrader!" },
    {
      id: 8,
      name: "Yara, 30 jaar",
      location: "Nijmegen",
      rating: 4,
      date: "7 februari 2025",
      verified: true,
      text: "Steen is mooi, werkt goed, maar had gehoopt op iets meer uitleg over gebruik en combinatie met andere stenen.",
      reply: {
        author: "Team Stonesforhealth",
        date: "8 februari 2025",
        text: "Hoi Yara,\n\nBedankt voor je feedback! Goede tip over de uitleg. We nemen dit mee om onze productpagina's nog duidelijker te maken.\n\nGroetjes, Team Stonesforhealth"
      }
    },
    { id: 9, name: "Marco, 41 jaar", location: "Tilburg", rating: 5, date: "12 februari 2025", verified: true, text: "Geeft een fijne, zachte energie in huis. Ik heb hem samen met amethist en bergkristal neergezet en het voelt heel harmonieus." },
    { id: 10, name: "Fatima, 35 jaar", location: "Arnhem", rating: 5, date: "18 februari 2025", verified: true, text: "Echt een cadeautje voor mezelf. Sinds ik deze rozenkwarts draag in mijn tas, merk ik dat ik minder gespannen ben." },
    { id: 11, name: "Tim, 38 jaar", location: "Almere", rating: 3, date: "22 februari 2025", verified: true, text: "Mooi product, maar ik merk nog weinig verschil. Misschien persoonlijke voorkeur, want mijn partner voelt er wél rust door." },
    { id: 12, name: "Aylin, 32 jaar", location: "Haarlem", rating: 5, date: "28 februari 2025", verified: true, text: "Supermooi, precies zoals omschreven. Staat prachtig in de woonkamer. Ik voel meer verbondenheid met mijn gezin sinds hij er staat." },
    {
      id: 13,
      name: "Noor, 37 jaar",
      location: "Apeldoorn",
      rating: 5,
      date: "5 maart 2025",
      verified: true,
      text: "De steen voelt krachtig en tegelijk zacht. Geeft een heel fijn gevoel van liefde. Mijn favoriete steen op dit moment!",
      reply: {
        author: "Team Stonesforhealth",
        date: "6 maart 2025",
        text: "Beste Noor,\n\nWat prachtig omschreven ❤️. Dankjewel voor je mooie review.\n\nTeam Stonesforhealth"
      }
    },
    { id: 14, name: "Kevin, 40 jaar", location: "Enschede", rating: 4, date: "11 maart 2025", verified: true, text: "Prima rozenkwarts, mooie kwaliteit. Alleen de bezorging duurde iets langer (4 dagen). Daarom geen 5 sterren." },
    { id: 15, name: "Lotte, 34 jaar", location: "Leiden", rating: 5, date: "16 maart 2025", verified: true, text: "Fantastische steen! Ik gebruik hem bij yoga en merk dat ik sneller kan ontspannen. Heel blij mee." },
    { id: 16, name: "Rashid, 42 jaar", location: "Maastricht", rating: 5, date: "22 maart 2025", verified: true, text: "Hele mooie energie, voelde het meteen toen ik hem in handen had. Levering was top." },
    { id: 17, name: "Mariska, 31 jaar", location: "Zwolle", rating: 5, date: "27 maart 2025", verified: true, text: "Perfect cadeau voor mijn vriendin. Ze was ontroerd toen ze het kreeg. Mooi ingepakt ook, bedankt!" },
    { id: 18, name: "José, 44 jaar", location: "Amersfoort", rating: 4, date: "2 april 2025", verified: true, text: "Steen is prachtig, kleur is net iets lichter dan verwacht. Maar verder helemaal tevreden." },
    {
      id: 19,
      name: "Ellen, 39 jaar",
      location: "Dordrecht",
      rating: 5,
      date: "7 april 2025",
      verified: true,
      text: "Gebruik hem samen met bergkristal en amethist in een driehoek. De sfeer in huis is merkbaar rustiger geworden.",
      reply: {
        author: "Team Stonesforhealth",
        date: "8 april 2025",
        text: "Hoi Ellen,\n\nWat leuk dat je de Gouden Driehoek hebt gemaakt! Bedankt dat je dit deelt 🙏.\n\nGroetjes, Team Stonesforhealth"
      }
    },
    { id: 20, name: "Mustafa, 35 jaar", location: "Ede", rating: 5, date: "13 april 2025", verified: true, text: "Echt een aanrader. Mooie steen, voelt zuiver en kalmerend. Topservice van Stonesforhealth." },
    { id: 21, name: "Denise, 30 jaar", location: "Alphen aan den Rijn", rating: 3, date: "18 april 2025", verified: true, text: "Steen is netjes geleverd, maar ik merk niet echt verschil in energie. Kan natuurlijk persoonlijk zijn." },
    { id: 22, name: "Ingrid, 43 jaar", location: "Zaanstad", rating: 5, date: "24 april 2025", verified: true, text: "Ben heel blij met deze aankoop. Geeft me meer rust en helpt om stress los te laten. Mooie kwaliteit." },
    {
      id: 23,
      name: "Robbert, 40 jaar",
      location: "Den Bosch",
      rating: 1,
      date: "30 april 2025",
      verified: true,
      text: "15 april besteld, maar nog steeds niets ontvangen. Echt teleurstellend. Ik wil weten waar mijn bestelling blijft of mijn geld terug.",
      reply: {
        author: "Team Stonesforhealth",
        date: "30 april 2025",
        text: "Beste Robbert,\n\nOnze excuses dat je bestelling vertraging heeft opgelopen. We hebben direct een nieuw pakket naar je gestuurd. Daarnaast ontvang je van ons een gratis S4H armband en een 10% kortingsvoucher voor je volgende bestelling. Dank voor je geduld en nogmaals onze excuses!\n\nGroet, Team Stonesforhealth"
      }
    }
  ],

  // Product ID 3106 - S4H Geld-Armband (Edelsteenarmband voor rijkdom en overvloed)
  3106: [
    {
      id: 1,
      name: "Kim, 34 jaar",
      location: "Amsterdam",
      rating: 5,
      date: "2 februari 2025",
      verified: true,
      text: "Prachtige armband, voelt stevig en ziet er luxe uit. Sinds ik hem draag tijdens werkgesprekken merk ik dat ik zelfverzekerder overkom. Heel blij mee!",
      reply: {
        author: "Team Stonesforhealth",
        date: "3 februari 2025",
        text: "Beste Kim,\n\nWat mooi dat de armband je helpt meer zelfvertrouwen te voelen 🙏. Dank voor je review!\n\nGroetjes, Team Stonesforhealth"
      }
    },
    { id: 2, name: "Mohammed, 40 jaar", location: "Rotterdam", rating: 4, date: "7 februari 2025", verified: true, text: "Armband ziet er goed uit, past mooi. Ik weet niet of ik al echt verschil merk in financiën, maar ik voel me wel sterker als ik hem draag." },
    { id: 3, name: "Evelien, 37 jaar", location: "Utrecht", rating: 5, date: "12 februari 2025", verified: true, text: "Heb hem gekocht als cadeautje voor mezelf. De stenen voelen fijn en ik draag hem elke dag. Geeft me een soort positieve focus op mijn doelen." },
    {
      id: 4,
      name: "Ricardo, 42 jaar",
      location: "Eindhoven",
      rating: 5,
      date: "16 februari 2025",
      verified: true,
      text: "Superblij met mijn armband. Het voelt alsof ik meer kansen zie en minder twijfel bij beslissingen. Mooi gemaakt en goed verpakt geleverd.",
      reply: {
        author: "Team Stonesforhealth",
        date: "17 februari 2025",
        text: "Hoi Ricardo,\n\nDankjewel voor je enthousiaste woorden ✨. Fantastisch dat je meer vertrouwen ervaart bij je keuzes!\n\nGroet, Team Stonesforhealth"
      }
    },
    {
      id: 5,
      name: "Sandra, 39 jaar",
      location: "Den Haag",
      rating: 3,
      date: "21 februari 2025",
      verified: true,
      text: "De armband is mooi, maar ik merk zelf nog geen verschil in energie of kansen. Misschien moet ik hem langer dragen.",
      reply: {
        author: "Team Stonesforhealth",
        date: "22 februari 2025",
        text: "Hoi Sandra,\n\nBedankt voor je eerlijke feedback 🌿. Vaak werkt het dragen van edelstenen pas na langere tijd. Geef het vooral even de kans!\n\nGroetjes, Team Stonesforhealth"
      }
    },
    { id: 6, name: "Ayoub, 36 jaar", location: "Groningen", rating: 5, date: "27 februari 2025", verified: true, text: "Wat een krachtig gevoel geeft deze armband. Tijdens een sollicitatiegesprek voelde ik me rustiger en zekerder. Dat alleen al maakt het de moeite waard." },
    { id: 7, name: "Liesbeth, 41 jaar", location: "Breda", rating: 4, date: "3 maart 2025", verified: true, text: "Armband is stijlvol en goed afgewerkt. Of hij financieel echt wat brengt weet ik niet, maar ik voel me er beter door. Dat is ook al veel waard." },
    { id: 8, name: "David, 38 jaar", location: "Nijmegen", rating: 5, date: "9 maart 2025", verified: true, text: "Mooi product, goede kwaliteit. Sinds ik hem draag voel ik meer focus bij mijn werk en plannen. Ik combineer hem met citrien en dat voelt krachtig." },
    { id: 9, name: "Zeynep, 35 jaar", location: "Tilburg", rating: 5, date: "14 maart 2025", verified: true, text: "Heel mooi sieraad, valt op maar toch subtiel. Ik draag hem dagelijks en merk dat ik met meer vertrouwen afspraken inga." },
    { id: 10, name: "Johan, 44 jaar", location: "Arnhem", rating: 4, date: "19 maart 2025", verified: true, text: "Armband past goed, mooie kwaliteit stenen. Ik heb hem pas een week, dus ben benieuwd wat het op langere termijn brengt. Tot nu toe tevreden." },
    {
      id: 11,
      name: "Farah, 33 jaar",
      location: "Almere",
      rating: 5,
      date: "23 maart 2025",
      verified: true,
      text: "Geweldig cadeau voor mezelf. Het voelt echt alsof ik meer opensta voor kansen. Ook heel blij met de service en snelle verzending.",
      reply: {
        author: "Team Stonesforhealth",
        date: "23 maart 2025",
        text: "Beste Farah,\n\nDank voor je prachtige review ✨. Wat fijn dat je de armband ervaart als een steun bij het aantrekken van kansen.\n\nGroetjes, Team Stonesforhealth"
      }
    },
    {
      id: 12,
      name: "Patrick, 40 jaar",
      location: "Haarlem",
      rating: 2,
      date: "28 maart 2025",
      verified: true,
      text: "De armband ziet er mooi uit, maar bij mij brak het elastiek na een paar dagen dragen. Jammer, want ik had er hoge verwachtingen van.",
      reply: {
        author: "Team Stonesforhealth",
        date: "28 maart 2025",
        text: "Beste Patrick,\n\nWat vervelend om te horen dat het elastiek is gebroken 😔. Dat hoort natuurlijk niet te gebeuren. We sturen je vandaag nog kosteloos een nieuwe armband op.\n\nGroet, Team Stonesforhealth"
      }
    },
    { id: 13, name: "Naomi, 32 jaar", location: "Apeldoorn", rating: 5, date: "2 april 2025", verified: true, text: "Fantastische aankoop. Ik voel me sterker, meer in balans en gefocust. En het is gewoon een mooie armband om te dragen, win-win!" }
  ],

  // Product ID 2991 - Rider Waite Tarot (NL versie)
  2991: [
    {
      id: 1,
      name: "Sterre-Luna, 33 jaar",
      location: "Amsterdam",
      rating: 5,
      date: "6 januari 2025",
      verified: true,
      text: "Fantastisch deck! Mooie heldere illustraties, stevig materiaal en het Nederlandstalige boekje is erg handig. Perfect voor mijn eerste stappen in tarot.",
      reply: {
        author: "Team Stonesforhealth",
        date: "7 januari 2025",
        text: "Beste Sterre-Luna,\n\nWat fijn dat je dit deck zo goed kunt gebruiken als beginner 🙏. Heel veel plezier met je tarot-reis!\n\nGroetjes, Team Stonesforhealth"
      }
    },
    { id: 2, name: "Raven, 38 jaar", location: "Rotterdam", rating: 4, date: "11 januari 2025", verified: true, text: "Goed deck, kwaliteit is prima. Het boekje is handig, al had ik graag wat meer verdieping gezien. Maar voor beginners zeker geschikt." },
    { id: 3, name: "Aurora, 36 jaar", location: "Utrecht", rating: 5, date: "15 januari 2025", verified: true, text: "De Rider Waite is de klassieker onder de tarotdecks en dat merk je meteen. Heel blij dat ik eindelijk de Nederlandse versie heb gevonden." },
    { id: 4, name: "Zenno, 41 jaar", location: "Eindhoven", rating: 5, date: "20 januari 2025", verified: true, text: "De kaarten zijn stevig en mooi afgewerkt. De kleuren springen er echt uit. Dit is mijn go-to deck geworden voor dagelijkse readings." },
    {
      id: 5,
      name: "Indigo, 34 jaar",
      location: "Den Haag",
      rating: 3,
      date: "26 januari 2025",
      verified: true,
      text: "Het deck is netjes geleverd, maar de kaarten waren iets dunner dan ik had verwacht. Verder wel mooi geïllustreerd.",
      reply: {
        author: "Team Stonesforhealth",
        date: "26 januari 2025",
        text: "Hoi Indigo,\n\nDank voor je eerlijke feedback 🌿. We geven je tip door aan de uitgever, want we begrijpen dat stevig kaartmateriaal belangrijk is.\n\nGroetjes, Team Stonesforhealth"
      }
    },
    { id: 6, name: "Esmeralda, 37 jaar", location: "Groningen", rating: 5, date: "31 januari 2025", verified: true, text: "Heel blij mee! Het bijgeleverde boekje legt de kaarten duidelijk uit, waardoor het makkelijk is om te starten met oefenen." },
    { id: 7, name: "Orion, 44 jaar", location: "Breda", rating: 4, date: "5 februari 2025", verified: true, text: "Mooi deck, heldere symboliek. Het boekje is goed, maar wat beknopt voor gevorderden. Voor beginners top." },
    {
      id: 8,
      name: "Zonne, 32 jaar",
      location: "Nijmegen",
      rating: 5,
      date: "9 februari 2025",
      verified: true,
      text: "Supermooie kaarten, precies wat ik zocht. Goed verpakt, stevig doosje en voelt echt origineel. Heel blij dat ik dit deck heb gekozen.",
      reply: {
        author: "Team Stonesforhealth",
        date: "10 februari 2025",
        text: "Beste Zonne,\n\nWat fijn dat je het deck als origineel en compleet ervaart ✨. Bedankt voor je review!\n\nTeam Stonesforhealth"
      }
    },
    { id: 9, name: "Rowan, 40 jaar", location: "Tilburg", rating: 5, date: "14 februari 2025", verified: true, text: "Een must-have voor elke tarotliefhebber. De Rider Waite is en blijft de basis. Deze NL versie maakt het extra toegankelijk." }
  ],

  // Product ID 2985 - Masters of Shilajit 50 gram
  2985: [
    {
      id: 1,
      name: "Johan, 42 jaar",
      location: "Amsterdam",
      rating: 5,
      date: "7 januari 2025",
      verified: true,
      text: "Dit is écht pure shilajit, de smaak is intens maar precies zoals het hoort. Ik voel me energieker en meer gefocust tijdens mijn werk.",
      reply: {
        author: "Team Stonesforhealth",
        date: "8 januari 2025",
        text: "Beste Johan,\n\nWat fijn dat je de kwaliteit en werking zo duidelijk ervaart 🙏. Dank voor je mooie feedback!\n\nGroetjes, Team Stonesforhealth"
      }
    },
    { id: 2, name: "Fatima, 37 jaar", location: "Rotterdam", rating: 4, date: "11 januari 2025", verified: true, text: "Goede kwaliteit, merk na twee weken meer energie. Smaak blijft wel even wennen, daarom 4 sterren." },
    { id: 3, name: "Mark, 39 jaar", location: "Utrecht", rating: 5, date: "16 januari 2025", verified: true, text: "Gebruik het elke ochtend in mijn thee. Helpt me echt met focus en uithoudingsvermogen. Zeker de investering waard." },
    { id: 4, name: "Aylin, 34 jaar", location: "Eindhoven", rating: 5, date: "20 januari 2025", verified: true, text: "Topproduct! Het oploslepeltje is handig en de shilajit lost goed op in warme melk. Ik voel meer balans in mijn energie." },
    { id: 5, name: "Pieter, 44 jaar", location: "Den Haag", rating: 3, date: "24 januari 2025", verified: true, text: "Het product ziet er goed uit, maar ik merk nog geen verschil. Misschien moet ik het langer gebruiken. De smaak vind ik erg sterk." },
    {
      id: 6,
      name: "Samira, 36 jaar",
      location: "Groningen",
      rating: 5,
      date: "28 januari 2025",
      verified: true,
      text: "Na een paar weken merk ik dat mijn herstel na het sporten sneller gaat. Ook meer energie overdag. Heel blij met deze aankoop.",
      reply: {
        author: "Team Stonesforhealth",
        date: "29 januari 2025",
        text: "Beste Samira,\n\nWat mooi dat je shilajit ook inzet voor herstel! Bedankt voor je fijne review 🌿.\n\nGroet, Team Stonesforhealth"
      }
    },
    { id: 7, name: "Karim, 40 jaar", location: "Breda", rating: 4, date: "2 februari 2025", verified: true, text: "Prima kwaliteit resin, je merkt dat dit puur is. Alleen de smaak is erg aards, ik meng het liever in koffie dan water." },
    { id: 8, name: "Ellen, 38 jaar", location: "Nijmegen", rating: 5, date: "7 februari 2025", verified: true, text: "Voel me sinds gebruik vitaler en merk dat mijn stemming stabieler is. Gebruik het nu standaard in mijn ochtendritueel." },
    { id: 9, name: "Mehmet, 43 jaar", location: "Tilburg", rating: 5, date: "12 februari 2025", verified: true, text: "Sterke, pure shilajit. Ik heb eerder capsules geprobeerd maar dit voelt veel krachtiger. Aanrader voor iedereen die de echte werking wil ervaren." },
    { id: 10, name: "Laura, 35 jaar", location: "Arnhem", rating: 3, date: "16 februari 2025", verified: true, text: "Smaak is voor mij erg bitter, ook in thee. Nog geen duidelijk verschil gemerkt. Ik blijf het nog een tijdje proberen." },
    { id: 11, name: "Ahmed, 41 jaar", location: "Almere", rating: 5, date: "20 februari 2025", verified: true, text: "Wat een verschil in energie! Ik gebruik het nu een maand en voel me veel productiever. Ook merk ik meer libido, wat een mooie bonus is." },
    { id: 12, name: "Sofie, 33 jaar", location: "Haarlem", rating: 4, date: "24 februari 2025", verified: true, text: "Shilajit is van goede kwaliteit, levering was netjes. Smaak blijft apart, maar het went na een paar dagen." },
    {
      id: 13,
      name: "Ricardo, 39 jaar",
      location: "Apeldoorn",
      rating: 5,
      date: "28 februari 2025",
      verified: true,
      text: "Gebruik dit elke ochtend in koffie. Helpt me om helder te blijven zonder dat ik me opgejaagd voel. Geweldig product.",
      reply: {
        author: "Team Stonesforhealth",
        date: "1 maart 2025",
        text: "Hoi Ricardo,\n\nWat goed dat shilajit je helpt om je dag helder en gefocust te starten ☕. Dank voor je review!\n\nTeam Stonesforhealth"
      }
    },
    { id: 14, name: "Yasmin, 36 jaar", location: "Enschede", rating: 5, date: "4 maart 2025", verified: true, text: "Super tevreden. Lost makkelijk op en geeft mij door de dag heen een stabiel energieniveau. Ook goed verpakt ontvangen." },
    { id: 15, name: "David, 44 jaar", location: "Leiden", rating: 4, date: "8 maart 2025", verified: true, text: "Mooi product, echte resin zoals beloofd. Merk lichte verbetering in uithoudingsvermogen. Verwacht nog meer na langer gebruik." },
    { id: 16, name: "Leila, 32 jaar", location: "Maastricht", rating: 5, date: "12 maart 2025", verified: true, text: "Gebruik het nu drie weken en merk meer focus, minder stress en betere slaap. Echt een aanrader." },
    {
      id: 17,
      name: "Rob, 40 jaar",
      location: "Zwolle",
      rating: 2,
      date: "16 maart 2025",
      verified: true,
      text: "Bestelling gedaan maar na 9 dagen nog niets ontvangen. Erg teleurstellend. Ik wil weten waar mijn pakket blijft.",
      reply: {
        author: "Team Stonesforhealth",
        date: "16 maart 2025",
        text: "Beste Rob,\n\nOnze excuses dat je bestelling vertraging heeft opgelopen 😔. We hebben je pakket vandaag direct opnieuw verzonden én voegen een extra kortingsvoucher toe voor het ongemak.\n\nGroet, Team Stonesforhealth"
      }
    },
    { id: 18, name: "Inge, 37 jaar", location: "Amersfoort", rating: 5, date: "20 maart 2025", verified: true, text: "Fantastisch product! Ik voel me energieker, meer in balans en de kwaliteit is duidelijk hoog. Dit blijft vast onderdeel van mijn routine." }
  ],

  // Product ID 3116 - S4H 7 Chakra Pendel
  3116: [
    {
      id: 1,
      name: "Nathalie, 34 jaar",
      location: "Amsterdam",
      rating: 5,
      date: "6 februari 2025",
      verified: true,
      text: "Prachtige pendel, de chakra-schijfjes zijn echt mooi afgewerkt. Ik gebruik hem tijdens meditatie en merk dat ik makkelijker in verbinding kom met mijn intuïtie. Heel tevreden!",
      reply: {
        author: "Team Stonesforhealth",
        date: "7 februari 2025",
        text: "Beste Nathalie,\n\nWat fijn dat de pendel je helpt tijdens meditatie ✨. Dankjewel voor je mooie feedback!\n\nGroetjes, Team Stonesforhealth"
      }
    },
    {
      id: 2,
      name: "Karim, 39 jaar",
      location: "Rotterdam",
      rating: 4,
      date: "11 februari 2025",
      verified: true,
      text: "De pendel werkt goed en ziet er mooi uit. Alleen het kettinkje had voor mij iets langer gemogen. Verder helemaal tevreden.",
      reply: {
        author: "Team Stonesforhealth",
        date: "11 februari 2025",
        text: "Hoi Karim,\n\nBedankt voor je eerlijke feedback 🙏. We nemen je tip over de lengte van het kettinkje zeker mee!\n\nGroetjes, Team Stonesforhealth"
      }
    },
    { id: 3, name: "Yvonne, 41 jaar", location: "Utrecht", rating: 5, date: "16 februari 2025", verified: true, text: "Voor het eerst een pendel gekocht en ik ben positief verrast. De bewegingen zijn heel duidelijk en geven me echt inzicht bij ja/nee-vragen. Mooie kwaliteit." },
    {
      id: 4,
      name: "Aisha, 32 jaar",
      location: "Eindhoven",
      rating: 5,
      date: "21 februari 2025",
      verified: true,
      text: "De chakra schijven zijn een mooie toevoeging, geeft meteen een spirituele uitstraling. Ik gebruik hem nu ook bij reiki-sessies en dat werkt fantastisch.",
      reply: {
        author: "Team Stonesforhealth",
        date: "22 februari 2025",
        text: "Beste Aisha,\n\nWat mooi dat je de pendel ook tijdens reiki gebruikt 🌸. Geweldig om te horen dat het je sessies versterkt!\n\nGroetjes, Team Stonesforhealth"
      }
    },
    {
      id: 5,
      name: "Thomas, 38 jaar",
      location: "Den Haag",
      rating: 3,
      date: "26 februari 2025",
      verified: true,
      text: "Het is een mooi product, maar ik merk zelf nog weinig verschil. Misschien moet ik meer oefenen met het stellen van vragen. Voor beginners wellicht even wennen.",
      reply: {
        author: "Team Stonesforhealth",
        date: "27 februari 2025",
        text: "Hoi Thomas,\n\nDank voor je review! Het klopt dat een pendel soms wat oefening vraagt. Geef het wat tijd, meestal wordt het makkelijker naarmate je hem vaker gebruikt 🙏.\n\nGroetjes, Team Stonesforhealth"
      }
    },
    { id: 6, name: "Leila, 35 jaar", location: "Groningen", rating: 5, date: "3 maart 2025", verified: true, text: "Heel blij met mijn aankoop! Tijdens meditatie voel ik echt meer balans. Ook heel fijn dat ik mijn chakra's kan checken met deze pendel." },
    { id: 7, name: "Ricardo, 42 jaar", location: "Breda", rating: 4, date: "8 maart 2025", verified: true, text: "De pendel is van goede kwaliteit, ligt prettig in de hand. Ik merk dat ik nog wat moet oefenen voor duidelijke antwoorden, maar tot nu toe werkt het prima." },
    {
      id: 8,
      name: "Fatima, 37 jaar",
      location: "Nijmegen",
      rating: 5,
      date: "14 maart 2025",
      verified: true,
      text: "Echt een waardevolle tool! Ik gebruik hem bijna dagelijks, vooral bij ja/nee-vragen en voor mijn chakra's. Geeft rust en vertrouwen in mijn intuïtie. Aanrader.",
      reply: {
        author: "Team Stonesforhealth",
        date: "14 maart 2025",
        text: "Beste Fatima,\n\nWat mooi dat de pendel je dagelijks helpt om meer vertrouwen in je intuïtie te krijgen 🌟. Heel erg bedankt voor je fijne woorden!\n\nGroet, Team Stonesforhealth"
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