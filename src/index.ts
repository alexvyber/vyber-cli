#!/usr/bin/env node

import { join, resolve } from "node:path"
import { readFileSync } from "node:fs"
import { Command } from "commander"

import { mixed } from "./mixed/main.js"
import gitCommit from "./mixed/git-commit.js"
import nodeInit from "./mixed/node-init.js"

const program = new Command()

const json = JSON.parse(readFileSync(join(resolve(__dirname, "../package.json")), "utf8"))

program.version(json.version)

program.action(mixed)

program.command("init").option("-m, --manager", "package manager to use").action(nodeInit.run)
program.command("commit").action(gitCommit.run)

program.parse(process.argv)
