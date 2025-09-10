'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState(0);


  const values = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Gepersonaliseerd voor jou",
      description: "We hebben onderzoek gedaan naar wat jouw gezin echt nodig heeft"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Kwaliteit Gegarandeerd",
      description: "Elk product is door ons getest, zodat jij je geen zorgen hoeft te maken"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: "Eerlijk & Transparant",
      description: "Geen verborgen kosten, geen kleine lettertjes - gewoon duidelijk wat je krijgt"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - matching contact page style */}
      <section className="bg-gradient-to-br from-navy-blue to-navy-blue/90 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Het verhaal achter NoodKlaar</h1>
          <p className="text-xl text-center text-gray-300 max-w-3xl mx-auto">
            Hoe een simpele vraag van mijn familie leidde tot een missie: elk Nederlands gezin voorbereid op noodsituaties.
          </p>
        </div>
      </section>

      {/* Story Section with Stats */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold text-navy-blue mb-6">
                Ruben's verhaal: van frustratie naar missie
              </h2>
              <div className="space-y-4 text-steel-gray">
                <p>
                  Hoi, ik ben Ruben, oprichter van 123noodklaar.nl. Het begon allemaal toen ik onlangs ontdekte 
                  hoe onvoorbereid mijn eigen familie was. Mijn ouders? Geen idee wat ze in huis moesten hebben. 
                  Mijn zus met haar pasgeboren baby? Ze dacht er niet eens aan. Mijn opa en oma? Die vertrouwden 
                  er gewoon op dat 'het wel goed zou komen'.
                </p>
                <p>
                  Ik wilde ze helpen, dus ging ik op zoek naar een compleet noodpakket. Wat een frustratie! 
                  Eindeloos zoeken, onduidelijke informatie, twijfels over kwaliteit. Ik dacht: "Hoe moet ik 
                  weten wat we echt nodig hebben? Niet iedereen heeft de tijd of kennis om dit uit te zoeken."
                </p>
                <p>
                  Toen realiseerde ik me: als ik dit al lastig vind, hoe moet het dan voor gezinnen die hier 
                  helemaal geen tijd voor hebben? Zo ontstond 123noodklaar.nl - jouw gids in noodvoorbereiding, 
                  zonder het gedoe.
                </p>
              </div>
            </div>

            {/* Key Facts */}
            <div className="bg-off-white rounded-2xl p-8">
              <h3 className="text-xl font-bold text-navy-blue mb-6">Waarom noodvoorbereiding belangrijk is</h3>
              <div className="space-y-4">
                <p className="text-steel-gray">
                  Je weet nooit wanneer het misgaat. Een storm die het stroomnet platgooit, wateroverlast, 
                  of erger. De overheid adviseert niet voor niets dat elk huishouden 72 uur zelfvoorzienend 
                  moet kunnen zijn. Maar wie heeft tijd om dat allemaal uit te zoeken?
                </p>
                <p className="text-steel-gray font-semibold">
                  Daarom hebben wij het onderzoek voor je gedaan.
                </p>
                <p className="text-steel-gray">
                  We vroegen ouderen wat zij nodig hadden. We spraken met jonge gezinnen over hun zorgen. 
                  We interviewden alleenstaanden over hun specifieke behoeften. Honderden gesprekken met 
                  mensen uit onze eigen omgeving - en daarbuiten. Van al die input hebben we pakketten 
                  samengesteld die écht werken voor jouw situatie.
                </p>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-medical-green mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-navy-blue">Voor jonge gezinnen</h4>
                    <p className="text-steel-gray text-sm">Extra aandacht voor baby's en kinderen</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-medical-green mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-navy-blue">Voor alleenstaanden</h4>
                    <p className="text-steel-gray text-sm">Compacte pakketten die alles bevatten</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-medical-green mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-navy-blue">Voor oudere familie</h4>
                    <p className="text-steel-gray text-sm">Rekening houdend met medicatie en comfort</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gradient-to-br from-medical-green/5 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy-blue mb-4">Onze belofte aan jou</h2>
            <p className="text-xl text-steel-gray max-w-3xl mx-auto">
              Noodvoorbereiding gepersonaliseerd en makkelijk maken voor elk Nederlands gezin. 
              Zonder te hoeven stressen of de kwaliteit goed is.
            </p>
          </div>

          {/* Values Grid - matching homepage product card style */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-medical-green/10 rounded-full flex items-center justify-center mb-6 text-medical-green">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-navy-blue mb-3">{value.title}</h3>
                <p className="text-steel-gray">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy-blue rounded-3xl p-12 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Waarom wij anders zijn</h2>
              <p className="text-lg text-gray-300 mb-8">
                We begrijpen dat elk gezin uniek is. Daarom luisteren we eerst naar jouw situatie 
                voordat we adviseren. Of je nu een jong gezin hebt, alleen woont, of je zorgen maakt 
                om je ouders - we hebben een oplossing die past.
              </p>
              
              {/* Our approach */}
              <div className="space-y-4 max-w-2xl mx-auto">
                <p className="text-gray-300">
                  We hebben grondig onderzoek gedaan naar wat Nederlandse gezinnen écht nodig hebben in noodsituaties. 
                  Geen fancy certificaten of partnerships - gewoon gedegen research en gezond verstand.
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 flex items-center gap-3">
                    <svg className="w-5 h-5 text-medical-green" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Overheidsadvies gevolgd</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 flex items-center gap-3">
                    <svg className="w-5 h-5 text-medical-green" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>BHV gecertificeerd (Ruben)</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 flex items-center gap-3">
                    <svg className="w-5 h-5 text-medical-green" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Zelf getest & goedgekeurd</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-navy-blue mb-12">
            Dit maakt het verschil
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { number: "1", title: "Gepersonaliseerd", description: "Jouw persoonlijke essentiële items in één pakket" },
              { number: "2", title: "Getest & Goedgekeurd", description: "Producten doorstaan onze eigen strenge testfase" },
              { number: "3", title: "Onderzoek Gedreven", description: "We vroegen honderden mensen: wat heb jij nodig?" },
              { number: "4", title: "Snel Geleverd", description: "Zo snel mogelijk bij je thuis" }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 relative">
                <div className="text-5xl font-bold text-medical-green/20 absolute top-4 right-4">
                  {item.number}
                </div>
                <h3 className="font-semibold text-navy-blue mb-2 relative z-10">{item.title}</h3>
                <p className="text-steel-gray text-sm relative z-10">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - matching homepage style */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-navy-blue mb-6">
            Start vandaag nog met voorbereiden
          </h2>
          <p className="text-xl text-steel-gray mb-8">
            Het hoeft niet ingewikkeld te zijn. Kies het pakket dat bij jouw situatie past 
            en wees voorbereid op wat komen gaat.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/noodpakketten" 
              className="inline-block bg-medical-green text-white px-8 py-3 rounded-full font-semibold hover:bg-medical-green/90 transition-all"
            >
              Bekijk Noodpakketten
            </Link>
            <Link 
              href="/contact" 
              className="inline-block bg-white text-navy-blue border-2 border-navy-blue px-8 py-3 rounded-full font-semibold hover:bg-navy-blue hover:text-white transition-all"
            >
              Vraag Advies Aan
            </Link>
          </div>
          
          {/* Trust indicator */}
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-steel-gray">
            <svg className="w-4 h-4 text-medical-green" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>14 dagen bedenktijd • Verzending binnen 2 dagen</span>
          </div>
        </div>
      </section>
    </div>
  );
}