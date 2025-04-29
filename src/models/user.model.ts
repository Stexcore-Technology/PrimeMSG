import { DataTypes, Model } from "sequelize";
import connection from "~/database/connection";

/**
 * User Interface
 */
export interface IUser {
    /**
     * Identifier
     */
    id: number,
    /**
     * Email string
     */
    email: string,
    /**
     * Username
     */
    username: string,
    /**
     * Password
     */
    password: string,
}

class User extends Model<IUser, Omit<IUser, "id">> implements IUser {
    declare id: number;
    declare email: string;
    declare username: string;
    declare password: string;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.CHAR(40),
        allowNull: false
    },
    email: {
        type: DataTypes.CHAR(40),
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.CHAR(80),
        allowNull: false
    }
}, {
    sequelize: connection,
    tableName: "users"
});

export default User;