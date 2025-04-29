import UserUnauthorized from "~/models/user-unauthorized.model"
import smtpService from "./smtp.service";
import jwt from "jsonwebtoken";
import User from "~/models/user.model";
import Session from "~/models/session.model";
import Instance, { IInstance } from "~/models/instance.model";

export interface ISessionInfo {
    id: number,
    session_id: number,
    username:  string,
    email: string,
    token: string,
    instances: IInstance[]
}

export default new class AuthService {

    readonly ExistsAccountError = class extends Error { };
    readonly SessionExpiredError = class extends Error { };
    readonly UserNotFoundError = class extends Error { };

    constructor() { }

    /**
     * Create a request to create and send a verification link to email
     * @param url Url server
     * @param data User to register
     * @throws {this["ExistsAccountError"]}
     */
    public async createRequestToRegister(
        url: string,
        data: {
            username: string,
            email: string,
            password: string
        }
    ) {
        const userAccount = await User.findOne({
            where: {
                email: data.email,
            }
        });

        if(userAccount) {
            throw new this.ExistsAccountError("Already exists another account!");
        }

        await UserUnauthorized.destroy({
            where: {
                email: data.email
            }
        });

        const pin_code = Math.random().toString().slice(-6);
        const expiration = new Date(Date.now() + 1.44e+7);
        
        const user = await UserUnauthorized.create({
            email: data.email,
            username: data.username,
            password: data.password,
            expiration: expiration,
            pin_code: pin_code,
        });

        const token = jwt.sign({ 
            version: "1.0.0",
            id: user.id,
            email: user.email, 
            token_uuid: user.token 
        }, 
        String(process.env.JWT_KEY), {
            expiresIn: 60 * 60 * 4
        });

        await smtpService.sendMail(data.email, {
            template: "tcp-signin",
            username: data.username,
            link_verification: new URL("/auth/signup/" + encodeURIComponent(token), url).href,
        });
    }

    /**
     * Authorize a account by token
     * @param token Token authorize
     * @throws {this["SessionExpiredError"]}
     * @returns Session register
     */
    public async AuthorizeRegisterByToken(token: string) {

        const decoded = jwt.verify(token, String(process.env.JWT_KEY)) as {
            version: string,
            id: number,
            email: string,
            token_uuid: string
        };

        if(decoded.version === "1.0.0") {

            // Validate if exists account
            const userAccount = await User.findOne({
                where: {
                    email: decoded.email,
                }
            });

            if(!userAccount) {

                const userUnauthorized = await UserUnauthorized.findOne({
                    where: {
                        id: decoded.id,
                        email: decoded.email,
                        token: decoded.token_uuid
                    }
                });
    
                if(userUnauthorized) {
                    const user = await User.create({
                        email: userUnauthorized.email,
                        password: userUnauthorized.password,
                        username: userUnauthorized.username
                    });
                    await userUnauthorized.destroy();
    
                    // Signin session
                    return this.Login(user);
                }
            }
            
        }
        
        throw new this.SessionExpiredError("Session expired!");
    }

    /**
     * Login using user instance
     * @param user User info
     * @throws {this["UserNotFoundError"]}
     */
    public async Login(user: User): Promise<ISessionInfo>;
    public async Login(email: string, password: string): Promise<ISessionInfo>;
    public async Login(email: string | User, password?: string): Promise<ISessionInfo> {
        let user: User;

        if(email instanceof User) {
            user = email;
        }
        else {
            const userFind = await User.findOne({
                where: {
                    email: email,
                    password: password
                }
            });

            if(!userFind) throw new this.UserNotFoundError("User not found!");
            user = userFind;
        }

        const expiration = new Date(Date.now() + 2.592e+9); // 2,592e+9 = 30 days

        const session = await Session.create({
            id_user: user.id,
            expiration: expiration
        });
        const token = jwt.sign({
            version: "1.0.0",
            session_id: session.id,
            token_uuid: session.token
        }, String(process.env.JWT_KEY), {
            expiresIn: 2.592e+9 / 1000
        });

        return this.getSessionInfo(user, session, token);
    }

    /**
     * Get session info
     * @param token Token session
     * @throws {this["SessionExpiredError"]}
     * @returns Session info
     */
    public async getSessionInfoByToken(token: string) {
        const decoded = jwt.verify(token, String(process.env.JWT_KEY)) as {
            version: string,
            session_id: number,
            token_uuid: string
        };

        if(decoded.version === "1.0.0") {
            const session = await Session.findOne({
                where: {
                    id: decoded.session_id,
                    token: decoded.token_uuid
                }
            });

            if(session) {
                const user = await User.findOne({
                    where: {
                        id: session.id_user
                    }
                });

                if(user) {
                    return this.getSessionInfo(user, session, token);
                }
            }
        }
        
        throw new this.SessionExpiredError("Session expired!");
    }

    public async getSessionInfo(user: User, session: Session, token: string): Promise<ISessionInfo> {
        const instances = await Instance.findAll({
            where: {
                id_user: user.id
            }
        });
        
        return {
            id: user.id,
            session_id: session.id,
            username: user.username,
            email: user.email,
            token: token,
            instances: instances.map((instanceItem) => (
                instanceItem.toJSON()
            ))
        };
    }
    
}