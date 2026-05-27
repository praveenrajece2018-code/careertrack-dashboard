// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: ["@nuxt/eslint", "@nuxt/fonts", "@nuxt/icon", "@nuxt/image", "@nuxtjs/supabase", "nuxt-toastify", "@nuxtjs/sitemap", [
    "@nuxtjs/robots",
    {
      UserAgent: "*",
      Allow: "/",
      Disallow: ["/admin", "/sign-in", "/sign-up", "/confirm"],
      Sitemap: "https://jobnestph.vercel.app/sitemap.xml",
    },
  ], "@vueuse/nuxt"],
  fonts: {
    families: [
      {
        name: "Inter",
        provider: "google",
        weights: [400, 500, 600, 700, 900],
      },
    ],
  },
  vite: {
    plugins: [tailwindcss() as any],
  },
  runtimeConfig: {
    geminiApiKey: process.env.GEMINI_API_KEY,
  },
  site: {
    url: "https://jobnestph.vercel.app",
    name: "JobNest",
    description: "JobNest helps you organize your job search journey. Keep track of application details all in one place. Never miss an opportunity again.",
  },
  sitemap: {
    urls: ["https://jobnestph.vercel.app"],
    exclude: ["/admin/**", "/sign-in", "/sign-up", "/confirm"],
  },
  app: {
    head: {
      title: "JobNest",
      htmlAttrs: {
        lang: "en",
      },
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/favicon.svg",
        },
      ],
      meta: [
        {
          name: "description",
          content: "JobNest helps you organize your job search journey. Keep track of application details all in one place. Never miss an opportunity again.",
        },
        {
          name: "keywords",
          content: "job search, job tracking, application management, career organization, job applications, job hunt, job search tool, application tracker",
        },
        {
          name: "author",
          content: "JobNest",
        },
        {
          property: "og:title",
          content: "JobNest - Your Job Search Companion",
        },
        {
          property: "og:description",
          content: "Organize your job search journey. Track applications, never miss opportunities, and manage your career effectively.",
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:url",
          content: "https://jobnestph.vercel.app",
        },
      ],
    },
  },
  router: {
    options: {
      scrollBehaviorType: "smooth",
    },
  },
  toastify: {
    position: "top-right",
    autoClose: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    theme: "colored",
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirect: false,
    redirectOptions: {
      login: "/sign-in",
      callback: "/confirm",
      include: ["/applications/*"],
      exclude: ["/sign-in", "/sign-up", "/"],
    },
    cookieOptions: {
      maxAge: 60 * 60 * 8,
      sameSite: "lax",
      secure: true,
    },
  },
});