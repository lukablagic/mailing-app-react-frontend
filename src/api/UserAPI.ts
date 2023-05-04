import axios from "axios";
import { User } from "../models/User";
import process from 'process';



    
    const baseUrl = "http://localhost";
    
   export async function getUser(boolean): Promise<User[]> {
    return axios.get(`${this.baseUrl}/users`);
    }
   


