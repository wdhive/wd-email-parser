import { hasForbiddenTags, hasUnknownTags } from './schema/parse5'

const html = '<iframe><script></script></iframe>'
const forbiddenTags = ['script']

console.log(hasForbiddenTags(html, forbiddenTags)) // true
