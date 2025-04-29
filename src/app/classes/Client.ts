/**
 * Client to manage a instance client
 */
export default abstract class Client {
    /**
     * Initialize instance
     */
    public abstract initialize(): void;
    /**
     * Destroy instance
     */
    public abstract destroy(): void;
    
}