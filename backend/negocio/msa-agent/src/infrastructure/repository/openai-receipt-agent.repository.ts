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

Responde exclusivamente con un JSON válido y estricto.
No añadas ningún texto adicional, ni explicaciones.
Asegúrate de usar comillas dobles en claves y valores para cumplir con el formato JSON.
Ejemplo:
{
  "RUC": "12345678901",
  "Razón social": "Mi Empresa S.A.C.",
  ...
}
`;

    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4.1',
      messages: [
        { role: 'system', content: 'Eres un asistente útil que describe imágenes.' },
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
      max_tokens: 500,
    });
    console.log('completion.choices?.[0]?.message?.content',completion.choices?.[0]?.message?.content)
    const resultText = completion.choices?.[0]?.message?.content || '{}';
    const cleaned = resultText
    .replace(/```json\s*([\s\S]*?)\s*```/i, '$1') // remueve ```json ``` si existe
    .replace(/```([\s\S]*?)```/i, '$1') // remueve ``` ```
    .trim();
    return JSON.parse(cleaned);
  }
}
