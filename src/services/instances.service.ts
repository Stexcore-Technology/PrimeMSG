import Instance from "~/models/instance.model"

export default new class InstancesService {

    constructor() { }

    public async GetAllInstances(id_user: number) {

        // instances data
        const instances = await Instance.findAll({
            where: {
                id_user: id_user
            }
        });

        // Instances Info
        return instances.map((instanceItem) => (
            instanceItem.toJSON()
        ));;
    }

    public async GetInstanceItem(id_instance: number, id_user: number) {

        // instances info
        const instanceItem = await Instance.findOne({
            where: {
                id: id_instance,
                id_user: id_user,
            }
        });

        return instanceItem?.toJSON() ?? null;
    }

    public async CreateInstance(data: { id_user: number, name: string, platform: string }) {

        // Instance created
        const instance = await Instance.create({
            id_user: data.id_user,
            name: data.name,
            platform: data.platform
        });

        return instance;
    }

    public async UpdateInstance(id_instance: number, id_user: number, data: { name: string, platform: string }) {
        // Instance updated
        const [countUpdated] = await Instance.update({
            ...data
        }, {
            where: {
                id: id_instance,
                id_user: id_user,
            }
        });

        return countUpdated;
    }

    public async DeleteInstance(id_instance: number, id_user: number) {
        const countDeleted = await Instance.destroy({
            where: {
                id: id_instance,
                id_user: id_user
            }
        });

        return countDeleted;
    }


    
}