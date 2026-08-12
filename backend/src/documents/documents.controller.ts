import { 
  Controller, Post, Get, UseGuards, Request, 
  UseInterceptors, UploadedFile, Body, BadRequestException 
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { DocumentsService } from './documents.service';
import { DocumentType } from '@prisma/client';

@Controller('documents')
@UseGuards(AuthGuard('jwt'))
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/documents',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(pdf|png|jpg|jpeg)$/)) {
          return callback(new BadRequestException('Seuls les fichiers PDF et images (PNG/JPG) sont autorisés'), false);
        }
        callback(null, true);
      },
    }),
  )
  async uploadFile(
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
    @Body('type') type: DocumentType,
  ) {
    if (!file) {
      throw new BadRequestException('Aucun fichier n’a été fourni');
    }

    return this.documentsService.create({
      originalName: file.originalname,
      filename: file.filename,
      filePath: file.path,
      type: type || DocumentType.OTHER,
      userId: req.user.id,
    });
  }

  @Get('my-documents')
  async getMyDocuments(@Request() req) {
    return this.documentsService.findByUser(req.user.id);
  }
}