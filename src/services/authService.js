import httpService from "./httpService";


export function login(email, password){
    return httpService.post("http://localhost:3900/api/auth", {email, password})
}