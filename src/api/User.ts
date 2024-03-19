import axios from "axios";
import { User } from "../utility/models/User";
import process from 'process';




const API_BASE_URL = 'http://localhost';
    
   export async function getUserData(token: string): Promise<User> {
        const response = await fetch(`${API_BASE_URL}/auth/user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + token,
            }
        });
        const data = await response.json();
        console.log(data);
        return data.user;
    }
   

