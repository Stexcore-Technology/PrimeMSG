import { DataTypes, Model } from "sequelize";
import connection from "~/database/connection";

/**
 * Session Interface
 */
export interface ISession {
    /**
     * Identifier
     */
    id: number,
    /**
     * User Identifier
     */
    id_user: number,
    /**
     * Token
     */
    token: string,
    /**
     * Expiration
     */
    expiration: Date
}

class Session extends Model<ISession, Omit<ISession, "id" | "token"> | { token?: string }> implements ISession {
    declare id: number;
    declare id_user: number;
    declare token: string;
    declare expiration: Date;
}

Session.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    token: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    expiration: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize: connection,
    tableName: "sessions"
});

export default Session;