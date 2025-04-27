import UserUnauthorized from "~/models/user-unauthorized.model"

export default new class AuthService {

    constructor() { }

    public async createRequestToRegister(
        data: {
            username: string,
            email: string,
            password: string
        }
    ) {
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
    }
    
}