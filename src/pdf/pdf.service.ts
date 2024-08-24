import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { join } from 'path';
import * as pdfLib from 'pdf-lib'; // For handling PDF manipulation

@Injectable()
export class PdfService {
  async loadPdf(): Promise<Buffer> {
    const pdfPath = path.join(__dirname, '../../uploads/example.pdf');
    return fs.promises.readFile(pdfPath);
  }

  async fillPdf(data: { name: string }): Promise<void> {
    const pdfPath = path.join(__dirname, '../../uploads/example.pdf');
    const pdfBytes = await fs.promises.readFile(pdfPath);
    const pdfDoc = await pdfLib.PDFDocument.load(pdfBytes);

    const form = pdfDoc.getForm();
    const nameField = form.getTextField('name');
    nameField.setText(data.name);

    const updatedPdfBytes = await pdfDoc.save();
    await fs.promises.writeFile(pdfPath, updatedPdfBytes);
  }

  private readonly pdfPath = path.join(__dirname, '../../uploads/example.pdf');

  async savePdf(pdfBuffer: Buffer): Promise<void> {
    fs.writeFileSync(this.pdfPath, pdfBuffer);
  }

}

