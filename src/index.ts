#!/usr/bin/env node

import { Command } from "commander"
import { init } from "./scripts/init.js"
import { mixed } from "./mixed/main.js"
import path from "node:path"
import { readFileSync } from "node:fs"

const program = new Command()

const json = JSON.parse(readFileSync(path.join(path.resolve(__dirname, "../package.json")), "utf8"))

program.version(json.version)

program.action(mixed)

program.command("init").option("-m, --manager", "package manager to use").action(init)

program.parse(process.argv)
