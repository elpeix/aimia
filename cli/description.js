import { performance } from 'perf_hooks'
import { getDescription } from '../lib/api.js'
import { readLineAsync } from './cli.js'
import ora from 'ora'


console.log('Description CLI')
console.log('=============')
const input = await readLineAsync('Input: ')

console.log('')

const spinner = ora('Generating description...').start()
const start = performance.now()
const intervalId = setInterval(() => {
  const seconds = Math.floor((performance.now() - start) / 1000)
  spinner.text = `Generating description... ${seconds}s`
}, 1000)

const data = await getDescription({ input })
  .catch(error => {
    spinner.fail(error.message)
    process.exit(1)
  })

const totalSeconds = Math.floor((performance.now() - start) / 1000)
spinner.succeed(`Generated with (${totalSeconds}s)`)
clearInterval(intervalId)

spinner.stop()

console.log('')
console.log('Output:')
console.log(data)