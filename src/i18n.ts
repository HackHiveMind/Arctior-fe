import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const languageStorageKey = 'arctior-language';

export const resources = {
  ro: {
    translation: {
      'nav.home': 'Acasa',
      'nav.collections': 'Colectii',
      'nav.services': 'Servicii',
      'nav.contact': 'Contact',
      'language.label': 'Limba site-ului',
      'hero.titleStart': 'MOBILIER',
      'hero.titleAccent': 'CUSTOM.',
      'hero.titleEnd': 'SPATII DEFINITORII.',
      'hero.description':
        'Cream interioare unice, adaptate stilului si nevoilor tale. Experimenteaza luxul autentic si calitatea fara compromis.',
      'hero.cta': 'Descopera colectia',
      'portfolio.title': 'PROIECTE DE EXCEPTIE',
      'portfolio.description':
        'Descopera portofoliul nostru de mobilier personalizat, realizat cu atentie la detalii si finisaje impecabile.',
      'portfolio.error': 'Nu am putut incarca lista de categorii.',
      'features.design.title': 'Design Personalizat',
      'features.design.description':
        'Proiectam mobilier care se integreaza perfect in spatiul tau, reflectand personalitatea si viziunea ta.',
      'features.materials.title': 'Materiale Premium',
      'features.materials.description':
        'Folosim doar lemn masiv, finisaje de lux si accesorii de ultima generatie pentru durabilitate.',
      'features.mastery.title': 'Executie de Maestru',
      'features.mastery.description':
        'Fiecare piesa este lucrata cu atentie milimetrica la detalii de catre artizani cu experienta.',
      'category.back': 'Inapoi la categorii',
      'category.error': 'Eroare',
      'category.errorTitle': 'Categoria nu a putut fi incarcata',
      'category.errorFallback': 'Nu am putut incarca categoria.',
      'category.products': 'Produse',
      'category.productsTitle': 'Produse din categorie',
      'category.empty': 'Nu exista produse in aceasta categorie momentan.',
      'footer.cta': 'SA CREAM IMPREUNA!',
      'footer.phone': 'Telefon',
      'footer.email': 'Email',
      'footer.address': 'Adresa',
      'footer.rights': 'Toate drepturile rezervate.',
      'contactForm.eyebrow': 'Intreaba-ne',
      'contactForm.title': 'Ai o intrebare?',
      'contactForm.description': 'Scrie-ne ce ai in minte, iar noi revenim cu un raspuns.',
      'contactForm.name': 'Nume',
      'contactForm.namePlaceholder': 'Numele tau',
      'contactForm.contact': 'Email',
      'contactForm.question': 'Intrebarea ta',
      'contactForm.questionPlaceholder': 'Descrie pe scurt proiectul sau intrebarea',
      'contactForm.submit': 'Trimite',
      'contactForm.sending': 'Se trimite...',
      'contactForm.successTitle': 'Mesaj trimis',
      'contactForm.successDescription': 'Iti raspundem cat mai curand.',
      'contactForm.errorTitle': 'Mesaj netrimis',
      'contactForm.errorDescription': 'Nu am putut trimite intrebarea. Te rugam sa incerci din nou.',
    },
  },
  en: {
    translation: {
      'nav.home': 'Home',
      'nav.collections': 'Collections',
      'nav.services': 'Services',
      'nav.contact': 'Contact',
      'language.label': 'Site language',
      'hero.titleStart': 'CUSTOM',
      'hero.titleAccent': 'FURNITURE.',
      'hero.titleEnd': 'DEFINING SPACES.',
      'hero.description':
        'We create unique interiors tailored to your style and needs. Experience authentic luxury and uncompromising quality.',
      'hero.cta': 'Explore collections',
      'portfolio.title': 'EXCEPTIONAL PROJECTS',
      'portfolio.description':
        'Discover our portfolio of custom furniture, crafted with attention to detail and flawless finishes.',
      'portfolio.error': 'We could not load the category list.',
      'features.design.title': 'Custom Design',
      'features.design.description':
        'We design furniture that fits naturally into your space and reflects your personality and vision.',
      'features.materials.title': 'Premium Materials',
      'features.materials.description':
        'We use solid wood, luxury finishes, and modern accessories for lasting durability.',
      'features.mastery.title': 'Master Craftsmanship',
      'features.mastery.description':
        'Every piece is built with precise attention to detail by experienced craftspeople.',
      'category.back': 'Back to categories',
      'category.error': 'Error',
      'category.errorTitle': 'The category could not be loaded',
      'category.errorFallback': 'We could not load this category.',
      'category.products': 'Products',
      'category.productsTitle': 'Products in this category',
      'category.empty': 'There are no products in this category yet.',
      'footer.cta': 'LET US CREATE TOGETHER!',
      'footer.phone': 'Phone',
      'footer.email': 'Email',
      'footer.address': 'Address',
      'footer.rights': 'All rights reserved.',
      'contactForm.eyebrow': 'Ask us',
      'contactForm.title': 'Have a question?',
      'contactForm.description': 'Tell us what you have in mind and we will get back with an answer.',
      'contactForm.name': 'Name',
      'contactForm.namePlaceholder': 'Your name',
      'contactForm.contact': 'Email',
      'contactForm.question': 'Your question',
      'contactForm.questionPlaceholder': 'Briefly describe your project or question',
      'contactForm.submit': 'Send',
      'contactForm.sending': 'Sending...',
      'contactForm.successTitle': 'Message sent',
      'contactForm.successDescription': 'We will reply as soon as possible.',
      'contactForm.errorTitle': 'Message not sent',
      'contactForm.errorDescription': 'We could not send your question. Please try again.',
    },
  },
  ru: {
    translation: {
      'nav.home': 'Главная',
      'nav.collections': 'Коллекции',
      'nav.services': 'Услуги',
      'nav.contact': 'Контакты',
      'language.label': 'Язык сайта',
      'hero.titleStart': 'МЕБЕЛЬ',
      'hero.titleAccent': 'НА ЗАКАЗ.',
      'hero.titleEnd': 'ПРОСТРАНСТВА С ХАРАКТЕРОМ.',
      'hero.description':
        'Мы создаем уникальные интерьеры под ваш стиль и потребности. Ощутите настоящий комфорт, роскошь и качество без компромиссов.',
      'hero.cta': 'Смотреть коллекции',
      'portfolio.title': 'ИСКЛЮЧИТЕЛЬНЫЕ ПРОЕКТЫ',
      'portfolio.description':
        'Откройте наше портфолио мебели на заказ, созданной с вниманием к деталям и безупречной отделкой.',
      'portfolio.error': 'Не удалось загрузить список категорий.',
      'features.design.title': 'Индивидуальный дизайн',
      'features.design.description':
        'Мы проектируем мебель, которая естественно вписывается в пространство и отражает вашу индивидуальность.',
      'features.materials.title': 'Премиальные материалы',
      'features.materials.description':
        'Мы используем массив дерева, качественную фурнитуру и современные отделки для долговечности.',
      'features.mastery.title': 'Мастерское исполнение',
      'features.mastery.description':
        'Каждая деталь создается опытными мастерами с точностью и вниманием к качеству.',
      'category.back': 'Назад к категориям',
      'category.error': 'Ошибка',
      'category.errorTitle': 'Не удалось загрузить категорию',
      'category.errorFallback': 'Не удалось загрузить эту категорию.',
      'category.products': 'Товары',
      'category.productsTitle': 'Товары в этой категории',
      'category.empty': 'В этой категории пока нет товаров.',
      'footer.cta': 'СОЗДАДИМ ВМЕСТЕ!',
      'footer.phone': 'Телефон',
      'footer.email': 'Email',
      'footer.address': 'Адрес',
      'footer.rights': 'Все права защищены.',
      'contactForm.eyebrow': 'Спросите нас',
      'contactForm.title': 'Есть вопрос?',
      'contactForm.description': 'Напишите, что вы планируете, и мы вернемся с ответом.',
      'contactForm.name': 'Имя',
      'contactForm.namePlaceholder': 'Ваше имя',
      'contactForm.contact': 'Email',
      'contactForm.question': 'Ваш вопрос',
      'contactForm.questionPlaceholder': 'Кратко опишите проект или вопрос',
      'contactForm.submit': 'Отправить',
      'contactForm.sending': 'Отправляем...',
      'contactForm.successTitle': 'Сообщение отправлено',
      'contactForm.successDescription': 'Мы ответим как можно скорее.',
      'contactForm.errorTitle': 'Сообщение не отправлено',
      'contactForm.errorDescription': 'Не удалось отправить вопрос. Пожалуйста, попробуйте еще раз.',
    },
  },
} as const;

export type TranslationKey = keyof typeof resources.ro.translation;

function readStoredLanguage() {
  if (typeof window === 'undefined') {
    return 'ro';
  }

  return window.localStorage.getItem(languageStorageKey) || 'ro';
}

void i18n.use(initReactI18next).init({
  resources,
  lng: readStoredLanguage(),
  fallbackLng: 'ro',
  interpolation: {
    escapeValue: false,
  },
  returnNull: false,
});

export default i18n;
