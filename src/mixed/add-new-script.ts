import { readFile, writeFile } from "node:fs/promises"
import { arg } from "../utils/args"
import { homeDir } from "../utils/home-dir"
import path from "node:path"
import { kebabCase, camelCase, capitalCase } from "change-case"
import { exec } from "node:child_process"
import { styled } from "../utils/styled"

const templates = {
  scriptFile: (title: string) => `async function run () {}; export default { run, title: "${capitalCase(title)}" }`,
  importLine: (title: string) => `import ${camelCase(title)} from './${kebabCase(title)}.js';`,
  scriptLine: (title: string) => `${camelCase(title)},`,
}

const mixedPath = ["@alexvyber", "repos", "vyber-cli", "src", "mixed"]

async function run() {
  const title = await arg({ message: "What is the title of the script?" })

  const scriptFilename = kebabCase(title)
  const scriptPath = path.join(homeDir(mixedPath.join("/")), `${scriptFilename}.ts`)

  const mainPath = homeDir(mixedPath.join("/"), "main.ts")
  const mainContent = await readFile(mainPath)
  const mainFileLines = mainContent.toString().split("\n")

  // -- adding new script to mixed action
  mainFileLines.splice(0, 0, templates.importLine(title))
  const insertIntoScriptsIndex = 1 + mainFileLines.findIndex((line) => line.includes("const scripts = {"))

  if (insertIntoScriptsIndex === 0) {
    console.log(styled.error("Can't find `scripts` object declaration in main.ts file"))
    process.exit(1)
  }

  mainFileLines.splice(insertIntoScriptsIndex, 0, templates.scriptLine(title))
  // -- end

  await writeFile(scriptPath, templates.scriptFile(title))
  await writeFile(mainPath, mainFileLines.join("\n"))

  exec("biome format --write .", { cwd: homeDir("@alexvyber", "repos", "vyber-cli") })
  exec(`code ${scriptPath}`)

  process.exit(0)
}

export default { title: "Script New", run }
