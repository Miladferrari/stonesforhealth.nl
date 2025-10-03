'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          message: formData.message,
          subject: `Contact vanaf website - ${formData.name}`
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });

        setTimeout(() => {
          setSubmitStatus('idle');
        }, 7000);
      } else {
        console.error('Contact form error:', data.error);
        setSubmitStatus('error');
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      }
    } catch (error) {
      console.error('Network error:', error);
      setSubmitStatus('error');
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-eb-garamond)]">
            Contact Ons
          </h1>
        </div>

        {/* Contact Info */}
        <div className="mb-10 text-center">
          <p className="text-lg text-gray-600 mb-4 font-[family-name:var(--font-eb-garamond)]">
            Als je vragen hebt over je bestelling en contact met ons wilt opnemen,
            kun je dat doen via onderstaand contactformulier of door ons een e-mail te sturen op:
          </p>
          <p className="text-xl text-[#492c4a] font-semibold font-[family-name:var(--font-eb-garamond)]">
            📧 info@stonesforhealth.nl
          </p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-lg font-medium text-gray-700 mb-2 font-[family-name:var(--font-eb-garamond)]"
              >
                Naam
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Uw naam"
                className="w-full px-4 py-3 text-lg text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#492c4a] focus:border-transparent transition-colors font-[family-name:var(--font-eb-garamond)]"
                autoComplete="name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-lg font-medium text-gray-700 mb-2 font-[family-name:var(--font-eb-garamond)]"
              >
                E-mail <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="uw@email.nl"
                required
                className="w-full px-4 py-3 text-lg text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#492c4a] focus:border-transparent transition-colors font-[family-name:var(--font-eb-garamond)]"
                autoComplete="email"
              />
            </div>
          </div>

          {/* Phone Field */}
          <div>
            <label
              htmlFor="phone"
              className="block text-lg font-medium text-gray-700 mb-2 font-[family-name:var(--font-eb-garamond)]"
            >
              Telefoonnummer
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="06-12345678"
              className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#492c4a] focus:border-transparent transition-colors font-[family-name:var(--font-eb-garamond)]"
              autoComplete="tel"
            />
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="message"
              className="block text-lg font-medium text-gray-700 mb-2 font-[family-name:var(--font-eb-garamond)]"
            >
              Bericht
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={5}
              placeholder="Uw bericht..."
              className="w-full px-4 py-3 text-lg text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#492c4a] focus:border-transparent transition-colors resize-none font-[family-name:var(--font-eb-garamond)]"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#fbe022] hover:bg-[#e6cc1f] text-black px-8 py-3 rounded-full font-semibold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-[family-name:var(--font-eb-garamond)] flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Versturen...
                </>
              ) : (
                <>
                  Versturen
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </div>

          {/* Success/Error Messages */}
          {submitStatus === 'success' && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
              <p className="text-lg text-green-700 font-[family-name:var(--font-eb-garamond)]">
                ✓ Bedankt voor uw bericht! We nemen zo snel mogelijk contact met u op.
              </p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-center">
              <p className="text-lg text-red-700 font-[family-name:var(--font-eb-garamond)]">
                Er is iets misgegaan. Probeer het later opnieuw of stuur ons een e-mail.
              </p>
            </div>
          )}
        </form>

        {/* Additional Contact Info */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-12">
            <div>
              <svg className="w-8 h-8 mx-auto mb-3 text-[#492c4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900 mb-1 font-[family-name:var(--font-eb-garamond)]">E-mail</h3>
              <p className="text-base text-gray-600 font-[family-name:var(--font-eb-garamond)]">info@stonesforhealth.nl</p>
            </div>

            <div>
              <svg className="w-8 h-8 mx-auto mb-3 text-[#492c4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900 mb-1 font-[family-name:var(--font-eb-garamond)]">Responstijd</h3>
              <p className="text-base text-gray-600 font-[family-name:var(--font-eb-garamond)]">Binnen 24 uur</p>
            </div>

            <div>
              <svg className="w-8 h-8 mx-auto mb-3 text-[#492c4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900 mb-1 font-[family-name:var(--font-eb-garamond)]">Telefoon</h3>
              <p className="text-base text-gray-600 font-[family-name:var(--font-eb-garamond)]">+31 6 42150340</p>
            </div>
          </div>

          {/* Business Details */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center font-[family-name:var(--font-eb-garamond)]">
              Bedrijfsgegevens
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {/* Address */}
              <div className="sm:col-span-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                  Bedrijfsadres
                </h3>
                <p className="text-base text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                  Stones for Health<br />
                  Koperhoek 54<br />
                  3162 LA Rhoon<br />
                  Nederland
                </p>
              </div>

              {/* Company Info */}
              <div className="sm:col-span-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                  Bedrijfsinformatie
                </h3>
                <p className="text-base text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                  <span className="font-medium">KVK:</span> 95898476
                </p>
              </div>

              {/* Opening Hours */}
              <div className="sm:col-span-2 lg:col-span-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 font-[family-name:var(--font-eb-garamond)]">
                  Openingstijden
                </h3>
                <div className="space-y-1">
                  <p className="text-base text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    Ma - Vr: 09:00 - 17:00
                  </p>
                  <p className="text-base text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    Za: 10:00 - 16:00
                  </p>
                  <p className="text-base text-gray-600 font-[family-name:var(--font-eb-garamond)]">
                    Zo: Gesloten
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}