import git from 'simple-git/promise'
import { map } from 'ramda'

const commitGitTagsAndBranch = async (directory, tags, remote) => {
  await addTags(directory, tags)
  if (remote && branch) {
    return await pushRepo(directory, remote)
  }
}

const addTags = async (directory, tags) => {
  const repo = git(directory)

  await Promise.all(tags.map(async (tag) => {
    console.log(`Creating new tag ${tag}`)
    await repo.addTag(tag)
  }))
}

const getCurrentHash = async (directory) => {
  return await git(directory).revparse(['HEAD'])
}

const pushRepo = async (directory, remote) => {
  console.log(`Pushing repo to ${remote}`)
  const repo = git(directory)

  await repo.pushTags(remote)
}

export {
  commitGitTagsAndBranch,
  addTags,
  pushRepo,
  getCurrentHash
}

