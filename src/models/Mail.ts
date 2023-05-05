export class Mail {
  id: number;
  uid: number;
  from?: string;
  fromName?: string;
  to?: string;
  subject?: string;
  body?: string;
  sentDate?: Date;
  read?: boolean;
  cc?: string[];
  bcc?:string[];
  inReplyTo?: string;
  references?: string[];

}
