import { setupWorker } from "msw/browser";
import { handlers as mutationKeyExampleHandlers } from "../examples/mutationKey/handlers";

const handlers = [...mutationKeyExampleHandlers];

export const worker = setupWorker(...handlers);
