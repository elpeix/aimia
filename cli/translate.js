import * as dotenv from 'dotenv'
import ora from 'ora'
import { performance } from 'perf_hooks'
import { translate } from '../lib/translate.js'
import { createInterface } from 'readline'

dotenv.config()

const readline = createInterface({
  input: process.stdin,
  output: process.stdout
})

const readLineAsync = msg => {
  return new Promise(resolve => {
    readline.question(msg, userRes => {
      resolve(userRes)
    })
  })
}

console.log('Translate CLI')
console.log('=============')
const input = await readLineAsync('Input: ')
const from = await readLineAsync('From: ')
const to = await readLineAsync('To: ')

console.log('')

const spinner = ora('Translating...').start()
const start = performance.now()
const intervalId = setInterval(() => {
  const seconds = Math.floor((performance.now() - start) / 1000)
  spinner.text = `Translating... ${seconds}s`
}, 1000)

const data = await translate({ input, from, to })

const totalSeconds = Math.floor((performance.now() - start) / 1000)
spinner.succeed(`Generated with (${totalSeconds}s)`)
clearInterval(intervalId)

spinner.stop()

console.log('')
console.log('Output:')
console.log(data)
