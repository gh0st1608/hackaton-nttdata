export class Boleta {
  constructor(
    public readonly dni: string,
    public readonly ruc: string,
    public readonly numero: string,
    public readonly fecha: string,
    public readonly monto: number
  ) {}
}