import { performance } from 'perf_hooks'
import { getKeywords } from '../lib/api.js'
import { readLineAsync } from './cli.js'
import ora from 'ora'


console.log('Keywords CLI')
console.log('=============')
const input = await readLineAsync('Input: ')

console.log('')

const spinner = ora('Generating keywords...').start()
const start = performance.now()
const intervalId = setInterval(() => {
  const seconds = Math.floor((performance.now() - start) / 1000)
  spinner.text = `Generating keywords... ${seconds}s`
}, 1000)

const data = await getKeywords({ input })
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
