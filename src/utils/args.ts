import prompts from 'prompts'

export async function arg(opts: { message: string; initial?: string }): Promise<string> {
  const result = await prompts({
    type: 'text',
    message: opts.message,
    initial: opts.initial,
    name: 'arg',
  })

  if (result.arg === null || result.arg === undefined) {
    process.exit(1)
  }

  return result.arg
}

export async function choose(opts: { message: string; choices: string[] }): Promise<string> {
  const result = await prompts({
    type: 'autocomplete',
    choices: opts.choices.map((choice) => ({ title: choice, value: choice })),
    message: opts.message,
    name: 'arg',
  })

  if (!result.arg) {
    process.exit(1)
  }

  return result.arg
}
