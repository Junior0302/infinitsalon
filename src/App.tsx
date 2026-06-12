import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  Clock,
  MapPin,
  Menu,
  Phone,
  Star,
  X,
} from 'lucide-react';

type Page = 'home' | 'services' | 'gallery' | 'about' | 'booking';
type Locale = 'fr' | 'en';

type LocalizedText = {
  fr: string;
  en: string;
};

type ServiceItem = {
  name: LocalizedText;
  duration: string;
  price: string;
  desc: LocalizedText;
};

type ServiceCategory = {
  category: LocalizedText;
  items: ServiceItem[];
};

const GALLERY_CATEGORY_IDS = ['all', 'locs', 'braids', 'afro', 'barber', 'care'] as const;

type GalleryCategory = (typeof GALLERY_CATEGORY_IDS)[number];

type GalleryItem = {
  url: string;
  alt: LocalizedText;
  category: Exclude<GalleryCategory, 'all'>;
};

const SERVICES: ServiceCategory[] = [
  {
    category: {
      fr: 'Coupe & Coiffage',
      en: 'Cut & Styling',
    },
    items: [
      {
        name: {
          fr: 'Coupe Creation Infinity',
          en: 'Infinity Signature Cut',
        },
        duration: '1h',
        price: '120EUR',
        desc: {
          fr: 'Consultation visagisme, shampoing soin, coupe sur-mesure et styling.',
          en: 'Tailored consultation, treatment shampoo, bespoke haircut and styling.',
        },
      },
      {
        name: {
          fr: 'Brushing Signature',
          en: 'Signature Blowout',
        },
        duration: '45min',
        price: '65EUR',
        desc: {
          fr: 'Mise en forme glamour, volume ou lissage parfait avec produits haut de gamme.',
          en: 'Glamorous finish, volume or sleek result with premium products.',
        },
      },
      {
        name: {
          fr: 'Soin Profond & Coiffage',
          en: 'Deep Treatment & Styling',
        },
        duration: '1h15',
        price: '150EUR',
        desc: {
          fr: 'Protocole de soin reparateur intense suivi d un coiffage.',
          en: 'Intensive restorative treatment followed by a refined styling finish.',
        },
      },
    ],
  },
  {
    category: {
      fr: 'Couleur & Lumiere',
      en: 'Color & Light',
    },
    items: [
      {
        name: {
          fr: 'Balayage Signature',
          en: 'Signature Balayage',
        },
        duration: '3h',
        price: '250EUR',
        desc: {
          fr: 'Technique d eclaircissement sur-mesure, patine et soin profond.',
          en: 'Custom lightening technique with gloss and deep conditioning.',
        },
      },
      {
        name: {
          fr: 'Coloration Premium',
          en: 'Premium Color',
        },
        duration: '2h',
        price: '140EUR',
        desc: {
          fr: 'Couleur eclatante, couverture parfaite et soin brillance.',
          en: 'Radiant color, full coverage and shine-enhancing care.',
        },
      },
      {
        name: {
          fr: 'Gloss & Reflets',
          en: 'Gloss & Highlights',
        },
        duration: '1h',
        price: '80EUR',
        desc: {
          fr: 'Bain de lumiere pour raviver votre couleur naturelle ou artificielle.',
          en: 'Light-reflecting gloss to refresh natural or colored hair.',
        },
      },
    ],
  },
];

const GALLERY_IMAGES: GalleryItem[] = [
  {
    url: 'https://images.pexels.com/photos/16661946/pexels-photo-16661946.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: {
      fr: 'Homme avec locs, style urbain',
      en: 'Man with locs, urban style',
    },
    category: 'locs',
  },
  {
    url: 'https://images.pexels.com/photos/6616646/pexels-photo-6616646.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: {
      fr: 'Profil homme avec locs',
      en: 'Side profile of man with locs',
    },
    category: 'locs',
  },
  {
    url: 'https://images.pexels.com/photos/17093520/pexels-photo-17093520.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: {
      fr: 'Femme souriante avec locs en studio',
      en: 'Smiling woman with locs in studio',
    },
    category: 'locs',
  },
  {
    url: 'https://images.pexels.com/photos/7902993/pexels-photo-7902993.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: {
      fr: 'Tresses et lunettes, portrait lumineux',
      en: 'Braids and glasses, bright portrait',
    },
    category: 'braids',
  },
  {
    url: 'https://images.pexels.com/photos/14930866/pexels-photo-14930866.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: {
      fr: 'Box braids, portrait',
      en: 'Box braids portrait',
    },
    category: 'braids',
  },
  {
    url: 'https://images.pexels.com/photos/22700213/pexels-photo-22700213.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: {
      fr: 'Cornrows, portrait noir et blanc',
      en: 'Cornrows, black and white portrait',
    },
    category: 'braids',
  },
  {
    url: 'https://images.pexels.com/photos/31738711/pexels-photo-31738711.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: {
      fr: 'Coupe afro, fond rouge',
      en: 'Afro haircut, red backdrop',
    },
    category: 'afro',
  },
  {
    url: 'https://images.pexels.com/photos/5854833/pexels-photo-5854833.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: {
      fr: 'Homme avec braids, ambiance urbaine',
      en: 'Man with braids, urban mood',
    },
    category: 'afro',
  },
  {
    url: 'https://images.pexels.com/photos/7389075/pexels-photo-7389075.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: {
      fr: 'Client en coupe, selfie au barber',
      en: 'Client during haircut, selfie in barbershop',
    },
    category: 'barber',
  },
  {
    url: 'https://images.pexels.com/photos/7697393/pexels-photo-7697393.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: {
      fr: 'Barber en action, tondeuse',
      en: 'Barber in action, clipper work',
    },
    category: 'barber',
  },
  {
    url: 'https://images.pexels.com/photos/5241036/pexels-photo-5241036.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: {
      fr: 'Soin shampoing, mousse',
      en: 'Hair care shampoo treatment',
    },
    category: 'care',
  },
];

