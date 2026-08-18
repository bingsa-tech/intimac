import { Controller, Get, Post } from '@nestjs/common';
import { exec } from 'child_process';
import { join } from 'path'; 
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('shutdown')
  shutdown() {
    // On attend 500ms avant d'exécuter l'arrêt pour laisser le temps à HTTP de répondre
    setTimeout(() => {
      exec('bash ./stop.sh');
    }, 500);

    return { status: 'stopping', message: 'Arrêt en cours...' };
  }

  @Post('git-push')
  triggerGitPush() {
    // Résolution du chemin vers push.sh situé à la racine du projet
    const scriptPath = join(__dirname, '..', '..', 'push.sh');

    return new Promise((resolve) => {
      exec(`bash "${scriptPath}"`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Erreur d'exécution du push: ${error.message}`);
          // On renvoie success: false avec le message pour que le frontend gère proprement la réponse HTTP 200
          return resolve({ success: false, message: error.message || stderr });
        }
        console.log(`Push Output: ${stdout}`);
        resolve({ success: true, output: stdout });
      });
    });
  }
}