export type CommunicationType = "email" | "phone" | "sms";
export type CommunicationStatus = "read" | "sent" | "pending";
export interface Communication {
  id: string;
  type: CommunicationType;
  customer: string;
  subject?: string;
  status: CommunicationStatus;
  date: string;
  data: string;
  userName?: string;
  userEmail?: string;
}
