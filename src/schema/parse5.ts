import { parseFragment } from 'parse5'

type Parse5Node = {
  nodeName: string
  value?: string
  childNodes?: Parse5Node[]
  content?: {
    childNodes?: Parse5Node[]
  }
}

export function hasForbiddenTags(
  htmlText: string,
  forbiddenTags: string[]
): boolean {
  const document = parseFragment(htmlText) as Parse5Node
  const tagsSet = new Set(forbiddenTags.map((tag) => tag.toLowerCase()))

  function walk(node: Parse5Node): boolean {
    const childNodes = node.content?.childNodes ?? node.childNodes
    if (childNodes?.some(walk)) {
      return true
    }

    if (tagsSet.has(node.nodeName.toLowerCase())) {
      return true
    }

    return false
  }

  console.dir(document, { depth: null })

  return walk(document)
}

export function hasUnknownTags(htmlText: string, knownTags: string[]): boolean {
  const document = parseFragment(htmlText) as Parse5Node
  const tagsSet = new Set(knownTags.map((tag) => tag.toLowerCase()))

  function walk(node: Parse5Node): boolean {
    const childNodes = node.content?.childNodes ?? node.childNodes
    if (childNodes?.some(walk)) {
      return true
    }

    if (node.nodeName.startsWith('#')) {
      return false
    }

    if (!tagsSet.has(node.nodeName.toLowerCase())) {
      return true
    }

    return false
  }

  return walk(document)
}
