import { globalAction$, z, zod$ } from "@builder.io/qwik-city";
import loadSession from "../loadSession";
import instancesService from "~/services/instances.service";

export const AddInstance = globalAction$(async (data, {cookie, redirect}) => {

    // Load session
    const session = await loadSession(cookie, redirect);

    // Create instance
    const instance = await instancesService.CreateInstance({
        ...data,
        id_user: session.id,
    });

    return instance.toJSON();
}, zod$({
    name: z.string().max(40),
    platform: z.string().max(10)
}));