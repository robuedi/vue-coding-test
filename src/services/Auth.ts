import axios from "axios";

export default class Auth{
    static setToken(token: string)
    {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
}