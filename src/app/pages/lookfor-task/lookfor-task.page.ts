import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-lookfor-task',
  templateUrl: './lookfor-task.page.html',
  styleUrls: ['./lookfor-task.page.scss'],
})
export class LookforTaskPage implements OnInit {

  destinos: any[] = [];
  searchQuery: string = '';
  resultados: any[] = [];
  busquedasRecientes: string[] = [];

  constructor(private supabase: SupabaseService, private router: Router) {}

  lugaresFiltrados = [
  // Playas
  { nombre: "Playa El Tunco", categoria: "Playas", descripcion: 'Famosa por su ambiente surfista y vida nocturna.',
    lat: 13.4942,
    lng: -89.3811,
    mapa: "https://www.google.com/maps/place/Playa+El+Tunco"
 },
{
  nombre: "Playa El Sunzal",
  categoria: "Playas",
  descripcion: "Playa tradicional para surf con olas largas y rompiente derecha, bastante conocida entre surfistas locales.",
  lat: 13.49399,
  lng: -89.39489,
  mapa: "https://www.google.com/maps?q=13.49399,-89.39489"
},
{
  nombre: "Playa Costa del Sol",
  categoria: "Playas",
  descripcion: "Una de las playas más turísticas de El Salvador, con muchos hoteles, restaurantes y zonas recreativas.",
  lat: 13.4590,
  lng: -88.6830,
  mapa: "https://www.google.com/maps?q=13.4590,-88.6830"
},
{
  nombre: "Playa Mizata",
  categoria: "Playas",
  descripcion: "Playa tranquila, ideal para relajarse, acampar y surfear en un entorno más natural.",
  lat: 13.5100,
  lng: -89.5911,
  mapa: "https://www.google.com/maps?q=13.5100,-89.5911"
},
{
  nombre: "Playa El Cuco",
  categoria: "Playas",
  descripcion: "Playa familiar con arena oscura, ambiente tradicional y restaurantes locales.",
  lat: 13.3436,
  lng: -89.0064,
  mapa: "https://www.google.com/maps?q=13.3436,-89.0064"
},
{
  nombre: "Playa Las Flores",
  categoria: "Playas",
  descripcion: "Playa reconocida por sus olas para surf y su belleza natural.",
  lat: 13.2500,
  lng: -88.0500,
  mapa: "https://www.google.com/maps?q=13.2500,-88.0500"
},
{
  nombre: "Playa La Libertad",
  categoria: "Playas",
  descripcion: "Playa con malecón, restaurantes y ambiente turístico activo.",
  lat: 13.4810,
  lng: -89.3050,
  mapa: "https://www.google.com/maps?q=13.4810,-89.3050"
},
{
  nombre: "Playa El Zonte",
  categoria: "Playas",
  descripcion: "Playa bohemia y de surf con ambiente relajado y hostales frente al mar.",
  lat: 13.4970,
  lng: -89.3640,
  mapa: "https://www.google.com/maps?q=13.4970,-89.3640"
},
{
  nombre: "Playa El Espino",
  categoria: "Playas",
  descripcion: "Playa de más de 10 km, parte de Bahía de Jiquilisco, ideal para paseos y relajación.",
  lat: 13.2800,
  lng: -88.5600,
  mapa: "https://www.google.com/maps?q=13.2800,-88.5600"
},
{
  nombre: "Playa Los Cóbanos",
  categoria: "Playas",
  descripcion: "Playa con arrecifes y área protegida, ideal para snorkel y buceo.",
  lat: 13.5272,
  lng: -89.8113,
  mapa: "https://www.google.com/maps?q=13.5272,-89.8113"
},
{
  nombre: "Playa San Diego",
  categoria: "Playas",
  descripcion: "Playa familiar con aguas moderadas y zona tranquila.",
  lat: 13.4711,
  lng: -89.2636,
  mapa: "https://www.google.com/maps?q=13.4711,-89.2636"
},
{
  nombre: "Playa San Blas",
  categoria: "Playas",
  descripcion: "Playa turística con resorts y ambiente tranquilo.",
  lat: 13.4750,
  lng: -89.2900,
  mapa: "https://www.google.com/maps?q=13.4750,-89.2900"
},
{
  nombre: "Playa El Majahual",
  categoria: "Playas",
  descripcion: "Playa muy visitada, con ambiente relajado y acceso fácil por la carretera litoral.",
  lat: 13.4800,
  lng: -89.2400,
  mapa: "https://www.google.com/maps?q=13.4800,-89.2400"
},
{
  nombre: "Playa La Paz",
  categoria: "Playas",
  descripcion: "Playa turística del litoral central, popular entre surfistas.",
  lat: 13.4300,
  lng: -89.1800,
  mapa: "https://www.google.com/maps?q=13.4300,-89.1800"
},
{
  nombre: "Playa El Tamarindo",
  categoria: "Playas",
  descripcion: "Playa con oleaje moderado, ideal para relajarse en el oriente del país.",
  lat: 13.1972,
  lng: -87.9147,
  mapa: "https://www.google.com/maps?q=13.1972,-87.9147"
},
{
  nombre: "Playa Esterón",
  categoria: "Playas",
  descripcion: "Playa natural poco desarrollada, parte del oriente del país.",
  mapa: "https://www.google.com/maps/search/Playa+Esterón+El+Salvador"
},
{
  nombre: "Playa Las Tunas",
  categoria: "Playas",
  descripcion: "Playa de arena oscura con formaciones rocosas y pozas naturales.",
  mapa: "https://www.google.com/maps/search/Playa+Las+Tunas+El+Salvador"
},
{
  nombre: "Playa Punta Mango",
  categoria: "Playas",
  descripcion: "Playa remota ideal para surfistas experimentados.",
  mapa: "https://www.google.com/maps/search/Playa+Punta+Mango"
},
{
  nombre: "Playa Blanca (Costa del Sol)",
  categoria: "Playas",
  descripcion: "Sector de playa dentro de Costa del Sol, ideal para turismo y descanso.",
  mapa: "https://www.google.com/maps/search/Playa+Blanca+Costa+del+Sol"
},
{
  nombre: "Playa Maculis",
  categoria: "Playas",
  descripcion: "Playa con rocas y piscinas naturales.",
  mapa: "https://www.google.com/maps/search/Playa+Maculis+El+Salvador"
},
{
  nombre: "Playa Toluca",
  categoria: "Playas",
  descripcion: "Playa mencionada en registros topográficos del litoral.",
  lat: 13.4489,
  lng: -89.2158,
  mapa: "https://www.google.com/maps?q=13.4489,-89.2158"
},
{
  nombre: "Playa El Icacal",
  categoria: "Playas",
  descripcion: "Playa tranquila, poco turística, parte de estudios de zonas costeras.",
  mapa: "https://www.google.com/maps/search/Playa+El+Icacal"
},
{
  nombre: "Playa Dorada",
  categoria: "Playas",
  descripcion: "Playa menos conocida, incluida en estudios turísticos del litoral.",
  mapa: "https://www.google.com/maps/search/Playa+Dorada+El+Salvador"
},
{
  nombre: "Playa Playitas",
  categoria: "Playas",
  descripcion: "Pequeñas ensenadas ideales para quienes buscan privacidad.",
  mapa: "https://www.google.com/maps/search/Playa+Playitas+El+Salvador"
},


  
// Restaurantes

  {
    nombre: "El Zócalo",
    categoria: "Restaurantes",
    descripcion: "Restaurante mexicano, parte de la cadena El Zócalo, con cocina tradicional mexicana en El Salvador.",
    lat: null,
    lng: null,
    mapa: "https://www.google.com/maps/search/?api=1&query=El+Zocalo+El+Salvador"
  },
  {
    nombre: "La Hola Betos",
    categoria: "Restaurantes",
    descripcion: "Cadena de restaurantes en El Salvador, conocida por sus platillos locales y mariscos.",
    lat: null,
    lng: null,
    mapa: "https://www.google.com/maps/search/?api=1&query=La+Hola+Betos+El+Salvador"
  },
  {
    nombre: "Pupusería Suiza",
    categoria: "Restaurantes",
    descripcion: "Pupusería tradicional salvadoreña, famosa por sus pupusas de todo tipo y ambiente local.",
    lat: null,
    lng: null,
    mapa: "https://www.google.com/maps/search/?api=1&query=Pupuseria+Suiza+El+Salvador"
  },
  {
    nombre: "Hacienda Real",
    categoria: "Restaurantes",
    descripcion: "Restaurante de parrilla y carnes, con ambiente elegante y menú variado centrado en cortes y cocina tradicional.",
    lat: null,
    lng: null,
    mapa: "https://www.google.com/maps/search/?api=1&query=Hacienda+Real+El+Salvador"
  },
  {
    nombre: "La Pampa Argentina",
    categoria: "Restaurantes",
    descripcion: "Restaurante de estilo argentino especializado en carnes y parrilladas.",
    lat: null,
    lng: null,
    mapa: "https://www.google.com/maps/search/?api=1&query=La+Pampa+Argentina+El+Salvador"
  },
  {
    nombre: "Puerto Mariscos",
    categoria: "Restaurantes",
    descripcion: "Restaurante especializado en mariscos frescos: ceviches, pescados y camarones.",
    lat: null,
    lng: null,
    mapa: "https://www.google.com/maps/search/?api=1&query=Puerto+Mariscos+El+Salvador"
  },
  {
    nombre: "Koi Sushi",
    categoria: "Restaurantes",
    descripcion: "Restaurante japonés de sushi y cocina asiática con ambiente moderno.",
    lat: null,
    lng: null,
    mapa: "https://www.google.com/maps/search/?api=1&query=Koi+Sushi+El+Salvador"
  },
  {
    nombre: "Cadejo Brewing Company",
    categoria: "Restaurantes",
    descripcion: "Pub artesanal en San Salvador que combina cervezas locales con gastronomía tipo gastro-pub.",
    lat: 13.69384,
    lng: -89.23524,
    mapa: "https://www.google.com/maps?q=13.69384,-89.23524"
  },
  {
    nombre: "La Gastroteca",
    categoria: "Restaurantes",
    descripcion: "Restaurante moderno y elegante con gastronomía de autor y platillos innovadores.",
    lat: null,
    lng: null,
    mapa: "https://www.google.com/maps/search/?api=1&query=La+Gastroteca+El+Salvador"
  },
  {
    nombre: "Pollo Campestre",
    categoria: "Restaurantes",
    descripcion: "Cadena centroamericana de pollo frito y rostizado.",
    lat: null,
    lng: null,
    mapa: "https://www.google.com/maps/search/?api=1&query=Pollo+Campestre+El+Salvador"
  },
  {
    nombre: "Buffalo Wings",
    categoria: "Restaurantes",
    descripcion: "Restaurante especializado en alitas estilo americano con salsas variadas.",
    lat: null,
    lng: null,
    mapa: "https://www.google.com/maps/search/?api=1&query=Buffalo+Wings+El+Salvador"
  },
  {
    nombre: "Tipicos Margoth",
    categoria: "Restaurantes",
    descripcion: "Restaurante típico salvadoreño famoso por platos tradicionales.",
    lat: null,
    lng: null,
    mapa: "https://www.google.com/maps/search/?api=1&query=Tipicos+Margoth+El+Salvador"
  },
  {
    nombre: "Sushi King",
    categoria: "Restaurantes",
    descripcion: "Cadena de sushi y comida japonesa.",
    lat: null,
    lng: null,
    mapa: "https://www.google.com/maps/search/?api=1&query=Sushi+King+El+Salvador"
  },
  {
    nombre: "Kreef",
    categoria: "Restaurantes",
    descripcion: "Restaurante de mariscos elegantes y pescados frescos.",
    lat: null,
    lng: null,
    mapa: "https://www.google.com/maps/search/?api=1&query=Kreef+El+Salvador"
  },
  {
    nombre: "El Sopón de San Miguel",
    categoria: "Restaurantes",
    descripcion: "Lugar tradicional en San Miguel, famoso por su sopón y comida casera.",
    lat: null,
    lng: null,
    mapa: "https://www.google.com/maps/search/?api=1&query=El+Sopon+de+San+Miguel"
  },
  {
    nombre: "Pupusería La Ceiba",
    categoria: "Restaurantes",
    descripcion: "Pupusería local con pupusas artesanales hechas al momento.",
    lat: null,
    lng: null,
    mapa: "https://www.google.com/maps/search/?api=1&query=Pupuseria+La+Ceiba+El+Salvador"
  },
  {
    nombre: "Típico Wakami",
    categoria: "Restaurantes",
    descripcion: "Restaurante ideal para probar auténtica comida salvadoreña.",
    lat: null,
    lng: null,
    mapa: "https://www.google.com/maps/search/?api=1&query=Tipico+Wakami+El+Salvador"
  },
  {
    nombre: "Pastelería y Café Vivian",
    categoria: "Restaurantes",
    descripcion: "Café boutique y pastelería ideal para desayunos y meriendas.",
    lat: null,
    lng: null,
    mapa: "https://www.google.com/maps/search/?api=1&query=Cafe+Vivian+El+Salvador"
  },
  {
    nombre: "Garden Grill",
    categoria: "Restaurantes",
    descripcion: "Restaurante en ambiente de jardín, especializado en grill y ensaladas.",
    lat: null,
    lng: null,
    mapa: "https://www.google.com/maps/search/?api=1&query=Garden+Grill+El+Salvador"
  },
  {
    nombre: "Toro Gozo Grill",
    categoria: "Restaurantes",
    descripcion: "Parrilla y grill con carnes y hamburguesas en ambiente moderno.",
    lat: null,
    lng: null,
    mapa: "https://www.google.com/maps/search/?api=1&query=Toro+Gozo+Grill+El+Salvador"
  },
  {
    nombre: "Los Cebollines",
    categoria: "Restaurantes",
    descripcion: "Restaurante de comida mexicana / tex-mex.",
    lat: null,
    lng: null,
    mapa: "https://www.google.com/maps/search/?api=1&query=Los+Cebollines+El+Salvador"
  },
  {
    nombre: "Italianissimo",
    categoria: "Restaurantes",
    descripcion: "Restaurante italiano especializado en pasta, pizzas y comida mediterránea.",
    lat: null,
    lng: null,
    mapa: "https://www.google.com/maps/search/?api=1&query=Italianissimo+El+Salvador"
  },
  {
    nombre: "Rustico Bistro",
    categoria: "Restaurantes",
    descripcion: "Bistró con platos internacionales y ambiente rústico.",
    lat: null,
    lng: null,
    mapa: "https://www.google.com/maps/search/?api=1&query=Rustico+Bistro+El+Salvador"
  },
  {
    nombre: "Don Li Chinese Food",
    categoria: "Restaurantes",
    descripcion: "Restaurante de comida china tradicional.",
    lat: null,
    lng: null,
    mapa: "https://www.google.com/maps/search/?api=1&query=Don+Li+Chinese+Food+El+Salvador"
  },
  {
    nombre: "Soya Nutribar",
    categoria: "Restaurantes",
    descripcion: "Bar nutricional con opciones saludables, batidos y bowls.",
    lat: null,
    lng: null,
    mapa: "https://www.google.com/maps/search/?api=1&query=Soya+Nutribar+El+Salvador"
  },
  {
    nombre: "Beto’s Restaurante El Tunco",
    categoria: "Restaurantes",
    descripcion: "Restaurante en la playa El Tunco, especializado en mariscos.",
    lat: null,
    lng: null,
    mapa: "https://www.google.com/maps/search/?api=1&query=Betos+El+Tunco"
  }

,



  // Museos

  {
    nombre: "Museo Nacional de Antropología (MUNA)",
    categoria: "Museos",
    descripcion: "Museo dedicado a la arqueología, antropología e historia social de El Salvador. Exhibe colecciones prehispánicas y etnográficas para reflexionar sobre la identidad cultural salvadoreña.",
    lat: 13.68728,
    lng: -89.23872,
    mapa: "https://www.google.com/maps?q=13.68728,-89.23872"
  },
  {
    nombre: "Museo de Arte MARTE",
    categoria: "Museos",
    descripcion: "Museo de arte contemporáneo en San Salvador. Alberga exposiciones permanentes y temporales de arte salvadoreño, con programas educativos para visitantes.",
    lat: 13.69271,
    lng: -89.24211,
    mapa: "https://www.google.com/maps?q=13.69271,-89.24211"
  },
  {
    nombre: "Museo Dr. David J. Guzmán",
    categoria: "Museos",
    descripcion: "MUNA: Museo Nacional de Antropología, enfocado en la investigación arqueológica e histórica y en educación cultural para los salvadoreños.",
    lat: 13.68728,
    lng: -89.23872,
    mapa: "https://www.google.com/maps?q=13.68728,-89.23872"
  },
  {
    nombre: "Museo de la Palabra y la Imagen",
    categoria: "Museos",
    descripcion: "Museo que promueve la memoria histórica de El Salvador a través de exposiciones sobre guerra, cultura y derechos humanos.",
    lat: null,
    lng: null,
    mapa: "https://www.google.com/maps/search/?api=1&query=Museo+de+la+Palabra+y+la+Imagen"
  },
  {
    nombre: "Museo Casa Blanca",
    categoria: "Museos",
    descripcion: "Museo histórico que conserva arquitectura colonial y objetos antiguos para ilustrar el pasado de la ciudad.",
    lat: null,
    lng: null,
    mapa: "https://www.google.com/maps/search/?api=1&query=Museo+Casa+Blanca+El+Salvador"
  },
  {
    nombre: "Museo de Historia Natural de El Salvador",
    categoria: "Museos",
    descripcion: "Museo con colecciones de fauna, flora, fósiles y minerales para educar sobre la biodiversidad salvadoreña.",
    lat: null,
    lng: null,
    mapa: "https://www.google.com/maps/search/?api=1&query=Museo+de+Historia+Natural+El+Salvador"
  },
  {
    nombre: "Museo de Arte Contemporáneo (MAC)",
    categoria: "Museos",
    descripcion: "Espacio cultural enfocado en arte contemporáneo, con exposiciones de artistas locales e internacionales.",
    lat: null,
    lng: null,
    mapa: "https://www.google.com/maps/search/?api=1&query=Museo+de+Arte+Contemporaneo+MAC+El+Salvador"
  },
  {
    nombre: "Museo Tin Marín",
    categoria: "Museos",
    descripcion: "Museo interactivo para niños con exhibiciones lúdicas, ciencia y educación para toda la familia.",
    lat: null,
    lng: null,
    mapa: "https://www.google.com/maps/search/?api=1&query=Museo+Tin+Marin"
  },
  {
    nombre: "Museo Regional de Occidente",
    categoria: "Museos",
    descripcion: "Museo regional con arte, historia y cultura del occidente de El Salvador.",
    lat: null,
    lng: null,
    mapa: "https://www.google.com/maps/search/?api=1&query=Museo+Regional+de+Occidente+El+Salvador"
  },
  {
    nombre: "Museo Regional de Oriente",
    categoria: "Museos",
    descripcion: "Museo regional dedicado a la historia, tradiciones y patrimonio cultural del oriente del país.",
    lat: null,
    lng: null,
    mapa: "https://www.google.com/maps/search/?api=1&query=Museo+Regional+de+Oriente+El+Salvador"
  },
  {
    nombre: "Museo Militar de la Fuerza Armada",
    categoria: "Museos",
    descripcion: "Museo que exhibe la historia militar salvadoreña, con armas, uniformes, vehículos y documentos históricos.",
    lat: 13.7030,
    lng: -89.2150,
    mapa: "https://www.google.com/maps?q=13.7030,-89.2150"
  },
  {
    nombre: "Museo del Ferrocarril y Museo de Aviación",
    categoria: "Museos",
    descripcion: "Museo que combina historia ferroviaria y aviación, con locomotoras antiguas, aviones y exposiciones de transporte histórico.",
    lat: null,
    lng: null,
    mapa: "https://www.google.com/maps/search/?api=1&query=Museo+del+Ferrocarril+y+Aviacion+El+Salvador"
  },
  {
    nombre: "Museo El Calvario (Suchitoto)",
    categoria: "Museos",
    descripcion: "Museo ubicado en Suchitoto que promueve la historia local y la cultura religiosa del calvario.",
    lat: null,
    lng: null,
    mapa: "https://www.google.com/maps/search/?api=1&query=Museo+El+Calvario+Suchitoto"
  },
  {
    nombre: "Museo Forma",
    categoria: "Museos",
    descripcion: "Museo de diseño y arquitectura con énfasis en innovación, arte moderno y espacios culturales en San Salvador.",
    lat: null,
    lng: null,
    mapa: "https://www.google.com/maps/search/?api=1&query=Museo+Forma+San+Salvador"
  },
  {
    nombre: "Museo del Café (Finca El Carmen)",
    categoria: "Museos",
    descripcion: "Museo ubicado en una finca cafetalera, dedicado a la historia del café en El Salvador, con tours y degustación.",
    lat: null,
    lng: null,
    mapa: "https://www.google.com/maps/search/?api=1&query=Museo+del+Cafe+Finca+El+Carmen"
  },
  {
    nombre: "Museo del Banco Central de Reserva",
    categoria: "Museos",
    descripcion: "Museo que muestra la historia económica y monetaria de El Salvador y la evolución del sistema bancario.",
    lat: null,
    lng: null,
    mapa: "https://www.google.com/maps/search/?api=1&query=Museo+del+Banco+Central+de+Reserva+El+Salvador"
  },
  {
    nombre: "Museo del Juguete Antiguo (Santa Ana)",
    categoria: "Museos",
    descripcion: "Museo con colección de juguetes antiguos y piezas de entretenimiento clásico para mostrar la evolución del juego.",
    lat: null,
    lng: null,
    mapa: "https://www.google.com/maps/search/?api=1&query=Museo+del+Juguete+Antiguo+Santa+Ana"
  },
  {
    nombre: "Museo de Sitio San Andrés",
    categoria: "Museos",
    descripcion: "Museo arqueológico en el sitio maya de San Andrés, con estructuras precolombinas y exhibiciones sobre la civilización antigua.",
    lat: 13.80056,
    lng: -89.38917,
    mapa: "https://www.google.com/maps?q=13.80056,-89.38917"
  },
  {
    nombre: "Museo de Sitio Joya de Cerén",
    categoria: "Museos",
    descripcion: "Museo arqueológico del sitio maya de Joya de Cerén, Patrimonio de la Humanidad; exhibe estructuras y artefactos conservados bajo ceniza volcánica.",
    lat: null,
    lng: null,
    mapa: "https://www.google.com/maps/search/?api=1&query=Museo+Joya+de+Ceren"
  },



  

  // Parques Nacionales
// Parques Nacionales
{
  nombre: "Parque Nacional El Imposible",
  categoria: "Parques Nacionales",
  descripcion: "Bosque tropical seco con gran biodiversidad, ríos, miradores y senderos exigentes. Uno de los pulmones naturales más importantes del occidente.",
  lat: 13.84167,
  lng: -89.95750,
  mapa: "https://www.google.com/maps/place/Parque+Nacional+El+Imposible"
},
{
  nombre: "Parque Nacional El Boquerón",
  categoria: "Parques Nacionales",
  descripcion: "Parque ubicado en el cráter del volcán de San Salvador. Repleto de vegetación fresca, miradores y clima templado.",
  lat: 13.72770,
  lng: -89.29063,
  mapa: "https://www.google.com/maps/place/Parque+Nacional+El+Boquerón"
},
{
  nombre: "Cerro Verde",
  categoria: "Parques Nacionales",
  descripcion: "Volcán extinto cubierto de bosque nebuloso. Cuenta con senderos, vistas al Izalco y al Santa Ana, y un orquideario.",
  lat: 13.83131,
  lng: -89.63572,
  mapa: "https://www.google.com/maps/place/Cerro+Verde"
},
{
  nombre: "Volcán de San Salvador / El Boquerón",
  categoria: "Parques Nacionales",
  descripcion: "Volcán activo cuyo cráter forma parte del parque El Boquerón. Fácil acceso, miradores y vistas espectaculares.",
  lat: 13.72770,
  lng: -89.29063,
  mapa: "https://www.google.com/maps/place/Volcán+de+San+Salvador"
},
{
  nombre: "Parque Nacional Montecristo",
  categoria: "Parques Nacionales",
  descripcion: "Bosque nebuloso parte de la Reserva de la Biosfera Trifinio, rico en biodiversidad y senderos naturales.",
  lat: 14.40794,
  lng: -89.36727,
  mapa: "https://www.google.com/maps/place/Parque+Nacional+Montecristo"
},
{
  nombre: "Parque Nacional Los Volcanes",
  categoria: "Parques Nacionales",
  descripcion: "Complejo natural que integra los volcanes Santa Ana, Izalco y Cerro Verde. Corredor biológico clave.",
  lat: 13.83380,
  lng: -89.63390,
  mapa: "https://www.google.com/maps/place/Complejo+Los+Volcanes"
},
{
  nombre: "Parque Nacional Walter Thilo Deininger",
  categoria: "Parques Nacionales",
  descripcion: "Parque de aventura con senderos, canopy, ciclismo y bosques secos en La Libertad.",
  lat: 13.48847,
  lng: -89.32288,
  mapa: "https://www.google.com/maps/place/Parque+Walter+Thilo+Deininger"
},
{
  nombre: "Parque Nacional San Diego y San Felipe Las Barras",
  categoria: "Parques Nacionales",
  descripcion: "Área protegida con bosques ribereños cerca de la Laguna de Güija, importante por su fauna y humedales.",
  lat: 14.32850,
  lng: -89.48890,
  mapa: "https://www.google.com/maps/place/Laguna+de+Güija"
},
{
  nombre: "Parque Nacional Nancuchiname",
  categoria: "Parques Nacionales",
  descripcion: "Bosque tropical con humedales, cocodrilos, aves migratorias y vegetación ribereña en el Bajo Lempa.",
  lat: 13.28771,
  lng: -88.49745,
  mapa: "https://www.google.com/maps/place/Nancuchiname"
},
{
  nombre: "Parque Nacional Laguna El Jocotal",
  categoria: "Parques Nacionales",
  descripcion: "Sitio Ramsar de importancia mundial. Refugio de aves acuáticas migratorias y ecosistemas de humedal.",
  lat: 13.42083,
  lng: -88.32500,
  mapa: "https://www.google.com/maps/place/Laguna+El+Jocotal"
},
{
  nombre: "Parque Nacional Bahía de Jiquilisco",
  categoria: "Parques Nacionales",
  descripcion: "El manglar más grande de El Salvador. Hogar de tortugas marinas y hábitat de aves migratorias.",
  lat: 13.22380,
  lng: -88.49420,
  mapa: "https://www.google.com/maps/place/Bahía+de+Jiquilisco"
},
{
  nombre: "Parque Nacional Complejo Los Cóbanos",
  categoria: "Parques Nacionales",
  descripcion: "Arrecife de coral, vida marina abundante, buceo y formaciones rocosas únicas.",
  lat: 13.53392,
  lng: -89.83705,
  mapa: "https://www.google.com/maps/place/Los+Cóbanos"
},
{
  nombre: "Parque Nacional Volcán de Santa Ana (Ilamatepec)",
  categoria: "Parques Nacionales",
  descripcion: "Volcán activo con un cráter impresionante y una laguna turquesa. Ruta de senderismo popular.",
  lat: 13.85389,
  lng: -89.63028,
  mapa: "https://www.google.com/maps/place/Volcán+de+Santa+Ana"
},
{
  nombre: "Parque Nacional Volcán de Izalco",
  categoria: "Parques Nacionales",
  descripcion: "Conocido como 'El Faro del Pacífico'. Volcán joven con paisajes volcánicos únicos.",
  lat: 13.80830,
  lng: -89.63080,
  mapa: "https://www.google.com/maps/place/Volcán+de+Izalco"
},
{
  nombre: "Parque Nacional Volcán de San Miguel (Chaparrastique)",
  categoria: "Parques Nacionales",
  descripcion: "Volcán activo y emblemático del oriente del país. Visible desde gran parte de San Miguel.",
  lat: 13.43472,
  lng: -88.26972,
  mapa: "https://www.google.com/maps/place/Volcán+Chaparrastique"
},
{
  nombre: "Parque Nacional Laguna de Olomega",
  categoria: "Parques Nacionales",
  descripcion: "Laguna natural de importancia ecológica, hábitat de aves y especies acuáticas.",
  lat: 13.28450,
  lng: -88.05240,
  mapa: "https://www.google.com/maps/place/Laguna+de+Olomega"
},
{
  nombre: "Parque Nacional Cerro Cacahuatique",
  categoria: "Parques Nacionales",
  descripcion: "Área montañosa con bosques y miradores. Ideal para senderismo y vistas panorámicas.",
  lat: 13.66200,
  lng: -88.19340,
  mapa: "https://www.google.com/maps/place/Cerro+Cacahuatique"
}
,


 


  // Balnearios
  {
    nombre: "Los Chorros",
  categoria: "Bañarios",
  descripcion: "Conocido balneario con pozas naturales rodeadas de vegetación, ideal para pasar el día en agua fresca.",
  lat: 13.69254,
  lng: -89.31671,
  mapa: "https://www.google.com/maps/place/Los+Chorros"
  },
  {
   nombre: "Aguas Termales de Santa Teresa",
  categoria: "Bañarios",
  descripcion: "Complejo de aguas termales con más de 30 piscinas naturales, vapor mineral, barro termal y vistas montañosas.",
  lat: 13.90207,
  lng: -89.81867,
  mapa: "https://www.google.com/maps/place/Aguas+Termales+de+Santa+Teresa"
  },
  {
    nombre: "La Laguna",
    categoria: "Bañarios",
    descripcion: "Balneario llamado “La Laguna”: muchas lagunas en El Salvador son usadas para recreación y natación, pero no encontré documentación precisa para uno con este nombre exacto como balneario turístico.",
    lat: null,
    lng: null
  },
  {
    nombre: "El Trapiche",
    categoria: "Bañarios",
    descripcion: "Balneario llamado El Trapiche: no encontré una referencia clara en fuentes turísticas confiables que describan exactamente este balneario, podría tratarse de un balneario local pequeño o poco documentado.",
    lat: null,
    lng: null
  },
  {
    nombre: "Las Pilas",
    categoria: "Bañarios",
    descripcion: "Balneario Las Pilas: su nombre sugiere pozas o pilas (charcas), pero no encontré datos públicos recientes sobre ubicación turística o instalaciones para visitantes.",
    lat: null,
    lng: null
  },
  {
    nombre: "Los Amates",
    categoria: "Bañarios",
    descripcion: "Balneario Los Amates: no hay información confiable accesible para confirmar si se trata de un balneario turístico formal, ni sobre su ubicación exacta.",
    lat: null,
    lng: null
  },
  {
    nombre: "Cihuatán",
    categoria: "Bañarios",
    descripcion: "Balneario Cihuatán: no encontré referencias claras a un balneario con este nombre en fuentes turísticas principales; podría ser una zona local de recreo menos conocida.",
    lat: null,
    lng: null
  },
  {
    nombre: "Amapulapa",
  categoria: "Bañarios",
  descripcion: "Balneario popular en Zacatecoluca con múltiples piscinas y áreas recreativas familiares.",
  lat: 13.50925,
  lng: -88.86955,
  mapa: "https://www.google.com/maps/place/Turicentro+Amapulapa"

  },
  {
    nombre: "Ichanmichen",
  categoria: "Bañarios",
  descripcion: "Turicentro en Zacatecoluca con piscinas, toboganes y áreas verdes.",
  lat: 13.51703,
  lng: -88.89191,
  mapa: "https://www.google.com/maps/place/Turicentro+Ichanmichen"
  },
  {
     nombre: "Atecozol",
  categoria: "Bañarios",
  descripcion: "Turicentro en Izalco conocido por sus pozas de agua fría y naturaleza.",
  lat: 13.74447,
  lng: -89.67384,
  mapa: "https://www.google.com/maps/place/Atecozol"
  },
  {
    nombre: "Apuzunga",
  categoria: "Bañarios",
  descripcion: "Complejo recreativo ubicado en Metapán, con piscinas y zonas naturales.",
  lat: 14.32840,
  lng: -89.44552,
  mapa: "https://www.google.com/maps/place/Apuzunga"
  },
  {
    nombre: "Los Chorros de la Calera",
  categoria: "Bañarios",
  descripcion: "Hermosas pozas y cascadas de agua cristalina en Juayúa, parte de los Siete Cascadas.",
  lat: 13.84141,
  lng: -89.74576,
  mapa: "https://www.google.com/maps/place/Chorros+de+la+Calera"
  },
  {
    nombre: "Joya Grande",
    categoria: "Bañarios",
    descripcion: "Balneario Joya Grande: no pude localizar información pública confiable en fuentes turísticas relevantes para describir este sitio en detalle.",
    lat: null,
    lng: null
  },
  {
    nombre: "Altos del Sol",
    categoria: "Bañarios",
    descripcion: "Balneario Altos del Sol: puede ser parte de un turicentro o zona recreativa, pero no aparece en fuentes oficiales como un balneario ampliamente reconocido.",
    lat: null,
    lng: null
  },
  {
    nombre: "El Capulín",
    categoria: "Bañarios",
    descripcion: "Balneario El Capulín: su nombre sugiere ubicación en un área montañosa o natural, pero no encontré datos turísticos confiables recientes para confirmarlo.",
    lat: null,
    lng: null
  },
  {
    nombre: "La Cueva",
    categoria: "Bañarios",
    descripcion: "Balneario La Cueva: podría referirse a una zona con cuevas y agua, pero no encontré documentación pública suficiente para confirmar su importancia como balneario turístico.",
    lat: null,
    lng: null
  },
  {
    nombre: "Sihuatehuacán",
    categoria: "Bañarios",
    descripcion: "Balneario Sihuatehuacán: aparece en algunas listas de balnearios tradicionales, pero con muy poca información detallada para un perfil turístico completo.",
    lat: null,
    lng: null
  },
  {
    nombre: "Termales de Ataco",
  categoria: "Bañarios",
  descripcion: "Pozas termales naturales en Ataco, parte de la Ruta de las Flores.",
  lat: 13.86552,
  lng: -89.84812,
  mapa: "https://www.google.com/maps/place/Termales+de+Ataco"
  },
  {
    nombre: "Termales de El Salitre",
  categoria: "Bañarios",
  descripcion: "Centro turístico con piscinas de aguas termales en Ahuachapán.",
  lat: 13.93080,
  lng: -89.80856,
  mapa: "https://www.google.com/maps/place/El+Salitre"
  },
  {
    nombre: "El Molino",
    categoria: "Bañarios",
    descripcion: "Balneario El Molino: podría referirse a un sitio con molino antiguo y zona de agua, pero no hay datos claros para perfil turístico moderno.",  
    lat: null,
    lng: null
  },
  {
    nombre: "San Isidro",
    categoria: "Bañarios",
    descripcion: "Balneario San Isidro: nombre común en El Salvador, pero no hay suficiente información específica para saber qué balneario es exactamente.",  
    lat: null,
    lng: null
  },
  {
    nombre: "El Jiote",
    categoria: "Bañarios",
    descripcion: "Balneario El Jiote: podría ser un balneario rural o natural, pero no encontré documentación sólida para un perfil turístico completo.",  
    lat: null,
    lng: null
  },
  {
    nombre: "El Chorrerón",
    categoria: "Bañarios",
    descripcion: "Balneario El Chorrerón: nombre usado en algunas zonas para pozas o corrientes de agua, pero sin fuentes claras que lo definan como un balneario turístico relevante.",  
    lat: null,
    lng: null
  },
  {
    nombre: "El Espino (balnearios privados)",
  categoria: "Bañarios",
  descripcion: "Zona privada con piscinas tranquilas y áreas recreativas.",
  lat: 13.68234,
  lng: -89.26571,
  mapa: "https://www.google.com/maps/place/El+Espino"
  },
  {
    nombre: "Los Llanitos",
    categoria: "Bañarios",
    descripcion: "Balneario Los Llanitos: no encontré fuentes turísticas confiables modernas para describirlo en detalle, podría ser un lugar más local o rural de recreación acuática.",  
    lat: null,
    lng: null
  },





  // Centros comerciales
 // Centros comerciales

  { nombre: "La Gran Vía", categoria: "Centros Comerciales",
    descripcion: "Centro comercial al aire libre con restaurantes, tiendas de marca y entretenimiento nocturno.",
    lat: 13.69166,
    lng: -89.25641,
    mapa: "https://www.google.com/maps/place/La+Gran+Vía"
  },

  { nombre: "Metrocentro San Salvador", categoria: "Centros Comerciales",
    descripcion: "Uno de los centros comerciales más grandes del país, con más de 400 tiendas y servicios.",
    lat: 13.70107,
    lng: -89.21809,
    mapa: "https://www.google.com/maps/place/Metrocentro+San+Salvador"
  },

  { nombre: "Multiplaza", categoria: "Centros Comerciales",
    descripcion: "Centro comercial moderno con tiendas de lujo, restaurantes y cine.",
    lat: 13.70772,
    lng: -89.23101,
    mapa: "https://www.google.com/maps/place/Multiplaza+El+Salvador"
  },

  { nombre: "Plaza Mundo", categoria: "Centros Comerciales",
    descripcion: "Complejo comercial en Soyapango con tiendas, restaurantes y eventos.",
    lat: 13.71024,
    lng: -89.15176,
    mapa: "https://www.google.com/maps/place/Plaza+Mundo"
  },

  { nombre: "Metrocentro San Miguel", categoria: "Centros Comerciales",
    descripcion: "Centro comercial principal de San Miguel con tiendas, bancos y supermercados.",
    lat: 13.48346,
    lng: -88.17821,
    mapa: "https://www.google.com/maps/place/Metrocentro+San+Miguel"
  },

  { nombre: "Plaza Futura", categoria: "Centros Comerciales",
    descripcion: "Plaza moderna ubicada en la Torre Futura, con restaurantes exclusivos y mirador.",
    lat: 13.70849,
    lng: -89.24244,
    mapa: "https://www.google.com/maps/place/Plaza+Futura"
  },

  { nombre: "Paseo El Carmen", categoria: "Centros Comerciales",
    descripcion: "Zona turística y comercial en Santa Tecla con bares, cafés y tiendas.",
    lat: 13.67504,
    lng: -89.28476,
    mapa: "https://www.google.com/maps/place/Paseo+El+Carmen"
  },

  { nombre: "Plaza Merliot", categoria: "Centros Comerciales",
    descripcion: "Centro comercial con tiendas, servicios y supermercados en Santa Tecla.",
    lat: 13.67653,
    lng: -89.27947,
    mapa: "https://www.google.com/maps/place/Plaza+Merliot"
  },

  { nombre: "Las Cascadas", categoria: "Centros Comerciales",
    descripcion: "Centro comercial al aire libre con tiendas variadas y restaurantes.",
    lat: 13.70087,
    lng: -89.23874,
    mapa: "https://www.google.com/maps/place/Las+Cascadas"
  },

  { nombre: "Galerías", categoria: "Centros Comerciales",
    descripcion: "Centro comercial famoso por su arquitectura y variedad de tiendas.",
    lat: 13.69847,
    lng: -89.23333,
    mapa: "https://www.google.com/maps/place/Galerías+El+Salvador"
  },

  { nombre: "Plaza Soho", categoria: "Centros Comerciales",
    descripcion: "Plaza con ambiente moderno, cafés y tiendas en La Libertad.",
    lat: 13.67824,
    lng: -89.25215,
    mapa: "https://www.google.com/maps/place/Plaza+Soho"
  },

  { nombre: "Plaza Centro", categoria: "Centros Comerciales",
    descripcion: "Centro comercial de servicios y tiendas esenciales en San Salvador.",
    lat: 13.70132,
    lng: -89.21392,
    mapa: "https://www.google.com/maps/place/Plaza+Centro"
  },

  { nombre: "Unicentro Soyapango", categoria: "Centros Comerciales",
    descripcion: "Centro comercial con tiendas, bancos y restaurantes en Soyapango.",
    lat: 13.71519,
    lng: -89.14076,
    mapa: "https://www.google.com/maps/place/Unicentro+Soyapango"
  },

  { nombre: "Uniplaza", categoria: "Centros Comerciales",
    descripcion: "Centro comercial con tiendas locales y servicios en San Salvador.",
    lat: 13.69242,
    lng: -89.21870,
    mapa: "https://www.google.com/maps/place/Uniplaza"
  },

  { nombre: "Metrocentro Santa Ana", categoria: "Centros Comerciales",
    descripcion: "Centro comercial principal de Santa Ana con tiendas, cine y restaurantes.",
    lat: 13.99408,
    lng: -89.55956,
    mapa: "https://www.google.com/maps/place/Metrocentro+Santa+Ana"
  },

  { nombre: "Metrocentro Sonsonate", categoria: "Centros Comerciales",
    descripcion: "Centro comercial más grande de Sonsonate con tiendas y servicios varios.",
    lat: 13.71533,
    lng: -89.72461,
    mapa: "https://www.google.com/maps/place/Metrocentro+Sonsonate"
  },

  { nombre: "Mall San Gabriel", categoria: "Centros Comerciales",
    descripcion: "Centro comercial moderno en Apopa con tiendas, restaurantes y servicios.",
    lat: 13.79445,
    lng: -89.22521,
    mapa: "https://www.google.com/maps/place/Mall+San+Gabriel"
  },

  { nombre: "El Encuentro San Marcos", categoria: "Centros Comerciales",
    descripcion: "Centro comercial de conveniencia con supermercado y servicios.",
    lat: 13.64252,
    lng: -89.18349,
    mapa: "https://www.google.com/maps/place/El+Encuentro+San+Marcos"
  },

  { nombre: "El Encuentro Lourdes", categoria: "Centros Comerciales",
    descripcion: "Centro comercial familiar en Lourdes, con supermercados y restaurantes.",
    lat: 13.73610,
    lng: -89.38148,
    mapa: "https://www.google.com/maps/place/El+Encuentro+Lourdes"
  },

  { nombre: "Plaza Kristal", categoria: "Centros Comerciales",
    descripcion: "Plaza comercial con tiendas locales y ambiente juvenil en San Salvador.",
    lat: 13.70535,
    lng: -89.20780,
    mapa: "https://www.google.com/maps/place/Plaza+Kristal"
  },

  { nombre: "Plaza Mango", categoria: "Centros Comerciales",
    descripcion: "Pequeño centro comercial con restaurantes y tiendas esenciales.",
    lat: 13.69410,
    lng: -89.22596,
    mapa: "https://www.google.com/maps/place/Plaza+Mango"
  }



];


