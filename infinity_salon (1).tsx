import React, { useState, useEffect } from 'react';
import { 
  Menu, X, MapPin, Phone, Mail, Instagram, Facebook, 
  Clock, Star, ArrowRight 
} from 'lucide-react';

// --- CONFIGURATION & DONNÉES ---

const SERVICES = [
  {
    category: "Coupe & Coiffage",
    items: [
      { name: "Coupe Création Infinity", duration: "1h", price: "120€", desc: "Consultation visagisme, shampoing soin, coupe sur-mesure et styling." },
      { name: "Brushing Signature", duration: "45min", price: "65€", desc: "Mise en forme glamour, volume ou lissage parfait avec produits haut de gamme." },
      { name: "Soin Profond & Coiffage", duration: "1h15", price: "150€", desc: "Protocole de soin réparateur intense suivi d'un coiffage." }
    ]
  },
  {
    category: "Couleur & Lumière",
    items: [
      { name: "Balayage Signature", duration: "3h", price: "250€", desc: "Technique d'éclaircissement sur-mesure, patine et soin profond." },
      { name: "Coloration Premium", duration: "2h", price: "140€", desc: "Couleur éclatante, couverture parfaite et soin brillance." },
      { name: "Gloss & Reflets", duration: "1h", price: "80€", desc: "Bain de lumière pour raviver votre couleur naturelle ou artificielle." }
    ]
  }
];

