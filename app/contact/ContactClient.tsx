'use client';

import { useState } from 'react';

export default function ContactClient() {
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
              placeholder="06 12345678"
              className="w-full px-4 py-3 text-lg text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#492c4a] focus:border-transparent transition-colors font-[family-name:var(--font-eb-garamond)]"
              autoComplete="tel"
            />
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="message"
              className="block text-lg font-medium text-gray-700 mb-2 font-[family-name:var(--font-eb-garamond)]"
            >
              Bericht <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={6}
              placeholder="Typ hier uw bericht..."
              required
              className="w-full px-4 py-3 text-lg text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#492c4a] focus:border-transparent transition-colors resize-none font-[family-name:var(--font-eb-garamond)]"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white rounded-lg transition-all font-[family-name:var(--font-eb-garamond)] ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#492c4a] hover:bg-[#6b4069] transform hover:scale-105'
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verzenden...
                </>
              ) : (
                'Verstuur Bericht'
              )}
            </button>
          </div>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 text-center font-semibold font-[family-name:var(--font-eb-garamond)]">
                ✅ Bedankt voor je bericht! We nemen zo snel mogelijk contact met je op.
              </p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-center font-semibold font-[family-name:var(--font-eb-garamond)]">
                ❌ Er is iets misgegaan. Probeer het later opnieuw of stuur een e-mail naar info@stonesforhealth.nl
              </p>
            </div>
          )}
        </form>

        {/* Additional Contact Methods */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-[#492c4a]/10 rounded-full mb-4">
              <svg className="w-6 h-6 text-[#492c4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">E-mail</h3>
            <p className="text-gray-600 font-[family-name:var(--font-eb-garamond)]">info@stonesforhealth.nl</p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-[#492c4a]/10 rounded-full mb-4">
              <svg className="w-6 h-6 text-[#492c4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">Reactietijd</h3>
            <p className="text-gray-600 font-[family-name:var(--font-eb-garamond)]">Binnen 24 uur</p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-[#492c4a]/10 rounded-full mb-4">
              <svg className="w-6 h-6 text-[#492c4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 font-[family-name:var(--font-eb-garamond)]">Support</h3>
            <p className="text-gray-600 font-[family-name:var(--font-eb-garamond)]">Ma-Vr 9:00-17:00</p>
          </div>
        </div>
      </div>
    </div>
  );
}
