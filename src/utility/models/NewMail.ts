import { Mail } from "./Mail";

export class NewMail extends Mail {

  constructor(from: string, to: string[], subject: string, body: string) {
    super();
    this.from = from;
    this.to = to;
    this.subject = subject;
    this.body = body;
  }


}