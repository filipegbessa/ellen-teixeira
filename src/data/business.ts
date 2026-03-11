/**
 * Business Information
 *
 * Este arquivo contém todas as informações sobre o estabelecimento.
 * Edite este arquivo para atualizar informações do negócio.
 *
 * Não confundir com variáveis de ambiente (.env) que são para
 * configurações técnicas (URLs, API keys, etc.)
 */

const qualifications = [
  {
    title: "Mestrado em Odontologia",
    place: "Universidade Federal Fluminense (UFF)",
    periodStart: 2018,
    periodEnd: 2020,
    type: "mestrado",
  },
  {
    title: "Especialização em Ortodontia",
    place: "Pontifícia Universidade Católica do Rio de Janeiro, PUC-Rio",
    periodStart: 2014,
    periodEnd: 2016,
    type: "especialização",
  },
  {
    title: "Aperfeiçoamento em Ortopedia facial",
    place: "Oficina de ortodontia Dra Liana Lima pinheiro",
    periodStart: 2017,
    periodEnd: 2017,
    type: "curso",
  },
  {
    title: "Aperfeiçoamento em Curso de atualização em Endodontia",
    place: "Centro Odontológico Integrado de Nova Friburgo",
    periodStart: 2013,
    periodEnd: 2013,
    type: "curso",
  },
  {
    title: "Graduação em Odontologia",
    place: "Universidade Federal Fluminense (UFF)",
    periodStart: 2009,
    periodEnd: 2013,
    type: "Graduação",
    isMain: true,
  },
];

// Calcula anos de experiência a partir do ano de conclusão da graduação (isMain)
const graduationYear =
  qualifications.find((q) => "isMain" in q)?.periodEnd ?? new Date().getFullYear();
const experienceYears = new Date().getFullYear() - graduationYear;

export const businessInfo = {
  // Informações da Profissional
  professional: {
    name: "Dra. Ellen Teixeira",
    title: "Especialista em Prótese e Implantodontia",
    cro: "41617",
    experienceYears,
    bio: "Com um compromisso inabalável com a excelência e o cuidado ao paciente, sou uma profissional dedicada e apaixonada pela Odontologia, trazendo mais de 12 anos de experiência na transformação de sorrisos e vidas. Meu foco é oferecer tratamentos de alta qualidade com atenção humanizada.",
  },

  // Formação e Qualificações
  qualifications,

  // Especialidades Oferecidas
  specialties: [
    "Implantodontia",
    "Prótese Dentária",
    "Ortodontia",
    "Estética Dental",
    "Clareamento Dental",
    "Harmonização Orofacial",
  ],

  // Informações de Contato
  contact: {
    phone: {
      number: "5521974924374",
      display: "(21) 97492-4374",
      whatsappMessage: "Olá! Gostaria de marcar uma avaliação",
    },
    email: "draellenteixeira@email.com", // TODO: Atualizar com email real
    social: {
      instagram: {
        url: "https://www.instagram.com/draellenteixeira/",
        handle: "@draellenteixeira",
      },
    },
  },

  // Endereço
  address: {
    street: "R. México, 41",
    complement: "Sala 607",
    neighborhood: "Cinelândia",
    city: "Rio de Janeiro",
    state: "RJ",
    stateCode: "RJ",
    zipCode: "20031-144",
    country: "Brasil",
    countryCode: "BR",
    coordinates: {
      latitude: -22.9112649,
      longitude: -43.1744826,
    },
    formatted: {
      line1: "R. México, 41 - Sala 607",
      line2: "Cinelândia, Rio de Janeiro - RJ",
      full: "R. México, 41 - Sala 607, Cinelândia, Rio de Janeiro - RJ",
    },
    mapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.057093470328!2d-43.1744826!3d-22.9112649!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x99817750194bc7%3A0x9e56d6a4dbc458f8!2sDra.%20Ellen%20Teixeira!5e0!3m2!1spt-BR!2sbr!4v1773250900328!5m2!1spt-BR!2sbr",
  },

  // Horário de Funcionamento
  businessHours: {
    weekdays: {
      days: "De Segunda a Sexta",
      opens: "09:00",
      closes: "18:00",
      display: "Das 09:00 às 18:00",
    },
    weekend: {
      days: "Sábado e Domingo",
      status: "Fechado",
    },
    openingHours: [
      {
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
  },

  // Estatísticas
  stats: {
    averageRating: 5,
    totalReviews: 50,
    patientsServed: "500+",
  },
} as const;
