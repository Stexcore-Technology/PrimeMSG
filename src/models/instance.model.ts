import { DataTypes, Model } from "sequelize";
import connection from "~/database/connection";

/**
 * Instance Interface
 */
export interface IInstance {
    /**
     * Identifier
     */
    id: number,
    /**
     * User Identifier
     */
    id_user: number,
    /**
     * Instance name
     */
    name: string,
    /**
     * Instance platform
     */
    platform: string
}

class Instance extends Model<IInstance, Omit<IInstance, "id">> implements IInstance {
    declare id: number;
    declare id_user: number;
    declare name: string;
    declare platform: string;
}

Instance.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: DataTypes.CHAR(40),
        allowNull: false
    },
    platform: {
        type: DataTypes.CHAR(10),
        allowNull: false
    }
}, {
    sequelize: connection,
    tableName: "instances"
});

export default Instance;