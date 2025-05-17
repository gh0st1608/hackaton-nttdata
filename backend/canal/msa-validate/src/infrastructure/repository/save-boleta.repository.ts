import { BoletaRepository } from '../../domain/repository/boleta.repository';
import { ValidateBoletaDTO } from '../../application/validate.use-case';
import { Firestore } from '@google-cloud/firestore';

export class FirestoreBoletaRepository implements BoletaRepository {
  private readonly db = new Firestore();
  private readonly collection = this.db.collection('boletas');

  async save(data: ValidateBoletaDTO): Promise<void> {
    await this.collection.add(data);
  }
}