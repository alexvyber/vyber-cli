export interface CLIScript {
  title: string
  run: () => Promise<void>
}

export interface Config {
  domains_to_block: string[]
  bookmarks_api_url: string
}
