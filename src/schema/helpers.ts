import { z } from 'zod'
import { hasForbiddenTags, hasUnknownTags } from './parse5'
import { ALLOWED_TEXT_HTML_TAGS, FORBIDDEN_HTML_TAGS } from './config'

export const zTextString = z.string().refine(
  (value: string) => {
    return !hasUnknownTags(value, ALLOWED_TEXT_HTML_TAGS)
  },
  { message: 'Text content contains unknown tags' }
)

export const zHtmlString = z.string().refine(
  (value: string) => {
    return !hasForbiddenTags(value, FORBIDDEN_HTML_TAGS)
  },
  { message: 'HTML content contains forbidden tags' }
)
