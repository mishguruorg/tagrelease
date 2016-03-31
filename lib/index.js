import minimist from 'minimist'
import { map } from 'ramda'
import getVersion from './getVersion'
import commitGitTags from './commitGitTags'

const argv = minimist(process.argv.slice(2))

const tagRelease = async () => {
  const environments = argv._.length ? argv._ : ['production']
  const directory = process.cwd()
  const version = await getVersion(directory)
  const tags = map((env) => `${env} ${version}`, environments)
  await commitGitTags(tags)
}

export default tagRelease
