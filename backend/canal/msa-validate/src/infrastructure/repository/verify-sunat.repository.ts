import { ValidateBoletaDTO } from '../../application/validate.use-case';

export class SunatClient {
  async verifyBoleta(data: ValidateBoletaDTO): Promise<boolean> {
    // Simulación de verificación con SUNAT
    return data.numero.startsWith('B');
  }
}