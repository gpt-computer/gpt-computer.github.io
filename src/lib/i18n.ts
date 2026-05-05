import i18n from "i18next"
import { initReactI18next } from "react-i18next"

const resources = {
  en: {
    translation: {
      nav: {
        home: "Home",
        products: "Products",
        repositories: "Repositories",
        community: "Community",
        blog: "Blog",
        releases: "Releases",
        faq: "FAQ",
        status: "Status",
      },
      home: {
        title: "GPT Computer Organization",
        subtitle: "Building the future of AI-powered computing tools and infrastructure. Open source, collaborative, and innovative.",
      },
      footer: {
        description: "Building the future of AI-powered computing.",
        links: "Quick Links",
        legal: "Legal",
      },
    },
  },
  es: {
    translation: {
      nav: {
        home: "Inicio",
        products: "Productos",
        repositories: "Repositorios",
        community: "Comunidad",
        blog: "Blog",
        releases: "Lanzamientos",
        faq: "Preguntas Frecuentes",
        status: "Estado",
      },
      home: {
        title: "Organización GPT Computer",
        subtitle: "Construyendo el futuro de las herramientas de computación impulsadas por IA. Código abierto, colaborativo e innovador.",
      },
      footer: {
        description: "Construyendo el futuro de la computación con IA.",
        links: "Enlaces Rápidos",
        legal: "Legal",
      },
    },
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("language") || "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
export const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
]

export const changeLanguage = (lang: string) => {
  i18n.changeLanguage(lang)
  localStorage.setItem("language", lang)
  document.documentElement.lang = lang
}
