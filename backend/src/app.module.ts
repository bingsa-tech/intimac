import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static'; 
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ProfileModule } from './profile/profile.module';
import { MatchingsModule } from './matchings/matchings.module';
import { UniversiteModule } from './universite/universite.module';
import { ProgramsModule } from './programs/programs.module';
import { SubscriptionsModule } from './subscription/subscription.module';
import { ApplicationsModule } from './applications/applications.module';
import { DocumentsModule } from './documents/documents.module';
import { CountriesModule } from './countries/countries.module';
import { NotificationsModule } from './notifications/notifications.module';
import { MessagesModule } from './messages/messages.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AdminModule } from './admin/admin.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { PrismaService } from './prisma/prisma.service';
import { ProvinceModule } from './province/province.module';
import { CityModule } from './city/city.module';
import { ImmigrationModule } from './immigration/immigration.module'; 
import { AppointmentsModule } from './appointments/appointments.module';
import { ScholarshipModule } from './scholarship/scholarship.module';
import { NewsModule } from './news/news.module';
import {ContactModule} from './contact/contact.module'
import { AssessmentModule } from './assessment/assessment.module';
@Module({
  imports: [
    AuthModule, 
    PrismaModule, 
    UsersModule, 
    ProfileModule, 
    UniversiteModule, 
    ProgramsModule, 
    ImmigrationModule, 
    SubscriptionsModule, 
    ApplicationsModule, 
    DocumentsModule, 
    CountriesModule, 
    NotificationsModule, 
    MessagesModule, 
    DashboardModule, 
    AdminModule, 
    AnalyticsModule, 
    MatchingsModule, 
    ProvinceModule, 
    AppointmentsModule,
    CityModule, 
    ScholarshipModule,
    NewsModule,
    ContactModule,
    AssessmentModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}