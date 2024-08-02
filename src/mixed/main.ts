import prompts from "prompts"
import newRepo from "./new-repo.js"
import { CLIScript } from "../types.js"
import assert from "node:assert/strict"
import focusMode from "./focus-mode.js"
import gitCommit from "./git-commit.js"
import addNewScript from "./add-new-script.js"

const scripts = {
  addNewScript,
  newRepo,
  focusMode,
  gitCommit,
} satisfies Record<string, CLIScript>

interface Prompt {
  script: keyof typeof scripts
}

export async function mixed() {
  const choosen: Prompt = await prompts({
    message: "Which script would you like to run?",
    name: "script",
    type: "autocomplete",
    choices: Object.entries(scripts).map(([key, script]) => ({ title: script.title, value: key })),
  })

  if (!choosen.script) {
    process.exit(0)
  }

  const script = scripts[choosen.script]

  assert(script, "must be a script")

  await script.run()
}
