import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PdfService } from './pdf/pdf.service';
import { PdfController } from './pdf/pdf.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PdfModule } from './pdf/pdf.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    PdfModule,
  ],
  //controllers: [AppController, PdfController],
  //providers: [AppService, PdfService],
})
export class AppModule {}
