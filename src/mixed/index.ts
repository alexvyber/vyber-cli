import prompts from "prompts"
import newRepo from "./new-repo.js"

const scripts: Record<string, { title: string; run: () => Promise<void> }> = {
  newRepo,
}

export async function mixed() {
  const choosen = await prompts({
    message: "Which script would you like to run?",
    name: "script",
    type: "autocomplete",
    choices: Object.entries(scripts).map(([key, script]) => ({ title: script.title, value: key })),
  })

  if (!choosen.script) {
    process.exit(0)
  }

  await scripts[choosen.script as keyof typeof scripts].run()
}
