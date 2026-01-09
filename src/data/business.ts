/**
 * Business Information
 *
 * Este arquivo contém todas as informações sobre o estabelecimento.
 * Edite este arquivo para atualizar informações do negócio.
 *
 * Não confundir com variáveis de ambiente (.env) que são para
 * configurações técnicas (URLs, API keys, etc.)
 */

export const businessInfo = {
  // Informações da Profissional
  professional: {
    name: "Dra. Ellen Teixeira",
    title: "Especialista em Prótese e Implantodontia",
    cro: "XXXXX", // TODO: Adicionar número real do CRO-RJ
    experienceYears: 12,
    bio: "Com um compromisso inabalável com a excelência e o cuidado ao paciente, sou uma profissional dedicada e apaixonada pela Odontologia, trazendo mais de 12 anos de experiência na transformação de sorrisos e vidas. Meu foco é oferecer tratamentos de alta qualidade com atenção humanizada.",
  },

  // Formação e Qualificações
  qualifications: [
    {
      title: "Especialista em Prótese",
      type: "specialization",
    },
    {
      title: "Especialista em Implantodontia",
      type: "specialization",
    },
    {
      title: "Pós graduação em Cirurgia oral menor",
      type: "postgraduate",
    },
    {
      title: "Pós graduação em Plástica Periodontal",
      type: "postgraduate",
    },
    {
      title: "Mestrando pela UFRJ",
      type: "master",
    },
  ],

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
      number: "5521981035557",
      display: "(21) 98103-5557",
      whatsappMessage: "Olá! Gostaria de marcar uma avaliação",
    },
    email: "draellenteixeira@email.com", // TODO: Atualizar com email real
    social: {
      instagram: {
        url: "https://www.instagram.com/draellenteixeira/",
        handle: "@draellenteixeira",
      },
      // facebook: {
      //   url: "https://www.facebook.com/draellenteixeira",
      //   handle: "draellenteixeira"
      // }
    },
  },

  // Endereço
  address: {
    street: "R. Sete de Setembro, 98",
    complement: "Sala 609",
    neighborhood: "Centro",
    city: "Rio de Janeiro",
    state: "RJ",
    stateCode: "RJ",
    zipCode: "20050-006",
    country: "Brasil",
    countryCode: "BR",
    // Coordenadas para Google Maps
    coordinates: {
      latitude: -22.906847879238773,
      longitude: -43.17845892461447,
    },
    // String formatada
    formatted: {
      line1: "R. Sete de Setembro, 98 - Sala 609",
      line2: "Centro, Rio de Janeiro - RJ",
      full: "R. Sete de Setembro, 98 - Sala 609, Centro, Rio de Janeiro - RJ, 20050-006",
    },
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
    // Formato para Schema.org
    openingHours: [
      {
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
  },

  // Avaliações dos Pacientes
  reviews: [
    {
      id: 1,
      author: "Paciente 1",
      rating: 5,
      comment: "", // TODO: Adicionar comentários reais
      date: "2024-01-15",
    },
    {
      id: 2,
      author: "Paciente 2",
      rating: 5,
      comment: "",
      date: "2024-01-10",
    },
    {
      id: 3,
      author: "Paciente 3",
      rating: 4,
      comment: "",
      date: "2024-01-05",
    },
  ],

  // Estatísticas
  stats: {
    averageRating: 5,
    totalReviews: 50,
    patientsServed: "500+",
  },
} as const;
