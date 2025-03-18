export interface User {
    email: string,
    password: string,
}
export type Login = Pick<{ email: string; password: string }, 'email' | 'password'>;