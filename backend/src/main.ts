import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // CORS configuration
  app.enableCors({
    origin: [
      'http://localhost:5173', // Frontend local
      'https://intimmacapro-frontend.onrender.com', // Frontend production
    ], // Autoriser toutes les origines (à ajuster selon vos besoins)
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
    .setTitle('API Plateforme Echanges Competences')
    .setDescription('EndPoints Intermediaire immigration académique et Professionnelles')
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
      'access-token', 
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // L'interface sera accessible sur /api
  // -----------------------------

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();