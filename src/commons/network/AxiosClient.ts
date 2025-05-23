import axios from "axios";
import type {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosError,
} from "axios";

import { AppConstants } from "@/commons/constants/appConstants";
import { ApiEndpoints } from "@/commons/constants/apiEndpoints";
import type { AuthPort } from "./AuthPort";
import { NetworkError } from "./NetworkError";

interface ErrorResponseData {
  message: string;
  parameters?: {
    fieldName: string;
  };
}

interface AxiosClientConfig {
  baseURL?: string;
  defaultHeaders?: Record<string, string>;
  onUnauthorizedRedirect?: () => Promise<void>;
}

export class AxiosClient {
  private readonly client: AxiosInstance;

  private readonly defaultHeaders: Record<string, string>;

  private readonly baseURL: string;

  private readonly onUnauthorizedRedirect?: () => Promise<void>;

  private readonly authService: AuthPort;

  constructor(authService: AuthPort, config: AxiosClientConfig = {}) {
    this.authService = authService;
    this.baseURL = config.baseURL || AppConstants.API.BASE_URL;
    this.defaultHeaders = config.defaultHeaders || {};
    this.onUnauthorizedRedirect = config.onUnauthorizedRedirect;

    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 30000,
      withCredentials: false,
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.client.interceptors.request.use(
      this.handleRequest.bind(this),
      this.handleError
    );

    this.client.interceptors.response.use(
      (response) => response,
      this.handleResponseError.bind(this)
    );
  }

  private async handleRequest(
    config: AxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> {
    const token = await this.authService.getToken();
    const customHeaders = (config.headers as Record<string, string>) || {};

    const endpointKey = Object.keys(ApiEndpoints).find(
      (key) =>
        ApiEndpoints[key as keyof typeof ApiEndpoints].path === config.url
    );

    const requiresAuth =
      endpointKey &&
      ApiEndpoints[endpointKey as keyof typeof ApiEndpoints].requiresAuth;

    if (requiresAuth && !token) {
      return Promise.reject(new Error("Authentication required."));
    }

    config.headers = {
      ...this.defaultHeaders,
      ...(token && { Authorization: `Bearer ${token}` }),
      ...customHeaders,
    };

    return config as InternalAxiosRequestConfig;
  }

  private handleError(error: unknown): Promise<unknown> {
    return Promise.reject(error);
  }

  private async handleResponseError(error: AxiosError): Promise<never> {
    if (!error.response) {
      return Promise.reject(new NetworkError());
    }

    const { status, data } = error.response;
    const errorData = data as ErrorResponseData;

    const isCustomerIdError =
      status === 400 && errorData?.parameters?.fieldName === "customerId";

    if (status === 401 || status === 403 || isCustomerIdError) {
      await this.redirectToLogin();
    }

    return Promise.reject(error);
  }

  private async redirectToLogin(): Promise<void> {
    this.authService.clearAll();
    if (this.onUnauthorizedRedirect) {
      await this.onUnauthorizedRedirect();
    }
  }

  public getInstance(): AxiosInstance {
    return this.client;
  }

  public async requestWithCustomHeaders(
    config: AxiosRequestConfig,
    customHeaders: Record<string, string>
  ) {
    config.headers = {
      ...(config.headers as Record<string, string>),
      ...customHeaders,
    };
    return this.client.request(config);
  }
}
