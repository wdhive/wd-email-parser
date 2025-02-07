import { z } from 'zod'
import * as core from './core'
import type * as types from './types.t'

const zodNodeSchema: z.ZodType<types.EmailNode> = z.lazy(() => {
  return z.discriminatedUnion('type', [
    core.zHTMLSchema,
    core.zTextSchema,
    core.zImageSchema,
    core.zButtonSchema,
    core.zSpacerSchema,
    core.zVerticalSpacerSchema,

    core.zRowSchema.extend({ children: z.array(zodNodeSchema) }),
    core.zSectionSchema.extend({ children: z.array(zodNodeSchema) }),
  ])
})

export * from './types.t'
export default function nodeSchema(node: types.EmailNode) {
  try {
    return zodNodeSchema.parse(node)
  } catch (err) {
    if (err instanceof z.ZodError) {
      throw new Error(err.errors.map((e) => e.message).join('\n'))
    }

    throw err
  }
}
