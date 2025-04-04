import { api } from "./api";
import axios, { AxiosRequestConfig, Method } from "axios";

interface RequestConfig {
    method: Method;
    endpoint: string;
    params?: Record<string, any>;
    data?: object;
    headers?: Record<string, string>;
}

const http = async ({
                        method,
                        endpoint,
                        params,
                        data,
                        headers,
                    }: RequestConfig): Promise<any> => {
    const config: AxiosRequestConfig = {
        method,
        url: endpoint,
        params,
        data,
        headers,
    };

    try {
        const response = await api.request<any>(config);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Erro do Axios:", error.message);
        } else {
            console.error("Erro inesperado:", error);
        }
        throw error;
    }
};

export default http;