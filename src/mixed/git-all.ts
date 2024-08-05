import gitStatusAll from './git-status-all'
import pullAll from './pull-all'
import pushAll from './push-all'

async function run() {
  await gitStatusAll.run()
  await pullAll.run()
  await pushAll.run()
}

export default { run, title: 'Git All' }
