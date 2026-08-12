import { 
  PrismaClient, 
  DegreeLevel, 
  Role, 
  Gender, 
  SubscriptionPlan, 
  SubscriptionStatus 
} from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Démarrage du Seeding pour l’application...');

  // 1. Nettoyage de la base de données (ordre respectant les contraintes de clés étrangères)
  await prisma.matching.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.programLanguage.deleteMany();
  await prisma.program.deleteMany();
  await prisma.university.deleteMany();
  await prisma.city.deleteMany();
  await prisma.province.deleteMany();
  await prisma.country.deleteMany();
  await prisma.user.deleteMany();

  // 2. Mots de Passe Hachés
  const adminPassword = await bcrypt.hash('AdminPass123!', 10);
  const studentPassword = await bcrypt.hash('StudentPass123!', 10);

  // 3. Création de l'Administrateur
  await prisma.user.create({
    data: {
      email: 'admin@test.com',
      password: adminPassword,
      role: Role.ADMIN,
    },
  });
  console.log('👤 Admin créé : admin@test.com / AdminPass123!');

  // 4. Création du Canada avec ses Provinces et Villes
  const canada = await prisma.country.create({
    data: {
      name: 'Canada',
      code: 'CA',
    },
  });

  const quebec = await prisma.province.create({
    data: { name: 'Québec', countryId: canada.id },
  });

  const ontario = await prisma.province.create({
    data: { name: 'Ontario', countryId: canada.id },
  });

  const montreal = await prisma.city.create({
    data: { name: 'Montréal', provinceId: quebec.id },
  });

  const sherbrooke = await prisma.city.create({
    data: { name: 'Sherbrooke', provinceId: quebec.id },
  });

  const toronto = await prisma.city.create({
    data: { name: 'Toronto', provinceId: ontario.id },
  });

  // 5. Création de la France
  const france = await prisma.country.create({
    data: {
      name: 'France',
      code: 'FR',
    },
  });

  const ileDeFrance = await prisma.province.create({
    data: { name: 'Île-de-France', countryId: france.id },
  });

  const paris = await prisma.city.create({
    data: { name: 'Paris', provinceId: ileDeFrance.id },
  });

  // 6. Création des Universités
  const udem = await prisma.university.create({
    data: {
      name: 'Université de Montréal',
      countryId: canada.id,
      provinceId: quebec.id,
      cityId: montreal.id,
    },
  });

  const uofs = await prisma.university.create({
    data: {
      name: 'Université de Sherbrooke',
      countryId: canada.id,
      provinceId: quebec.id,
      cityId: sherbrooke.id,
    },
  });

  const utoronto = await prisma.university.create({
    data: {
      name: 'University of Toronto',
      countryId: canada.id,
      provinceId: ontario.id,
      cityId: toronto.id,
    },
  });

  const sorbonne = await prisma.university.create({
    data: {
      name: 'Sorbonne Université',
      countryId: france.id,
      provinceId: ileDeFrance.id,
      cityId: paris.id,
    },
  });

  // 7. Création des Programmes
  const programs = [
    {
      title: 'Bacalauréat en Génie Logiciel',
      degree: DegreeLevel.BACHELOR,
      duration: 4,
      tuition: 4500,
      minimumGpa: 3.0,
      description: 'Formation complète en développement logiciel et architecture.',
      universityId: uofs.id,
      languages: ['Français'],
    },
    {
      title: 'Maîtrise en Intelligence Artificielle',
      degree: DegreeLevel.MASTER,
      duration: 2,
      tuition: 12000,
      minimumGpa: 3.5,
      description: 'Spécialisation avancée en Deep Learning et Computer Vision.',
      universityId: udem.id,
      languages: ['Français', 'Anglais'],
    },
    {
      title: 'Bachelor of Computer Science',
      degree: DegreeLevel.BACHELOR,
      duration: 3,
      tuition: 28000,
      minimumGpa: 3.8,
      description: 'Comprehensive computer science and algorithms program.',
      universityId: utoronto.id,
      languages: ['Anglais'],
    },
    {
      title: 'Master en Science des Données',
      degree: DegreeLevel.MASTER,
      duration: 2,
      tuition: 800,
      minimumGpa: 3.2,
      description: 'Formation en analyse de données et statistiques appliquées.',
      universityId: sorbonne.id,
      languages: ['Français'],
    },
  ];

  for (const prog of programs) {
    const { languages, ...progData } = prog;
    await prisma.program.create({
      data: {
        ...progData,
        languages: {
          create: languages.map((lang) => ({ language: lang })),
        },
      },
    });
  }

  // 8. Création de l'Étudiant avec son Profil complet et son Abonnement
  const student = await prisma.user.create({
    data: {
      email: 'student@test.com',
      password: studentPassword,
      role: Role.STUDENT,
      profile: {
        create: {
          firstName: 'Jean',
          lastName: 'Dupont',
          birthDate: new Date('2000-05-15'),
          gender: Gender.MALE, // Utilisation de l'enum Gender (ex: MALE / FEMALE / OTHER)
          nationality: 'Canadienne',
          phone: '+18191234567',
          address: '123 Rue de l’Université',
          city: 'Sherbrooke',
          country: 'Canada',
          highestEducation: 'Baccalauréat',
          experience: 2,
          gpa: 3.6,
          budget: 15000,
          englishLevel: 'Avancé',
          frenchLevel: 'Maternelle',
        },
      },
      subscription: {
        create: {
          plan: SubscriptionPlan.PREMIUM, // Utilisation de l'enum SubscriptionPlan (ex: Basic / Premium / Pro)
          status: SubscriptionStatus.ACTIVE,
          startDate: new Date(),
          endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
        },
      },
    },
  });

  console.log(`🎓 Étudiant créé avec profil complet : ${student.email} / StudentPass123!`);
  console.log('✅ Base de données initialisée avec succès !');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });