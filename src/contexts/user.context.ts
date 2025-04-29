import { createContextId } from "@builder.io/qwik";
import { ISessionInfo } from "~/services/auth.service";

/**
 * User identifier
 */
export const UserContext = createContextId<ISessionInfo>("prime.msg.user.context");