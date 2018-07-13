import { readFile } from 'fs'

const getVersion = async (directory) => {
  const pkg = await getPackageJson(directory)
  if (!pkg) {
    console.error('package.json not found in the current directory')
    process.exit(1)
  }

  const version = pkg.version
  if (!version) {
    console.error('No version found in package.json')
    process.exit(1)
  }

  return version
}

const getPackageJson = async (directory) => {
  return new Promise((resolve, reject) => {
    readFile(`${directory}/package.json`, 'utf8', (err, data) => {
      if (err) {
        console.error(err)
        return reject(err)
      }

      return resolve(JSON.parse(data))
    })
  })
}

export default getVersion