const CONTACT = {
  phone: '+33 6 95 09 32 15',
  phoneHref: 'tel:+33695093215',
  whatsappHref: 'https://wa.me/33695093215',
  whatsappLabel: '+33 6 95 09 32 15',
  email: 'contact@infinitifsalonpro.fr',
  emailHref: 'mailto:contact@infinitifsalonpro.fr',
  address: '5B Rue de la Course, 67000 Strasbourg',
  schedule: {
    fr: 'Lun - Sam, 10h00 - 20h00',
    en: 'Mon - Sat, 10:00 AM - 8:00 PM',
  },
};

const CATEGORY_LABELS: Record<GalleryCategory, LocalizedText> = {
  all: { fr: 'Tous', en: 'All' },
  locs: { fr: 'Locs', en: 'Locs' },
  braids: { fr: 'Braids', en: 'Braids' },
  afro: { fr: 'Afro', en: 'Afro' },
  barber: { fr: 'Barber', en: 'Barber' },
  care: { fr: 'Soins', en: 'Care' },
};

const UI = {
  fr: {
    skipToContent: 'Aller au contenu',
    brandTagline: 'Salon afro premium',
    menu: 'Menu',
    close: 'Fermer',
    contact: 'Contact',
    whatsapp: 'WhatsApp',
    phone: 'Telephone',
    address: 'Adresse',
    email: 'Email',
    navigation: 'Navigation',
    followUs: 'Suivez-nous',
    reserve: 'RESERVER',
    nav: {
      home: 'Accueil',
      services: 'Prestations',
      gallery: 'Galerie',
      about: 'A propos',
    },
    footerDescription:
      'Un salon premium imagine pour une clientele en quete d excellence, de soins experts et d une experience intime.',
    rights: 'Tous droits reserves.',
    home: {
      seoTitle: 'Infinity Salon | L excellence capillaire',
      seoDescription: 'Decouvrez l expertise premium en coiffure afro, barber et soins.',
      title: 'Revelez votre beaute',
      accent: 'absolue.',
      subtitle:
        'Coiffure afro, locs, braids, coupes et soins premium dans un cadre confidentiel a Strasbourg.',
      ctaBook: 'PRENDRE RENDEZ-VOUS',
      ctaDiscover: 'DECOUVRIR LES SOINS',
      ctaWatch: 'VOIR LA VIDEO',
      videoLabel: 'Presentation',
      videoAssistiveText:
        'La video de presentation est optionnelle et non essentielle a la navigation. Le site reste pleinement utilisable sans la lancer.',
      features: [
        ['Experience privee', 'Un accueil confidentiel, des conseils experts et un accompagnement sur mesure.'],
        ['Techniques premium', 'Des protocoles pointus pour les textures afro, les braids, les locs et les coupes nettes.'],
        ['Resultats durables', 'Des produits performants et une finition signature adaptee a votre quotidien.'],
      ] as const,
      expertiseEyebrow: 'Signatures',
      expertiseTitle: 'Des prestations pensees pour les textures afro et les styles affirmes.',
      expertiseText:
        'Infinity Salon combine coiffure, entretien, precision barber et conseil image pour proposer une experience complete, du diagnostic a la finition.',
      expertiseCards: [
        ['Locs & entretien', 'Retwist, entretien, hygiene du cuir chevelu et finitions nettes pour conserver des locs propres et regulieres.'],
        ['Braids & protective styles', 'Tresses, cornrows et coiffures protectrices realisees avec attention au confort, a la tenue et au rendu.'],
        ['Barber & coupe', 'Contours propres, fondus soignes et coupe adaptee a la morphologie pour un resultat net et durable.'],
      ] as const,
      journeyEyebrow: 'Experience client',
      journeyTitle: 'Un rendez-vous clair, simple et rassurant.',
      journeyText:
        'Chaque etape est pensee pour vous accompagner avant, pendant et apres votre rendez-vous.',
      journeySteps: [
        ['1. Contact rapide', 'Par telephone, WhatsApp ou email selon votre preference.'],
        ['2. Diagnostic', 'Nous clarifions votre besoin, votre texture et le resultat souhaite.'],
        ['3. Realisation', 'Le rendez-vous est execute avec precision, confort et conseils adaptes.'],
      ] as const,
    },
    services: {
      seoTitle: 'Prestations | Infinity Salon',
      seoDescription: 'Nos services premium de coupe, couleur et soin.',
      eyebrow: 'Notre carte',
      title: 'Carte des soins',
      text: 'Des prestations pensees pour sublimer chaque texture, chaque mouvement et chaque personnalite.',
    },
    gallery: {
      seoTitle: 'Galerie | Infinity Salon',
      seoDescription: 'Inspirations coupe, couleur et coiffage.',
      eyebrow: 'Inspirations',
      title: 'Galerie signature',
      text: 'Une selection de looks et de finitions qui illustrent l univers visuel d Infinity Salon.',
    },
    about: {
      seoTitle: 'A propos | Infinity Salon',
      seoDescription: 'L ADN, la methode et la vision d Infinity Salon.',
      eyebrow: 'Notre vision',
      title: 'Une approche editoriale de la coiffure',
      text:
        'Chaque rendez-vous commence par l ecoute, se poursuit par un diagnostic precis et se termine par un resultat pense pour vous mettre en valeur durablement.',
      sectionEyebrow: 'Excellence & personnalisation',
      sectionTitle: 'Un salon concu comme une experience.',
      paragraph1:
        'Notre equipe accompagne chaque cliente et chaque client avec une methode exigeante: diagnostic matiere, intention esthetique, choix technique et recommandations de suivi.',
      paragraph2:
        'L objectif n est pas seulement de realiser une coiffure, mais de construire une signature qui vous ressemble et s integre naturellement a votre quotidien.',
      cta: 'PARLER SUR WHATSAPP',
      cards: [
        ['Temps dedie', 'Des rendez-vous calibres pour travailler sans precipitation et privilegier la qualite.'],
        ['Expertise conseil', 'Un accompagnement esthetique pour harmoniser coupe, texture, couleur et style personnel.'],
        ['Adresse a Strasbourg', 'Un espace calme et soigne, pense pour une clientele exigeante au coeur de Strasbourg.'],
      ] as const,
    },
    booking: {
      seoTitle: 'Reservation | Infinity Salon',
      seoDescription: 'Contactez Infinity Salon a Strasbourg.',
      eyebrow: 'Reservation privee',
      title: 'Prenez contact avec notre equipe.',
      text:
        'Pour reserver votre rendez-vous, poser une question ou envoyer une inspiration, choisissez le canal qui vous convient.',
      whatsappTitle: 'WhatsApp',
      whatsappText: 'Le moyen le plus simple pour reserver rapidement et echanger directement.',
      phoneTitle: 'Telephone',
      phoneText: 'Appelez-nous pour fixer votre horaire ideal ou demander une information.',
      addressTitle: 'Adresse',
      addressText: 'Retrouvez-nous au salon a Strasbourg pour votre prochain rendez-vous.',
      emailTitle: 'Email',
      emailText: 'Ecrivez-nous pour une demande detaillee, une question ou un premier contact.',
      contactAction: 'CONTACTER',
    },
    langLabel: 'EN',
  },
  en: {
    skipToContent: 'Skip to content',
    brandTagline: 'Premium afro salon',
    menu: 'Menu',
    close: 'Close',
    contact: 'Contact',
    whatsapp: 'WhatsApp',
    phone: 'Phone',
    address: 'Address',
    email: 'Email',
    navigation: 'Navigation',
    followUs: 'Follow us',
    reserve: 'BOOK NOW',
    nav: {
      home: 'Home',
      services: 'Services',
      gallery: 'Gallery',
      about: 'About',
    },
    footerDescription:
      'A premium salon designed for clients seeking excellence, expert care and an intimate experience.',
    rights: 'All rights reserved.',
    home: {
      seoTitle: 'Infinity Salon | Premium Hair Expertise',
      seoDescription: 'Discover premium afro hair, barbering and care services.',
      title: 'Reveal your beauty',
      accent: 'fully.',
      subtitle:
        'Afro hair, locs, braids, clean cuts and premium care in a confidential space in Strasbourg.',
      ctaBook: 'BOOK AN APPOINTMENT',
      ctaDiscover: 'DISCOVER SERVICES',
      ctaWatch: 'WATCH VIDEO',
      videoLabel: 'Presentation',
      videoAssistiveText:
        'The presentation video is optional and not required to use the site. The full experience remains accessible without playing it.',
      features: [
        ['Private experience', 'Confidential welcome, expert advice and tailored support from start to finish.'],
        ['Premium techniques', 'Advanced work for afro textures, braids, locs and sharp cuts.'],
        ['Lasting results', 'High-performance products and a signature finish adapted to daily life.'],
      ] as const,
      expertiseEyebrow: 'Signature work',
      expertiseTitle: 'Services designed for afro textures and strong personal style.',
      expertiseText:
        'Infinity Salon combines haircare, maintenance, barber precision and image advice to deliver a complete experience from diagnosis to final finish.',
      expertiseCards: [
        ['Locs maintenance', 'Retwist, upkeep, scalp care and clean finishes to keep locs neat and consistent.'],
        ['Braids & protective styles', 'Braids, cornrows and protective styling created with comfort, longevity and visual balance in mind.'],
        ['Barber & cuts', 'Clean lines, polished fades and face-shape-aware cuts for a sharp lasting result.'],
      ] as const,
      journeyEyebrow: 'Client journey',
      journeyTitle: 'A clear, simple and reassuring appointment flow.',
      journeyText: 'Every step is designed to support you before, during and after your appointment.',
      journeySteps: [
        ['1. Quick contact', 'Reach out by phone, WhatsApp or email depending on your preference.'],
        ['2. Diagnosis', 'We clarify your needs, your texture and the desired result.'],
        ['3. Service delivery', 'Your appointment is carried out with precision, comfort and tailored advice.'],
      ] as const,
    },
    services: {
      seoTitle: 'Services | Infinity Salon',
      seoDescription: 'Our premium cut, color and care services.',
      eyebrow: 'Our menu',
      title: 'Service menu',
      text: 'Services designed to elevate every texture, movement and personality.',
    },
    gallery: {
      seoTitle: 'Gallery | Infinity Salon',
      seoDescription: 'Cut, color and styling inspirations.',
      eyebrow: 'Inspirations',
      title: 'Signature gallery',
      text: 'A curated selection of looks and finishes that reflect the visual world of Infinity Salon.',
    },
    about: {
      seoTitle: 'About | Infinity Salon',
      seoDescription: 'The vision, method and DNA of Infinity Salon.',
      eyebrow: 'Our vision',
      title: 'An editorial approach to hair',
      text:
        'Every appointment starts with listening, continues with a precise diagnosis and ends with a result designed to enhance you for the long term.',
      sectionEyebrow: 'Excellence & personalization',
      sectionTitle: 'A salon designed as an experience.',
      paragraph1:
        'Our team supports every client with a demanding method: texture diagnosis, aesthetic intention, technical choice and aftercare recommendations.',
      paragraph2:
        'The goal is not only to create a hairstyle, but to shape a signature that feels like you and fits naturally into your daily life.',
      cta: 'CHAT ON WHATSAPP',
      cards: [
        ['Dedicated time', 'Appointments are planned to avoid rushing and focus on quality.'],
        ['Expert advice', 'Aesthetic guidance to align cut, texture, color and personal style.'],
        ['Strasbourg location', 'A calm and carefully designed space for demanding clients in Strasbourg.'],
      ] as const,
    },
    booking: {
      seoTitle: 'Booking | Infinity Salon',
      seoDescription: 'Contact Infinity Salon in Strasbourg.',
      eyebrow: 'Private booking',
      title: 'Get in touch with our team.',
      text: 'To book an appointment, ask a question or share inspiration, choose the contact option that suits you best.',
      whatsappTitle: 'WhatsApp',
      whatsappText: 'The easiest way to book quickly and chat with us directly.',
      phoneTitle: 'Phone',
      phoneText: 'Call us to choose the ideal time slot or request information.',
      addressTitle: 'Address',
      addressText: 'Visit us at the salon in Strasbourg for your next appointment.',
      emailTitle: 'Email',
      emailText: 'Write to us for a detailed request, a question or an initial contact.',
      contactAction: 'CONTACT',
    },
    langLabel: 'FR',
  },
} as const;

