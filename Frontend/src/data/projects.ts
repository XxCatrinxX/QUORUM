export type Project = {
  number: string;
  category: string;
  title: string;
  description: string;
  detail: string;
  tags: string[];
  color: string;
  featured: boolean;
  slug: string;
};

export const projects: Project[] = [
  {
    number: "01",
    category: "Fintech · Producto digital",
    title: "Nexo",
    description:
      "Una nueva forma de entender y administrar tus finanzas desde un solo lugar.",
    detail:
      "Plataforma digital enfocada en simplificar la relación de las personas con sus finanzas.",
    tags: ["Fintech", "Web App", "UX/UI"],
    color: "project-sand",
    featured: true,
    slug: "nexo",
  },
  {
    number: "02",
    category: "Logística · Plataforma",
    title: "Cargu",
    description:
      "Una plataforma para conectar, administrar y optimizar operaciones logísticas.",
    detail:
      "Herramienta digital para centralizar procesos y facilitar la gestión logística.",
    tags: ["Logística", "Plataforma", "Dashboard"],
    color: "project-blue",
    featured: false,
    slug: "cargu",
  },
  {
    number: "03",
    category: "Software · Producto digital",
    title: "Proyecto 03",
    description:
      "Una solución digital pensada para resolver problemas específicos de negocio.",
    detail: "Proyecto actualmente en desarrollo.",
    tags: ["Software", "Web", "Producto"],
    color: "project-gray",
    featured: false,
    slug: "proyecto-03",
  },
  {
    number: "04",
    category: "Tecnología · Automatización",
    title: "Proyecto 04",
    description:
      "Tecnología diseñada para hacer procesos más simples, rápidos y eficientes.",
    detail: "Proyecto actualmente en exploración.",
    tags: ["Automatización", "IA", "Software"],
    color: "project-yellow",
    featured: false,
    slug: "proyecto-04",
  },
];
