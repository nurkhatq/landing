// app/layout.tsx - UPDATED (исправлена проблема с темой)
import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono, Playfair_Display } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-mono',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NURKHATTech | Автоматизация будущего уже сегодня',
  description: 'Автоматизация бизнес-процессов в Казахстане. Создаю ботов, парсеры, интеграции и AI решения для экономии времени и денег.',
  keywords: [
    'автоматизация',
    'боты',
    'парсеры',
    'Казахстан',
    'Алматы',
    'AI',
    '1С интеграция',
    'Excel автоматизация',
    'WhatsApp бот',
    'Kaspi парсер'
  ],
  authors: [{ name: 'Нурхат', url: 'https://nurkhattech.kz' }],
  creator: 'NURKHATTech',
  publisher: 'NURKHATTech',
  openGraph: {
    title: 'NURKHATTech - Автоматизация бизнеса в Казахстане',
    description: 'Создаю ботов, парсеры, интеграции и AI решения для автоматизации вашего бизнеса',
    url: 'https://nurkhattech.kz',
    siteName: 'NURKHATTech',
    locale: 'ru_KZ',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NURKHATTech - Автоматизация бизнеса'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NURKHATTech - Автоматизация бизнеса',
    description: 'Создаю ботов, парсеры, интеграции и AI решения',
    images: ['/og-image.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  alternates: {
    canonical: 'https://nurkhattech.kz',
    languages: {
      'ru-KZ': 'https://nurkhattech.kz',
      'kk-KZ': 'https://nurkhattech.kz/kk',
      'en-US': 'https://nurkhattech.kz/en',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#00d4ff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "NURKHATTech - Автоматизация бизнеса",
              "description": "Автоматизация бизнес-процессов в Казахстане. Создание ботов, парсеров, интеграций и AI решений.",
              "url": "https://nurkhattech.kz",
              "telephone": "+77761667329",
              "email": "nurkhat@techautomation.kz",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Алматы",
                "addressCountry": "KZ"
              },
              "founder": {
                "@type": "Person",
                "name": "Нурхат",
                "jobTitle": "Senior Full-Stack Developer"
              },
              "serviceType": [
                "Автоматизация бизнеса",
                "Создание ботов",
                "Интеграция систем",
                "AI решения"
              ],
              "areaServed": "Kazakhstan"
            })
          }}
        />
      </head>
      <body 
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${playfairDisplay.variable} font-display antialiased`}
        suppressHydrationWarning
      >
        <ThemeScript />
        {children}
      </body>
    </html>
  );
}

// Улучшенный theme script для предотвращения FOUC
function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            function getInitialColorMode() {
              const persistedColorPreference = window.localStorage.getItem('theme');
              const hasPersistedPreference = typeof persistedColorPreference === 'string';
              
              if (hasPersistedPreference) {
                return persistedColorPreference;
              }
              
              const mql = window.matchMedia('(prefers-color-scheme: dark)');
              const hasMediaQueryPreference = typeof mql.matches === 'boolean';
              
              if (hasMediaQueryPreference) {
                return mql.matches ? 'dark' : 'light';
              }
              
              return 'dark'; // default to dark
            }
            
            const colorMode = getInitialColorMode();
            const root = document.documentElement;
            
            if (colorMode === 'dark') {
              root.classList.add('dark');
            } else {
              root.classList.remove('dark');
            }
            
            // Установить CSS переменную для избежания мигания
            root.style.setProperty('--initial-color-mode', colorMode);
          })();
        `,
      }}
    />
  );
}