const setMetaByName = (name: string, content: string) => {
  let meta = document.querySelector(`meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', name);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
};

const setMetaByProperty = (property: string, content: string) => {
  let meta = document.querySelector(`meta[property="${property}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('property', property);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
};

const useSEO = (title: string, description: string, lang: Locale) => {
  useEffect(() => {
    document.title = title;
    document.documentElement.lang = lang;
    setMetaByName('description', description);
    setMetaByName('robots', 'index,follow,max-image-preview:large');
    setMetaByName('theme-color', '#0A0A0A');
    setMetaByProperty('og:title', title);
    setMetaByProperty('og:description', description);
    setMetaByProperty('og:type', 'website');
    setMetaByProperty('og:locale', lang === 'fr' ? 'fr_FR' : 'en_GB');
  }, [title, description, lang]);
};

const EMPTY_DEPS: ReadonlyArray<unknown> = [];

const useScrollReveal = (deps?: ReadonlyArray<unknown>) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    );

    const elements = document.querySelectorAll('.reveal-element');
    elements.forEach((element) => observer.observe(element));

    return () => {
      elements.forEach((element) => observer.unobserve(element));
      observer.disconnect();
    };
  }, deps ?? EMPTY_DEPS);
};

const useEscapeToClose = (isOpen: boolean, onClose: () => void) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);
};

const WhatsAppIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const GlobalStyles = () => (
  <style
    dangerouslySetInnerHTML={{
      __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500&family=Montserrat:wght@300;400;500;600&display=swap');
        :root { background-color: #0A0A0A; color: #F8F8F8; }
        body { font-family: 'Inter', sans-serif; overflow-x: hidden; background-color: #0A0A0A; color: #F8F8F8; }
        h1, h2, h3, .font-title { font-family: 'Cormorant Garamond', serif; }
        .font-subtitle { font-family: 'Montserrat', sans-serif; text-transform: uppercase; letter-spacing: 0.2em; }
        .reveal-element { opacity: 0; transform: translateY(40px); transition: opacity 1s, transform 1s; }
        .reveal-element.revealed { opacity: 1; transform: translateY(0); }
        .image-zoom-container { overflow: hidden; }
        .image-zoom-container img { transition: transform 1.5s; }
        .image-zoom-container:hover img { transform: scale(1.05); }
        .skip-link { position: absolute; left: 1rem; top: 1rem; transform: translateY(-200%); z-index: 100; background: #FFFFFF; color: #000000; padding: 0.75rem 1rem; }
        .skip-link:focus { transform: translateY(0); }
        .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
        *:focus-visible { outline: 2px solid #FFFFFF; outline-offset: 3px; }
        @media (prefers-reduced-motion: reduce) { .hero-video { display: none; } }
      `,
    }}
  />
);

const SectionHeading = ({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) => (
  <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 reveal-element">
    <p className="font-subtitle text-xs text-[#8A8A8A] mb-4">{eyebrow}</p>
    <h2 className="font-title text-4xl sm:text-5xl md:text-6xl text-white mb-6">{title}</h2>
    <p className="text-[#B6B6B6] leading-7">{text}</p>
  </div>
);

const Navbar = ({
  activePage,
  setActivePage,
  locale,
  setLocale,
}: {
  activePage: Page;
  setActivePage: React.Dispatch<React.SetStateAction<Page>>;
  locale: Locale;
  setLocale: React.Dispatch<React.SetStateAction<Locale>>;
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const copy = UI[locale];
  useEscapeToClose(mobileMenuOpen, () => setMobileMenuOpen(false));

  const navLinks: { id: Page; label: string }[] = [
    { id: 'home', label: copy.nav.home },
    { id: 'services', label: copy.nav.services },
    { id: 'gallery', label: copy.nav.gallery },
    { id: 'about', label: copy.nav.about },
  ];

  const navigateTo = (id: Page) => {
    setActivePage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  return (
    <nav
      className="fixed w-full z-50 bg-[#0A0A0A]/90 backdrop-blur-md py-4 sm:py-5 border-b border-[#1C1C1C]"
      aria-label={locale === 'fr' ? 'Navigation principale' : 'Primary navigation'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        <button
          type="button"
          className="font-title text-xl sm:text-2xl cursor-pointer text-[#FFFFFF]"
          onClick={() => navigateTo('home')}
        >
          INFINITY <span className="font-light text-[#8A8A8A]">SALON</span>
        </button>

        <div className="hidden md:flex items-center space-x-5 lg:space-x-8 font-subtitle text-xs text-[#D9D9D9]">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => navigateTo(link.id)}
              aria-current={activePage === link.id ? 'page' : undefined}
              className={`hover:text-[#FFFFFF] transition-colors ${activePage === link.id ? 'text-[#FFFFFF]' : ''}`}
            >
              {link.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setLocale((current) => (current === 'fr' ? 'en' : 'fr'))}
            className="border border-[#2A2A2A] px-4 py-3 text-white hover:border-white transition-colors"
          >
            {copy.langLabel}
          </button>
          <button
            type="button"
            onClick={() => navigateTo('booking')}
            className="border border-[#FFFFFF] text-[#FFFFFF] px-6 lg:px-8 py-3 hover:bg-white hover:text-black transition-colors"
          >
            {copy.reserve}
          </button>
        </div>

        <button
          type="button"
          className="md:hidden text-[#FFFFFF]"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label={copy.menu}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label={copy.menu}>
          <button
            type="button"
            className="absolute inset-0 bg-black/70"
            aria-label={copy.close}
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[min(360px,85vw)] bg-[#0A0A0A] border-l border-[#1C1C1C] p-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="font-title text-2xl text-white">{copy.menu}</p>
                <p className="text-sm text-[#8A8A8A] mt-1">Infinity Salon</p>
              </div>
              <button type="button" className="text-white" aria-label={copy.close} onClick={() => setMobileMenuOpen(false)}>
                <X />
              </button>
            </div>
            <div className="rounded-2xl border border-[#1C1C1C] bg-[#111111] p-4 mb-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-subtitle text-[10px] text-[#8A8A8A] mb-2">{locale === 'fr' ? 'Langue' : 'Language'}</p>
                  <p className="text-sm text-white">{locale === 'fr' ? 'Francais' : 'English'}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setLocale((current) => (current === 'fr' ? 'en' : 'fr'))}
                  className="border border-[#2A2A2A] px-4 py-2 text-white text-sm hover:border-white transition-colors"
                >
                  {copy.langLabel}
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-3 font-subtitle text-xs text-[#D9D9D9]">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => navigateTo(link.id)}
                  aria-current={activePage === link.id ? 'page' : undefined}
                  className="text-left rounded-2xl border border-[#1C1C1C] bg-[#111111] px-4 py-4 hover:border-white transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => navigateTo('booking')}
                className="text-left rounded-2xl bg-white text-black px-4 py-4"
              >
                {copy.reserve}
              </button>
            </div>
            <div className="mt-6 rounded-2xl border border-[#1C1C1C] bg-[#111111] p-4 text-[#D9D9D9]">
              <p className="font-subtitle text-[10px] text-[#8A8A8A] mb-3">{copy.contact}</p>
              <a href={CONTACT.phoneHref} className="flex items-center gap-3 py-2">
                <Phone size={16} />
                <span className="text-sm">{CONTACT.phone}</span>
              </a>
              <a
                href={CONTACT.whatsappHref}
                target="_blank"
                rel="noreferrer"
                aria-label={`WhatsApp ${CONTACT.whatsappLabel}`}
                className="flex items-center justify-between gap-3 rounded-xl border border-[#1C1C1C] bg-black/20 px-3 py-3 hover:border-white transition-colors"
              >
                <span className="flex items-center gap-3">
                  <WhatsAppIcon size={16} />
                  <span className="text-sm">WhatsApp</span>
                </span>
                <span className="text-sm whitespace-nowrap">{CONTACT.whatsappLabel}</span>
              </a>
              <a href={CONTACT.emailHref} className="flex items-center gap-3 py-2">
                <span className="text-sm font-subtitle">Email</span>
                <span className="text-sm break-all">{CONTACT.email}</span>
              </a>
              <div className="flex items-start gap-3 py-2">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span className="text-sm">{CONTACT.address}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = ({
  setActivePage,
  locale,
}: {
  setActivePage: React.Dispatch<React.SetStateAction<Page>>;
  locale: Locale;
}) => {
  const copy = UI[locale];

  return (
  <footer className="bg-[#121212] pt-16 sm:pt-20 pb-12 border-t border-[#1C1C1C] px-4 sm:px-6">
    <div className="max-w-7xl mx-auto grid gap-8 md:gap-10 md:grid-cols-4">
      <div>
        <p className="font-title text-3xl text-white mb-4">Infinity Salon</p>
        <p className="text-[#8A8A8A] leading-7">{copy.footerDescription}</p>
      </div>

      <div>
        <p className="font-subtitle text-xs text-white mb-5">{copy.navigation}</p>
        <div className="flex flex-col gap-3 text-[#B6B6B6]">
          <button type="button" onClick={() => setActivePage('services')} className="text-left">
            {copy.nav.services}
          </button>
          <button type="button" onClick={() => setActivePage('gallery')} className="text-left">
            {copy.nav.gallery}
          </button>
          <button type="button" onClick={() => setActivePage('about')} className="text-left">
            {copy.nav.about}
          </button>
          <button type="button" onClick={() => setActivePage('booking')} className="text-left">
            {copy.reserve}
          </button>
        </div>
      </div>

      <div>
        <p className="font-subtitle text-xs text-white mb-5">{copy.contact}</p>
        <div className="space-y-4 text-[#B6B6B6]">
          <a href={CONTACT.phoneHref} className="flex items-start gap-3">
            <Phone size={18} className="mt-1 shrink-0" />
            <span>{CONTACT.phone}</span>
          </a>
          <a
            href={CONTACT.whatsappHref}
            target="_blank"
            rel="noreferrer"
            aria-label={`WhatsApp ${CONTACT.whatsappLabel}`}
            className="flex items-start justify-between gap-3 rounded-xl border border-[#1C1C1C] bg-black/20 px-4 py-3 hover:border-white transition-colors"
          >
            <span className="flex items-start gap-3">
              <WhatsAppIcon size={18} className="mt-1 shrink-0" />
              <span>WhatsApp</span>
            </span>
            <span className="whitespace-nowrap">{CONTACT.whatsappLabel}</span>
          </a>
          <div className="flex items-start gap-3">
            <MapPin size={18} className="mt-1 shrink-0" />
            <span>{CONTACT.address}</span>
          </div>
          <a href={CONTACT.emailHref} className="flex items-start gap-3">
            <span className="mt-1 shrink-0 font-subtitle text-[10px]">{copy.email}</span>
            <span className="break-all">{CONTACT.email}</span>
          </a>
        </div>
      </div>

      <div>
        <p className="font-subtitle text-xs text-white mb-5">{locale === 'fr' ? 'Horaires' : 'Opening hours'}</p>
        <p className="text-[#8A8A8A] text-sm leading-7">{CONTACT.schedule[locale]}</p>
        <p className="text-[#8A8A8A] text-sm leading-7 mt-4">{CONTACT.address}</p>
      </div>
    </div>

    <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-[#1C1C1C] text-center text-[#8A8A8A] text-sm">
      <p>
        &copy; {new Date().getFullYear()} Infinity Salon. {copy.rights}
      </p>
    </div>
  </footer>
  );
};

const Home = ({
  setActivePage,
  locale,
}: {
  setActivePage: React.Dispatch<React.SetStateAction<Page>>;
  locale: Locale;
}) => {
  const [videoOpen, setVideoOpen] = useState(false);
  const copy = UI[locale];

  useScrollReveal();
  useSEO(copy.home.seoTitle, copy.home.seoDescription, locale);
  useEscapeToClose(videoOpen, () => setVideoOpen(false));

  useEffect(() => {
    if (!videoOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [videoOpen]);

  return (
    <div className="w-full">
      <section
        aria-labelledby="home-hero-title"
        className="relative min-h-[100svh] w-full flex items-center justify-center text-center overflow-hidden bg-black"
      >
        <video
          className="hero-video absolute inset-0 w-full h-full object-cover opacity-35"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="https://cdn.pixabay.com/video/2020/09/03/48968-459186304_large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#0A0A0A]" />

        <div className="relative z-10 px-4 sm:px-6 max-w-5xl">
          <p className="font-subtitle text-xs text-[#D9D9D9] mb-5 sm:mb-6 reveal-element">{copy.brandTagline}</p>
          <h1 id="home-hero-title" className="font-title text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-tight text-white mb-6 sm:mb-8 reveal-element">
            {copy.home.title}
            <br />
            <span className="italic text-[#8A8A8A]">{copy.home.accent}</span>
          </h1>
          <p className="max-w-2xl mx-auto text-[#D9D9D9] text-base sm:text-lg leading-8 mb-8 sm:mb-10 reveal-element">
            {copy.home.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 reveal-element">
            <button
              type="button"
              onClick={() => setActivePage('booking')}
              className="bg-white text-black px-8 sm:px-10 py-4 font-subtitle text-xs hover:bg-[#D9D9D9] transition-colors w-full sm:w-auto"
            >
              {copy.home.ctaBook}
            </button>
            <button
              type="button"
              onClick={() => setActivePage('services')}
              className="border border-white px-8 sm:px-10 py-4 font-subtitle text-xs hover:bg-white hover:text-black transition-colors w-full sm:w-auto"
            >
              {copy.home.ctaDiscover}
            </button>
            <button
              type="button"
              onClick={() => setVideoOpen(true)}
              className="border border-white/50 text-white px-8 sm:px-10 py-4 font-subtitle text-xs hover:border-white hover:bg-white/10 transition-colors w-full sm:w-auto"
            >
              {copy.home.ctaWatch}
            </button>
          </div>
          <p className="sr-only">{copy.home.videoAssistiveText}</p>
        </div>
      </section>

      {videoOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8">
          <button
            type="button"
            className="absolute inset-0 bg-black/80"
            aria-label={locale === 'fr' ? 'Fermer la video' : 'Close video'}
            onClick={() => setVideoOpen(false)}
          />
          <div className="relative w-full max-w-4xl bg-black border border-[#1C1C1C]">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#1C1C1C]">
              <p className="font-subtitle text-xs text-[#D9D9D9]">{copy.home.videoLabel}</p>
              <button type="button" className="text-white" aria-label={copy.close} onClick={() => setVideoOpen(false)}>
                <X />
              </button>
            </div>
            <div className="aspect-video w-full">
              <iframe
                src="https://www.youtube-nocookie.com/embed/oRsV23cK7Hw?autoplay=1&controls=1&modestbranding=1&playsinline=1&rel=0"
                className="w-full h-full"
                title="Presentation Infinity Salon"
                allow="autoplay; encrypted-media; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <p className="px-4 py-3 text-sm text-[#B6B6B6]">{copy.home.videoAssistiveText}</p>
          </div>
        </div>
      )}

      <section className="px-4 sm:px-6 py-16 sm:py-24" aria-labelledby="home-benefits-title">
        <h2 id="home-benefits-title" className="sr-only">
          {locale === 'fr' ? 'Les avantages du salon' : 'Salon benefits'}
        </h2>
        <div className="max-w-7xl mx-auto grid gap-6 sm:gap-8 sm:grid-cols-2 md:grid-cols-3">
          {copy.home.features.map(([title, text]) => (
            <div key={title} className="reveal-element border border-[#1C1C1C] bg-[#111111] p-6 sm:p-8">
              <Star className="mb-5 text-white" />
              <h3 className="font-title text-2xl sm:text-3xl mb-4">{title}</h3>
              <p className="text-[#B6B6B6] leading-7">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-16 sm:pb-24" aria-labelledby="home-expertise-title">
        <div className="max-w-7xl mx-auto">
          <h2 id="home-expertise-title" className="sr-only">
            {copy.home.expertiseTitle}
          </h2>
          <SectionHeading
            eyebrow={copy.home.expertiseEyebrow}
            title={copy.home.expertiseTitle}
            text={copy.home.expertiseText}
          />
          <div className="grid gap-6 md:grid-cols-3">
            {copy.home.expertiseCards.map(([title, text]) => (
              <article key={title} className="reveal-element border border-[#1C1C1C] bg-[#111111] p-6 sm:p-8">
                <h3 className="font-title text-3xl mb-4">{title}</h3>
                <p className="text-[#B6B6B6] leading-7">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-20 sm:pb-24" aria-labelledby="home-journey-title">
        <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-start">
          <div className="reveal-element border border-[#1C1C1C] bg-[#111111] p-6 sm:p-10">
            <p className="font-subtitle text-xs text-[#8A8A8A] mb-4">{copy.home.journeyEyebrow}</p>
            <h2 id="home-journey-title" className="font-title text-4xl sm:text-5xl text-white mb-6">
              {copy.home.journeyTitle}
            </h2>
            <p className="text-[#B6B6B6] leading-8 mb-8">{copy.home.journeyText}</p>
            <div className="grid gap-5">
              {copy.home.journeySteps.map(([title, text]) => (
                <div key={title} className="border border-[#1C1C1C] bg-black/30 p-5">
                  <h3 className="font-title text-2xl mb-3">{title}</h3>
                  <p className="text-[#B6B6B6] leading-7">{text}</p>
                </div>
              ))}
            </div>
          </div>
          <aside className="reveal-element border border-[#1C1C1C] bg-[#111111] p-6 sm:p-8">
            <p className="font-subtitle text-xs text-[#8A8A8A] mb-4">{copy.contact}</p>
            <h2 className="font-title text-4xl mb-6">{locale === 'fr' ? 'Un besoin, une question, une inspiration ?' : 'Need advice, a question or inspiration?'}</h2>
            <p className="text-[#B6B6B6] leading-8 mb-8">
              {locale === 'fr'
                ? 'Contacte-nous directement pour reserver, demander un avis ou confirmer la prestation la plus adaptee.'
                : 'Contact us directly to book, ask for guidance or confirm the service that fits you best.'}
            </p>
            <div className="flex flex-col gap-4">
              <a
                href={CONTACT.whatsappHref}
                target="_blank"
                rel="noreferrer"
                aria-label={`WhatsApp ${CONTACT.whatsappLabel}`}
                className="rounded-2xl border border-white bg-white text-black px-5 py-4 transition-transform transition-colors hover:translate-y-[-2px] hover:bg-[#EDEDED]"
              >
                <span className="flex items-center gap-3 mb-2">
                  <WhatsAppIcon size={18} />
                  <span className="font-subtitle text-[10px]">WhatsApp</span>
                </span>
                <span className="block text-sm sm:text-base font-medium whitespace-nowrap">{CONTACT.whatsappLabel}</span>
              </a>
              <a
                href={CONTACT.phoneHref}
                className="rounded-2xl border border-[#2A2A2A] bg-black/20 px-5 py-4 text-white transition-transform transition-colors hover:translate-y-[-2px] hover:border-white hover:bg-[#151515]"
              >
                <span className="block font-subtitle text-[10px] text-[#8A8A8A] mb-2">{copy.phone}</span>
                <span className="block text-sm sm:text-base">{CONTACT.phone}</span>
              </a>
              <a
                href={CONTACT.emailHref}
                className="rounded-2xl border border-[#2A2A2A] bg-black/20 px-5 py-4 text-white transition-transform transition-colors hover:translate-y-[-2px] hover:border-white hover:bg-[#151515]"
              >
                <span className="block font-subtitle text-[10px] text-[#8A8A8A] mb-2">{copy.email}</span>
                <span className="block text-sm sm:text-base break-all">{CONTACT.email}</span>
              </a>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

const Services = ({
  setActivePage,
  locale,
}: {
  setActivePage: React.Dispatch<React.SetStateAction<Page>>;
  locale: Locale;
}) => {
  const copy = UI[locale];
  useScrollReveal();
  useSEO(copy.services.seoTitle, copy.services.seoDescription, locale);

  return (
    <div className="pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 max-w-5xl mx-auto">
      <SectionHeading
        eyebrow={copy.services.eyebrow}
        title={copy.services.title}
        text={copy.services.text}
      />

      {SERVICES.map((section) => (
        <div key={section.category.fr} className="mb-16 reveal-element">
          <h2 className="font-subtitle text-lg mb-8 border-b border-[#1C1C1C] pb-4">{section.category[locale]}</h2>
          {section.items.map((item) => (
            <div key={item.name.fr} className="grid gap-4 md:grid-cols-[1fr_auto] py-6 border-b border-[#1C1C1C]">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-title">{item.name[locale]}</h3>
                  <span className="text-xs font-subtitle text-[#8A8A8A]">{item.duration}</span>
                </div>
                <p className="text-sm text-[#8A8A8A] leading-7">{item.desc[locale]}</p>
              </div>
              <span className="font-title text-2xl text-white">{item.price}</span>
            </div>
          ))}
        </div>
      ))}

      <div className="text-center">
        <button
          type="button"
          onClick={() => setActivePage('booking')}
          className="inline-flex items-center gap-3 bg-white text-black px-12 py-4 font-subtitle text-xs hover:bg-[#D9D9D9] transition-colors"
        >
          {copy.reserve} <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

const Gallery = ({ locale }: { locale: Locale }) => {
  const [filter, setFilter] = useState<GalleryCategory>('all');
  const copy = UI[locale];
  useScrollReveal();
  useSEO(copy.gallery.seoTitle, copy.gallery.seoDescription, locale);

  const filteredImages = filter === 'all' ? GALLERY_IMAGES : GALLERY_IMAGES.filter((item) => item.category === filter);

  return (
    <div className="pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <SectionHeading
        eyebrow={copy.gallery.eyebrow}
        title={copy.gallery.title}
        text={copy.gallery.text}
      />

      <div className="flex gap-3 overflow-x-auto whitespace-nowrap pb-2 md:flex-wrap md:justify-center md:gap-6 mb-10">
        {GALLERY_CATEGORY_IDS.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setFilter(category)}
            aria-pressed={filter === category}
            className={`font-subtitle text-xs px-4 py-2 border transition-colors ${
              filter === category
                ? 'text-white border-white bg-white/10'
                : 'text-[#8A8A8A] border-[#2A2A2A] hover:text-white'
            }`}
          >
            {CATEGORY_LABELS[category][locale]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {filteredImages.map((img) => (
          <div key={`${img.url}-${img.category}`} className="image-zoom-container bg-[#111111]">
            <img src={img.url} className="w-full h-72 sm:h-80 lg:h-96 object-cover" alt={img.alt[locale]} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
};

const About = ({
  setActivePage,
  locale,
}: {
  setActivePage: React.Dispatch<React.SetStateAction<Page>>;
  locale: Locale;
}) => {
  const copy = UI[locale];
  useScrollReveal();
  useSEO(copy.about.seoTitle, copy.about.seoDescription, locale);

  return (
    <div className="pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow={copy.about.eyebrow}
          title={copy.about.title}
          text={copy.about.text}
        />

        <div className="grid gap-10 lg:grid-cols-2 items-center mb-16 sm:mb-20">
          <div className="reveal-element">
            <img
              src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1400"
              alt={locale === 'fr' ? 'Interieur du salon Infinity' : 'Infinity salon interior'}
              className="w-full h-[340px] sm:h-[520px] object-cover"
            />
          </div>

          <div className="reveal-element">
            <p className="font-subtitle text-xs text-[#8A8A8A] mb-4">{copy.about.sectionEyebrow}</p>
            <h2 className="font-title text-5xl mb-8">{copy.about.sectionTitle}</h2>
            <p className="text-[#B6B6B6] leading-8 mb-6">{copy.about.paragraph1}</p>
            <p className="text-[#B6B6B6] leading-8 mb-10">{copy.about.paragraph2}</p>
            <a
              href={CONTACT.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 border border-white px-8 py-4 font-subtitle text-xs hover:bg-white hover:text-black transition-colors"
            >
              {copy.about.cta} <ArrowRight size={16} />
            </a>
          </div>
        </div>

        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Clock, title: copy.about.cards[0][0], text: copy.about.cards[0][1] },
            { icon: Star, title: copy.about.cards[1][0], text: copy.about.cards[1][1] },
            { icon: MapPin, title: copy.about.cards[2][0], text: copy.about.cards[2][1] },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="reveal-element border border-[#1C1C1C] p-8 bg-[#111111]">
              <Icon className="mb-5 text-white" />
              <h3 className="font-title text-3xl mb-4">{title}</h3>
              <p className="text-[#B6B6B6] leading-7">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Booking = ({ locale }: { locale: Locale }) => {
  const copy = UI[locale];
  useSEO(copy.booking.seoTitle, copy.booking.seoDescription, locale);

  return (
    <div className="pt-28 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto text-center">
        <p className="font-subtitle text-xs text-[#8A8A8A] mb-4">{copy.booking.eyebrow}</p>
        <h1 className="font-title text-4xl sm:text-5xl md:text-7xl mb-6 sm:mb-8">{copy.booking.title}</h1>
        <p className="text-[#8A8A8A] mb-12 max-w-2xl mx-auto leading-8">{copy.booking.text}</p>
      </div>

      <div className="max-w-6xl mx-auto grid gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-4">
        <a
          href={CONTACT.whatsappHref}
          target="_blank"
          rel="noreferrer"
          aria-label={`WhatsApp ${CONTACT.whatsappLabel}`}
          className="border border-[#1C1C1C] bg-[#111111] p-6 sm:p-8 hover:border-white transition-colors rounded-2xl"
        >
          <WhatsAppIcon className="mb-6 text-white" />
          <h2 className="font-title text-3xl mb-4">{copy.booking.whatsappTitle}</h2>
          <p className="text-[#B6B6B6] leading-7 mb-6">{copy.booking.whatsappText}</p>
          <span className="font-subtitle text-xs inline-flex items-center gap-2 whitespace-nowrap">{CONTACT.whatsappLabel}</span>
        </a>

        <a href={CONTACT.phoneHref} className="border border-[#1C1C1C] bg-[#111111] p-6 sm:p-8 hover:border-white transition-colors rounded-2xl">
          <Phone className="mb-6" />
          <h2 className="font-title text-3xl mb-4">{copy.booking.phoneTitle}</h2>
          <p className="text-[#B6B6B6] leading-7 mb-6">{copy.booking.phoneText}</p>
          <span className="font-subtitle text-xs whitespace-nowrap">{CONTACT.phone}</span>
        </a>

        <div className="border border-[#1C1C1C] bg-[#111111] p-6 sm:p-8 rounded-2xl">
          <MapPin className="mb-6" />
          <h2 className="font-title text-3xl mb-4">{copy.booking.addressTitle}</h2>
          <p className="text-[#B6B6B6] leading-7 mb-6">{copy.booking.addressText}</p>
          <span className="font-subtitle text-xs">{CONTACT.address}</span>
        </div>

        <a href={CONTACT.emailHref} className="border border-[#1C1C1C] bg-[#111111] p-6 sm:p-8 hover:border-white transition-colors rounded-2xl">
          <p className="font-subtitle text-xs text-white mb-6">{copy.email}</p>
          <h2 className="font-title text-3xl mb-4">{copy.booking.emailTitle}</h2>
          <p className="text-[#B6B6B6] leading-7 mb-6">{copy.booking.emailText}</p>
          <span className="font-subtitle text-xs break-all">{CONTACT.email}</span>
        </a>
      </div>
    </div>
  );
};

const App = () => {
  const [activePage, setActivePage] = useState<Page>('home');
  const [locale, setLocale] = useState<Locale>('fr');

  useEffect(() => {
    const savedLocale = window.localStorage.getItem('infinity-salon-locale');
    if (savedLocale === 'fr' || savedLocale === 'en') {
      setLocale(savedLocale);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('infinity-salon-locale', locale);
  }, [locale]);

  const currentPage = (() => {
    switch (activePage) {
      case 'services':
        return <Services setActivePage={setActivePage} locale={locale} />;
      case 'gallery':
        return <Gallery locale={locale} />;
      case 'about':
        return <About setActivePage={setActivePage} locale={locale} />;
      case 'booking':
        return <Booking locale={locale} />;
      case 'home':
      default:
        return <Home setActivePage={setActivePage} locale={locale} />;
    }
  })();

  return (
    <div className="min-h-[100svh] bg-[#0A0A0A] text-white">
      <GlobalStyles />
      <a href="#main-content" className="skip-link">
        {UI[locale].skipToContent}
      </a>
      <Navbar activePage={activePage} setActivePage={setActivePage} locale={locale} setLocale={setLocale} />
      <main id="main-content" className="flex-grow">
        {currentPage}
      </main>
      <Footer setActivePage={setActivePage} locale={locale} />
    </div>
  );
};

export default App;
