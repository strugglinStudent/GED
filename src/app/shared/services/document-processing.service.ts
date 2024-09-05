import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry } from 'rxjs';
import { map } from 'rxjs/operators';
declare var cv: any; // Declare cv as a global variable for OpenCV.js
// eslint-disable-next-line @typescript-eslint/no-redeclare
import { Document, Content, Item } from '../models/document';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root',
})
export class DocumentProcessingService {
  private ocrUrl = 'https://api.ocr.space/parse/image';
  private ocrApiKey = 'K88517906888957';
  private ocrApi2Url = 'https://api.mindee.net/v1/products/mindee/invoices/v4/predict'; // replace with correct endpoint
  private groqUrl = 'https://api.groq.com/openai/v1/chat/completions';
  constructor(
    private http: HttpClient,
    private snackBar: SnackBarService,
  ) {}
  // Function to compress image using OpenCV.js
  compressImage(imageFile: File): Observable<File> {
    return new Observable((observer) => {
      if (imageFile.size < 1024 * 1024) {
        observer.next(imageFile);
        observer.complete();
        return;
      }
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, img.width, img.height);

          // Convert canvas to OpenCV Mat format
          const mat = cv.imread(canvas);

          // Perform quantization or any other compression using OpenCV functions
          // Example: Here we convert to grayscale and resize
          cv.cvtColor(mat, mat, cv.COLOR_RGB2GRAY); // Convert to grayscale
          cv.resize(mat, mat, new cv.Size(0, 0), 0.5, 0.5); // Resize to half dimensions

          // Convert OpenCV Mat back to canvas
          cv.imshow(canvas, mat);
          const compressedImage = canvas.toDataURL('image/jpeg');

          // Convert data URL to Blob
          const byteString = atob(compressedImage.split(',')[1]);
          const mimeString = compressedImage.split(',')[0].split(':')[1].split(';')[0];
          const ab = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(ab);
          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          const compressedBlob = new Blob([ab], { type: mimeString });

          // Convert Blob to File
          const compressedFile = new File([compressedBlob], imageFile.name, { type: mimeString });

          observer.next(compressedFile);
          observer.complete();
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(imageFile);
    });
  }
  /*
  performOcr(file: File): Observable<any> {
    console.log('start ocr');
    const language: string = 'fre',
      ocrEngine: number = 1,
      isTable: boolean = true,
      detectOrientation: boolean = true;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('language', language);
    formData.append('OCREngine', ocrEngine.toString());
    formData.append('isTable', isTable.toString());
    formData.append('detectOrientation', detectOrientation.toString());

    const headers = new HttpHeaders({
      apikey: this.ocrApiKey,
    });

    return this.http.post(this.ocrUrl, formData, { headers });
  }
*/
  performOcr(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('document', file, file.name);

    return this.http.post(this.ocrApi2Url, formData);
  }
  processOcrResults(results: string): Observable<Content> {
    console.log(results);
    const requestBody = {
      messages: [
        {
          role: 'user',
          content: `Convert the following OCR text to structured JSON following this schema: ${JSON.stringify(
            {
              type: 'object',
              properties: {
                title: { type: 'string' },
                date: { type: 'string', format: 'date-time' },
                orderNumber: { type: 'string' },
                storeName: { type: 'string' },
                address: { type: 'string' },
                tax_identification_number: { type: 'string' },
                billed_to: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    address: { type: 'string' },
                  },
                },
                delivery: {
                  type: 'object',
                  properties: {
                    company: { type: 'string' },
                    method: { type: 'string' },
                    delivery_fee: { type: 'number' },
                    currency: { type: 'string' },
                  },
                },
                client_type: { type: 'string' },
                sale_type: { type: 'string' },
                items: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      description: { type: 'string' },
                      quantity: { type: 'number' },
                      unit_price_ht: { type: 'number' },
                      unit_price_ttc: { type: 'number' },
                      total_discount: { type: 'number' },
                      item_variation: { type: 'string' },
                      currency: { type: 'string' },
                    },
                  },
                },
                subtotal_ht: {
                  type: 'object',
                  properties: {
                    amount: { type: 'number' },
                    currency: { type: 'string' },
                  },
                },
                tax: {
                  type: 'object',
                  properties: {
                    rate: { type: 'number' },
                    amount: { type: 'number' },
                    currency: { type: 'string' },
                  },
                },
                total_ttc: {
                  type: 'object',
                  properties: {
                    amount: { type: 'number' },
                    payment_method: { type: 'string' },
                    currency: { type: 'string' },
                  },
                },
                siret: { type: 'string' },
                naf: { type: 'string' },
                tva: { type: 'string' },
              },
              required: ['title'],
            },
          )}:\n\nthe data: ${results}`,
        },
      ],
      model: 'llama3-8b-8192',
      temperature: 1,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
      response_format: {
        type: 'json_object',
      },
      stop: null,
    };
    return this.http.post(this.groqUrl, requestBody).pipe(
      retry(3),
      map((res: any) => {
        const response = JSON.parse(res.choices[0].message.content);
        console.log(response.date);
        if (response && typeof response === 'object') {
          return {
            title: response?.title || '',
            date: response?.date ? new Date(response?.date) : undefined,
            orderNumber: response?.orderNumero || '',
            storeName: response?.storeName || '',
            address: response?.address || '',
            tax_identification_number: response?.tax_identification_number || '',
            billed_to: {
              name: response?.billed_to?.name || '',
              address: response?.billed_to?.address || '',
            },
            delivery_info: {
              company: response?.delivery_info?.company || '',
              method: response?.delivery_info?.method || '',
              delivery_fee: response?.delivery_fee || 0,
              delivery_fee_currency: response?.delivery_fee_currency || '',
            },
            client_type: response?.client_type || '',
            sale_type: response?.sale_type || '',
            items:
              response?.items?.map((item: Item) => ({
                description: item.description || '',
                quantity: item.quantity || 0,
                unit_price_ht: item.unit_price_ht || 0,
                unit_price_ttc: item.unit_price_ttc || 0,
                total_discount: item.total_discount || 0,
                item_variation: item.item_variation || '',
                currency: item.currency || '',
              })) || [],
            subtotal_ht: response?.subtotal_ht || 0,
            tax: {
              rate: response?.tax?.rate || 0,
              amount: response?.tax?.amount || 0,
            },
            total_ttc: {
              amount: response?.total_ttc?.amount || 0,
              payment_method: response?.total_ttc?.payment_method || '',
              currency: response.currency || '',
            },
            siret: response?.siret || '',
            naf: response?.naf || '',
            tva: response?.tva || '',
          };
        }
      }),
    );
  }
}
