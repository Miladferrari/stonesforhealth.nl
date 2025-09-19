'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function OverOnsPage() {
  const teamMembers = [
    { name: 'Michael', role: 'Oprichter & Inkoper', description: 'Reist de wereld over om de mooiste stenen te selecteren' },
    { name: 'Sarah', role: 'Kwaliteitscontrole', description: 'Zorgt ervoor dat elke steen perfect is' },
    { name: 'David', role: 'Logistiek Manager', description: 'Coördineert alle verzendingen wereldwijd' },
    { name: 'Emma', role: 'Klantenservice', description: 'Staat altijd klaar om te helpen' },
    { name: 'Thomas', role: 'Verpakkingsspecialist', description: 'Pakt elke bestelling met liefde in' }
  ];

  const values = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Authenticiteit',
      description: 'Elke steen is 100% natuurlijk en wordt zorgvuldig geselecteerd'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Wereldwijde Selectie',
      description: 'Direct uit Brazilië, Himalaya, Pakistan en India'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Snelle Levering',
      description: 'Orders worden dezelfde dag nog ingepakt en verzonden'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-[#f7f3ec] to-white py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl font-[family-name:var(--font-eb-garamond)]">
              Over Art Of Stones
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-700 font-[family-name:var(--font-eb-garamond)]">
              Al jaren specialist in authentieke kristallen en edelstenen uit de mooiste plekken ter wereld
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8 sm:py-12">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-6 text-lg leading-8 text-gray-700 font-[family-name:var(--font-eb-garamond)]">
            <p className="text-xl font-semibold text-gray-900">
              Welkom bij Art Of Stones B.V. – waar passie voor natuurlijke schoonheid en vakmanschap samenkomen.
            </p>

            <p>
              Vanuit ons hoofdkantoor in Rhoon werkt ons toegewijde team van vijf professionals elke dag met hart en ziel aan het leveren van de mooiste kristallen en edelstenen. We zijn niet zomaar een webshop; we zijn een team dat leeft voor de magie van natuurstenen.
            </p>

            <p>
              Onze reis begon jaren geleden met een simpele missie: de prachtigste stenen uit Brazilië, de Himalaya, Pakistan en India toegankelijk maken voor iedereen in Nederland. Wat begon als een passieproject, groeide uit tot Art Of Stones B.V. – een bedrijf dat bekend staat om kwaliteit, authenticiteit en uitstekende service.
            </p>

            <div className="bg-[#f7f3ec] rounded-2xl p-8 my-8">
              <p className="text-[#492c4a] font-semibold text-xl mb-4">
                "Elke steen heeft een verhaal, elke kristal draagt energie. Wij zorgen ervoor dat deze schatten van de natuur veilig bij jou aankomen."
              </p>
              <p className="text-gray-600 italic">- Het team van Art Of Stones</p>
            </div>

            <p>
              Ons team van vijf specialisten werkt dag en nacht om ervoor te zorgen dat jouw bestelling perfect wordt verwerkt. Van het zorgvuldig selecteren van de stenen tot het met liefde inpakken van elk pakket – we doen alles met de grootste zorg. We begrijpen dat elke steen uniek is en behandelen ze met het respect dat ze verdienen.
            </p>

            <p>
              Met jarenlange ervaring in de edelstenenbranche hebben we sterke relaties opgebouwd met betrouwbare leveranciers wereldwijd. Dit stelt ons in staat om alleen de hoogste kwaliteit stenen aan te bieden, rechtstreeks van de bron, zonder tussenpersonen.
            </p>
          </div>
        </div>
      </div>

      {/* Partners Section */}
      <div className="bg-[#f7f3ec] py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left">
                <p className="text-lg font-semibold text-gray-900 font-[family-name:var(--font-eb-garamond)]">
                  Officiële verkoop partner van:
                </p>
              </div>
              <div className="flex items-center gap-8">
                {/* Bol.com Logo */}
                <div className="bg-white rounded-lg px-6 py-3 flex items-center">
                  <Image
                    src="https://cdn.sanity.io/images/qxrxmo3r/over-prd/510e6d75ea3ae45058065da3b7015eb84da40caf-2560x1400.jpg"
                    alt="Bol.com"
                    width={80}
                    height={44}
                    className="object-contain"
                  />
                </div>
                {/* Amazon Logo */}
                <div className="bg-white rounded-lg px-6 py-3 flex items-center">
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1280px-Amazon_logo.svg.png"
                    alt="Amazon"
                    width={80}
                    height={44}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-[family-name:var(--font-eb-garamond)]">
              Onze Kernwaarden
            </h2>
            <p className="mt-4 text-lg text-gray-600 font-[family-name:var(--font-eb-garamond)]">
              Wat ons drijft en onderscheidt
            </p>
          </div>

          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {values.map((value, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-[#492c4a] mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>


      {/* Contact Info Section */}
      <div className="bg-gradient-to-b from-white to-[#f7f3ec] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 font-[family-name:var(--font-eb-garamond)]">
                    Bezoekadres
                  </h3>
                  <div className="space-y-3 text-gray-700 font-[family-name:var(--font-eb-garamond)]">
                    <p className="font-semibold text-lg">Art Of Stones B.V.</p>
                    <p>Koperhoek 54</p>
                    <p>3162 LA Rhoon</p>
                    <p>Nederland</p>
                    <div className="pt-4">
                      <p className="text-sm text-gray-600">KvK-nummer:</p>
                      <p className="font-semibold">95898476</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 font-[family-name:var(--font-eb-garamond)]">
                    Contact
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 font-[family-name:var(--font-eb-garamond)] mb-1">E-mail:</p>
                      <a href="mailto:info@stonesforhealth.nl" className="text-[#492c4a] hover:text-[#492c4a]/80 font-medium text-lg font-[family-name:var(--font-eb-garamond)]">
                        info@stonesforhealth.nl
                      </a>
                    </div>
                    <div className="pt-4">
                      <p className="text-gray-700 font-[family-name:var(--font-eb-garamond)] mb-4">
                        Heb je vragen over onze producten of wil je meer weten over ons bedrijf?
                        Neem gerust contact met ons op!
                      </p>
                      <Link
                        href="/contact"
                        className="inline-flex items-center px-6 py-3 bg-[#492c4a] text-white rounded-xl font-semibold hover:bg-[#492c4a]/90 transition-colors font-[family-name:var(--font-eb-garamond)]"
                      >
                        Neem contact op
                        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Section */}
      <div className="bg-[#f7f3ec] py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-[#492c4a]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium font-[family-name:var(--font-eb-garamond)]">100% Authentieke Stenen</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-[#492c4a]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
              </svg>
              <span className="font-medium font-[family-name:var(--font-eb-garamond)]">Snelle Verzending</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-[#492c4a]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
              </svg>
              <span className="font-medium font-[family-name:var(--font-eb-garamond)]">3000+ Tevreden Klanten</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}