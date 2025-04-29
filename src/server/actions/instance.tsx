import { globalAction$, z, zod$ } from "@builder.io/qwik-city";
import loadSession from "../loadSession";
import instancesService from "~/services/instances.service";

/**
 * Add instance using Action
 */
export const AddInstance = globalAction$(async (data, {cookie, redirect}) => {

    // Load session
    const session = await loadSession(cookie, redirect);

    // Create instance
    const instance = await instancesService.CreateInstance({
        ...data,
        user_id: session.user_id,
    });

    return instance.toJSON();
}, 
    // Validate using Zod
    zod$({
        name: z.string().max(40),
        platform: z.string().max(10)
    })
);