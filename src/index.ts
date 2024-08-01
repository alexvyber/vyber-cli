#!/usr/bin/env node

import { Command } from "commander"
import { init } from "./scripts/init.js"
import { mixed } from "./mixed/index.js"

const program = new Command()

program.version("0.0.1")

program.action(mixed)

program.command("init").option("-m, --manager", "package manager to use").action(init)

program.parse(process.argv)
