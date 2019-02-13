import git from 'simple-git/promise'
import { reduce } from 'ramda'

const commitGitTagsAndBranch = async (directory, tags, remote, branch) => {
  const updatedRepo = addTags(directory, tags)
  if (remote && branch) {
    return await pushRepo(updatedRepo, remote, branch)
  }
}

const addTags = (directory, tags) => {
  console.log(`Creating new tags ${tags.join(' ')}`)
  const repo = git(directory)
  const updatedRepo = reduce((taggedRepo, tag) => taggedRepo.addTag(tag), repo, tags)
  return updatedRepo
}

const getCurrentBranch = async (directory) => {
  return await git(directory).revparse(['--abbrev-ref', 'HEAD'])
}

const getCurrentHash = async (directory) => {
  return await git(directory).revparse(['HEAD'])
}

const pushRepo = async (repo, remote, branch) => {
  console.log(`Pushing repo to ${remote} ${branch}`)
  return repo
    .push(remote, branch)
    .pushTags(remote)
}

export {
  commitGitTagsAndBranch,
  addTags,
  pushRepo,
  getCurrentHash,
  getCurrentBranch
}

