export function OrganizationStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Praxis Futura",
    alternateName: "Praxis Futura AI Solutions",
    url: "https://praxisfutura.com",
    logo: "https://praxisfutura.com/logo.png",
    description:
      "Trasforma il tuo business con soluzioni AI personalizzate, chatbot intelligenti e sviluppo web professionale. Consulenza specializzata e formazione.",
    foundingDate: "2024",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+393500216480",
      contactType: "Customer Service",
      email: "info@praxisfutura.com",
      areaServed: "IT",
      availableLanguage: ["Italian", "English"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Via dei Mille 5",
      addressLocality: "Brescia",
      addressCountry: "IT",
    },
    sameAs: [
      "https://www.linkedin.com/company/praxisfutura",
      "https://twitter.com/praxisfutura",
      "https://www.instagram.com/praxisfutura",
    ],
    "@id": "https://praxisfutura.com/#organization",
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}

export function WebSiteStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Praxis Futura",
    url: "https://praxisfutura.com",
    description:
      "Trasforma il tuo business con soluzioni AI personalizzate, chatbot intelligenti e sviluppo web professionale.",
    publisher: {
      "@id": "https://praxisfutura.com/#organization",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://praxisfutura.com/blog?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}

export function ServiceStructuredData({ serviceType }: { serviceType: string }) {
  const services: Record<string, any> = {
    "ai-automation": {
      name: "Automazione AI",
      description:
        "Soluzioni di automazione intelligente per ottimizzare i processi aziendali e aumentare l efficienza",
      serviceType: "AI Automation",
    },
    chatbot: {
      name: "Chatbot Intelligenti",
      description:
        "Chatbot AI avanzati che comprendono il linguaggio naturale e forniscono risposte personalizzate 24/7",
      serviceType: "Intelligent Chatbots",
    },
    "web-development": {
      name: "Sviluppo Web",
      description: "Siti web moderni, responsive e ottimizzati per le performance con tecnologie all avanguardia",
      serviceType: "Web Development",
    },
    "ai-marketing": {
      name: "Marketing AI",
      description: "Strategie di marketing potenziate dall AI per targeting preciso e campagne ad alto ROI",
      serviceType: "AI Marketing",
    },
  }

  const service = services[serviceType]
  if (!service) return null

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: {
      "@id": "https://praxisfutura.com/#organization",
    },
    serviceType: service.serviceType,
    areaServed: {
      "@type": "Country",
      name: "Italy",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: service.name,
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.name,
          },
        },
      ],
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}

export function BreadcrumbStructuredData({ items }: { items: Array<{ name: string; url: string }> }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}
