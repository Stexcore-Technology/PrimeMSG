/**
 * Request result
 */
export interface IRequestResult<T> {
    /**
     * Success request
     */
    success: boolean,
    /**
     * Message result
     */
    message: string,
    /**
     * Data additional
     */
    data: T extends null ? never : T
}