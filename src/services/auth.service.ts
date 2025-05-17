import type { ILangType } from "~/types/lang";
import httpService from "./http.service";
import { IRequestResult } from "~/types/response";
import { ISessionInfo } from "~/types/session";

/**
 * Authentication service
 */
export default new class AuthService {

    /**
     * Create a request to create and send a verification link to email
     * @param url Url server
     * @param data User to register
     * @throws {httpService["RequestError"]}
     */
    public createRequestToRegister(
        url: string,
        data: {
            username: string,
            email: string,
            password: string,
            langType: ILangType
        }
    ) {
        return httpService.post<IRequestResult<null>>("/auth/signin", {
            data: {
                url,
                ...data
            }
        });
    }

    /**
     * Authorize a account by token
     * @param token Token authorize
     * @throws {httpService["RequestError"]}
     * @returns Session register
     */
    public AuthorizeRegisterByToken(token: string) {
        return httpService.post<IRequestResult<ISessionInfo>>("/auth/signup/" + encodeURIComponent(token))
    }

    /**
     * Login using user instance
     * @param user User info
     * @throws {this["UserNotFoundError"]}
     */
    public Login(email: string, password: string) {
        return httpService.post<IRequestResult<ISessionInfo>>("/auth/signup", {
            data: {
                email,
                password
            }
        });
    }

    /**
     * Get session info
     * @param token Token session
     * @throws {this["SessionExpiredError"]}
     * @returns Session info
     */
    public async getSessionInfoByToken(token: string) {
        return httpService.get<IRequestResult<ISessionInfo>>("/auth/signin", {
            headers: {
                authorization: token
            }
        });
    }

}