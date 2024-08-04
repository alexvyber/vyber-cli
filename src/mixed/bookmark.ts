import { arg } from '../utils/args'
import YAML from 'yaml'
import { getConfigContent } from '../utils/get-config-content'
import { Config } from '../types'
import { styled } from '../utils/styled'

async function run() {
  const title = await arg({ message: 'Title' })
  const kind = await arg({ message: 'Kind' })
  const description = await arg({ message: 'Description' })

  const { bookmarks_api_url } = YAML.parse(await getConfigContent()) as Config

  const res = await fetch(bookmarks_api_url, {
    method: 'POST',
    redirect: 'follow',
    body: JSON.stringify({ title, kind, description }),
  })

  if (!res.ok) {
    console.log(styled.error(res.statusText))
    process.exit(1)
  }

  console.log(JSON.stringify(await res.json(), null, 2))
}

export default { run, title: 'Bookmark: create new bookmark' }
