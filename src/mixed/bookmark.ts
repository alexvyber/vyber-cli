import { arg } from '../utils/args'
import { styled } from '../utils/styled'
import { getConfig } from '../utils/get-config'

async function run() {
  const title = await arg({ message: 'Title' })
  const kind = await arg({ message: 'Kind' })
  const description = await arg({ message: 'Description' })

  const { bookmarks_api_url } = await getConfig()

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
