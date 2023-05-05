import axios from "axios";
import { User } from "../models/User";
import process from 'process';



    
    const baseUrl = "http://localhost";
    
   export async function getUserData(token: string): Promise<User> {
        const response = await fetch(`${baseUrl}/auth/user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authentication : "Bearer " + token,
            },
        });
        const data = await response.json();
        return data.user;
    }
   