  verDetalles(lugar: any) {
    this.router.navigate(['/lugar-detalle'], {
      state: { lugar }
    });
  }

  filtrarPorCategoria(categoria: string) {
  // 🔥 COMBINAR: Destinos de Supabase + Lugares locales
  const todosLosLugares = [...this.destinos, ...this.lugaresFiltrados];
  
  this.resultados = todosLosLugares.filter(
    lugar => lugar.categoria?.toLowerCase() === categoria.toLowerCase()
  );
}


  onSearchChange() {
  const query = this.searchQuery.toLowerCase().trim();

  if (!query) {
    this.resultados = [];
    return;
  }

  const todosLosLugares = [...this.destinos, ...this.lugaresFiltrados];

  this.resultados = todosLosLugares.filter(lugar => {
    // 🔥 BUSCAR en titulo O nombre
    const nombreCoincide = (lugar.titulo || lugar.nombre)?.toLowerCase().includes(query);
    const categoriaCoincide = lugar.categoria?.toLowerCase().includes(query);
    const descripcionCoincide = lugar.descripcion?.toLowerCase().includes(query);
    
    return nombreCoincide || categoriaCoincide || descripcionCoincide;
  });

  this.guardarBusquedaReciente(this.searchQuery);
}

guardarBusquedaReciente(texto: string) {
  texto = texto.trim();

  if (!texto) return;

  // Evitar duplicados
  if (!this.busquedasRecientes.includes(texto)) {
    this.busquedasRecientes.unshift(texto);  // Agregar al inicio
  }

  // Limitar a 10 registros
  if (this.busquedasRecientes.length > 10) {
    this.busquedasRecientes.pop();
  }
}

eliminarBusqueda(buscado: string) {
  this.busquedasRecientes = this.busquedasRecientes.filter(b => b !== buscado);

  }

  buscar() {
    if (!this.searchQuery || this.searchQuery.trim() === '') {
      console.log("No escribió nada");
      return;
    }

    console.log("Buscando:", this.searchQuery);

    this.resultados = [
      `Resultado para "${this.searchQuery}" 1`,
      `Resultado para "${this.searchQuery}" 2`,
      `Resultado para "${this.searchQuery}" 3`,
    ];
  }

  ngOnInit() {
    this.cargarDestinos();

    this.supabase.destinosActualizados.subscribe((actualizar) => {
      if (actualizar) {
        this.cargarDestinos();
      }
    });
  }

  async cargarDestinos() {
    this.destinos = await this.supabase.getDestinos();
  }
}
