import {NOUNS, ADJECTIVES} from './values'

export function randomTitle() {
  const adjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)]
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)]

  return `${adjective} ${noun}`
}
