import type { PaymentEntity } from "@/commons/domain/entities/PaymentEntity";

export class PaymentModel {
  public _id: string;
  public order_id: string;
  public user_id: string;
  public amount: number;
  public payment_method: string;
  public transaction_id: string;
  public payment_status: "pending" | "processing" | "completed" | "failed";
  public payment_date?: number;
  public notes?: string;
  public created_at: number;
  public updated_at: number;

  constructor(
    _id: string,
    order_id: string,
    user_id: string,
    amount: number,
    payment_method: string,
    transaction_id: string,
    payment_status: "pending" | "processing" | "completed" | "failed",
    payment_date: number | undefined,
    notes: string | undefined,
    created_at: number,
    updated_at: number
  ) {
    this._id = _id;
    this.order_id = order_id;
    this.user_id = user_id;
    this.amount = amount;
    this.payment_method = payment_method;
    this.transaction_id = transaction_id;
    this.payment_status = payment_status;
    this.payment_date = payment_date;
    this.notes = notes;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static fromJson(json: Record<string, unknown>): PaymentModel {
    return new PaymentModel(
      json.ID as string,
      json.OrderID as string,
      json.UserID as string,
      Number(json.Amount),
      json.PaymentMethod as string,
      json.TransactionID as string,
      json.PaymentStatus as "pending" | "processing" | "completed" | "failed",
      json.PaymentDate ? Number(json.PaymentDate) : undefined,
      json.Notes as string,
      Number(json.CreatedAt),
      Number(json.UpdatedAt)
    );
  }

  toJson(): Record<string, unknown> {
    return {
      _id: this._id,
      order_id: this.order_id,
      user_id: this.user_id,
      amount: this.amount,
      payment_method: this.payment_method,
      transaction_id: this.transaction_id,
      payment_status: this.payment_status,
      payment_date: this.payment_date,
      notes: this.notes,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }

  toEntity(): PaymentEntity {
    return {
      _id: this._id,
      orderId: this.order_id,
      userId: this.user_id,
      userName: undefined,
      amount: this.amount,
      method: this.payment_method,
      gateway: "Stripe",
      date: this.payment_date ?? this.created_at,
      currency: "USD",
      status: this.payment_status,
      transactionId: this.transaction_id,
      notes: this.notes,
      createdAt: this.created_at,
      updatedAt: this.updated_at,
    };
  }
}
