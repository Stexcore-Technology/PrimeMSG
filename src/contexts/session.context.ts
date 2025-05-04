import { createContextId } from "@builder.io/qwik";
import type { ISessionInfo } from "~/services/auth.service";

/**
 * User identifier
 */
export const SessionContext = createContextId<ISessionInfo>("prime.msg.session.context");