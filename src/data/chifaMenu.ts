export interface MenuItem {
  id: string;
  name: string;
  sectionNumber: number; // 1 to 7 according to the official PDF
  categoryId: string;
  subCategory?: string;
  price: number;
  takeawayPrice?: number; // for menu items with Llevar price
  description: string;
  image: string;
  popular?: boolean;
  spicy?: boolean;
  servings?: string;
  includesEntrance?: boolean; // For Menú (Sopa wantán or Wantán frito)
  available?: boolean; // For Admin stock management
}

export interface MenuSection {
  number: number;
  id: string;
  title: string;
  shortTitle: string;
  shortName: string;
  badge?: string;
  iconName: string;
  description: string;
  image: string; // Elegant background image for each section
  subcategories: string[];
}

export const CHIFA_INFO = {
  name: "CHIFA MORALILLOS",
  slogan: "¡Auténtica Comida China & Sabor Peruanazo!",
  description: "El auténtico sabor oriental en Yurimaguas. Tradición, fuego al wok y los mejores ingredientes desde el corazón de Loreto.",
  address: "Calle Francisco Bardalez N° 701, Yurimaguas - Loreto, Perú",
  hours: "Atención de Lunes a Domingo: 11:30 AM – 10:30 PM",
  phone: "(065) 762082",
  mobile: "941 428 121",
  whatsapp: "51941428121",
  yapePlinNumber: "941 428 121",
  paymentHolder: "CHIFA MORALILLOS",
  storeFrontImage: "/assets/aistudio/chifa_moralillos_d7504174.jpg",
  logoImage: "/assets/aistudio/logotipo_png_f69f09a6.png",
  promoBannerImage: "/assets/aistudio/DIRECCION_TELEFONO_187ea26c.jpg",
  socials: {
    facebook: "https://web.facebook.com/profile.php?id=100027272124879",
  }
};

// 7 SECCIONES EXACTAS DEL PDF OFICIAL CON IMÁGENES ELEGANTES DE FONDO
export const MENU_SECTIONS: MenuSection[] = [
  {
    number: 1,
    id: "sec_1",
    title: "1. Entradas, Postres, Caldos y Sopas",
    shortTitle: "1. Entradas & Sopas",
    shortName: "Entradas y Sopas",
    iconName: "Soup",
    image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=800&q=80",
    description: "Wantanes crocantes, siumay al vapor, siucao, caldos reconfortantes y sopas tradicionales",
    subcategories: ["Entradas", "Postres", "Caldos", "Sopas"]
  },
  {
    number: 2,
    id: "sec_2",
    title: "2. Chaufa y Tallarines",
    shortTitle: "2. Chaufa & Tallarines",
    shortName: "Chaufa y Tallarines",
    badge: "Al Wok",
    iconName: "Flame",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
    description: "Arroz chaufa salteado a fuego vivo y tallarines saltados taypa, sam si y carnes",
    subcategories: ["Chaufas", "Tallarines", "Aeropuertos"]
  },
  {
    number: 3,
    id: "sec_3",
    title: "3. Tortillas, Alitas Fritas, Platos a la Plancha y Pollos",
    shortTitle: "3. Pollos & Plancha",
    shortName: "Pollos y Plancha",
    badge: "Humeante",
    iconName: "Drumstick",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=80",
    description: "Chijaukay, Tipakay agridulce, Limonkay, tortillas y especialidades a la plancha",
    subcategories: ["Tortillas", "Alitas", "Plancha", "Pollos"]
  },
  {
    number: 4,
    id: "sec_4",
    title: "4. Chancho, Langostinos, Carnes y Platos Especiales",
    shortTitle: "4. Chancho, Carnes & Mariscos",
    shortName: "Chancho y Carnes",
    iconName: "Beef",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    description: "Chancho asado cha siu, langostinos al ajo, lomo saltado, kam lu wantán y taypa",
    subcategories: ["Chancho", "Langostinos", "Carnes", "Especiales"]
  },
  {
    number: 5,
    id: "sec_5",
    title: "5. Menú de Lunes a Viernes",
    shortTitle: "5. Menú Diario (37 Platos)",
    shortName: "Menú Diario",
    badge: "Incluye Entrada",
    iconName: "Calendar",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
    description: "37 deliciosas opciones a elegir con precios para servir y llevar. Incluye Sopa wantán o Wantán frito",
    subcategories: ["Todos los Menús"]
  },
  {
    number: 6,
    id: "sec_6",
    title: "6. Combos",
    shortTitle: "6. Combos Familiares",
    shortName: "Combos",
    badge: "Más Pedidos",
    iconName: "Gift",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
    description: "Combos personales y familiares completos para 1, 2, 3 y 4 a 5 personas con gaseosas",
    subcategories: ["1 Persona", "2 Personas", "3 Personas", "4 Personas"]
  },
  {
    number: 7,
    id: "sec_7",
    title: "7. Refrescos, Gaseosas, Vinos, Cervezas y Bebidas Calientes",
    shortTitle: "7. Bebidas & Licores",
    shortName: "Bebidas",
    iconName: "Wine",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    description: "Chicha morada natural en jarra, gaseosas Inca Kola y Coca Cola, cervezas, vinos chinos y tés",
    subcategories: ["Refrescos", "Gaseosas", "Vinos", "Cervezas", "Bebidas Calientes"]
  }
];

export const CATEGORIES = MENU_SECTIONS;
export type CategoryInfo = MenuSection;

