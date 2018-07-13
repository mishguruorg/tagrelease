import git from 'simple-git'
import { reduce } from 'ramda'

const commitGitTags = async (directory, tags, remote, branch) => {
  let repo = git(directory)
  let updatedRepo = reduce((taggedRepo, tag) => taggedRepo.addTag(tag), repo, tags)
  if (remote && branch) {
    console.log(`Pushing repo to ${remote} ${branch}`)
    return await pushRepo(updatedRepo, remote, branch)
  }
}

const pushRepo = async (repo, remote, branch) => {
  return new Promise((resolve, reject) => {
    repo
      .push(remote, branch)
      .pushTags(remote, (err, res) => {
        if (err) return reject(err)
        console.log(`Finished pushing tags`)
        return resolve(res)
      })
  })
}

export default commitGitTags
