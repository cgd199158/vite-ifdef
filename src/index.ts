import type { Plugin } from "vite";
import { UserOptions } from "./types";
import { Context } from "./context";
import { resolveOptions } from "./options";

const ViteIfdef = (
  userOptions: UserOptions = {}
): Plugin => {
  const options = resolveOptions(userOptions);
  const ctx = new Context(options);
  return {
    name: "vite-ifdef",
    enforce: "pre",
    configResolved(_config) {
      ctx.setEnv(_config.env.MODE);
    },
    transform: (code, id) => ctx.transform(code, id),
  };
};

export default ViteIfdef;
