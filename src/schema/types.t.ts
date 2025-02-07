import { z } from 'zod'
import * as core from './core'

type EmailNodeChildren = { children: EmailNode[] }
type EmailRowNodeCore = z.infer<typeof core.zRowSchema>
type EmailSectionNodeCore = z.infer<typeof core.zSectionSchema>

export type EmailRowNode = EmailRowNodeCore & EmailNodeChildren
export type EmailSectionNode = EmailSectionNodeCore & EmailNodeChildren

export type EmailHTMLNode = z.infer<typeof core.zHTMLSchema>
export type EmailTextNode = z.infer<typeof core.zTextSchema>
export type EmailImageNode = z.infer<typeof core.zImageSchema>
export type EmailButtonNode = z.infer<typeof core.zButtonSchema>
export type EmailSpacerNode = z.infer<typeof core.zSpacerSchema>
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
  | EmailVerticalSpacerNode
