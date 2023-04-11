import axios from "axios";
import { User } from "../models/User";
import process from 'process';
import { Mail } from "../models/Mail";

export class MailAPI {

    private baseUrl = "http://localhost";
    private user: User; 
    private emails: Mail;

    constructor() {
    }

  static  fetchEmails = async (email: string, password: string) => {
        const data = { email: 'emailexample', password: 'password' }; // ovo menjam za hook usestate

        axios.post('http://localhost/emails', data)
            .then(response => {
           
            })
            .catch(error => {
                console.error(error);
            });    
    }

   static login(email: string, password: string) {
       return this.fetchEmails(email, password);
        
    }

    getEmails(): Mail {
        return this.emails;
    }
}
export default MailAPI;
