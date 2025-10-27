// data/projects.ts
export type Project = {
  slug: string;
  title: string;
  description: string;
  year: string;
  stack: string[];
  image?: string; // opcional: ruta en /public
  repo?: string;
  demo?: string;
  url?: string; // 👈 Nuevo campo opcional para enlaces externos
};

export const projects: Project[] = [
  {
  slug: "tienda-componentes",
    title: "Tienda de Componentes",
    description: "E-commerce con carrito, filtros y checkout por pasos.",
    year: "2025",
    stack: ["Node.js", "Bootstrap", "API"],
    image: "/proyectos/tienda de componentes.png",
    url: "https://tiendedecomponentes.netlify.app/",
  },
  {
    slug: "portfolio-3d",
    title: "Rollingbank",
    description: "pagina de practica, estilos y navegacion.",
    year: "2020",
    stack: ["HTML", "CSS"],
    image: "/proyectos/rollingbank.png",
    repo: "#",
    demo: "#",
    url: "https://rollingbank-4f09d2.netlify.app/"
  },
  {
  slug: "sistema-gestion",
  title: "Primer Portafolio",
  description: "portafolio con secciones, sin frameworks HTML y CSS puro.",
  year: "2024",
  stack: ["HTML", "CSS",],
  image: "/proyectos/portafoliobasic.png",
  url: "https://portafolio-arriola-valentin.netlify.app/"
},
{
  slug: "instituto-tesla",
  title: "Panaderia Coku",
  description: "landing page de una panaderia, con productos",
  year: "2025",
  stack: ["Bootstrap", "HTML"],
  image: "/proyectos/panaderiacoku.png",
  url: "https://panaderia-coku.netlify.app/"
},
{
  slug: "berlin-store",
  title: "Galeria de Funko Pop",
  description: "galeria de imagenes con hover",
  year: "2020",
  stack: ["HTML", "CSS"],
  image: "/proyectos/galeriafunkopop.png",
  url: "https://galeriafunkopop1.netlify.app/"
},
{
  slug: "savatek",
  title: "Pagina de Motos",
  description: "Sitio de motos con galeria de motos",
  year: "2022",
  stack: ["HTML", "CSS", "Bootstrap"],
  image: "/proyectos/motos.png",
  url: "https://paginamotos1.netlify.app/"
},

];
