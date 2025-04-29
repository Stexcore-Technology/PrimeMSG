import { DataTypes, Model } from "sequelize";
import connection from "~/database/connection";

/**
 * User Interface
 */
export interface IUserUnauthorized {
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
    /**
     * Token
     */
    token: string,
    /**
     * Pin code
     */
    pin_code: string,
    /**
     * Try counts
     */
    try_counts: number,
    /**
     * expiration
     */
    expiration: Date
}

class UserUnauthorized extends Model<
    IUserUnauthorized, 
    Omit<IUserUnauthorized, "id" | "try_counts" | "token"> & { 
        try_counts?: IUserUnauthorized["try_counts"], 
        token?: IUserUnauthorized["token"]
    }
> implements IUserUnauthorized {
    declare id: number;
    declare email: string;
    declare username: string;
    declare password: string;
    declare token: string;
    declare pin_code: string;
    declare try_counts: number;
    declare expiration: Date;
}

UserUnauthorized.init({
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
        allowNull: false
    },
    password: {
        type: DataTypes.CHAR(80),
        allowNull: false
    },
    token: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    pin_code: {
        type: DataTypes.CHAR(6),
        allowNull: false
    },
    expiration: {
        type: DataTypes.DATE,
        allowNull: false
    },
    try_counts: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    }
}, {
    sequelize: connection,
    tableName: "users_unauthorized"
});

export default UserUnauthorized;