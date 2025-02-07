import { z } from 'zod'
import * as core from './core'

type EmailRowNodeCore = z.infer<typeof core.zRowSchema>
type EmailRowItemNodeCore = z.infer<typeof core.zRowItemSchema>
type EmailSectionNodeCore = z.infer<typeof core.zSectionSchema>

export type EmailSectionNode = EmailSectionNodeCore & { children: EmailNode[] }
export type EmailRowNode = EmailRowNodeCore & {
  children: (EmailRowItemNodeCore & { node: EmailNode })[]
}

export type EmailHTMLNode = z.infer<typeof core.zHTMLSchema>
export type EmailTextNode = z.infer<typeof core.zTextSchema>
export type EmailImageNode = z.infer<typeof core.zImageSchema>
export type EmailButtonNode = z.infer<typeof core.zButtonSchema>
export type EmailSpacerNode = z.infer<typeof core.zSpacerSchema>
export type EmailHeadingNode = z.infer<typeof core.zHeadingSchema>
export type EmailVerticalSpacerNode = z.infer<typeof core.zVerticalSpacerSchema>

export type EmailNode =
  // Containers
  | EmailRowNode
  | EmailSectionNode
  // Primitives
  | EmailHTMLNode
  | EmailTextNode
  | EmailImageNode
  | EmailButtonNode
  | EmailSpacerNode
  | EmailHeadingNode
  | EmailVerticalSpacerNode
