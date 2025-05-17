import { ValidateBoletaDTO } from '../../application/validate.use-case';

export interface BoletaRepository {
  save(data: ValidateBoletaDTO): Promise<void>;
}