export class Mail {
  id?: number;
  uid?: number;
  from?: string;
  fromName?: string;
  to?: string[];
  subject?: string;
  body?: string;
  is_read?: boolean;
  sent_date?: Date;
  read?: boolean;
  cc?: string[];
  bcc?: string[];
  has_attachment?: boolean;
  in_reply_to?: string;
  references?: string[];
  references_id?: number;
}