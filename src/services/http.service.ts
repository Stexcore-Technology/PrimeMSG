/**
 * Request options base
 */
export interface IRequestOptionsBase {
    /**
     * Headers init data
     */
    headers?: HeadersInit,
    /**
     * Signal to abort request
     */
    signal?: AbortSignal,
}

/**
 * Request options with body
 */
export interface IRequestOptionsBody extends IRequestOptionsBase {
    /**
     * Data (JSON) to send into body
     */
    data?: any
}

/**
 * IRequest options
 */
export type IRequestOptions = 
    | ({ method: "POST" | "PUT" | "DELETE" } & IRequestOptionsBody)
    | ({ method: "GET" } & IRequestOptionsBase)

/**
 * Response interface
 */
export interface IResponse<T> {
    /**
     * Status code
     */
    statusCode: number,
    /**
     * Headers response
     */
    headers: Headers,
    /**
     * Data result
     */
    data: T
}

/**
 * Request options using method GET
 */
export interface IRequestOptionsGet extends IRequestOptionsBase { }

/**
 * Request options using method POST
 */
export interface IRequestOptionsPost extends IRequestOptionsBody { }

/**
 * Request options using method PUT
 */
export interface IRequestOptionsPut extends IRequestOptionsBody { }

/**
 * Request options using method DELETE
 */
export interface IRequestOptionsDelete extends IRequestOptionsBody { }

/**
 * Http Service
 */
export default new class httpService {

    /**
     * Send a request HTTP to some server
     * @param url Url or path relative to backend
     * @param options Options request
     * @returns Response request
     */
    public async request<T>(url: string | URL, options: IRequestOptions): Promise<IResponse<T>> {

        // Body data
        const body = "data" in options ? (options.data ?? null) : null;

        // Headers
        const headers = new Headers(options.headers);

        // validate body
        if(body !== null) {
            headers.set("Content-Type", "application/json");
        }
        
        // Result request
        const response = await fetch(new URL(url), {
            // Set body
            body: body !== null ? JSON.stringify(body) : null,
            // headers
            headers: headers,
            // Method
            method: options.method,
            // Abort signal
            signal: options.signal,
        });

        // Result request
        let data: any;

        // Validate content-type header
        if(response.headers.get("Content-Type") === "application/json") {
            // Extract json
            data = await response.json();
        }
        else {
            // Extract text
            data = await response.text();
        }

        // Response info
        return {
            // Status code
            statusCode: response.status,
            // Headers
            headers: response.headers,
            // Data result
            data: data
        };
    }

    /**
     * Send a request using GET method
     * @param url Url Request
     * @param options Options
     * @returns Response
     */
    public async get(url: string | URL, options?: IRequestOptionsGet) {
        return this.request(url, {
            ...options,
            method: "GET"
        });
    }

    /**
     * Send a request using POST method
     * @param url Url Request
     * @param options Options
     * @returns Response
     */
    public async post(url: string | URL, options?: IRequestOptionsPost) {
        return this.request(url, {
            ...options,
            method: "POST"
        });
    }

    /**
     * Send a request using PUT method
     * @param url Url Request
     * @param options Options
     * @returns Response
     */
    public async put(url: string | URL, options?: IRequestOptionsPut) {
        return this.request(url, {
            ...options,
            method: "PUT"
        });
    }

    /**
     * Send a request using DELETE method
     * @param url Url Request
     * @param options Options
     * @returns Response
     */
    public async delete(url: string | URL, options?: IRequestOptionsDelete) {
        return this.request(url, {
            ...options,
            method: "DELETE"
        });
    }
    
}