#!/usr/bin/env node
require('babel-polyfill')

import minimist from 'minimist'
import { map } from 'ramda'
import getVersion from './getVersion'
import commitGitTags from './commitGitTags'

const argv = minimist(process.argv.slice(2))

const tagRelease = async () => {
  const environments = argv._.length ? argv._ : ['internal']
  const push = !argv.nopush
  const remote = push ? argv.r || 'origin' : null
  const branch = push ? argv.b || 'master' : null

  const directory = process.cwd()
  const version = await getVersion(directory)
  const tags = map((env) => `${env}-v${version}`, environments)
  console.log(`Creating new tags ${tags.join(' ')}`)
  await commitGitTags(directory, tags, remote, branch)
}

tagRelease()
