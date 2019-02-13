#!/usr/bin/env node

import minimist from 'minimist'
import { map } from 'ramda'
import getVersion from './getVersion'
import { getCurrentHash, pushRepo, addTags, commitGitTagsAndBranch, getCurrentBranch } from './gitHelpers'

const argv = minimist(process.argv.slice(2))

const tagRelease = async () => {
  const environments = argv._.length ? argv._ : ['staging']
  const legacy = !!argv.legacy

  const directory = process.cwd()
  const push = !argv.nopush
  const remote = push ? argv.r || 'origin' : null
  const branch = await getCurrentBranch(directory)

  if (legacy) {
    console.log('Running in legacy mode (uses package.json)')

    const version = await getVersion(directory)
    const tags = map((env) => `${env}-v${version}`, environments)
    await commitGitTagsAndBranch(directory, tags, remote, branch)
    return
  }

  const currentHash = await getCurrentHash(directory)
  const tags = map(env => `${env}-${currentHash}`)
  const updatedRepo = addTags(directory, tags)
  if (push) {
    await pushRepo(updatedRepo, remote, branch)
  }

  console.log('done!')
}

tagRelease()
