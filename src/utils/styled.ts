import { styleText } from "node:util"

export const styled = {
  error: (msg: string) => styleText(["red", "bold"], msg),
  success: (msg: string) => styleText(["green", "bold"], msg),
}
