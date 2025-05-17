import { BoletaRepository } from "../domain/repository/boleta.repository";
import { SunatClient } from "../infrastructure/repository/verify-sunat.repository";

export interface ValidateBoletaDTO {
  dni: string;
  ruc: string;
  numero: string;
  fecha: string;
  monto: number;
}

export class ValidateBoletaUseCase {
  constructor(private readonly repository: BoletaRepository, private readonly sunatClient: SunatClient) {}

  async execute(input: ValidateBoletaDTO): Promise<boolean> {
    const isValid = await this.sunatClient.verifyBoleta(input);
    if (isValid) {
      await this.repository.save(input);
    }
    return isValid;
  }
}