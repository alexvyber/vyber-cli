import prompts from "prompts"
import assert from "node:assert/strict"

import { CLIScript } from "../types.js"

import bookmark from "./bookmark.js"
import gitNewRepo from "./git-new-repo.js"
import focusMode from "./focus-mode.js"
import gitCommit from "./git-commit.js"
import newScript from "./add-new-script.js"
import nodeInit from "./node-init.js"
import pushAll from "./push-all.js"
import pullAll from "./pull-all.js"
import gitStatusAll from "./git-status-all.js"
import genBiome from "./gen-biome.js"

const scripts = {
  genBiome,
  gitStatusAll,
  pullAll,
  pushAll,
  nodeInit,
  bookmark,
  newScript,
  focusMode,
  gitNewRepo,
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
    choices: Object.entries(scripts).map(([key, script]) => ({
      title: script.title,
      value: key,
    })),
  })

  if (!choosen.script) {
    process.exit(0)
  }

  const script = scripts[choosen.script]

  assert(script, "must be a script")

  await script.run()
}
