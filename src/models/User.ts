export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  profile_picture: string;
  faield_attempts: number;
  locked: boolean;
  locekd_until: Date;
}
