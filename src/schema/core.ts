import { z } from 'zod'
import { zHtmlString, zTextString } from './helpers'

export const zSectionSchema = z.object({
  type: z.literal('EMAIL-SECTION'),
})

export const zButtonSchema = z.object({
  type: z.literal('EMAIL-BUTTON'),
  width: z.number().min(0).max(100).optional(),
  children: zTextString,
})

export const zTextSchema = z.object({
  type: z.literal('EMAIL-TEXT'),
  children: zTextString,
})

export const zImageSchema = z.object({
  type: z.literal('EMAIL-IMAGE'),
  src: z.string(),
  alt: z.string().optional(),
  width: z.number().min(0).max(100).optional(),
})

export const zSpacerSchema = z.object({
  type: z.literal('EMAIL-SPACER'),
  height: z.number(),
})

export const zVerticalSpacerSchema = z.object({
  type: z.literal('EMAIL-VERTICAL-SPACER'),
  width: z.number(),
})

export const zRowSchema = z.object({
  type: z.literal('EMAIL-ROW'),
})

export const zHTMLSchema = z.object({
  type: z.literal('EMAIL-HTML'),
  children: zHtmlString,
})
