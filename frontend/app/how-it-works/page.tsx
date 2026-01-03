export default function HowItWorks() {
    return (
      <div className="min-h-screen bg-[#030712] text-white p-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Project Overview (Developer Mode)
          </h1>
          
          <div className="grid gap-6">
            <section className="p-6 rounded-2xl border border-white/10 bg-white/5">
              <h2 className="text-2xl font-semibold mb-4 text-blue-300">Architecture</h2>
              <p className="text-slate-400">
                Krishi Mitra is built with Next.js 14. It uses AI models to analyze soil and weather data 
                to provide real-time advice to farmers.
              </p>
            </section>
  
            <section className="p-6 rounded-2xl border border-white/10 bg-white/5">
              <h2 className="text-2xl font-semibold mb-4 text-emerald-300">Features Explained</h2>
              <ul className="list-disc list-inside text-slate-400 space-y-2">
                <li><strong>Chatbot:</strong> Multilingual support for farming queries.</li>
                <li><strong>Crop Doctor:</strong> Image-based disease detection.</li>
                <li><strong>Market Price:</strong> Real-time APMC mandi rates.</li>
              </ul>
            </section>
          </div>
          
          <a href="/" className="inline-block mt-10 px-6 py-2 bg-blue-600 rounded-lg">Back to Landing Page</a>
        </div>
      </div>
    );
  }
