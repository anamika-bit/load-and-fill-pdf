import { Controller, Get, Post, Body, Res, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response, Request } from 'express';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Get('load')
  async loadPdf(@Res() res: Response) {
    const pdfBuffer = await this.pdfService.loadPdf();
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename=example.pdf',
    });
    res.send(pdfBuffer);
  }

  @Post('fill')
  async savePdf(@Req() req: Request, @Res() res: Response) {
    const data: Buffer[] = [];
    
    req.on('data', (chunk) => {
      data.push(chunk);
    });
    
    req.on('end', async () => {
      const pdfBuffer = Buffer.concat(data);
      await this.pdfService.savePdf(pdfBuffer);
      res.json({ message: 'PDF saved successfully' });
    });
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, 'example.pdf');
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileTyped = file as Express.Multer.File;
    return { message: 'File uploaded successfully' };
  }

}

