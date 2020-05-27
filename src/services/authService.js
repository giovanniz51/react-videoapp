import httpService from "./httpService";


export function login(email, password){
    return httpService.post("/auth", {email, password})
}