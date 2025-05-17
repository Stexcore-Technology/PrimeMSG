import type { IInstance } from "./instances";

/**
 * Session info
 */
export interface ISessionInfo {
    /**
     * User identifier
     */
    user_id: number,
    /**
     * Session identifier
     */
    session_id: number,
    /**
     * Username
     */
    username: string,
    /**
     * Email address
     */
    email: string,
    /**
     * Token session
     */
    token: string,
    /**
     * Instances user
     */
    instances: IInstance[]
}