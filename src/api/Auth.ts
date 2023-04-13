import axios from 'axios';
import { User } from '../models/User';
import {RegisterData} from '../models/RegisterData';

class Auth {

  private isAuth: boolean;
  private user: User | null = null;
  constructor() {
    axios.defaults.baseURL = process.env.BASE_URL;
  }

  public async register(data: RegisterData): Promise<User> {
    const response = await axios.post('/register', data);
    return response.data;
  }
  public async login(data: RegisterData): Promise<User> {
    const response = await axios.post('/login', data);
    return response.data;
  }
  public async logout(): Promise<void> {
    await axios.post('/logout');
  }
  static isAuthenticated(): boolean {
    this.isAuth = true;
    return this.isAuth;
  }


}

export default Auth;
