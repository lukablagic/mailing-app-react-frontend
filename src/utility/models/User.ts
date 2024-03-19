export class User {
  name: string;
  surname: string;
  email: string;
  password: string;
  profile_picture?: string;
  faield_attempts?: number;
  locked?: boolean;
  locekd_until?: Date;
}
