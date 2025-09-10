'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/lib/woocommerce';
import ProductCard from '../../components/ProductCard';
import { useCart } from '../../contexts/CartContext';

// Quiz state types
interface PersonInfo {
  age: string;
  hasSpecialNeeds?: boolean;
}

interface QuizState {
  householdSize: number;
  adults: number;
  children: number;
  persons: PersonInfo[];
  hasBabies: boolean | null;
  hasPets: boolean | null;
  livingArea: string;
  preparationDays: number;
  preparationFor: string[];
  budget: string;
  storageSpace: string;
  needsPortable: boolean | null;
  priorities: string[];
  needsEHBO: boolean;
  needsMedication: boolean;
  completedSteps: number[];
}

// Aanbeveling types
interface RecommendedItem {
  product: Product;
  quantity: number;
  reason: string;
}

export default function QuizPage() {
  const router = useRouter();
  const { addToCart, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<RecommendedItem[]>([]);
  
  // Quiz state
  const [quizState, setQuizState] = useState<QuizState>({
    householdSize: 1,
    adults: 1,
    children: 0,
    persons: [],
    hasBabies: null,
    hasPets: null,
    livingArea: '',
    preparationDays: 3,
    preparationFor: [],
    budget: '',
    storageSpace: '',
    needsPortable: null,
    priorities: [],
    needsEHBO: false,
    needsMedication: false,
    completedSteps: []
  });

  // Laad opgeslagen state uit sessionStorage
  useEffect(() => {
    const savedState = sessionStorage.getItem('quiz-state');
    if (savedState) {
      const parsed = JSON.parse(savedState);
      setQuizState(parsed);
      setCurrentStep(parsed.completedSteps.length + 1);
    }
  }, []);

  // Sla state op in sessionStorage bij wijzigingen
  useEffect(() => {
    sessionStorage.setItem('quiz-state', JSON.stringify(quizState));
  }, [quizState]);

  // Dynamische stap berekening
  const calculateTotalSteps = () => {
    let steps = 2; // Basis: huishouden + (eventueel) kinderleeftijden
    if (quizState.children > 0) steps++; // Kinderleeftijden
    if (quizState.children > 0 || quizState.adults > 1) steps++; // Baby's/huisdieren vraag
    steps += 5; // Woonsituatie, dagen, waarvoor, budget, opslag
    return steps;
  };
  
  const totalSteps = calculateTotalSteps();
  const progress = (Math.min(currentStep, totalSteps) / totalSteps) * 100;

  // Stap 1: Volwassenen en kinderen
  const handleHouseholdComposition = () => {
    const total = quizState.adults + quizState.children;
    if (total === 0) {
      alert('Selecteer minimaal 1 persoon');
      return;
    }
    
    // Maak persons array aan voor kinderen
    const childrenPersons = Array(quizState.children).fill(null).map(() => ({ age: '' }));
    
    setQuizState(prev => ({
      ...prev,
      householdSize: total,
      persons: childrenPersons,
      completedSteps: [...prev.completedSteps.filter(s => s !== 1), 1]
    }));
    
    // Als er kinderen zijn, ga naar leeftijden stap
    if (quizState.children > 0) {
      setCurrentStep(2);
    } else if (quizState.adults > 1) {
      // Bij meerdere volwassenen, vraag over huisdieren
      setCurrentStep(3);
    } else {
      // Bij 1 volwassene zonder kinderen, skip naar woonsituatie
      setCurrentStep(4);
    }
  };

  // Stap 2: Leeftijden van kinderen
  const handleChildrenAges = () => {
    // Valideer dat alle leeftijden zijn ingevuld
    if (quizState.persons.some(p => !p.age || parseInt(p.age) >= 18)) {
      alert('Vul alstublieft de leeftijden van alle kinderen in (0-17 jaar)');
      return;
    }
    
    // Check of er baby's zijn
    const hasBabies = quizState.persons.some(p => parseInt(p.age) < 3);
    
    setQuizState(prev => ({
      ...prev,
      hasBabies,
      completedSteps: [...prev.completedSteps.filter(s => s !== 2), 2]
    }));
    
    // Als er geen kinderen zijn, skip de huisdieren vraag bij 1 volwassene
    if (quizState.adults === 1 && quizState.children === 0) {
      setCurrentStep(4); // Skip naar woonsituatie
    } else {
      setCurrentStep(3); // Ga naar baby's/huisdieren vraag
    }
  };

  // Stap 3: Baby's en huisdieren
  const handleBabiesAndPets = (hasPets: boolean) => {
    setQuizState(prev => ({
      ...prev,
      hasPets,
      completedSteps: [...prev.completedSteps.filter(s => s !== 3), 3]
    }));
    setCurrentStep(4);
  };

  // Stap 4: Woonsituatie
  const handleLivingArea = (area: string) => {
    setQuizState(prev => ({
      ...prev,
      livingArea: area,
      completedSteps: [...prev.completedSteps.filter(s => s !== 4), 4]
    }));
    setCurrentStep(5);
  };

  // Stap 5: Aantal dagen
  const handlePreparationDays = (days: number) => {
    setQuizState(prev => ({
      ...prev,
      preparationDays: days,
      completedSteps: [...prev.completedSteps.filter(s => s !== 5), 5]
    }));
    setCurrentStep(6);
  };

  // Stap 6: Waar bereid je je op voor
  const handlePreparationFor = () => {
    if (quizState.preparationFor.length === 0) {
      alert('Selecteer minimaal één scenario');
      return;
    }
    setQuizState(prev => ({
      ...prev,
      completedSteps: [...prev.completedSteps.filter(s => s !== 6), 6]
    }));
    setCurrentStep(7);
  };

  // Stap 7: Budget
  const handleBudget = (budget: string) => {
    setQuizState(prev => ({
      ...prev,
      budget,
      completedSteps: [...prev.completedSteps.filter(s => s !== 7), 7]
    }));
    setCurrentStep(8);
  };

  // Stap 8: Opslagruimte
  const handleStorageSpace = (space: string) => {
    setQuizState(prev => ({
      ...prev,
      storageSpace: space,
      needsPortable: space === 'kast',
      completedSteps: [...prev.completedSteps.filter(s => s !== 8), 8]
    }));
    generateRecommendations();
  };

  // Genereer aanbevelingen
  const generateRecommendations = async () => {
    setIsLoading(true);
    try {
      // Use our API route instead of calling WooCommerce directly
      const response = await fetch('/api/products?per_page=100');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const products = await response.json();
      const recommended: RecommendedItem[] = [];
      
      // Bereken benodigdheden op basis van huishoudsamenstelling
      const adults = quizState.adults;
      const children = quizState.children;
      const babies = quizState.persons.filter(p => p.age && parseInt(p.age) < 3).length;
      const elderly = 0; // Kunnen we later uitbreiden met specifieke ouderen vraag
      
      // Water: 3 liter per persoon per dag
      const waterNeeded = quizState.householdSize * 3 * quizState.preparationDays;
      
      // Nieuwe criteria toevoegen
      const hasPets = quizState.hasPets;
      const isUrban = ['stad', 'dorp'].includes(quizState.livingArea);
      const isRemote = ['offgrid', 'bos', 'buitengebied'].includes(quizState.livingArea);
      const isCoastal = quizState.livingArea === 'kust';
      const needsEvacuation = quizState.preparationFor.includes('evacuatie');
      const needsBlackout = quizState.preparationFor.includes('blackout');
      const needsFlooding = quizState.preparationFor.includes('overstroming');
      const isLowBudget = quizState.budget === 'budget-low';
      const isHighBudget = quizState.budget === 'budget-high';
      const needsCompact = quizState.needsPortable;
      
      // Define missing variables for product recommendations
      const needsEHBO = quizState.needsEHBO || quizState.priorities.includes('ehbo');
      const needsCooking = needsBlackout || quizState.preparationFor.includes('voedseltekort');
      const needsLighting = needsBlackout || isRemote;
      const needsPower = needsBlackout || needsEvacuation;
      
      // Score producten op basis van match
      const scoredProducts = products.map((product: Product) => {
        let score = 0;
        const name = product.name.toLowerCase();
        const desc = (product.description + ' ' + product.short_description).toLowerCase();
        
        // Basis noodpakket scores
        if (name.includes('noodpakket') || name.includes('compleet pakket')) {
          score += 10;
          
          // Match huishoudgrootte
          if (quizState.householdSize === 1 && (name.includes('1 persoon') || name.includes('solo'))) {
            score += 20;
          } else if (quizState.householdSize === 2 && (name.includes('2 personen') || name.includes('duo'))) {
            score += 20;
          } else if (quizState.householdSize >= 3 && quizState.householdSize <= 4 && (name.includes('gezin') || name.includes('familie'))) {
            score += 20;
          } else if (quizState.householdSize >= 5 && (name.includes('groot') || name.includes('bedrijf'))) {
            score += 20;
          }
          
          // Match aantal dagen
          if (quizState.preparationDays === 3 && (name.includes('3 dagen') || name.includes('72 uur'))) {
            score += 15;
          } else if (quizState.preparationDays === 7 && (name.includes('7 dagen') || name.includes('week'))) {
            score += 15;
          } else if (quizState.preparationDays === 14 && (name.includes('14 dagen') || name.includes('2 weken'))) {
            score += 15;
          } else if (quizState.preparationDays === 30 && (name.includes('30 dagen') || name.includes('maand'))) {
            score += 15;
          }
        }
        
        // Water producten
        if ((name.includes('water') || desc.includes('drinkwater')) && !name.includes('filter')) {
          score += waterNeeded > 10 ? 15 : 8;
        }
        
        // Scenario-specifieke scoring
        if (needsBlackout && (name.includes('lamp') || name.includes('zaklamp') || name.includes('powerbank') || name.includes('batterij'))) {
          score += 18;
        }
        
        if (needsFlooding && (name.includes('waterdicht') || name.includes('droog') || desc.includes('watervast'))) {
          score += 16;
        }
        
        if (needsEvacuation && (name.includes('rugzak') || name.includes('evacuatie') || name.includes('draagbaar') || name.includes('compact'))) {
          score += 20;
        }
        
        // Locatie-specifieke scoring
        if (isRemote && (name.includes('zelfvoorzienend') || name.includes('outdoor') || desc.includes('survival'))) {
          score += 14;
        }
        
        if (isCoastal && (name.includes('water') || desc.includes('overstroming'))) {
          score += 12;
        }
        
        // Budget matching
        if (isLowBudget && parseFloat(product.price) < 100) {
          score += 15;
        } else if (isHighBudget && parseFloat(product.price) > 200) {
          score += 10;
        }
        
        // Compact/draagbaar voor kleine opslag
        if (needsCompact && (name.includes('compact') || name.includes('klein') || desc.includes('ruimtebesparend'))) {
          score += 16;
        }
        
        // Huisdieren
        if (hasPets && (name.includes('huisdier') || desc.includes('dier') || name.includes('pet'))) {
          score += 25;
        }
        
        // Speciale behoeften
        if (babies > 0 && (name.includes('baby') || desc.includes('zuigeling'))) {
          score += 18;
        }
        if (elderly > 0 && (desc.includes('ouderen') || desc.includes('senioren'))) {
          score += 15;
        }
        if (children > 0 && (name.includes('kind') || desc.includes('kinderen'))) {
          score += 12;
        }
        
        return { product, score };
      });
      
      // Sorteer op score en filter beschikbare producten
      const topProducts = scoredProducts
        .filter((item: { product: Product; score: number }) => item.score > 0 && item.product.stock_status === 'instock')
        .sort((a: { product: Product; score: number }, b: { product: Product; score: number }) => b.score - a.score);
      
      // Selecteer top aanbevelingen met verschillende categorieën
      const addedCategories = new Set<string>();
      const finalRecommendations: RecommendedItem[] = [];
      
      for (const item of topProducts) {
        const category = item.product.categories[0]?.name || 'Overig';
        
        // Voeg hoofdpakket toe
        if (!addedCategories.has('hoofdpakket') && 
            (item.product.name.toLowerCase().includes('noodpakket') || 
             item.product.name.toLowerCase().includes('compleet'))) {
          finalRecommendations.push({
            product: item.product,
            quantity: 1,
            reason: `Perfect voor ${quizState.householdSize} ${quizState.householdSize === 1 ? 'persoon' : 'personen'}`
          });
          addedCategories.add('hoofdpakket');
        }
        
        // Voeg categorie-specifieke items toe
        else if (!addedCategories.has(category) && finalRecommendations.length < 6) {
          let quantity = 1;
          let reason = '';
          
          if (item.product.name.toLowerCase().includes('water')) {
            quantity = Math.ceil(waterNeeded / 10); // Aanname: 10L per verpakking
            reason = `${waterNeeded}L water voor 3 dagen`;
          } else if (needsEHBO && item.product.name.toLowerCase().includes('ehbo')) {
            reason = 'Voor medische noodsituaties';
          } else if (needsCooking && item.product.name.toLowerCase().includes('kook')) {
            reason = 'Voor het bereiden van warme maaltijden';
          } else if (needsLighting && item.product.name.toLowerCase().includes('lamp')) {
            reason = 'Voor verlichting bij stroomuitval';
          } else if (needsPower && item.product.name.toLowerCase().includes('batter')) {
            quantity = Math.ceil(quizState.householdSize / 2);
            reason = 'Voor noodstroom apparaten';
          } else {
            reason = 'Aanbevolen voor jouw situatie';
          }
          
          finalRecommendations.push({
            product: item.product,
            quantity,
            reason
          });
          addedCategories.add(category);
        }
        
        if (finalRecommendations.length >= 6) break;
      }
      
      setRecommendations(finalRecommendations);
      setCurrentStep(totalSteps + 1); // Ga naar resultaten
    } catch (error) {
      console.error('Error generating recommendations:', error);
      alert('Er ging iets mis bij het genereren van aanbevelingen. Probeer het opnieuw.');
    } finally {
      setIsLoading(false);
    }
  };

  // Voeg alle aanbevolen producten toe aan winkelwagen
  const addAllToCart = () => {
    recommendations.forEach(item => {
      addToCart(item.product, item.quantity);
    });
    router.push('/cart');
  };

  // Navigatie functies
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const restartQuiz = () => {
    sessionStorage.removeItem('quiz-state');
    setQuizState({
      householdSize: 1,
      adults: 1,
      children: 0,
      persons: [],
      hasBabies: null,
      hasPets: null,
      livingArea: '',
      preparationDays: 3,
      preparationFor: [],
      budget: '',
      storageSpace: '',
      needsPortable: null,
      priorities: [],
      needsEHBO: false,
      needsMedication: false,
      completedSteps: []
    });
    setCurrentStep(1);
    setRecommendations([]);
  };

  // Toggle prioriteit selectie
  const togglePriority = (priority: string) => {
    setQuizState(prev => ({
      ...prev,
      priorities: prev.priorities.includes(priority)
        ? prev.priorities.filter(p => p !== priority)
        : [...prev.priorities, priority]
    }));
  };

  // Toggle preparation for selectie
  const togglePreparationFor = (scenario: string) => {
    setQuizState(prev => ({
      ...prev,
      preparationFor: prev.preparationFor.includes(scenario)
        ? prev.preparationFor.filter(s => s !== scenario)
        : [...prev.preparationFor, scenario]
    }));
  };

  // Update aantal volwassenen
  const updateAdults = (count: number) => {
    setQuizState(prev => ({ ...prev, adults: count }));
  };

  // Update aantal kinderen
  const updateChildren = (count: number) => {
    setQuizState(prev => ({ ...prev, children: count }));
  };

  // Update kind leeftijd
  const updateChildAge = (index: number, age: string) => {
    const newPersons = [...quizState.persons];
    newPersons[index] = { ...newPersons[index], age };
    setQuizState(prev => ({ ...prev, persons: newPersons }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-off-white to-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 border-4 border-medical-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-navy-blue text-lg font-medium">
            We stellen jouw persoonlijke noodpakket samen...
          </p>
        </motion.div>
      </div>
    );
  }

  // Resultaten pagina
  if (currentStep > totalSteps) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-off-white to-white py-8 md:py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 md:mb-12"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 bg-medical-green/10 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
              <svg className="w-10 h-10 md:w-12 md:h-12 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-navy-blue mb-3 md:mb-4">
              Jouw Persoonlijke Noodpakket
            </h1>
            <p className="text-base md:text-lg text-steel-gray max-w-3xl mx-auto px-4">
              Op basis van jouw {quizState.householdSize}-persoons huishouden hebben we het perfecte pakket samengesteld:
            </p>
          </motion.div>

          {/* Huishoud samenstelling overzicht */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 mb-8 shadow-lg max-w-3xl mx-auto"
          >
            <h3 className="font-bold text-navy-blue mb-4">Jouw huishouden:</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-medical-green/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-3xl">👤</span>
                  </div>
                  <p className="text-lg font-semibold text-navy-blue">{quizState.adults}</p>
                  <p className="text-sm text-steel-gray">
                    {quizState.adults === 1 ? 'Volwassene' : 'Volwassenen'}
                  </p>
                </div>
                {quizState.children > 0 && (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-medical-green/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-3xl">🧒</span>
                    </div>
                    <p className="text-lg font-semibold text-navy-blue">{quizState.children}</p>
                    <p className="text-sm text-steel-gray">
                      {quizState.children === 1 ? 'Kind' : 'Kinderen'}
                    </p>
                  </div>
                )}
              </div>
              {quizState.children > 0 && quizState.persons.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-steel-gray mb-2">Leeftijden kinderen:</p>
                  <div className="flex flex-wrap gap-2">
                    {quizState.persons.map((person, idx) => (
                      <span key={idx} className="bg-white px-3 py-1 rounded-full text-sm text-black">
                        {person.age} jaar
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
              <p className="text-sm text-steel-gray">
                <strong>Woonsituatie:</strong> {
                  { stad: 'Stad', dorp: 'Dorp', buitengebied: 'Buitengebied', kust: 'Kustgebied', bos: 'Bosgebied', offgrid: 'Off-grid' }[quizState.livingArea] || quizState.livingArea
                }
              </p>
              <p className="text-sm text-steel-gray">
                <strong>Voorbereid voor:</strong> {quizState.preparationDays} dagen
              </p>
              <p className="text-sm text-steel-gray">
                <strong>Scenario's:</strong> {quizState.preparationFor.map(s => {
                  const labels: Record<string, string> = {
                    blackout: 'Stroomuitval',
                    overstroming: 'Overstroming',
                    oorlog: 'Conflict',
                    voedseltekort: 'Voedseltekort',
                    evacuatie: 'Evacuatie',
                    alles: 'Alles-in-één'
                  };
                  return labels[s] || s;
                }).join(', ')}
              </p>
              <p className="text-sm text-steel-gray">
                <strong>Budget:</strong> {
                  { 'budget-low': 'Basis', 'budget-medium': 'Uitgebreid', 'budget-high': 'Premium' }[quizState.budget] || 'Niet opgegeven'
                }
              </p>
              {quizState.hasPets && (
                <p className="text-sm text-steel-gray">
                  <strong>Extra:</strong> Inclusief huisdieren
                </p>
              )}
            </div>
          </motion.div>

          {/* Check if we have recommendations */}
          {recommendations.length > 0 ? (
            <>
              {/* Aanbevolen producten */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-6 mb-12"
              >
                <h2 className="text-2xl font-bold text-navy-blue text-center mb-6">
                  Aanbevolen producten
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendations.map((item, index) => (
                    <motion.div
                      key={item.product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="bg-white rounded-xl shadow-lg overflow-hidden"
                    >
                      <div className="p-4">
                        <ProductCard product={item.product} />
                        <div className="mt-4 p-4 bg-medical-green/5 rounded-lg">
                          <p className="text-sm font-semibold text-navy-blue mb-1">
                            Aanbevolen hoeveelheid: {item.quantity}x
                          </p>
                          <p className="text-sm text-steel-gray">{item.reason}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Totaal overzicht */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-navy-blue text-white rounded-xl p-6 max-w-3xl mx-auto mb-8"
              >
                <h3 className="text-xl font-bold mb-4">Totaaloverzicht</h3>
                <div className="space-y-2">
                  {recommendations.map(item => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span>{item.product.name} ({item.quantity}x)</span>
                      <span>€{(parseFloat(item.product.price) * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t border-white/20 pt-2 mt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Totaal</span>
                      <span>
                        €{recommendations.reduce((sum, item) => 
                          sum + (parseFloat(item.product.price) * item.quantity), 0
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Actie knoppen */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={addAllToCart}
                  className="px-8 py-3 bg-medical-green text-white rounded-full font-semibold hover:bg-medical-green/90 transition-all duration-200"
                >
                  Voeg alles toe aan winkelwagen
                </button>
                <button
                  onClick={restartQuiz}
                  className="px-8 py-3 bg-white border-2 border-medical-green text-medical-green rounded-full font-semibold hover:bg-medical-green/10 transition-all duration-200"
                >
                  Opnieuw beginnen
                </button>
                <Link
                  href="/noodpakketten"
                  className="px-8 py-3 bg-amber-orange text-white rounded-full font-semibold hover:bg-amber-orange/90 transition-all duration-200 text-center"
                >
                  Bekijk alle pakketten
                </Link>
              </div>
            </>
          ) : (
            /* No products found */
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="max-w-2xl mx-auto text-center"
            >
              <div className="bg-amber-orange/10 rounded-2xl p-8 mb-8">
                <div className="w-20 h-20 bg-amber-orange/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-amber-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-navy-blue mb-4">
                  Geen passend noodpakket gevonden
                </h2>
                <p className="text-steel-gray mb-6">
                  Op basis van jouw antwoorden hebben we momenteel geen passende pakketten in ons assortiment. 
                  Dit kan komen door je specifieke budget, opslagruimte of andere wensen.
                </p>
                <div className="bg-white rounded-xl p-6 text-left">
                  <h3 className="font-semibold text-navy-blue mb-3">Wat kun je nu doen?</h3>
                  <ul className="space-y-2 text-sm text-steel-gray">
                    <li className="flex items-start gap-2">
                      <span className="text-medical-green mt-0.5">✓</span>
                      <span>Pas je antwoorden aan voor andere aanbevelingen</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-medical-green mt-0.5">✓</span>
                      <span>Bekijk onze volledige collectie noodpakketten</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-medical-green mt-0.5">✓</span>
                      <span>Neem contact op voor persoonlijk advies</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Actie knoppen */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={restartQuiz}
                  className="px-8 py-3 bg-medical-green text-white rounded-full font-semibold hover:bg-medical-green/90 transition-all duration-200"
                >
                  Opnieuw beginnen
                </button>
                <Link
                  href="/noodpakketten"
                  className="px-8 py-3 bg-amber-orange text-white rounded-full font-semibold hover:bg-amber-orange/90 transition-all duration-200 text-center"
                >
                  Bekijk collectie
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-3 bg-white border-2 border-navy-blue text-navy-blue rounded-full font-semibold hover:bg-navy-blue/5 transition-all duration-200 text-center"
                >
                  Advies aanvragen
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-off-white to-white">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-medical-green to-amber-orange"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      <div className="container mx-auto max-w-3xl px-4 py-6 md:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 md:mb-12"
        >
          <Link href="/" className="inline-flex items-center gap-2 text-steel-gray hover:text-navy-blue mb-4 md:mb-8 group text-sm">
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Terug naar home</span>
          </Link>
          
          <h1 className="text-2xl md:text-4xl font-bold text-navy-blue mb-2 md:mb-4">
            Stel je persoonlijke noodpakket samen
          </h1>
          <p className="text-steel-gray text-sm md:text-lg">
            Stap {currentStep} van {totalSteps}
          </p>
        </motion.div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl md:rounded-3xl shadow-lg md:shadow-xl p-6 md:p-12"
          >
            {/* Stap 1: Volwassenen en kinderen */}
            {currentStep === 1 && (
              <>
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-medical-green/20 to-amber-orange/20 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 mx-auto">
                  <span className="text-xl md:text-2xl">👥</span>
                </div>
                <h2 className="text-xl md:text-3xl font-bold text-navy-blue text-center mb-6 md:mb-8">
                  Uit hoeveel personen bestaat je huishouden?
                </h2>
                
                <div className="space-y-6">
                  {/* Volwassenen selector */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">👤</span>
                        <div>
                          <h3 className="font-semibold text-navy-blue">Volwassenen</h3>
                          <p className="text-sm text-steel-gray">18 jaar en ouder</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateAdults(Math.max(0, quizState.adults - 1))}
                          className="w-10 h-10 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center hover:border-medical-green transition-colors"
                        >
                          <span className="text-xl text-black font-bold">−</span>
                        </button>
                        <span className="w-12 text-center text-xl font-bold text-navy-blue">{quizState.adults}</span>
                        <button
                          onClick={() => updateAdults(Math.min(10, quizState.adults + 1))}
                          className="w-10 h-10 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center hover:border-medical-green transition-colors"
                        >
                          <span className="text-xl text-black font-bold">+</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Kinderen selector */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🧒</span>
                        <div>
                          <h3 className="font-semibold text-navy-blue">Kinderen</h3>
                          <p className="text-sm text-steel-gray">Jonger dan 18 jaar</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateChildren(Math.max(0, quizState.children - 1))}
                          className="w-10 h-10 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center hover:border-medical-green transition-colors"
                        >
                          <span className="text-xl text-black font-bold">−</span>
                        </button>
                        <span className="w-12 text-center text-xl font-bold text-navy-blue">{quizState.children}</span>
                        <button
                          onClick={() => updateChildren(Math.min(10, quizState.children + 1))}
                          className="w-10 h-10 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center hover:border-medical-green transition-colors"
                        >
                          <span className="text-xl text-black font-bold">+</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-medical-green/10 rounded-xl">
                  <p className="text-center text-sm text-steel-gray">
                    <strong>Totaal:</strong> {quizState.adults + quizState.children} {(quizState.adults + quizState.children) === 1 ? 'persoon' : 'personen'}
                  </p>
                </div>

                <button
                  onClick={handleHouseholdComposition}
                  className="w-full mt-8 p-4 bg-medical-green text-white rounded-xl font-semibold hover:bg-medical-green/90 transition-all duration-200"
                >
                  Volgende
                </button>
              </>
            )}

            {/* Stap 2: Leeftijden van kinderen */}
            {currentStep === 2 && quizState.children > 0 && (
              <>
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-medical-green/20 to-amber-orange/20 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 mx-auto">
                  <span className="text-xl md:text-2xl">🎂</span>
                </div>
                <h2 className="text-xl md:text-3xl font-bold text-navy-blue text-center mb-6 md:mb-8">
                  Wat zijn de leeftijden van de kinderen?
                </h2>
                <p className="text-center text-steel-gray mb-6">
                  Vul de leeftijden in van alle kinderen (0-17 jaar)
                </p>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {quizState.persons.map((person, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4"
                    >
                      <label className="font-medium text-navy-blue min-w-[100px]">
                        Kind {index + 1}:
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="17"
                        value={person.age}
                        onChange={(e) => updateChildAge(index, e.target.value)}
                        className="flex-1 p-3 border-2 border-gray-200 rounded-lg focus:border-medical-green focus:outline-none text-black placeholder-gray-400"
                        placeholder="Leeftijd"
                      />
                      <span className="text-steel-gray">jaar</span>
                    </motion.div>
                  ))}
                </div>
                <button
                  onClick={handleChildrenAges}
                  className="w-full mt-8 p-4 bg-medical-green text-white rounded-xl font-semibold hover:bg-medical-green/90 transition-all duration-200"
                >
                  Volgende
                </button>
              </>
            )}

            {/* Stap 3: Baby's en huisdieren (alleen als gezin of meerdere volwassenen) */}
            {currentStep === 3 && (quizState.children > 0 || quizState.adults > 1) && (
              <>
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-medical-green/20 to-amber-orange/20 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 mx-auto">
                  <span className="text-xl md:text-2xl">🍼</span>
                </div>
                <h2 className="text-xl md:text-3xl font-bold text-navy-blue text-center mb-6 md:mb-8">
                  Extra informatie over je huishouden
                </h2>
                
                {quizState.hasBabies && (
                  <div className="bg-amber-orange/10 rounded-xl p-4 mb-6">
                    <p className="text-sm text-navy-blue">
                      <strong>Let op:</strong> We zien dat er baby's in je huishouden zijn. We zullen extra babyvoeding en luiers aanbevelen.
                    </p>
                  </div>
                )}
                
                <p className="text-center text-steel-gray mb-8">
                  Heb je huisdieren waarvoor je ook voorbereid wilt zijn?
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => handleBabiesAndPets(true)}
                    className="p-6 bg-gray-50 hover:bg-gradient-to-r hover:from-medical-green/10 hover:to-amber-orange/10 rounded-xl transition-all duration-200 text-center group border-2 border-transparent hover:border-medical-green/30"
                  >
                    <span className="text-3xl mb-2 block">🐾</span>
                    <p className="font-bold text-navy-blue text-lg mb-2">Ja, met huisdieren</p>
                    <p className="text-sm text-steel-gray">Voeding en water voor huisdieren toevoegen</p>
                  </motion.button>
                  
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    onClick={() => handleBabiesAndPets(false)}
                    className="p-6 bg-gray-50 hover:bg-gradient-to-r hover:from-medical-green/10 hover:to-amber-orange/10 rounded-xl transition-all duration-200 text-center group border-2 border-transparent hover:border-medical-green/30"
                  >
                    <span className="text-3xl mb-2 block">🏠</span>
                    <p className="font-bold text-navy-blue text-lg mb-2">Nee, geen huisdieren</p>
                    <p className="text-sm text-steel-gray">Alleen voor mensen</p>
                  </motion.button>
                </div>
              </>
            )}

            {/* Stap 4: Woonsituatie */}
            {currentStep === 4 && (
              <>
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-medical-green/20 to-amber-orange/20 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 mx-auto">
                  <span className="text-xl md:text-2xl">🏡</span>
                </div>
                <h2 className="text-xl md:text-3xl font-bold text-navy-blue text-center mb-6 md:mb-8">
                  Waar woon je?
                </h2>
                <p className="text-center text-steel-gray mb-6">
                  Dit helpt ons om de juiste aanbevelingen te doen
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { id: 'stad', label: 'Stad', icon: '🏙️', desc: 'Stedelijk gebied' },
                    { id: 'dorp', label: 'Dorp', icon: '🏘️', desc: 'Klein dorp of gemeente' },
                    { id: 'buitengebied', label: 'Buitengebied', icon: '🌾', desc: 'Landelijk gebied' },
                    { id: 'kust', label: 'Kustgebied', icon: '🏖️', desc: 'Nabij zee of water' },
                    { id: 'bos', label: 'Bosgebied', icon: '🌲', desc: 'In of nabij bos' },
                    { id: 'offgrid', label: 'Off-grid', icon: '⛰️', desc: 'Afgelegen locatie' }
                  ].map(area => (
                    <motion.button
                      key={area.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => handleLivingArea(area.id)}
                      className="p-4 bg-gray-50 hover:bg-gradient-to-r hover:from-medical-green/10 hover:to-amber-orange/10 rounded-xl transition-all duration-200 text-left group border-2 border-transparent hover:border-medical-green/30"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{area.icon}</span>
                        <div className="flex-1">
                          <p className="font-semibold text-navy-blue">{area.label}</p>
                          <p className="text-xs text-steel-gray">{area.desc}</p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </>
            )}

            {/* Stap 5: Aantal dagen */}
            {currentStep === 5 && (
              <>
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-medical-green/20 to-amber-orange/20 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 mx-auto">
                  <span className="text-xl md:text-2xl">📅</span>
                </div>
                <h2 className="text-xl md:text-3xl font-bold text-navy-blue text-center mb-6 md:mb-8">
                  Hoeveel dagen wil je voorbereid zijn?
                </h2>
                <p className="text-center text-steel-gray mb-6">
                  De overheid adviseert minimaal 3 dagen
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { days: 3, label: '3 dagen', desc: 'Overheidsadvies', recommended: true },
                    { days: 7, label: '1 week', desc: 'Extra zekerheid' },
                    { days: 14, label: '2 weken', desc: 'Uitgebreid' },
                    { days: 30, label: '1 maand', desc: 'Langdurig' }
                  ].map(option => (
                    <motion.button
                      key={option.days}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => handlePreparationDays(option.days)}
                      className={`p-6 rounded-xl transition-all duration-200 text-center group border-2 ${
                        option.recommended 
                          ? 'bg-medical-green/10 border-medical-green/30 hover:border-medical-green' 
                          : 'bg-gray-50 border-transparent hover:border-medical-green/30'
                      }`}
                    >
                      {option.recommended && (
                        <span className="inline-block bg-medical-green text-white text-xs px-2 py-1 rounded-full mb-2">
                          Aanbevolen
                        </span>
                      )}
                      <p className="font-bold text-navy-blue text-2xl mb-1">{option.label}</p>
                      <p className="text-sm text-steel-gray">{option.desc}</p>
                    </motion.button>
                  ))}
                </div>
              </>
            )}

            {/* Stap 6: Waar bereid je je op voor */}
            {currentStep === 6 && (
              <>
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-medical-green/20 to-amber-orange/20 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 mx-auto">
                  <span className="text-xl md:text-2xl">⚡</span>
                </div>
                <h2 className="text-xl md:text-3xl font-bold text-navy-blue text-center mb-6 md:mb-8">
                  Waar bereid je je op voor?
                </h2>
                <p className="text-center text-steel-gray mb-6">
                  Selecteer alle scenario's die voor jou relevant zijn
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { id: 'blackout', label: 'Stroomuitval', icon: '🔌', desc: 'Langdurige black-out' },
                    { id: 'overstroming', label: 'Overstroming', icon: '🌊', desc: 'Wateroverlast' },
                    { id: 'oorlog', label: 'Conflict', icon: '⚠️', desc: 'Oorlog of onrust' },
                    { id: 'voedseltekort', label: 'Voedseltekort', icon: '🥫', desc: 'Schaarste in winkels' },
                    { id: 'evacuatie', label: 'Evacuatie', icon: '🚨', desc: 'Snel moeten vertrekken' },
                    { id: 'alles', label: 'Alles-in-één', icon: '🛡️', desc: 'Alle scenario\'s' }
                  ].map(scenario => (
                    <motion.button
                      key={scenario.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => togglePreparationFor(scenario.id)}
                      className={`p-4 rounded-xl transition-all duration-200 text-left border-2 ${
                        quizState.preparationFor.includes(scenario.id)
                          ? 'bg-medical-green/10 border-medical-green'
                          : 'bg-gray-50 border-transparent hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{scenario.icon}</span>
                        <div className="flex-1">
                          <p className="font-semibold text-navy-blue">{scenario.label}</p>
                          <p className="text-xs text-steel-gray">{scenario.desc}</p>
                        </div>
                        {quizState.preparationFor.includes(scenario.id) && (
                          <svg className="w-5 h-5 text-medical-green mt-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
                
                <button
                  onClick={handlePreparationFor}
                  className="w-full mt-8 p-4 bg-medical-green text-white rounded-xl font-semibold hover:bg-medical-green/90 transition-all duration-200"
                >
                  Volgende
                </button>
              </>
            )}

            {/* Stap 7: Budget */}
            {currentStep === 7 && (
              <>
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-medical-green/20 to-amber-orange/20 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 mx-auto">
                  <span className="text-xl md:text-2xl">💰</span>
                </div>
                <h2 className="text-xl md:text-3xl font-bold text-navy-blue text-center mb-6 md:mb-8">
                  Wat is je budget per persoon?
                </h2>
                <p className="text-center text-steel-gray mb-6">
                  Voor {quizState.householdSize} {quizState.householdSize === 1 ? 'persoon' : 'personen'} in totaal
                </p>
                
                <div className="space-y-3">
                  {[
                    { id: 'budget-low', label: 'Minder dan €100', desc: 'Basis noodpakket', total: `€${quizState.householdSize * 100}` },
                    { id: 'budget-medium', label: '€100 - €250', desc: 'Uitgebreid pakket', total: `€${quizState.householdSize * 100} - €${quizState.householdSize * 250}` },
                    { id: 'budget-high', label: 'Meer dan €250', desc: 'Premium pakket', total: `€${quizState.householdSize * 250}+` }
                  ].map(budget => (
                    <motion.button
                      key={budget.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => handleBudget(budget.id)}
                      className="w-full p-6 bg-gray-50 hover:bg-gradient-to-r hover:from-medical-green/10 hover:to-amber-orange/10 rounded-xl transition-all duration-200 text-left group border-2 border-transparent hover:border-medical-green/30"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-bold text-navy-blue text-lg">{budget.label}</p>
                          <p className="text-sm text-steel-gray">{budget.desc}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-steel-gray">Totaal:</p>
                          <p className="font-semibold text-navy-blue">{budget.total}</p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </>
            )}

            {/* Stap 8: Opslagruimte */}
            {currentStep === 8 && (
              <>
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-medical-green/20 to-amber-orange/20 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 mx-auto">
                  <span className="text-xl md:text-2xl">📦</span>
                </div>
                <h2 className="text-xl md:text-3xl font-bold text-navy-blue text-center mb-6 md:mb-8">
                  Hoeveel opslagruimte heb je?
                </h2>
                <p className="text-center text-steel-gray mb-6">
                  Dit helpt ons het juiste formaat pakket aan te bevelen
                </p>
                
                <div className="space-y-3">
                  {[
                    { id: 'kast', label: 'Een kast', icon: '🚪', desc: 'Compact pakket nodig' },
                    { id: 'schuur', label: 'Schuur/garage', icon: '🏚️', desc: 'Ruimte voor grotere voorraad' },
                    { id: 'kamer', label: 'Hele kamer', icon: '🏠', desc: 'Veel opslagruimte beschikbaar' }
                  ].map(space => (
                    <motion.button
                      key={space.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => handleStorageSpace(space.id)}
                      className="w-full p-6 bg-gray-50 hover:bg-gradient-to-r hover:from-medical-green/10 hover:to-amber-orange/10 rounded-xl transition-all duration-200 text-left group border-2 border-transparent hover:border-medical-green/30"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">{space.icon}</span>
                        <div className="flex-1">
                          <p className="font-bold text-navy-blue text-lg">{space.label}</p>
                          <p className="text-sm text-steel-gray">{space.desc}</p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </>
            )}

            {/* Navigation */}
            {currentStep > 1 && currentStep <= totalSteps && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={goToPreviousStep}
                className="mt-6 md:mt-8 text-steel-gray hover:text-navy-blue font-medium flex items-center gap-2 mx-auto text-sm md:text-base"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Vorige stap</span>
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}