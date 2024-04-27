export class Mail {
  id?: number;
  uid?: number;
  from?: string;
  from_name?: string;
  subject?: string;
  is_read?: boolean | number;
  sent_date?: string;
  has_attachment?: boolean;
  reply_to?: string;
  to: string[];
  cc: string[];
  bcc: string[];
  body?: string;
}