const GALLERY_IMAGES = [
  { url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80", category: "Coupes" },
  { url: "https://images.unsplash.com/photo-1605369572399-05d8d64a0f6e?auto=format&fit=crop&q=80", category: "Locs & Braids" },
  { url: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&q=80", category: "Coupes" },
  { url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80", category: "Locs & Braids" },
  { url: "https://images.unsplash.com/photo-1618018357359-b1ffdd33a466?auto=format&fit=crop&q=80", category: "Soins" },
  { url: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&q=80", category: "Coupes" }
];

const GALLERY_CATEGORIES = ["Tous", "Coupes", "Locs & Braids", "Soins"];

// --- HOOKS ---

const useSEO = (title, description) => {
  useEffect(() => {
    document.title = title;
    document.documentElement.lang = 'fr';
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description;
  }, [title, description]);
};

const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    const elements = document.querySelectorAll('.reveal-element');
    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);
};

// --- COMPOSANTS ---

const WhatsAppIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500&family=Montserrat:wght@300;400;500;600&display=swap');
    :root { background-color: #0A0A0A; color: #F8F8F8; }
    body { margin: 0; font-family: 'Inter', sans-serif; overflow-x: hidden; background-color: #0A0A0A; }
    h1, h2, h3, .font-title { font-family: 'Cormorant Garamond', serif; }
    .font-subtitle { font-family: 'Montserrat', sans-serif; text-transform: uppercase; letter-spacing: 0.2em; }
    .reveal-element { opacity: 0; transform: translateY(40px); transition: opacity 1s, transform 1s; }
    .reveal-element.revealed { opacity: 1; transform: translateY(0); }
    .image-zoom-container { overflow: hidden; }
    .image-zoom-container img { transition: transform 1.5s; }
    .image-zoom-container:hover img { transform: scale(1.05); }
  `}} />
);

const Navbar = ({ activePage, setActivePage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navLinks = [
    { id: 'home', label: 'Accueil' },
    { id: 'services', label: 'Prestations' },
    { id: 'gallery', label: 'Galerie' },
    { id: 'about', label: 'À Propos' },
  ];
  const navigateTo = (id) => { setActivePage(id); setMobileMenuOpen(false); window.scrollTo(0,0); };

  return (
    <nav className="fixed w-full z-50 bg-[#0A0A0A]/90 backdrop-blur-md py-6 border-b border-[#1C1C1C]">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="font-title text-2xl cursor-pointer text-[#FFFFFF]" onClick={() => navigateTo('home')}>INFINITY <span className="font-light text-[#8A8A8A]">SALON</span></div>
        <div className="hidden md:flex items-center space-x-12 font-subtitle text-xs text-[#D9D9D9]">
          {navLinks.map((link) => (
            <button key={link.id} onClick={() => navigateTo(link.id)} className={`hover:text-[#FFFFFF] ${activePage === link.id ? 'text-[#FFFFFF]' : ''}`}>{link.label}</button>
          ))}
          <button onClick={() => navigateTo('booking')} className="border border-[#FFFFFF] text-[#FFFFFF] px-8 py-3">RÉSERVER</button>
        </div>
        <button className="md:hidden text-[#FFFFFF]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>{mobileMenuOpen ? <X/> : <Menu/>}</button>
      </div>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-[#121212] pt-24 pb-12 border-t border-[#1C1C1C] px-6 text-center text-[#8A8A8A] text-sm">
    <p>&copy; {new Date().getFullYear()} Infinity Salon. Tous droits réservés.</p>
  </footer>
);

const Home = ({ setActivePage }) => {
  useScrollReveal();
  useSEO("Infinity Salon | L'Excellence Capillaire", "Découvrez l'expertise premium en coiffure.");
  return (
    <div className="w-full">
      <section className="relative h-screen w-full flex items-center justify-center text-center">
        <iframe src="https://www.youtube.com/embed/oRsV23cK7Hw?autoplay=1&mute=1&loop=1&playlist=oRsV23cK7Hw&controls=0" className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none" title="Bg"></iframe>
        <div className="relative z-10 px-6">
          <h1 className="font-title text-5xl md:text-8xl text-white mb-8">Révélez votre beauté <br/><span className="italic text-[#8A8A8A]">absolue.</span></h1>
          <button onClick={() => setActivePage('booking')} className="bg-white text-black px-10 py-4 font-subtitle text-xs">PRENDRE RENDEZ-VOUS</button>
        </div>
      </section>
    </div>
  );
};

const Services = ({ setActivePage }) => {
  useScrollReveal();
  useSEO("Prestations | Infinity Salon", "Nos services.");
  return (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <h1 className="font-title text-6xl text-center mb-16">Carte des Soins</h1>
      {SERVICES.map((section, idx) => (
        <div key={idx} className="mb-16 reveal-element">
          <h2 className="font-subtitle text-lg mb-8 border-b border-[#1C1C1C] pb-4">{section.category}</h2>
          {section.items.map((item, i) => (
            <div key={i} className="flex justify-between py-6 border-b border-[#1C1C1C]">
              <div><h3 className="text-xl font-title">{item.name}</h3><p className="text-sm text-[#8A8A8A]">{item.desc}</p></div>
              <span className="font-title text-xl">{item.price}</span>
            </div>
          ))}
        </div>
      ))}
      <div className="text-center"><button onClick={() => setActivePage('booking')} className="bg-white text-black px-12 py-4 font-subtitle text-xs">RÉSERVER</button></div>
    </div>
  );
};

const Gallery = () => {
  useScrollReveal();
  const [filter, setFilter] = useState("Tous");
  const filtered = GALLERY_IMAGES.filter(i => filter === "Tous" || i.category === filter);
  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="flex justify-center gap-8 mb-12">
        {GALLERY_CATEGORIES.map(c => <button key={c} onClick={() => setFilter(c)} className={`font-subtitle text-xs ${filter === c ? 'text-white' : 'text-[#8A8A8A]'}`}>{c}</button>)}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((img, i) => <img key={i} src={img.url} className="w-full h-96 object-cover reveal-element" alt="Galerie" />)}
      </div>
    </div>
  );
};

const Booking = () => (
  <div className="pt-32 pb-24 px-6 text-center">
    <h1 className="font-title text-6xl mb-8">Réservation Privée</h1>
    <p className="text-[#8A8A8A] mb-12 max-w-xl mx-auto">Contactez notre conciergerie pour une expérience sur-mesure.</p>
    <a href="https://wa.me/33123456789" className="inline-flex items-center bg-white text-black px-12 py-5 font-subtitle text-xs hover:bg-[#D9D9D9] transition-all">
      <WhatsAppIcon className="mr-3" /> CONTACTER SUR WHATSAPP
    </a>
  </div>
);

const App = () => {
  const [activePage, setActivePage] = useState('home');
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <GlobalStyles />
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      <main className="flex-grow">{activePage === 'home' ? <Home setActivePage={setActivePage}/> : activePage === 'services' ? <Services setActivePage={setActivePage}/> : activePage === 'gallery' ? <Gallery/> : <Booking/>}</main>
      <Footer />
    </div>
  );
};

export default App;