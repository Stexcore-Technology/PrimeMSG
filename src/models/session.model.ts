import { DataTypes, Model } from "sequelize";
import connection from "~/database/connection";

/**
 * Session Interface
 */
interface ISession {
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
}

class Session extends Model<ISession, Omit<ISession, "id">> implements ISession {
    public id!: number;
    public id_user!: number;
    public token!: string;
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
}, {
    sequelize: connection,
    tableName: "sessions"
});

export default Session;