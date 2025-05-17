/**
 * Request options base
 */
interface IRequestOptionsBase {
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
interface IRequestOptionsBody extends IRequestOptionsBase {
    /**
     * Data (JSON) to send into body
     */
    data?: any
}

/**
 * IRequest options
 */
interface IRequestOptions extends IRequestOptionsBody {
    /**
     * Method to send request HTTP
     */
    method: "GET" | "POST" | "PUT" | "DELETE"
}

/**
 * Response interface
 */
interface IResponse<T> {
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

export default new class httpService {

    /**
     * Send a request HTTP to some server
     * @param url Url or path relative to backend
     * @param options Options request
     * @returns Response request
     */
    public async request<T>(url: string | URL, options: IRequestOptions): Promise<IResponse<T>> {

        // Body data
        const body = options?.data ?? null;

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
    
}