import axios from "axios";

export const instanceApi = axios.create({
  baseURL: import.meta.env.PROD ? "https://prestacao-nuvem-api-backoffice.azurewebsites.net/api" : "https://localhost:7233/api",  
});

