import { createContextId } from "@builder.io/qwik";
import { ISessionInfo } from "~/types/session";

/**
 * User identifier
 */
export const SessionContext = createContextId<ISessionInfo>("prime.msg.session.context");