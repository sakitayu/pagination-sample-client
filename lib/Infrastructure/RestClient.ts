import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export default class RestClient {
    constructor(private readonly token: string) {}

    async get<ResponseInterface>(
        path: string,
    ): Promise<AxiosResponse<ResponseInterface>> {
        return await axios.get<ResponseInterface>(path, this.requestConfig);
    }

    private get requestConfig(): AxiosRequestConfig {
        return {
            baseURL: 'http://localhost:3000',
            headers: {
                'Content-Type': 'application/json',
                Authorization: this.token ? `Bearer ${this.token}` : '',
            },
        };
    }
}

export function getNoAuthClient(): RestClient {
    return new RestClient('');
}
