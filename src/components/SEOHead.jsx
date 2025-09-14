import { useEffect } from 'react';

const SEOHead = ({ 
  title = "Medicio Healthcare - Excellence in Medical Care",
  description = "Medicio Healthcare provides exceptional medical services with experienced doctors, modern facilities, and compassionate care. Book your appointment today.",
  keywords = "healthcare, medical services, doctors, hospital, clinic, emergency care, cardiology, pediatrics, surgery",
  ogTitle = null,
  ogDescription = null,
  ogImage = "/og-image.jpg",
  ogUrl = null,
  twitterCard = "summary_large_image",
  canonicalUrl = null
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name, content, property = false) => {
      const attribute = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', 'Medicio Healthcare');
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    updateMetaTag('theme-color', '#2563eb');

    // Open Graph tags
    updateMetaTag('og:title', ogTitle || title, true);
    updateMetaTag('og:description', ogDescription || description, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:url', ogUrl || window.location.href, true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:site_name', 'Medicio Healthcare', true);
    updateMetaTag('og:locale', 'en_US', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', twitterCard);
    updateMetaTag('twitter:title', ogTitle || title);
    updateMetaTag('twitter:description', ogDescription || description);
    updateMetaTag('twitter:image', ogImage);

    // Canonical URL
    if (canonicalUrl) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', canonicalUrl);
    }

    // Structured data for healthcare organization
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "MedicalOrganization",
      "name": "Medicio Healthcare",
      "description": description,
      "url": window.location.origin,
      "logo": window.location.origin + "/logo.png",
      "image": window.location.origin + ogImage,
      "telephone": "+1-555-123-4567",
      "email": "info@medicio.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Medical Street",
        "addressLocality": "Healthcare City",
        "postalCode": "HC 12345",
        "addressCountry": "US"
      },
      "openingHours": [
        "Mo-Fr 08:00-20:00",
        "Sa-Su 09:00-18:00"
      ],
      "medicalSpecialty": [
        "Cardiology",
        "Emergency Medicine", 
        "Pediatrics",
        "Internal Medicine",
        "Surgery",
        "General Medicine"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Medical Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "MedicalProcedure",
              "name": "General Consultation"
            }
          },
          {
            "@type": "Offer", 
            "itemOffered": {
              "@type": "MedicalProcedure",
              "name": "Cardiology"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "MedicalProcedure", 
              "name": "Emergency Care"
            }
          }
        ]
      }
    };

    // Add structured data
    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);

  }, [title, description, keywords, ogTitle, ogDescription, ogImage, ogUrl, twitterCard, canonicalUrl]);

  return null; // This component doesn't render anything
};

export default SEOHead;