export const INITIAL_PRODUCTS: MenuItem[] = [
  // ================= 1. ENTRADAS, POSTRES, CALDOS Y SOPAS =================
  // Entradas
  {
    id: "E-CODORNIZ",
    name: "Huevo de codorniz (1/2 Doc.)",
    sectionNumber: 1,
    categoryId: "entradas",
    subCategory: "Entradas",
    price: 7.00,
    description: "Media docena de huevitos de codorniz cocidos a punto con salsa especial de soya.",
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "E-WANTAN-MED",
    name: "Wantán frito (1/2 Doc.)",
    sectionNumber: 1,
    categoryId: "entradas",
    subCategory: "Entradas",
    price: 8.00,
    popular: true,
    description: "6 piezas de crocantes wantanes dorados al wok con abundante relleno y salsa tamarindo agridulce.",
    image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "E-WANTAN-DOC",
    name: "Wantán frito (1 Doc.)",
    sectionNumber: 1,
    categoryId: "entradas",
    subCategory: "Entradas",
    price: 13.00,
    popular: true,
    description: "12 piezas de crocantes wantanes dorados de la casa con salsa tamarindo dulce.",
    image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "E-LANGOST-DOR",
    name: "Langostinos dorados",
    sectionNumber: 1,
    categoryId: "entradas",
    subCategory: "Entradas",
    price: 30.00,
    description: "Crujientes langostinos apanados y dorados con toque de especias orientales y limón.",
    image: "https://images.unsplash.com/photo-1559742811-822863c46f83?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "E-CHICHARRON-POLLO",
    name: "Chicharrón de pollo c/ limón",
    sectionNumber: 1,
    categoryId: "entradas",
    subCategory: "Entradas",
    price: 22.00,
    popular: true,
    description: "Jugosos trozos de pechuga de pollo marinados en kion, sillao y limón, dorados y crocantes.",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "E-CHAMPINONES",
    name: "Champiñones fritos",
    sectionNumber: 1,
    categoryId: "entradas",
    subCategory: "Entradas",
    price: 20.00,
    description: "Tiernos champiñones salteados al fuego con toque de salsa oriental.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "E-ALITAS-LIMON",
    name: "Alitas fritas con limón",
    sectionNumber: 1,
    categoryId: "entradas",
    subCategory: "Entradas",
    price: 21.00,
    description: "Alitas de pollo marinadas con toques cítricos y fritas al estilo chifa.",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "E-CHICHARRON-CHINO",
    name: "Chicharrón chino",
    sectionNumber: 1,
    categoryId: "entradas",
    subCategory: "Entradas",
    price: 23.00,
    description: "Panceta de cerdo glaseada y crujiente marinada en cinco especias chinas.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "E-SIUMAY-POLLO",
    name: "Siumay de pollo (1/2 Doc.)",
    sectionNumber: 1,
    categoryId: "entradas",
    subCategory: "Entradas",
    price: 20.00,
    popular: true,
    description: "6 tradicionales bocaditos dim sum al vapor rellenos de jugoso pollo sazonado con cebollita y kion.",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "E-SIUMAY-LANG",
    name: "Siumay de langostinos (1/2 Doc.)",
    sectionNumber: 1,
    categoryId: "entradas",
    subCategory: "Entradas",
    price: 21.00,
    description: "6 bocaditos al vapor rellenos de langostinos frescos y especias finas orientales.",
    image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "E-SIUCAO-FRITO",
    name: "Siucao frito de langostinos",
    sectionNumber: 1,
    categoryId: "entradas",
    subCategory: "Entradas",
    price: 31.00,
    description: "Empanaditas chinas fritas rellenas de langostinos enteros sazonados.",
    image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "E-NABO-CURTIDO",
    name: "Nabo curtido",
    sectionNumber: 1,
    categoryId: "entradas",
    subCategory: "Entradas",
    price: 15.00,
    description: "Nabo japonés encurtido agridulce, ideal para acompañar carnes y arroces.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "E-WANTAN-ESP",
    name: "Wantán frito especial (1/2 Doc.)",
    sectionNumber: 1,
    categoryId: "entradas",
    subCategory: "Entradas",
    price: 17.00,
    description: "Wantanes especiales rellenos de carne y langostinos finamente picados.",
    image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80"
  },

  // Postres
  {
    id: "POSTRE-NARANJITA",
    name: "Naranjita china (1/2 Doc.)",
    sectionNumber: 1,
    categoryId: "postres",
    subCategory: "Postres",
    price: 9.00,
    description: "Dulce tradicional de mandarinas o kumquats glaseados en almíbar oriental.",
    image: "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "POSTRE-LYCHESS",
    name: "Lychess (chirimoya china)",
    sectionNumber: 1,
    categoryId: "postres",
    subCategory: "Postres",
    price: 15.00,
    description: "Refrescante porción de lichis chinos en suave almíbar dulce y aromático.",
    image: "https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=600&q=80"
  },

  // Caldos
  {
    id: "E1",
    name: "E1 Caldo de pollo con kion",
    sectionNumber: 1,
    categoryId: "caldos",
    subCategory: "Caldos",
    price: 19.00,
    description: "Sustancioso y reconfortante caldo casero de pechuga de pollo aromatizado con kion fresco.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "E2",
    name: "E2 Caldo de pollo con verdura",
    sectionNumber: 1,
    categoryId: "caldos",
    subCategory: "Caldos",
    price: 19.00,
    description: "Caldo claro de pollo con col china, pacchoy y verduras frescas al dente.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "E3",
    name: "E3 Caldo de pollo con fideo chino",
    sectionNumber: 1,
    categoryId: "caldos",
    subCategory: "Caldos",
    price: 20.00,
    description: "Nutritivo caldo con delicados fideos de arroz chinos (fan si) y trozos de pollo.",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "E4",
    name: "E4 Caldo de pollo con tallarines",
    sectionNumber: 1,
    categoryId: "caldos",
    subCategory: "Caldos",
    price: 19.00,
    description: "Caldo caliente con fideos de huevo y trozos de pollo tierno con cebollita china.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80"
  },

  // Sopas
  {
    id: "E5",
    name: "E5 Sopa wantán de pollo",
    sectionNumber: 1,
    categoryId: "sopas",
    subCategory: "Sopas",
    price: 21.00,
    popular: true,
    description: "La reina de los chifas: caldo dorado con wantanes rellenos, verduras frescas, pollo y aceite de ajonjolí.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "E6",
    name: "E6 Sopa wantán especial",
    sectionNumber: 1,
    categoryId: "sopas",
    subCategory: "Sopas",
    price: 23.00,
    popular: true,
    description: "Sopa wantán enriquecida con pollo, chancho asado, langostinos, huevito de codorniz y wantanes.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "E7",
    name: "E7 Sopa womin especial",
    sectionNumber: 1,
    categoryId: "sopas",
    subCategory: "Sopas",
    price: 23.00,
    description: "Exquisita sopa con fideos delgados chinos al vapor, combinación de tres carnes y caldo concentrado.",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "E8",
    name: "E8 Sopa fuchifu",
    sectionNumber: 1,
    categoryId: "sopas",
    subCategory: "Sopas",
    price: 21.00,
    description: "Sopa espesita reconfortante con hilos de clara de huevo batida, pollo deshilachado y kion.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "E9",
    name: "E9 Sopa pac pow",
    sectionNumber: 1,
    categoryId: "sopas",
    subCategory: "Sopas",
    price: 24.00,
    description: "Sopa tradicional con col china, trozos selectos de pato y carnes en caldo perfumado.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "E10",
    name: "E10 Sopa wantán de pollo familiar",
    sectionNumber: 1,
    categoryId: "sopas",
    subCategory: "Sopas",
    price: 41.00,
    servings: "Familiar (3-4 personas)",
    description: "Tazón grande familiar con abundantes wantanes, pechuga de pollo y verduras para compartir en la mesa.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "E11",
    name: "E11 Sopa wantán especial familiar",
    sectionNumber: 1,
    categoryId: "sopas",
    subCategory: "Sopas",
    price: 46.00,
    servings: "Familiar (3-4 personas)",
    description: "Gran tazón familiar con wantanes, langostinos, chancho asado, pollo y huevitos de codorniz.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "E12",
    name: "E12 Sopa de langostinos c/ fideo chino",
    sectionNumber: 1,
    categoryId: "sopas",
    subCategory: "Sopas",
    price: 25.00,
    description: "Langostinos frescos en caldo translúcido aromatizado con kion y fideos de frijol chino.",
    image: "https://images.unsplash.com/photo-1559742811-822863c46f83?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "E13",
    name: "E13 Sopa de la casa",
    sectionNumber: 1,
    categoryId: "sopas",
    subCategory: "Sopas",
    price: 26.00,
    popular: true,
    description: "La creación especial del chef de Chifa Moralillos con surtido selecto de carnes y mariscos.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "E14",
    name: "E14 Sopa tan tan",
    sectionNumber: 1,
    categoryId: "sopas",
    subCategory: "Sopas",
    price: 21.00,
    description: "Sopa oriental con pasta de ajonjolí tostado, carne picadita y un sutil toque picante.",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "E15",
    name: "E15 Sopa siucao c/ langostino",
    sectionNumber: 1,
    categoryId: "sopas",
    subCategory: "Sopas",
    price: 26.00,
    description: "Empanaditas chinas siucao hervidas al dente con langostinos en caldo aromático de pollo y kion.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80"
  },

  // ================= 2. CHAUFA Y TALLARINES =================
  // Chaufa
  {
    id: "G1",
    name: "G1 Chaufa especial",
    sectionNumber: 2,
    categoryId: "chaufa",
    subCategory: "Chaufas",
    price: 23.00,
    popular: true,
    description: "El más pedido: arroz al wok bien ahumado con pollo, chancho asado cha siu, langostinos, tortilla picada y cebollita china.",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "G2",
    name: "G2 Chaufa con pollo",
    sectionNumber: 2,
    categoryId: "chaufa",
    subCategory: "Chaufas",
    price: 21.00,
    popular: true,
    description: "Clásico infaltable salteado a fuego alto con trozos de pechuga de pollo, huevo, sillao de primera y cebollita china.",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "G3",
    name: "G3 Chaufa pollo y langostino",
    sectionNumber: 2,
    categoryId: "chaufa",
    subCategory: "Chaufas",
    price: 22.00,
    description: "Combinación marina y de corral con jugosa pechuga de pollo y langostinos frescos.",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "G4",
    name: "G4 Chaufa con chancho",
    sectionNumber: 2,
    categoryId: "chaufa",
    subCategory: "Chaufas",
    price: 22.00,
    popular: true,
    description: "Arroz chaufa con trozos de chancho asado oriental de corte tierno y sabor caramelizado.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "G5",
    name: "G5 Chaufa con langostinos",
    sectionNumber: 2,
    categoryId: "chaufa",
    subCategory: "Chaufas",
    price: 25.00,
    popular: true,
    description: "Arroz chaufa salteado con abundantes langostinos al wok, huevo en tortilla y cebolla china fresca.",
    image: "https://images.unsplash.com/photo-1559742811-822863c46f83?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "G6",
    name: "G6 Chaufa vegetariano",
    sectionNumber: 2,
    categoryId: "chaufa",
    subCategory: "Chaufas",
    price: 20.00,
    description: "Salteado con verduras chinas crujientes, champiñones, pimiento, holantao y tortilla de huevo.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "G7",
    name: "G7 Chaufa con champiñones",
    sectionNumber: 2,
    categoryId: "chaufa",
    subCategory: "Chaufas",
    price: 20.00,
    description: "Arroz al wok con láminas de champiñones seleccionados y aceite de ajonjolí tostado.",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "G8",
    name: "G8 Chaufa con pollo y chancho",
    sectionNumber: 2,
    categoryId: "chaufa",
    subCategory: "Chaufas",
    price: 22.00,
    popular: true,
    description: "Doble sabor con pechuga de pollo y chancho asado cha siu salteados a fuego vivo.",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "G9",
    name: "G9 Chaufa pac pow",
    sectionNumber: 2,
    categoryId: "chaufa",
    subCategory: "Chaufas",
    price: 26.00,
    description: "Chaufa con trozos de pato asado y especias tradicionales cantonesas.",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "G10",
    name: "G10 Aeropuerto pollo",
    sectionNumber: 2,
    categoryId: "chaufa",
    subCategory: "Aeropuertos",
    price: 22.00,
    popular: true,
    description: "Generosa mezcla de arroz chaufa con tallarines saltados, frejolito chino crujiente y pollo en trozos.",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "G11",
    name: "G11 Aeropuerto especial",
    sectionNumber: 2,
    categoryId: "chaufa",
    subCategory: "Aeropuertos",
    price: 24.00,
    popular: true,
    description: "El clásico aeropuerto con fideo, arroz chaufa, frejolito chino, pollo, chancho asado y langostinos.",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "G12",
    name: "G12 Chaufa con carne",
    sectionNumber: 2,
    categoryId: "chaufa",
    subCategory: "Chaufas",
    price: 23.00,
    description: "Arroz chaufa con tiernos trozos de carne de res salteada con cebolla china y sillao oscuro.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
  },

  // Tallarines
  {
    id: "H1",
    name: "H1 Tallarín taypa especial",
    sectionNumber: 2,
    categoryId: "tallarines",
    subCategory: "Tallarines",
    price: 32.00,
    popular: true,
    description: "El rey de los tallarines: pollo, chancho asado, langostinos, huevos de codorniz, champiñones y verduras surtidas en salsa especial.",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "H2",
    name: "H2 Tallarín con pollo en trozos",
    sectionNumber: 2,
    categoryId: "tallarines",
    subCategory: "Tallarines",
    price: 27.00,
    description: "Fideos al dente salteados con pechuga de pollo en trozos, verduras frescas, colanfán y salsa de ostión.",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "H3",
    name: "H3 Tallarín con langostinos",
    sectionNumber: 2,
    categoryId: "tallarines",
    subCategory: "Tallarines",
    price: 31.00,
    description: "Tallarín saltado con langostinos enteros, holantao, pimientos y verduras en salsa sedosa.",
    image: "https://images.unsplash.com/photo-1559742811-822863c46f83?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "H4",
    name: "H4 Tallarín con chancho asado",
    sectionNumber: 2,
    categoryId: "tallarines",
    subCategory: "Tallarines",
    price: 26.00,
    description: "Fideos salteados con sabroso chancho asado cha siu, verduras orientales y salsa de ostión.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "H5",
    name: "H5 Tallarín con pollo simple",
    sectionNumber: 2,
    categoryId: "tallarines",
    subCategory: "Tallarines",
    price: 24.00,
    description: "Clásico tallarín saltado con pollo, cebolla china, frejolito y fideos de huevo.",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "H6",
    name: "H6 Tallarín sam si especial",
    sectionNumber: 2,
    categoryId: "tallarines",
    subCategory: "Tallarines",
    price: 26.00,
    description: "Tallarín con 'tres delicias': combinación en tiritas de pollo, chancho y verduras.",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "H7",
    name: "H7 Tallarín sam si frito especial",
    sectionNumber: 2,
    categoryId: "tallarines",
    subCategory: "Tallarines",
    price: 29.00,
    popular: true,
    description: "Nido de fideos fritos crocantes bañado con salsa caliente de carnes mixtas y verduras al wok.",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "H8",
    name: "H8 Tallarín con verduras y champiñones",
    sectionNumber: 2,
    categoryId: "tallarines",
    subCategory: "Tallarines",
    price: 23.00,
    description: "Opción vegetariana con fideos salteados con col china, brócoli, pimiento y champiñones.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "H9",
    name: "H9 Tallarín sha jo fan de pollo",
    sectionNumber: 2,
    categoryId: "tallarines",
    subCategory: "Tallarines",
    price: 26.00,
    description: "Tallarín ancho de arroz tipo Shahe fen con pollo y vegetales crujientes.",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "H10",
    name: "H10 Tallarín con carne",
    sectionNumber: 2,
    categoryId: "tallarines",
    subCategory: "Tallarines",
    price: 27.00,
    description: "Fideos salteados con láminas de carne de res, cebollas, pimientos y salsa concentrada.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
  },

  // ================= 3. TORTILLAS, ALITAS, PLANCHA Y POLLOS =================
  // Tortillas
  {
    id: "I8",
    name: "I8 Tortilla de verduras",
    sectionNumber: 3,
    categoryId: "tortillas",
    subCategory: "Tortillas",
    price: 19.00,
    description: "Tortilla china dorada esponjosa con col china, cebollita y verduras frescas.",
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "I9",
    name: "I9 Tortilla de pollo",
    sectionNumber: 3,
    categoryId: "tortillas",
    subCategory: "Tortillas",
    price: 19.00,
    description: "Tortilla de huevos de corral con pollo deshilachado y cebollita china.",
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "I10",
    name: "I10 Tortilla de chancho",
    sectionNumber: 3,
    categoryId: "tortillas",
    subCategory: "Tortillas",
    price: 21.00,
    description: "Tortilla oriental rellena con trocitos de chancho asado dulce y salado.",
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "I11",
    name: "I11 Tortilla de langostinos",
    sectionNumber: 3,
    categoryId: "tortillas",
    subCategory: "Tortillas",
    price: 24.00,
    popular: true,
    description: "Exquisita tortilla jugosa con abundantes langostinos enteros sazonados.",
    image: "https://images.unsplash.com/photo-1559742811-822863c46f83?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "I12",
    name: "I12 Tortilla de champiñones",
    sectionNumber: 3,
    categoryId: "tortillas",
    subCategory: "Tortillas",
    price: 19.00,
    description: "Huevos de corral batidos con champiñones salteados y cebollita.",
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "I13",
    name: "I13 Tortilla especial",
    sectionNumber: 3,
    categoryId: "tortillas",
    subCategory: "Tortillas",
    price: 24.00,
    description: "Tortilla mixta con langostinos, pollo, chancho asado y champiñones.",
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=600&q=80"
  },

  // Alitas fritas
  {
    id: "K1",
    name: "K1 Alitas con verduras",
    sectionNumber: 3,
    categoryId: "alitas",
    subCategory: "Alitas",
    price: 26.00,
    description: "Alitas doradas crujientes salteadas con verduras chinas en salsa oriental.",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "K2",
    name: "K2 Alitas picantes",
    sectionNumber: 3,
    categoryId: "alitas",
    subCategory: "Alitas",
    price: 25.00,
    spicy: true,
    description: "Alitas marinadas en salsa especial con ají picante de la casa y ajo.",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "K3",
    name: "K3 Alitas con ostión",
    sectionNumber: 3,
    categoryId: "alitas",
    subCategory: "Alitas",
    price: 25.00,
    description: "Alitas glaseadas en espesa salsa de ostión con ajonjolí tostado.",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80"
  },

  // Platos a la plancha
  {
    id: "I1",
    name: "I1 Taypa especial a la plancha",
    sectionNumber: 3,
    categoryId: "plancha",
    subCategory: "Plancha",
    price: 32.00,
    popular: true,
    description: "Espectacular plato humeante con pollo, chancho asado, langostinos, huevos de codorniz y verduras en plancha chisporroteando.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "I2",
    name: "I2 Pollo tausi a la plancha",
    sectionNumber: 3,
    categoryId: "plancha",
    subCategory: "Plancha",
    price: 28.00,
    description: "Trozos de pechuga a la plancha con fermento de frijol negro (tausi), pimiento y cebolla.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "I3",
    name: "I3 Carne tausi a la plancha",
    sectionNumber: 3,
    categoryId: "plancha",
    subCategory: "Plancha",
    price: 28.00,
    description: "Tiernas láminas de res en salsa tausi servidas en plancha de hierro candente.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "I4",
    name: "I4 Langostinos a la plancha",
    sectionNumber: 3,
    categoryId: "plancha",
    subCategory: "Plancha",
    price: 32.00,
    popular: true,
    description: "Langostinos grandes enteros aromatizados a la plancha con salsa de jengibre y ajo.",
    image: "https://images.unsplash.com/photo-1559742811-822863c46f83?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "I5",
    name: "I5 Chancho picante a la plancha",
    sectionNumber: 3,
    categoryId: "plancha",
    subCategory: "Plancha",
    price: 30.00,
    spicy: true,
    description: "Chancho asado en rodajas salteado con pimientos y salsa picante en plancha caliente.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "I6",
    name: "I6 Pollo con champiñones a la plancha",
    sectionNumber: 3,
    categoryId: "plancha",
    subCategory: "Plancha",
    price: 30.00,
    description: "Pechuga de pollo con champiñones enteros bañados en salsa suave de ostión.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "I7",
    name: "I7 Alitas picantes a la plancha",
    sectionNumber: 3,
    categoryId: "plancha",
    subCategory: "Plancha",
    price: 30.00,
    spicy: true,
    description: "Alitas doradas en plancha candente glaseadas con salsa picante oriental.",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80"
  },

  // Pollos
  {
    id: "J1",
    name: "J1 Chijaukay de pollo",
    sectionNumber: 3,
    categoryId: "pollos",
    subCategory: "Pollos",
    price: 26.00,
    popular: true,
    description: "Clásico plato salado de pollo apanado crujiente bañado en salsa de sillao, kion, ajonjolí y canela china.",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "J2",
    name: "J2 Chijaukay 2 sabores",
    sectionNumber: 3,
    categoryId: "pollos",
    subCategory: "Pollos",
    price: 26.00,
    popular: true,
    description: "Porción dividida con lo mejor de dos mundos: salsa chijaukay salada y salsa tamarindo agridulce.",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "J3",
    name: "J3 Tipakay de pollo",
    sectionNumber: 3,
    categoryId: "pollos",
    subCategory: "Pollos",
    price: 26.00,
    popular: true,
    description: "Pollo apanado crocante bañado en vibrante y clásica salsa tamarindo agridulce con toques de piña.",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "J4",
    name: "J4 Limonkay de pollo",
    sectionNumber: 3,
    categoryId: "pollos",
    subCategory: "Pollos",
    price: 26.00,
    popular: true,
    description: "Pechuga de pollo apanada crocante bañada en salsa cítrica y refrescante de limón.",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "J5",
    name: "J5 Pollo en trozos con champiñones",
    sectionNumber: 3,
    categoryId: "pollos",
    subCategory: "Pollos",
    price: 28.00,
    description: "Trozos de pechuga tierna salteados al wok con champiñones y verduras frescas.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "J6",
    name: "J6 Pollo en trozos con verduras",
    sectionNumber: 3,
    categoryId: "pollos",
    subCategory: "Pollos",
    price: 26.00,
    description: "Pollo salteado con col china, pacchoy, holantao, pimientos y zanahoria al dente.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "J7",
    name: "J7 Pollo en trozos con tausi",
    sectionNumber: 3,
    categoryId: "pollos",
    subCategory: "Pollos",
    price: 25.00,
    description: "Pechuga de pollo al wok en salsa de frijol negro fermentado (tausi) con cebolla y pimiento.",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "J8",
    name: "J8 Pollo en trozos con brocoli",
    sectionNumber: 3,
    categoryId: "pollos",
    subCategory: "Pollos",
    price: 26.00,
    description: "Pollo salteado con arbolitos de brócoli verde fresco en suave salsa oriental.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "J9",
    name: "J9 Pollo en trozos al ajo",
    sectionNumber: 3,
    categoryId: "pollos",
    subCategory: "Pollos",
    price: 25.00,
    description: "Trozos de pollo salteados con bastante ajo picado dorado y cebolla en salsa ligera.",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "J10",
    name: "J10 Pollo en trozos con tamarindo",
    sectionNumber: 3,
    categoryId: "pollos",
    subCategory: "Pollos",
    price: 25.00,
    description: "Pollo en dados tiernos salteado con verduras y bañado en salsa tamarindo dulce.",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "J11",
    name: "J11 Pollo en trozos con piña",
    sectionNumber: 3,
    categoryId: "pollos",
    subCategory: "Pollos",
    price: 26.00,
    description: "Trozos de pechuga salteados con rodajas de piña fresca y toques agridulces.",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "J12",
    name: "J12 Pollo en trozos al curry",
    sectionNumber: 3,
    categoryId: "pollos",
    subCategory: "Pollos",
    price: 25.00,
    description: "Pollo aromático preparado en salsa de curry chino suave con cebolla y pimiento.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "J13",
    name: "J13 Pollo en trozos con durazno",
    sectionNumber: 3,
    categoryId: "pollos",
    subCategory: "Pollos",
    price: 26.00,
    description: "Especialidad agridulce con tajadas de durazno en almíbar y pechuga de pollo.",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "J14",
    name: "J14 Pollo en trozos con fideo chino",
    sectionNumber: 3,
    categoryId: "pollos",
    subCategory: "Pollos",
    price: 26.00,
    description: "Pechuga de pollo salteada con finos fideos chinos de arroz y verduras.",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80"
  },

  // ================= 4. CHANCHO, LANGOSTINOS, CARNES Y ESPECIALES =================
  // Chancho
  {
    id: "L1",
    name: "L1 Chancho asado con verduras",
    sectionNumber: 4,
    categoryId: "chancho",
    subCategory: "Chancho",
    price: 26.00,
    popular: true,
    description: "Cortes de chancho asado cha siu salteados al wok con col china, pacchoy y pimientos.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "L2",
    name: "L2 Chancho asado con champiñones",
    sectionNumber: 4,
    categoryId: "chancho",
    subCategory: "Chancho",
    price: 27.00,
    description: "Chancho cha siu al wok con champiñones tiernos enteros en salsa de ostión.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "L3",
    name: "L3 Chancho asado con piña",
    sectionNumber: 4,
    categoryId: "chancho",
    subCategory: "Chancho",
    price: 26.00,
    popular: true,
    description: "La combinación perfecta agridulce: chancho asado con trozos de piña jugosa y salsa tamarindo.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "L4",
    name: "L4 Chancho asado al ajo",
    sectionNumber: 4,
    categoryId: "chancho",
    subCategory: "Chancho",
    price: 26.00,
    description: "Chancho asado salteado al fuego vivo con abundante ajo dorado y cebollas.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "L5",
    name: "L5 Chancho asado con tausi",
    sectionNumber: 4,
    categoryId: "chancho",
    subCategory: "Chancho",
    price: 26.00,
    description: "Chancho con salsa tausi tradicional de frijoles negros fermentados con kion y pimientos.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "L6",
    name: "L6 Chancho asado al curry",
    sectionNumber: 4,
    categoryId: "chancho",
    subCategory: "Chancho",
    price: 26.00,
    description: "Rodajas de cerdo asado marinadas en salsa de curry oriental aromático.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "L7",
    name: "L7 Chancho asado con fideo chino",
    sectionNumber: 4,
    categoryId: "chancho",
    subCategory: "Chancho",
    price: 26.00,
    description: "Fideos de frijol chino salteados con chancho asado cha siu y verduras.",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "L8",
    name: "L8 Chancho asado con brocoli",
    sectionNumber: 4,
    categoryId: "chancho",
    subCategory: "Chancho",
    price: 26.00,
    description: "Chancho asado salteado con brócoli crujiente bañado en suave salsa de ostión.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80"
  },

  // Langostinos
  {
    id: "F9",
    name: "F9 Langostinos con champiñones",
    sectionNumber: 4,
    categoryId: "langostinos",
    subCategory: "Langostinos",
    price: 32.00,
    description: "Langostinos frescos salteados al wok con champiñones y verduras al dente.",
    image: "https://images.unsplash.com/photo-1559742811-822863c46f83?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "F10",
    name: "F10 Langostinos con verduras",
    sectionNumber: 4,
    categoryId: "langostinos",
    subCategory: "Langostinos",
    price: 32.00,
    description: "Langostinos enteros salteados con col china, brócoli, pimiento y salsa ligera.",
    image: "https://images.unsplash.com/photo-1559742811-822863c46f83?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "F11",
    name: "F11 Langostinos al ajo",
    sectionNumber: 4,
    categoryId: "langostinos",
    subCategory: "Langostinos",
    price: 32.00,
    popular: true,
    description: "Langostinos al wok con generoso ajo picado aromatizado y cebollita china.",
    image: "https://images.unsplash.com/photo-1559742811-822863c46f83?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "F12",
    name: "F12 Langostinos con tausi",
    sectionNumber: 4,
    categoryId: "langostinos",
    subCategory: "Langostinos",
    price: 32.00,
    description: "Langostinos en sabrosa salsa de frijol negro fermentado (tausi) con pimientos.",
    image: "https://images.unsplash.com/photo-1559742811-822863c46f83?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "F13",
    name: "F13 Langostinos con tamarindo",
    sectionNumber: 4,
    categoryId: "langostinos",
    subCategory: "Langostinos",
    price: 32.00,
    popular: true,
    description: "Langostinos dorados bañados en salsa tamarindo agridulce con verduras y piña.",
    image: "https://images.unsplash.com/photo-1559742811-822863c46f83?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "F14",
    name: "F14 Langostinos con fideo chino",
    sectionNumber: 4,
    categoryId: "langostinos",
    subCategory: "Langostinos",
    price: 32.00,
    description: "Langostinos salteados con fideos transparentes de arroz y salsa oriental.",
    image: "https://images.unsplash.com/photo-1559742811-822863c46f83?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "F15",
    name: "F15 Langostinos con piña",
    sectionNumber: 4,
    categoryId: "langostinos",
    subCategory: "Langostinos",
    price: 32.00,
    description: "Langostinos cocidos con rodajas de piña agridulce y pimientos en salsa de tamarindo.",
    image: "https://images.unsplash.com/photo-1559742811-822863c46f83?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "F16",
    name: "F16 Langostinos con brocoli",
    sectionNumber: 4,
    categoryId: "langostinos",
    subCategory: "Langostinos",
    price: 32.00,
    description: "Langostinos salteados al fuego vivo con brócoli crujiente y salsa de ostión.",
    image: "https://images.unsplash.com/photo-1559742811-822863c46f83?auto=format&fit=crop&w=600&q=80"
  },

  // Carnes
  {
    id: "H11",
    name: "H11 Lomo saltado",
    sectionNumber: 4,
    categoryId: "carnes",
    subCategory: "Carnes",
    price: 25.00,
    popular: true,
    description: "Tiras jugosas de carne de res salteadas al wok con cebolla, tomate, ají amarillo y sillao.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "H12",
    name: "H12 Carne con verduras",
    sectionNumber: 4,
    categoryId: "carnes",
    subCategory: "Carnes",
    price: 24.00,
    description: "Carne de res salteada al estilo oriental con col china, zanahorias y pimientos.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "H13",
    name: "H13 Carne con tausi",
    sectionNumber: 4,
    categoryId: "carnes",
    subCategory: "Carnes",
    price: 24.00,
    description: "Carne salteada en salsa espesa de frijol negro chino fermentado y pimientos.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "H14",
    name: "H14 Carne picante",
    sectionNumber: 4,
    categoryId: "carnes",
    subCategory: "Carnes",
    price: 24.00,
    spicy: true,
    description: "Carne de res al wok salteada con ají picante, cebolla, kion y cebollita china.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "H15",
    name: "H15 Carne al ajo",
    sectionNumber: 4,
    categoryId: "carnes",
    subCategory: "Carnes",
    price: 24.00,
    description: "Tiras de res salteadas al fuego vivo con abundante ajo dorado.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
  },

  // Platos especiales
  {
    id: "F1",
    name: "F1 Taypa especial",
    sectionNumber: 4,
    categoryId: "especiales",
    subCategory: "Especiales",
    price: 32.00,
    popular: true,
    description: "Gran combinación imperial: pollo, chancho asado, langostinos, huevos de codorniz, champiñones y verduras surtidas.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "F2",
    name: "F2 Kam lu wantán especial",
    sectionNumber: 4,
    categoryId: "especiales",
    subCategory: "Especiales",
    price: 31.00,
    popular: true,
    description: "Base de wantanes fritos crujientes cubiertos con salteado de chancho asado, pollo, langostinos, piña y verduras en salsa agridulce tamarindo.",
    image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "F3",
    name: "F3 Pollo enrollado en salsa de ostión",
    sectionNumber: 4,
    categoryId: "especiales",
    subCategory: "Especiales",
    price: 26.00,
    popular: true,
    description: "Rollitos de pechuga de pollo rellenos de verduras y chancho, bañados en rica salsa de ostión.",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "F4",
    name: "F4 Pollo enrollado con tamarindo (dulce)",
    sectionNumber: 4,
    categoryId: "especiales",
    subCategory: "Especiales",
    price: 26.00,
    description: "Rollitos de pollo crocantes dorados cubiertos con salsa de tamarindo agridulce y piña.",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "F5",
    name: "F5 Pollo enrollado en salsa blanca",
    sectionNumber: 4,
    categoryId: "especiales",
    subCategory: "Especiales",
    price: 26.00,
    description: "Rollos de pechuga tierna bañados en suave salsa blanca aterciopelada oriental.",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "F6",
    name: "F6 Pollo en trozos de yuyo",
    sectionNumber: 4,
    categoryId: "especiales",
    subCategory: "Especiales",
    price: 28.00,
    description: "Pechuga de pollo cocida con algas chinas de yuyo negro y salsa fina.",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "F7",
    name: "F7 Pollo al vapor con tausi",
    sectionNumber: 4,
    categoryId: "especiales",
    subCategory: "Especiales",
    price: 28.00,
    description: "Pollo tierno cocinado al vapor en canastilla de bambú con pasta de frijol negro fermentado y kion.",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "F8",
    name: "F8 Pollo al vapor c/ yuyo y champiñones",
    sectionNumber: 4,
    categoryId: "especiales",
    subCategory: "Especiales",
    price: 29.00,
    description: "Preparación saludable al vapor con pollo jugoso, algas y champiñones enteros.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80"
  },

  // ================= 5. MENÚ DE LUNES A VIERNES (37 PLATOS) =================
  // Incluye entrada a elegir: Sopa wantán o Wantán frito
  {
    id: "MENU-01",
    name: "1. Chaufa con pollo y wantán frito",
    sectionNumber: 5,
    categoryId: "menu_diario",
    subCategory: "Todos los Menús",
    price: 16.00,
    takeawayPrice: 16.00,
    includesEntrance: true,
    popular: true,
    description: "Generosa porción de arroz chaufa con pollo al wok, acompañado de wantanes fritos. Incluye Entrada (Sopa Wantán o Wantán Frito).",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "MENU-02",
    name: "2. Chaufa con chancho y wantán frito",
    sectionNumber: 5,
    categoryId: "menu_diario",
    subCategory: "Todos los Menús",
    price: 17.00,
    takeawayPrice: 17.00,
    includesEntrance: true,
    description: "Arroz chaufa con chancho asado cha siu y wantanes. Incluye Entrada (Sopa Wantán o Wantán Frito).",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "MENU-03",
    name: "3. Tallarín con pollo",
    sectionNumber: 5,
    categoryId: "menu_diario",
    subCategory: "Todos los Menús",
    price: 17.00,
    takeawayPrice: 17.00,
    includesEntrance: true,
    description: "Tallarín saltado con pollo y frejolito chino. Incluye Entrada (Sopa Wantán o Wantán Frito).",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "MENU-04",
    name: "4. Tallarín con chancho",
    sectionNumber: 5,
    categoryId: "menu_diario",
    subCategory: "Todos los Menús",
    price: 18.00,
    takeawayPrice: 18.00,
    includesEntrance: true,
    description: "Tallarín saltado con jugoso chancho asado. Incluye Entrada (Sopa Wantán o Wantán Frito).",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "MENU-05",
    name: "5. Combinado (tallarín con pollo y chaufa)",
    sectionNumber: 5,
    categoryId: "menu_diario",
    subCategory: "Todos los Menús",
    price: 19.00,
    takeawayPrice: 20.00,
    includesEntrance: true,
    popular: true,
    description: "El clásico dúo: media porción de tallarín con pollo y media de arroz chaufa. Incluye Entrada (Sopa Wantán o Wantán Frito).",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "MENU-06",
    name: "6. Pollo con verduras y chaufa",
    sectionNumber: 5,
    categoryId: "menu_diario",
    subCategory: "Todos los Menús",
    price: 19.00,
    takeawayPrice: 20.00,
    includesEntrance: true,
    description: "Pollo salteado con verduras chinas al wok acompañado de arroz chaufa. Incluye Entrada.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "MENU-07",
    name: "7. Pollo con tamarindo y chaufa",
    sectionNumber: 5,
    categoryId: "menu_diario",
    subCategory: "Todos los Menús",
    price: 19.00,
    takeawayPrice: 20.00,
    includesEntrance: true,
    description: "Pollo en salsa tamarindo dulce con arroz chaufa. Incluye Entrada.",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "MENU-08",
    name: "8. Chijaukay de pollo con chaufa",
    sectionNumber: 5,
    categoryId: "menu_diario",
    subCategory: "Todos los Menús",
    price: 20.00,
    takeawayPrice: 21.00,
    includesEntrance: true,
    popular: true,
    description: "Pollo crocante bañado en salsa chijaukay salada servido con arroz chaufa. Incluye Entrada.",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "MENU-09",
    name: "9. Tipakay de pollo con chaufa",
    sectionNumber: 5,
    categoryId: "menu_diario",
    subCategory: "Todos los Menús",
    price: 20.00,
    takeawayPrice: 21.00,
    includesEntrance: true,
    popular: true,
    description: "Pollo apanado bañado en salsa tamarindo agridulce con arroz chaufa. Incluye Entrada.",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "MENU-10",
    name: "10. Pollo con tausi y chaufa",
    sectionNumber: 5,
    categoryId: "menu_diario",
    subCategory: "Todos los Menús",
    price: 19.00,
    takeawayPrice: 20.00,
    includesEntrance: true,
    description: "Pollo salteado con salsa de frijol negro tausi y arroz chaufa. Incluye Entrada.",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "MENU-11",
    name: "11. Pollo enrollado con chaufa",
    sectionNumber: 5,
    categoryId: "menu_diario",
    subCategory: "Todos los Menús",
    price: 20.00,
    takeawayPrice: 21.00,
    includesEntrance: true,
    description: "Rollitos de pollo en salsa especial acompañados de chaufa al wok. Incluye Entrada.",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "MENU-12",
    name: "12. Pollo al ajo con chaufa",
    sectionNumber: 5,
    categoryId: "menu_diario",
    subCategory: "Todos los Menús",
    price: 19.00,
    takeawayPrice: 20.00,
    includesEntrance: true,
    description: "Pollo aromatizado con ajo dorado al wok con arroz chaufa. Incluye Entrada.",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "MENU-13",
    name: "13. Pollo picante con chaufa",
    sectionNumber: 5,
    categoryId: "menu_diario",
    subCategory: "Todos los Menús",
    price: 19.00,
    takeawayPrice: 20.00,
    includesEntrance: true,
    spicy: true,
    description: "Pollo salteado picantito con cebolla y arroz chaufa. Incluye Entrada.",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "MENU-14",
    name: "14. Pollo con piña y chaufa",
    sectionNumber: 5,
    categoryId: "menu_diario",
    subCategory: "Todos los Menús",
    price: 19.00,
    takeawayPrice: 20.00,
    includesEntrance: true,
    description: "Pollo con piña jugosa agridulce servido con arroz chaufa. Incluye Entrada.",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "MENU-15",
    name: "15. Taypa especial con chaufa",
    sectionNumber: 5,
    categoryId: "menu_diario",
    subCategory: "Todos los Menús",
    price: 20.00,
    takeawayPrice: 21.00,
    includesEntrance: true,
    popular: true,
    description: "Surtido taypa de carnes mixtas y verduras con arroz chaufa. Incluye Entrada.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "MENU-16",
    name: "16. Tallarín taypa",
    sectionNumber: 5,
    categoryId: "menu_diario",
    subCategory: "Todos los Menús",
    price: 20.00,
    takeawayPrice: 21.00,
    includesEntrance: true,
    description: "Tallarín con mezcla especial de carnes y verduras al wok. Incluye Entrada.",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "MENU-17",
    name: "17. Kam lu wantán con chaufa",
    sectionNumber: 5,
    categoryId: "menu_diario",
    subCategory: "Todos los Menús",
    price: 20.00,
    takeawayPrice: 21.00,
    includesEntrance: true,
    popular: true,
    description: "Wantanes crocantes cubiertos con salsa de carnes agridulces y chaufa. Incluye Entrada.",
    image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "MENU-18",
    name: "18. Chancho al ajo con chaufa",
    sectionNumber: 5,
    categoryId: "menu_diario",
    subCategory: "Todos los Menús",
    price: 20.00,
    takeawayPrice: 21.00,
    includesEntrance: true,
    description: "Chancho asado salteado al ajo con arroz chaufa. Incluye Entrada.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "MENU-19",
    name: "19. Chancho con tausi y chaufa",
    sectionNumber: 5,
    categoryId: "menu_diario",
    subCategory: "Todos los Menús",
    price: 20.00,
    takeawayPrice: 21.00,
    includesEntrance: true,
    description: "Chancho asado en salsa de frijol negro tausi con chaufa. Incluye Entrada.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "MENU-20",
    name: "20. Chancho con tamarindo y chaufa",
    sectionNumber: 5,
    categoryId: "menu_diario",
    subCategory: "Todos los Menús",
    price: 20.00,
    takeawayPrice: 21.00,
    includesEntrance: true,
    description: "Chancho asado agridulce con arroz chaufa. Incluye Entrada.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "MENU-21",
    name: "21. Chancho con verduras y chaufa",
    sectionNumber: 5,
    categoryId: "menu_diario",
    subCategory: "Todos los Menús",
    price: 20.00,
    takeawayPrice: 21.00,
    includesEntrance: true,
    description: "Chancho cha siu salteado con verduras chinas y arroz chaufa. Incluye Entrada.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "MENU-22",
    name: "22. Chancho picante con chaufa",
    sectionNumber: 5,
    categoryId: "menu_diario",
    subCategory: "Todos los Menús",
    price: 20.00,
    takeawayPrice: 21.00,
    includesEntrance: true,
    spicy: true,
    description: "Chancho en salsa picante con arroz chaufa. Incluye Entrada.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "MENU-23",
    name: "23. Chancho con piña y chaufa",
    sectionNumber: 5,
    categoryId: "menu_diario",
    subCategory: "Todos los Menús",
    price: 20.00,
    takeawayPrice: 21.00,
    includesEntrance: true,
    description: "Chancho salteado con piña dulce y arroz chaufa. Incluye Entrada.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "MENU-24",
    name: "24. Alitas fritas con limon y chaufa",
    sectionNumber: 5,
    categoryId: "menu_diario",
    subCategory: "Todos los Menús",
    price: 20.00,
    takeawayPrice: 21.00,
    includesEntrance: true,
    description: "Alitas doradas crujientes al limón con arroz chaufa. Incluye Entrada.",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "MENU-25",
    name: "25. Langostinos con verduras y chaufa",
    sectionNumber: 5,
    categoryId: "menu_diario",
    subCategory: "Todos los Menús",
    price: 21.00,
    takeawayPrice: 22.00,
    includesEntrance: true,
    popular: true,
    description: "Langostinos al wok con verduras crujientes y arroz chaufa. Incluye Entrada.",
    image: "https://images.unsplash.com/photo-1559742811-822863c46f83?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "MENU-26",
    name: "26. Langostinos con tausi y chaufa",
    sectionNumber: 5,
    categoryId: "menu_diario",
    subCategory: "Todos los Menús",
    price: 21.00,
    takeawayPrice: 22.00,
    includesEntrance: true,
    description: "Langostinos en salsa tausi negra con arroz chaufa. Incluye Entrada.",
    image: "https://images.unsplash.com/photo-1559742811-822863c46f83?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "MENU-27",
    name: "27. Langostinos con piña y chaufa",
    sectionNumber: 5,
    categoryId: "menu_diario",
    subCategory: "Todos los Menús",
    price: 21.00,
    takeawayPrice: 22.00,
    includesEntrance: true,
    description: "Langostinos agridulces con trozos de piña y chaufa. Incluye Entrada.",
    image: "https://images.unsplash.com/photo-1559742811-822863c46f83?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "MENU-28",
    name: "28. Langostinos al ajo con chaufa",
    sectionNumber: 5,
    categoryId: "menu_diario",
    subCategory: "Todos los Menús",
    price: 21.00,
    takeawayPrice: 22.00,
    includesEntrance: true,
    description: "Langostinos aromatizados al ajo con arroz chaufa. Incluye Entrada.",
    image: "https://images.unsplash.com/photo-1559742811-822863c46f83?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "MENU-29",
    name: "29. Langostinos picantes con chaufa",
    sectionNumber: 5,
    categoryId: "menu_diario",
    subCategory: "Todos los Menús",
    price: 21.00,
    takeawayPrice: 22.00,
    includesEntrance: true,
    spicy: true,
    description: "Langostinos en salsa picante con arroz chaufa. Incluye Entrada.",
    image: "https://images.unsplash.com/photo-1559742811-822863c46f83?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "MENU-30",
    name: "30. Tortilla con pollo y chaufa",
    sectionNumber: 5,
    categoryId: "menu_diario",
    subCategory: "Todos los Menús",
    price: 20.00,
    takeawayPrice: 21.00,
    includesEntrance: true,
    description: "Tortilla dorada de pollo con arroz chaufa. Incluye Entrada.",
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "MENU-31",
    name: "31. Tortilla con chancho y chaufa",
    sectionNumber: 5,
    categoryId: "menu_diario",
    subCategory: "Todos los Menús",
    price: 20.00,
    takeawayPrice: 22.00,
    includesEntrance: true,
    description: "Tortilla de chancho asado con arroz chaufa. Incluye Entrada.",
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "MENU-32",
    name: "32. Tortilla con langostinos y chaufa",
    sectionNumber: 5,
    categoryId: "menu_diario",
    subCategory: "Todos los Menús",
    price: 21.00,
    takeawayPrice: 22.00,
    includesEntrance: true,
    description: "Tortilla jugosa de langostinos con arroz chaufa. Incluye Entrada.",
    image: "https://images.unsplash.com/photo-1559742811-822863c46f83?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "MENU-33",
    name: "33. Tortilla con verduras y chaufa",
    sectionNumber: 5,
    categoryId: "menu_diario",
    subCategory: "Todos los Menús",
    price: 20.00,
    takeawayPrice: 21.00,
    includesEntrance: true,
    description: "Tortilla oriental de verduras frescas con arroz chaufa. Incluye Entrada.",
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "MENU-34",
    name: "34. Saltado de champiñones con chaufa",
    sectionNumber: 5,
    categoryId: "menu_diario",
    subCategory: "Todos los Menús",
    price: 19.00,
    takeawayPrice: 20.00,
    includesEntrance: true,
    description: "Champiñones salteados al wok con arroz chaufa. Incluye Entrada.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "MENU-35",
    name: "35. Lomo saltado con chaufa",
    sectionNumber: 5,
    categoryId: "menu_diario",
    subCategory: "Todos los Menús",
    price: 20.00,
    takeawayPrice: 21.00,
    includesEntrance: true,
    popular: true,
    description: "Jugoso lomo saltado con cebolla, tomate y arroz chaufa. Incluye Entrada.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "MENU-36",
    name: "36. Aeropuerto de pollo",
    sectionNumber: 5,
    categoryId: "menu_diario",
    subCategory: "Todos los Menús",
    price: 19.00,
    takeawayPrice: 20.00,
    includesEntrance: true,
    popular: true,
    description: "Fideos salteados, arroz chaufa, frejolito chino y trozos de pollo. Incluye Entrada.",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "MENU-37",
    name: "37. Chicharrón de pollo con chaufa",
    sectionNumber: 5,
    categoryId: "menu_diario",
    subCategory: "Todos los Menús",
    price: 19.00,
    takeawayPrice: 20.00,
    includesEntrance: true,
    popular: true,
    description: "Crujientes trozos de chicharrón de pollo con limón y arroz chaufa. Incluye Entrada.",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80"
  },

  // ================= 6. COMBOS =================
  // Combos 1 Persona
  {
    id: "A1",
    name: "A1: Tallarín con pollo + chaufa + wantán frito",
    sectionNumber: 6,
    categoryId: "combos",
    subCategory: "1 Persona",
    price: 22.00,
    servings: "1 Persona",
    popular: true,
    description: "Combo personal completo: tallarín saltado con pollo, arroz chaufa al wok y wantanes fritos crujientes.",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "A2",
    name: "A2: Pollo con verduras + chaufa",
    sectionNumber: 6,
    categoryId: "combos",
    subCategory: "1 Persona",
    price: 22.00,
    servings: "1 Persona",
    description: "Pechuga de pollo con verduras al wok acompañada de arroz chaufa.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "A3",
    name: "A3: Tipakay dulce + chijaukay salado + chaufa",
    sectionNumber: 6,
    categoryId: "combos",
    subCategory: "1 Persona",
    price: 25.00,
    servings: "1 Persona",
    popular: true,
    description: "¡Doble sabor favorito! Pollo tipakay agridulce, pollo chijaukay en salsa salada y arroz chaufa.",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "A4",
    name: "A4: Pollo con verduras + pollo c/ piña + chaufa",
    sectionNumber: 6,
    categoryId: "combos",
    subCategory: "1 Persona",
    price: 25.00,
    servings: "1 Persona",
    description: "Pollo salteado con verduras frescas, pollo con piña agridulce y arroz chaufa.",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "A5",
    name: "A5: Chancho c/ verduras + pollo tamarindo + chaufa",
    sectionNumber: 6,
    categoryId: "combos",
    subCategory: "1 Persona",
    price: 25.00,
    servings: "1 Persona",
    description: "Chancho cha siu con verduras, pollo en salsa tamarindo y arroz chaufa.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "A6",
    name: "A6: Pollo con tausi + chancho piña + chaufa",
    sectionNumber: 6,
    categoryId: "combos",
    subCategory: "1 Persona",
    price: 25.00,
    servings: "1 Persona",
    description: "Pollo en salsa de frijol negro tausi, chancho asado con piña dulce y chaufa.",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "A7",
    name: "A7: Kam lu wantán + chijaukay + chaufa",
    sectionNumber: 6,
    categoryId: "combos",
    subCategory: "1 Persona",
    price: 28.00,
    servings: "1 Persona",
    popular: true,
    description: "Combinación de lujo: wantán especial kam lu, pollo chijaukay crocante y arroz chaufa.",
    image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "A8",
    name: "A8: Tallarín trozos + enrollado + chaufa",
    sectionNumber: 6,
    categoryId: "combos",
    subCategory: "1 Persona",
    price: 28.00,
    servings: "1 Persona",
    description: "Tallarín con pollo en trozos, rollo de pollo enrollado y arroz chaufa.",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "A9",
    name: "A9: Taypa especial + pollo tausi + chaufa",
    sectionNumber: 6,
    categoryId: "combos",
    subCategory: "1 Persona",
    price: 28.00,
    servings: "1 Persona",
    description: "Surtido taypa de carnes mixtas, pollo tausi y arroz chaufa.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "A10",
    name: "A10: Tallarín especial + chaufa especial",
    sectionNumber: 6,
    categoryId: "combos",
    subCategory: "1 Persona",
    price: 27.00,
    servings: "1 Persona",
    popular: true,
    description: "Tallarín saltado con carnes mixtas y chaufa especial con pollo, chancho y langostinos.",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "A11",
    name: "A11: Langostinos con verduras + chaufa",
    sectionNumber: 6,
    categoryId: "combos",
    subCategory: "1 Persona",
    price: 27.00,
    servings: "1 Persona",
    description: "Langostinos al wok con verduras orientales y arroz chaufa.",
    image: "https://images.unsplash.com/photo-1559742811-822863c46f83?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "A12",
    name: "A12: Langostinos con piña + chaufa",
    sectionNumber: 6,
    categoryId: "combos",
    subCategory: "1 Persona",
    price: 27.00,
    servings: "1 Persona",
    description: "Langostinos agridulces con rodajas de piña y arroz chaufa.",
    image: "https://images.unsplash.com/photo-1559742811-822863c46f83?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "A13",
    name: "A13: Lomo saltado + chaufa",
    sectionNumber: 6,
    categoryId: "combos",
    subCategory: "1 Persona",
    price: 25.00,
    servings: "1 Persona",
    popular: true,
    description: "Sabroso lomo saltado de carne de res jugosa servido con arroz chaufa.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "A14",
    name: "A14: Alitas con limón + chaufa",
    sectionNumber: 6,
    categoryId: "combos",
    subCategory: "1 Persona",
    price: 25.00,
    servings: "1 Persona",
    description: "Alitas fritas crocantes al toque de limón con arroz chaufa.",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "A15",
    name: "A15: Chicharrón de pollo c/ limon + chaufa",
    sectionNumber: 6,
    categoryId: "combos",
    subCategory: "1 Persona",
    price: 25.00,
    servings: "1 Persona",
    popular: true,
    description: "Chicharrón de pollo dorado con limón servido con arroz chaufa al wok.",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80"
  },

  // Combos 2 Personas
  {
    id: "B1",
    name: "B1: 1/2 Doc. wantán + 1 chijaukay + 2 chaufas + 1 gaseosa 1/2 Lt.",
    sectionNumber: 6,
    categoryId: "combos",
    subCategory: "2 Personas",
    price: 45.00,
    servings: "2 Personas",
    popular: true,
    description: "Combo completo dúo: 1/2 docena de wantán frito, 1 porción de chijaukay de pollo, 2 porciones de arroz chaufa y 1 gaseosa de 1/2 Lt.",
    image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "B2",
    name: "B2: 1/2 Doc. wantán + 1 tallarín con pollo + 2 chaufas + 1 gaseosa 1/2 Lt.",
    sectionNumber: 6,
    categoryId: "combos",
    subCategory: "2 Personas",
    price: 43.00,
    servings: "2 Personas",
    popular: true,
    description: "1/2 docena de wantán frito, 1 porción de tallarín con pollo, 2 porciones de chaufa y 1 gaseosa de 1/2 Lt.",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "B3",
    name: "B3: Tipakay + 2 porciones de chaufa",
    sectionNumber: 6,
    categoryId: "combos",
    subCategory: "2 Personas",
    price: 40.00,
    servings: "2 Personas",
    description: "1 porción de pollo tipakay dulce y 2 generosas porciones de arroz chaufa.",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "B4",
    name: "B4: Pollo en trozos c/ verduras + 2 porciones de chaufa",
    sectionNumber: 6,
    categoryId: "combos",
    subCategory: "2 Personas",
    price: 40.00,
    servings: "2 Personas",
    description: "Pechuga de pollo con verduras al wok y 2 porciones de arroz chaufa.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "B5",
    name: "B5: Pollo tausi a la plancha + 2 porciones de chaufa",
    sectionNumber: 6,
    categoryId: "combos",
    subCategory: "2 Personas",
    price: 42.00,
    servings: "2 Personas",
    description: "Pollo tausi a la plancha humeante y 2 porciones de arroz chaufa.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "B6",
    name: "B6: Chijaukay 2 sabores + 2 porciones de chaufa",
    sectionNumber: 6,
    categoryId: "combos",
    subCategory: "2 Personas",
    price: 42.00,
    servings: "2 Personas",
    popular: true,
    description: "Pollo chijaukay 2 sabores (salado y agridulce) con 2 porciones de arroz chaufa.",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "B7",
    name: "B7: Chicharrón de pollo c/ limon + 2 porciones de chaufa",
    sectionNumber: 6,
    categoryId: "combos",
    subCategory: "2 Personas",
    price: 40.00,
    servings: "2 Personas",
    description: "Chicharrón de pollo dorado crocante con limón y 2 porciones de chaufa.",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "B8",
    name: "B8: Tallarín c/ pollo en trozos + 2 porciones de chaufa",
    sectionNumber: 6,
    categoryId: "combos",
    subCategory: "2 Personas",
    price: 42.00,
    servings: "2 Personas",
    description: "Tallarín con pollo en trozos al wok y 2 porciones de arroz chaufa.",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "B9",
    name: "B9: Pollo con piña + 2 porciones de chaufa",
    sectionNumber: 6,
    categoryId: "combos",
    subCategory: "2 Personas",
    price: 40.00,
    servings: "2 Personas",
    description: "Pollo con piña en salsa agridulce y 2 porciones de arroz chaufa.",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "B10",
    name: "B10: Chancho al ajo + 2 porciones de chaufa",
    sectionNumber: 6,
    categoryId: "combos",
    subCategory: "2 Personas",
    price: 40.00,
    servings: "2 Personas",
    description: "Chancho asado al ajo crujiente y 2 porciones de arroz chaufa.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "B11",
    name: "B11: Chancho con champiñones + 2 porciones de chaufa",
    sectionNumber: 6,
    categoryId: "combos",
    subCategory: "2 Personas",
    price: 43.00,
    servings: "2 Personas",
    description: "Chancho asado cha siu con champiñones y 2 porciones de arroz chaufa.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "B12",
    name: "B12: Kamlu wantán especial + 2 porciones de chaufa",
    sectionNumber: 6,
    categoryId: "combos",
    subCategory: "2 Personas",
    price: 44.00,
    servings: "2 Personas",
    popular: true,
    description: "Kam lu wantán especial con carnes y salsa tamarindo más 2 porciones de chaufa.",
    image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80"
  },

  // Combos 3 Personas
  {
    id: "C1",
    name: "C1: Chijaukay 2 sabores + pollo con verduras + chaufa de pollo familiar",
    sectionNumber: 6,
    categoryId: "combos",
    subCategory: "3 Personas",
    price: 70.00,
    servings: "3 Personas",
    popular: true,
    description: "Banquete para 3: Chijaukay 2 sabores, pollo con verduras al wok y chaufa de pollo tamaño familiar.",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "C2",
    name: "C2: Tallarín con pollo + chancho tamarindo + chaufa de pollo familiar",
    sectionNumber: 6,
    categoryId: "combos",
    subCategory: "3 Personas",
    price: 70.00,
    servings: "3 Personas",
    popular: true,
    description: "Tallarín con pollo saltado, chancho en salsa tamarindo agridulce y chaufa de pollo familiar.",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "C3",
    name: "C3: Tallarín c/ pollo trozos + Pollo enrollado + Tipakay + Chaufa pollo familiar",
    sectionNumber: 6,
    categoryId: "combos",
    subCategory: "3 Personas",
    price: 90.00,
    servings: "3-4 Personas",
    popular: true,
    description: "Súper festín: Tallarín con pollo en trozos, pollo enrollado oriental, pollo tipakay y fuente de chaufa familiar.",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80"
  },

  // Combos 4 Personas
  {
    id: "D1",
    name: "D1: Alitas fritas + pollo plancha picante + chancho piña + chijaukay + chaufa familiar + gaseosa 1.5 Lt.",
    sectionNumber: 6,
    categoryId: "combos",
    subCategory: "4 Personas",
    price: 123.00,
    servings: "4-5 Personas",
    popular: true,
    description: "Gran banquete familiar: porción de alitas fritas, pollo picante a la plancha, chancho con piña, chijaukay de pollo, chaufa de pollo familiar y gaseosa 1.5 Lt.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "D2",
    name: "D2: 1 Doc. wantán + pollo durazno + chancho tausi plancha + enrollado + chaufa familiar + gaseosa 1.5 Lt.",
    sectionNumber: 6,
    categoryId: "combos",
    subCategory: "4 Personas",
    price: 123.00,
    servings: "4-5 Personas",
    popular: true,
    description: "Banquete imperial familiar: docena de wantán frito, pollo con durazno, chancho tausi a la plancha, pollo enrollado, chaufa familiar y gaseosa 1.5 Lt.",
    image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80"
  },

  // ================= 7. BEBIDAS, REFRESCOS, VINOS, CERVEZAS =================
  // Refrescos
  {
    id: "REF-1",
    name: "Chicha morada 1/2 jarra",
    sectionNumber: 7,
    categoryId: "bebidas",
    subCategory: "Refrescos",
    price: 6.00,
    description: "Chicha morada natural casera de maíz morado, manzana, membrillo, piña, canela y clavo.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "REF-2",
    name: "Chicha morada jarra familiar",
    sectionNumber: 7,
    categoryId: "bebidas",
    subCategory: "Refrescos",
    price: 14.00,
    popular: true,
    description: "Jarra familiar de 1.5 litros de chicha morada natural bien heladita.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "REF-3",
    name: "Chicha morada mega familiar",
    sectionNumber: 7,
    categoryId: "bebidas",
    subCategory: "Refrescos",
    price: 17.00,
    description: "Mega jarra de más de 2 litros de refrescante chicha morada tradicional.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80"
  },

  // Gaseosas
  {
    id: "GAS-IK-296",
    name: "Inca kola 296 ml.",
    sectionNumber: 7,
    categoryId: "bebidas",
    subCategory: "Gaseosas",
    price: 2.50,
    description: "Inca Kola personal de vidrio bien helada.",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "GAS-CC-296",
    name: "Coca cola 296 ml.",
    sectionNumber: 7,
    categoryId: "bebidas",
    subCategory: "Gaseosas",
    price: 2.50,
    description: "Coca Cola personal de vidrio helada.",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "GAS-FAN-296",
    name: "Fanta 296 ml.",
    sectionNumber: 7,
    categoryId: "bebidas",
    subCategory: "Gaseosas",
    price: 2.50,
    description: "Gaseosa Fanta naranja personal.",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "GAS-IK-600",
    name: "Inca kola 600 ml.",
    sectionNumber: 7,
    categoryId: "bebidas",
    subCategory: "Gaseosas",
    price: 5.00,
    popular: true,
    description: "Inca Kola botella personal 600 ml helada.",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "GAS-CC-600",
    name: "Coca cola 600 ml.",
    sectionNumber: 7,
    categoryId: "bebidas",
    subCategory: "Gaseosas",
    price: 5.00,
    popular: true,
    description: "Coca Cola botella personal 600 ml helada.",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "GAS-FAN-500",
    name: "Fanta 1/2 Lt.",
    sectionNumber: 7,
    categoryId: "bebidas",
    subCategory: "Gaseosas",
    price: 5.00,
    description: "Gaseosa Fanta medio litro.",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "GAS-SPR-500",
    name: "Sprite 1/2 Lt.",
    sectionNumber: 7,
    categoryId: "bebidas",
    subCategory: "Gaseosas",
    price: 5.00,
    description: "Gaseosa Sprite lima-limón medio litro.",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "GAS-AGUA",
    name: "Agua mineral",
    sectionNumber: 7,
    categoryId: "bebidas",
    subCategory: "Gaseosas",
    price: 4.00,
    description: "Botella de agua mineral de mesa sin gas o con gas.",
    image: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "GAS-IK-GORD",
    name: "Inca gordita",
    sectionNumber: 7,
    categoryId: "bebidas",
    subCategory: "Gaseosas",
    price: 6.00,
    popular: true,
    description: "Botella gordita de vidrio de Inca Kola bien fría.",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "GAS-IK-1L",
    name: "Inca kola de 1 Lt.",
    sectionNumber: 7,
    categoryId: "bebidas",
    subCategory: "Gaseosas",
    price: 10.00,
    description: "Botella de Inca Kola de 1 Litro.",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "GAS-CC-1L",
    name: "Coca cola de 1 Lt.",
    sectionNumber: 7,
    categoryId: "bebidas",
    subCategory: "Gaseosas",
    price: 10.00,
    description: "Botella de Coca Cola de 1 Litro.",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "GAS-IK-15L",
    name: "Inca kola 1.5 Lt.",
    sectionNumber: 7,
    categoryId: "bebidas",
    subCategory: "Gaseosas",
    price: 12.00,
    popular: true,
    description: "Botella de Inca Kola familiar de 1.5 Litros.",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "GAS-CC-15L",
    name: "Coca cola 1.5 Lt.",
    sectionNumber: 7,
    categoryId: "bebidas",
    subCategory: "Gaseosas",
    price: 12.00,
    popular: true,
    description: "Botella de Coca Cola familiar de 1.5 Litros.",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "GAS-IK-25L",
    name: "Inca kola 2.5 Lt.",
    sectionNumber: 7,
    categoryId: "bebidas",
    subCategory: "Gaseosas",
    price: 15.00,
    popular: true,
    description: "Botella grande de Inca Kola de 2.5 Litros.",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "GAS-CC-25L",
    name: "Coca cola 2.5 Lt.",
    sectionNumber: 7,
    categoryId: "bebidas",
    subCategory: "Gaseosas",
    price: 15.00,
    popular: true,
    description: "Botella grande de Coca Cola de 2.5 Litros.",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "GAS-FAN-25L",
    name: "Fanta 2.5 Lt.",
    sectionNumber: 7,
    categoryId: "bebidas",
    subCategory: "Gaseosas",
    price: 15.00,
    description: "Botella grande de Fanta naranja de 2.5 Litros.",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80"
  },

  // Vinos
  {
    id: "VINO-GUI",
    name: "Vino chino gui huachen",
    sectionNumber: 7,
    categoryId: "bebidas",
    subCategory: "Vinos",
    price: 40.00,
    description: "Tradicional licor oriental de flores de osmanthus y arroz dulce.",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "VINO-SHI",
    name: "Vino chino shi wan mi jiu",
    sectionNumber: 7,
    categoryId: "bebidas",
    subCategory: "Vinos",
    price: 40.00,
    description: "Clásico vino cantonés de arroz de diez mil años, aromático y suave.",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "VINO-TACAMA",
    name: "Tacama semi seco",
    sectionNumber: 7,
    categoryId: "bebidas",
    subCategory: "Vinos",
    price: 30.00,
    description: "Botella de vino peruano Tacama Blanco o Tinto Semi Seco.",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "VINO-QUEIROLO",
    name: "Santiago Queirolo",
    sectionNumber: 7,
    categoryId: "bebidas",
    subCategory: "Vinos",
    price: 30.00,
    description: "Botella de vino Santiago Queirolo Magdalena o Borgoña.",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80"
  },

  // Cervezas
  {
    id: "CERV-CRISTAL",
    name: "Cristal",
    sectionNumber: 7,
    categoryId: "bebidas",
    subCategory: "Cervezas",
    price: 9.00,
    description: "Cerveza Cristal heladita 650 ml.",
    image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "CERV-PILSEN",
    name: "Pilsen",
    sectionNumber: 7,
    categoryId: "bebidas",
    subCategory: "Cervezas",
    price: 9.00,
    popular: true,
    description: "Cerveza Pilsen Callao heladita 630 ml.",
    image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "CERV-CUZQUENA",
    name: "Cuzqueña",
    sectionNumber: 7,
    categoryId: "bebidas",
    subCategory: "Cervezas",
    price: 9.00,
    popular: true,
    description: "Cerveza Cusqueña Dorada, Trigo o Negra heladita.",
    image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=600&q=80"
  },

  // Bebidas calientes
  {
    id: "TE-MANZANILLA",
    name: "Té de manzanilla",
    sectionNumber: 7,
    categoryId: "bebidas",
    subCategory: "Bebidas Calientes",
    price: 3.00,
    description: "Infusión caliente relajante de manzanilla natural.",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "TE-ANIS",
    name: "Té de anís",
    sectionNumber: 7,
    categoryId: "bebidas",
    subCategory: "Bebidas Calientes",
    price: 3.00,
    description: "Infusión caliente digestiva de anís de grano.",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "TE-CANELA",
    name: "Té de canela",
    sectionNumber: 7,
    categoryId: "bebidas",
    subCategory: "Bebidas Calientes",
    price: 3.00,
    description: "Té caliente con corteza de canela y clavo de olor aromático.",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "TE-JAZMINE",
    name: "Té de jazmín",
    sectionNumber: 7,
    categoryId: "bebidas",
    subCategory: "Bebidas Calientes",
    price: 3.00,
    popular: true,
    description: "Té verde chino aromático con flores de jazmín, perfecto para acompañar el chifa.",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80"
  }
];
