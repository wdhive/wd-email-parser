import { z } from 'zod'
import { hasForbiddenTags, hasUnknownTags } from './parse5'
import { ALLOWED_TEXT_HTML_TAGS, FORBIDDEN_HTML_TAGS } from './config'

export const hexColorSchema = z.string().regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/)

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

export const zPercentageValue = z
  .number()
  .min(0, 'Percentage value should not be less than 0')
  .max(100, 'Percentage value should not be more than 100')

export const horizontalAlignment = z.enum(['left', 'center', 'right'])
export const verticalAlignment = z.enum(['top', 'center', 'bottom'])

export const visibilityProperties = {
  hiddenFor: z.enum(['mobile', 'desktop']).optional(),
}

export const borderProperties = {
  borderWidth: z.number().optional(),
  borderColor: hexColorSchema.optional(),
  borderStyle: z.enum(['solid', 'dashed', 'dotted']).optional(),

  borderRadiusLeft: z.number().optional(),
  borderRadiusRight: z.number().optional(),
  borderRadiusTop: z.number().optional(),
  borderRadiusBottom: z.number().optional(),
}

export const paddingProperties = {
  paddingTop: z.number().optional(),
  paddingLeft: z.number().optional(),
  paddingRight: z.number().optional(),
  paddingBottom: z.number().optional(),
}

export const containerPaddingProperties = {
  containerPaddingTop: z.number().optional(),
  containerPaddingLeft: z.number().optional(),
  containerPaddingRight: z.number().optional(),
  containerPaddingBottom: z.number().optional(),
}

export const commonTextProperties = {
  color: hexColorSchema.optional(),
  backgroundColor: hexColorSchema.optional(),

  fontSize: z.number().optional(),
  fontFamily: z.string().optional(),
  fontWeight: z.enum(['bold', 'normal']).optional(),
  fontStyle: z.enum(['italic', 'normal']).optional(),

  textDirection: z.enum(['ltr', 'rtl']).optional(),
  textWhiteSpace: z.enum(['normal', 'nowrap', 'pre']).optional(),

  textAlign: z.enum(['left', 'center', 'right', 'justify']).optional(),
  textTransform: z.enum(['uppercase', 'lowercase', 'capitalize']).optional(),
  textDecorationOverline: z.boolean().optional(),
  textDecorationUnderline: z.boolean().optional(),
  textDecorationLineThrough: z.boolean().optional(),

  lineHeight: z.number().optional(),
  letterSpacing: z.number().optional(),
  wordSpacing: z.number().optional(),
}

export const commonSectionProperties = {
  width: zPercentageValue.optional(),
  align: horizontalAlignment.optional(),

  backgroundImage: z.string().optional(),
  backgroundColor: hexColorSchema.optional(),
}
