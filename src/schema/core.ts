import { z } from 'zod'
import * as helpers from './helpers'

export const zRowSchema = z.object({
  ...helpers.visibilityProperties,
  ...helpers.commonSectionProperties,

  ...helpers.borderProperties,
  ...helpers.paddingProperties,
  ...helpers.containerPaddingProperties,

  type: z.literal('EMAIL-ROW'),

  verticalAlign: helpers.verticalAlignment.optional(),
})

export const zRowItemSchema = z.object({
  align: helpers.horizontalAlignment.optional(),
  verticalAlign: helpers.verticalAlignment.optional(),
})

export const zSectionSchema = z.object({
  ...helpers.visibilityProperties,
  ...helpers.commonSectionProperties,

  ...helpers.borderProperties,
  ...helpers.paddingProperties,
  ...helpers.containerPaddingProperties,

  type: z.literal('EMAIL-SECTION'),
})

export const zHTMLSchema = z.object({
  ...helpers.visibilityProperties,
  ...helpers.commonSectionProperties,

  ...helpers.borderProperties,
  ...helpers.containerPaddingProperties,

  type: z.literal('EMAIL-HTML'),
  html: helpers.zHtmlString,
})

export const zButtonSchema = z.object({
  ...helpers.commonTextProperties,
  ...helpers.visibilityProperties,

  ...helpers.borderProperties,
  ...helpers.paddingProperties,
  ...helpers.containerPaddingProperties,

  type: z.literal('EMAIL-BUTTON'),

  width: helpers.zPercentageValue.optional(),
  align: helpers.horizontalAlignment.optional(),

  content: helpers.zTextString,
  href: z.string().optional(),
  target: z.literal('blank').optional(),
})

export const zTextSchema = z.object({
  ...helpers.commonTextProperties,
  ...helpers.visibilityProperties,

  ...helpers.borderProperties,
  ...helpers.paddingProperties,
  ...helpers.containerPaddingProperties,

  type: z.literal('EMAIL-TEXT'),

  content: helpers.zTextString,
})

export const zHeadingSchema = z.object({
  ...helpers.commonTextProperties,
  ...helpers.visibilityProperties,

  ...helpers.borderProperties,
  ...helpers.paddingProperties,
  ...helpers.containerPaddingProperties,

  type: z.literal('EMAIL-HEADING'),

  headingType: z.enum(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  text: z.string(),
})

export const zImageSchema = z.object({
  ...helpers.visibilityProperties,

  ...helpers.borderProperties,
  ...helpers.paddingProperties,
  ...helpers.containerPaddingProperties,

  type: z.literal('EMAIL-IMAGE'),

  width: helpers.zPercentageValue.optional(),
  align: helpers.horizontalAlignment.optional(),

  src: z.string(),
  alt: z.string().optional(),
  href: z.string().optional(),
  target: z.literal('blank').optional(),
})

export const zSpacerSchema = z.object({
  ...helpers.visibilityProperties,

  ...helpers.borderProperties,
  ...helpers.paddingProperties,
  ...helpers.containerPaddingProperties,

  type: z.literal('EMAIL-SPACER'),

  height: z.number(),
  backgroundColor: helpers.hexColorSchema.optional(),
})

export const zVerticalSpacerSchema = z.object({
  ...helpers.visibilityProperties,

  ...helpers.borderProperties,
  ...helpers.paddingProperties,
  ...helpers.containerPaddingProperties,

  type: z.literal('EMAIL-VERTICAL-SPACER'),

  width: z.number().optional(),
  backgroundColor: helpers.hexColorSchema.optional(),
})
