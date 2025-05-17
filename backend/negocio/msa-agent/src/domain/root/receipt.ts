export class Receipt {
  ruc: string;
  razonSocial: string;
  fechaEmision: string;
  total: number;
  tipoComprobante: string;
  numero: string;
  moneda: string;

  constructor(partial: Partial<Receipt>) {
    Object.assign(this, partial);
  }
}
