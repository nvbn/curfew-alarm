import i18n, { TranslateOptions } from "i18n-js";

import { DEFAULT } from "../translations";

type Copy = keyof typeof DEFAULT;

type Scope = Copy | Copy[];

/**
 * i18n-js.t with typescript tags validation.
 */
const t = (scope: Scope, options?: TranslateOptions): string =>
  i18n.t(scope, options);

export default {
  ...i18n,
  t,
};
