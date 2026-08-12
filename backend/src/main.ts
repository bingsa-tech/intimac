import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // CORS configuration
  app.enableCors({
    origin: '*', // Autoriser toutes les origines (à ajuster selon vos besoins)
    credentials: true,
  });

  // Configuration globale des Pipes (déjà présent normalement)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // --- CONFIGURATION SWAGGER ---
  const config = new DocumentBuilder()
    .setTitle('API Plateforme Académique')
    .setDescription('Documentation de l’API pour la gestion des universités, facultés, pays et authentification')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Entrez votre token JWT',
        in: 'header',
      },
      'access-token', // Nom de la référence de sécurité
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // L'interface sera accessible sur /api
  // -----------------------------

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();