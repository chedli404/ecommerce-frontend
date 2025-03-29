import { UserLoginType as UserLogin } from "../types/userTypes";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export async function login(UserLogin: UserLogin) {
    const response = await axios.post(`${apiUrl}/auth/login`, UserLogin);
    return response.data;
}
export async function googleLogin(token: string) {
    const response = await axios.post(`${apiUrl}/auth/google-login`, { token });
    return response.data;
}
