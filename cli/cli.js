import * as dotenv from 'dotenv'
import { createInterface } from 'readline'

dotenv.config()

const readline = createInterface({
  input: process.stdin,
  output: process.stdout
})

export const readLineAsync = async msg => {
  return new Promise(resolve => {
    readline.question(msg, userRes => {
      resolve(userRes)
    })
  })
}