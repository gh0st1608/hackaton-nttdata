import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';

@Injectable()
export class OpenAiReceiptAgent {
  private readonly openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async transformImageToJson(base64Image: string): Promise<any> {
    const prompt = `
Extrae los siguientes datos de la boleta que te adjunto como imagen en base64:

- RUC
- Razón social
- Fecha de emisión
- Monto total
- Tipo de comprobante
- Número de boleta
- Moneda

Responde con un JSON estricto.
`;

    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4-vision-preview',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/png;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      max_tokens: 1000,
    });

    const resultText = completion.choices?.[0]?.message?.content || '{}';
    return JSON.parse(resultText);
  }
}
