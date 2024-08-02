import { execSync } from "node:child_process"

async function run({ manager = "pnpm" }: { manager?: "pnpm" | "yarn" | "npm" } = { manager: "pnpm" }) {
  execSync("git init")

  if (manager === "pnpm") {
    execSync("pnpm init")
    execSync("pnpm add -D typescript @types/node")
    execSync("pnpm tsc --init")
  }

  if (manager === "yarn") {
    execSync("yarn init -y")
    execSync("yarn add -D typescript @types/node")
    execSync("yarn tsc --init")
  }

  if (manager === "npm") {
    execSync("npm init -y")
    execSync("npm install --save-dev typescript @types/node")
    execSync("npx tsc --init")
  }

  execSync("gen-biome")
  execSync("gen-node-ignore")
  execSync("mkdir src")
  execSync("touch src/index.ts")
}

export default { run, title: "Node Init" }
