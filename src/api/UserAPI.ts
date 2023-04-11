import axios from "axios";
import { User } from "../models/User";
import process from 'process';

export class UserAPI {

    
    private baseUrl = "http://localhost";
    
    fetchUser(): Promise<User[]> {
    return axios.get(`${this.baseUrl}/users`);
    }
   

}
