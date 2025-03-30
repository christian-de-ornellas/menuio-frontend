import {api} from "./api";

import axios, {AxiosRequestConfig, Method} from "axios";

interface RequestConfig {
    method: Method;
    endpoint: string;
    params?: Record<string, any>;
    data?: object;
}

const http = async ({
                        method,
                        endpoint,
                        params,
                        data,
                    }: RequestConfig): Promise<any> => {
    const config: AxiosRequestConfig = {
        method,
        url: endpoint,
        params,
        data,
    };

    try {
        const response = await api.request<any>(config);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Lidar com erros específicos do Axios
            console.error("Erro do Axios:", error.message);
        } else {
            // Lidar com outros tipos de erros
            console.error("Erro inesperado:", error);
        }
        throw error;
    }
};

export default http;
