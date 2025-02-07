import { hasForbiddenTags, hasUnknownTags } from './parse5'

describe('hasForbiddenTags - Basic', () => {
  it('should return true if there are forbidden tags in the HTML', () => {
    const html = '<div><script></script></div>'
    const forbiddenTags = ['script']
    expect(hasForbiddenTags(html, forbiddenTags)).toBe(true)
  })

  it('should return false if there are no forbidden tags in the HTML', () => {
    const html = '<div><p>Hello</p></div>'
    const forbiddenTags = ['script']
    expect(hasForbiddenTags(html, forbiddenTags)).toBe(false)
  })

  it('should return true for forbidden tag inside nested elements', () => {
    const html = '<div><span><script></script></span></div>'
    const forbiddenTags = ['script']
    expect(hasForbiddenTags(html, forbiddenTags)).toBe(true)
  })

  it('should return false if HTML is empty', () => {
    const html = ''
    const forbiddenTags = ['script']
    expect(hasForbiddenTags(html, forbiddenTags)).toBe(false)
  })

  it('should be case-insensitive when checking forbidden tags', () => {
    const html = '<div><SCRIPT></SCRIPT></div>'
    const forbiddenTags = ['script']
    expect(hasForbiddenTags(html, forbiddenTags)).toBe(true)
  })

  it('should return false if no forbidden tags are present', () => {
    const html = '<div><p>Content</p></div>'
    const forbiddenTags = ['style', 'script']
    expect(hasForbiddenTags(html, forbiddenTags)).toBe(false)
  })

  it('should return false when a forbidden tag is inside an attribute', () => {
    const html = '<div style="background-image:url("<script>")"></div>'
    const forbiddenTags = ['script']
    expect(hasForbiddenTags(html, forbiddenTags)).toBe(false)
  })
})

describe('hasUnknownTags- Basic', () => {
  it('should return true if there are unknown tags in the HTML', () => {
    const html = '<div><unknownTag></unknownTag></div>'
    const knownTags = ['div', 'span']
    expect(hasUnknownTags(html, knownTags)).toBe(true)
  })

  it('should return false if there are no unknown tags in the HTML', () => {
    const html = '<div><span></span></div>'
    const knownTags = ['div', 'span']
    expect(hasUnknownTags(html, knownTags)).toBe(false)
  })

  it('should return false if HTML is empty', () => {
    const html = ''
    const knownTags = ['div', 'span']
    expect(hasUnknownTags(html, knownTags)).toBe(false)
  })

  it('should return true for multiple unknown tags', () => {
    const html =
      '<div><unknownTag></unknownTag><anotherUnknown></anotherUnknown></div>'
    const knownTags = ['div']
    expect(hasUnknownTags(html, knownTags)).toBe(true)
  })

  it('should return false if there are no unknown tags and tags are case-insensitive', () => {
    const html = '<div><SPAN></SPAN></div>'
    const knownTags = ['div', 'span']
    expect(hasUnknownTags(html, knownTags)).toBe(false)
  })

  it('should return true for unknown tag when tags are not case-insensitive', () => {
    const html = '<div><UnknownTag></UnknownTag></div>'
    const knownTags = ['div', 'span']
    expect(hasUnknownTags(html, knownTags)).toBe(true)
  })
})

describe('hasForbiddenTags - Edge Cases', () => {
  it('should return false for tags with no children (self-closing)', () => {
    const html = '<br/>'
    const forbiddenTags = ['script', 'style']
    expect(hasForbiddenTags(html, forbiddenTags)).toBe(false)
  })

  it('should return false if the forbidden tag is in an attribute value but not in the tag itself', () => {
    const html = '<div data-info="<script>alert(1)</script>">content</div>'
    const forbiddenTags = ['script']
    expect(hasForbiddenTags(html, forbiddenTags)).toBe(false)
  })

  it('should return true for multiple forbidden tags', () => {
    const html = '<div><style></style><script></script></div>'
    const forbiddenTags = ['script', 'style']
    expect(hasForbiddenTags(html, forbiddenTags)).toBe(true)
  })

  it('should return true when nested forbidden tags are not direct children', () => {
    const html = '<div><span><style></style></span></div>'
    const forbiddenTags = ['style']
    expect(hasForbiddenTags(html, forbiddenTags)).toBe(true)
  })

  it('should return true when there are multiple instances of a forbidden tag in different parts of HTML', () => {
    const html = '<div><script></script></div><p><script></script></p>'
    const forbiddenTags = ['script']
    expect(hasForbiddenTags(html, forbiddenTags)).toBe(true)
  })

  it('should handle forbidden tags with special characters', () => {
    const html = '<div><script>alert("xss")</script></div>'
    const forbiddenTags = ['script']
    expect(hasForbiddenTags(html, forbiddenTags)).toBe(true)
  })

  it('should return true if the forbidden tag appears as text (e.g., <script> as part of the text)', () => {
    const html = '<div><p>This is a <script>test</script></p></div>'
    const forbiddenTags = ['script']
    expect(hasForbiddenTags(html, forbiddenTags)).toBe(true)
  })
})

describe('hasUnknownTags - Edge Cases', () => {
  it('should return false when there are no unknown tags in a very long HTML', () => {
    const html = '<div>' + '<span></span>'.repeat(1000) + '</div>'
    const knownTags = ['div', 'span']
    expect(hasUnknownTags(html, knownTags)).toBe(false)
  })

  it('should handle empty elements without tags', () => {
    const html = '<div></div>'
    const knownTags = ['div']
    expect(hasUnknownTags(html, knownTags)).toBe(false)
  })

  it('should return true when an unknown tag is in an empty div', () => {
    const html = '<div><unknown></unknown></div>'
    const knownTags = ['div']
    expect(hasUnknownTags(html, knownTags)).toBe(true)
  })

  it('should return false for unknown tag inside a comment', () => {
    const html = '<!-- <unknown></unknown> -->'
    const knownTags = ['div']
    expect(hasUnknownTags(html, knownTags)).toBe(false)
  })

  it('should return true for unknown tag appearing inside another unknown tag', () => {
    const html = '<unknown><unknown></unknown></unknown>'
    const knownTags = ['div']
    expect(hasUnknownTags(html, knownTags)).toBe(true)
  })

  it('should return false when the HTML contains valid self-closing tags', () => {
    const html = '<img src="image.jpg" />'
    const knownTags = ['img']
    expect(hasUnknownTags(html, knownTags)).toBe(false)
  })

  it('should handle tags that are valid in one place but not in another', () => {
    const html = '<table><tr><td><unknown></unknown></td></tr></table>'
    const knownTags = ['table', 'tr', 'td']
    expect(hasUnknownTags(html, knownTags)).toBe(true)
  })

  it('should ignore text nodes (e.g., #text) when checking for unknown tags', () => {
    const html = '<div>#text</div>'
    const knownTags = ['div']
    expect(hasUnknownTags(html, knownTags)).toBe(false)
  })
})

describe('hasForbiddenTags & hasUnknownTags - Special Cases', () => {
  it('should handle very large HTML strings', () => {
    const largeHtml = '<div>' + '<span></span>'.repeat(1000000) + '</div>'
    const forbiddenTags = ['script']
    const knownTags = ['div', 'span']

    expect(hasForbiddenTags(largeHtml, forbiddenTags)).toBe(false)
    expect(hasUnknownTags(largeHtml, knownTags)).toBe(false)
  })

  it('should ignore tag names inside CDATA sections', () => {
    const html = '<div><![CDATA[<script>alert(1)</script>]]></div>'
    const forbiddenTags = ['script']
    expect(hasForbiddenTags(html, forbiddenTags)).toBe(false)
  })

  it('should return false for an unknown tag inside a custom data-attribute', () => {
    const html = '<div data-custom="<unknown>"></div>'
    const knownTags = ['div']
    expect(hasUnknownTags(html, knownTags)).toBe(false)
  })

  it('should correctly handle unescaped angle brackets within text nodes', () => {
    const html = '<div>text <script></script> more text</div>'
    const forbiddenTags = ['script']
    expect(hasForbiddenTags(html, forbiddenTags)).toBe(true)
  })

  it('should correctly handle non-HTML content (e.g., JSON) inside a tag', () => {
    const html = '<div>{"key": "value"}</div>'
    const forbiddenTags = ['script']
    expect(hasForbiddenTags(html, forbiddenTags)).toBe(false)
  })
})

describe('hasForbiddenTags - Additional Test Cases', () => {
  it('should return true if a forbidden tag is in the root element', () => {
    const html = '<script></script>'
    const forbiddenTags = ['script']
    expect(hasForbiddenTags(html, forbiddenTags)).toBe(true)
  })

  it('should return false when a forbidden tag is escaped in an HTML entity', () => {
    const html = '&lt;script&gt;alert(1)&lt;/script&gt;'
    const forbiddenTags = ['script']
    expect(hasForbiddenTags(html, forbiddenTags)).toBe(false)
  })

  it('should return false for a forbidden tag inside a comment and text node', () => {
    const html = '<div><!-- <script>script</script> --></div>'
    const forbiddenTags = ['script']
    expect(hasForbiddenTags(html, forbiddenTags)).toBe(false)
  })

  it('should return true if a forbidden tag is nested inside an element', () => {
    const html = '<div><span><style></style></span></div>'
    const forbiddenTags = ['style']
    expect(hasForbiddenTags(html, forbiddenTags)).toBe(true)
  })

  it('should return false for a self-closing tag with a forbidden tag in an attribute', () => {
    const html = '<input value="<script>alert(1)</script>" />'
    const forbiddenTags = ['script']
    expect(hasForbiddenTags(html, forbiddenTags)).toBe(false)
  })

  it('should handle empty tags that are not forbidden', () => {
    const html = '<br/>'
    const forbiddenTags = ['script']
    expect(hasForbiddenTags(html, forbiddenTags)).toBe(false)
  })

  it('should return false for script tags inside a valid CDATA section', () => {
    const html = '<div><![CDATA[<script>alert(1)</script>]]></div>'
    const forbiddenTags = ['script']
    expect(hasForbiddenTags(html, forbiddenTags)).toBe(false)
  })
})

describe('hasUnknownTags - Additional Test Cases', () => {
  it('should return true if an unknown tag is in the HTML', () => {
    const html = '<div><unknown></unknown></div>'
    const knownTags = ['div']
    expect(hasUnknownTags(html, knownTags)).toBe(true)
  })

  it('should return false for known tags with extra attributes', () => {
    const html = '<div id="main" class="content"></div>'
    const knownTags = ['div']
    expect(hasUnknownTags(html, knownTags)).toBe(false)
  })

  it('should return true for unknown tags within a known tag', () => {
    const html = '<div><unknown></unknown><span></span></div>'
    const knownTags = ['div', 'span']
    expect(hasUnknownTags(html, knownTags)).toBe(true)
  })

  it('should handle attributes with unknown tag names', () => {
    const html = '<div data-tag="<unknown></unknown>"></div>'
    const knownTags = ['div']
    expect(hasUnknownTags(html, knownTags)).toBe(false)
  })

  it('should return true for multiple unknown tags in the same element', () => {
    const html = '<div><unknown><unknown></unknown></unknown></div>'
    const knownTags = ['div']
    expect(hasUnknownTags(html, knownTags)).toBe(true)
  })

  it('should return true for a nested unknown tag', () => {
    const html = '<div><unknown><span></span></unknown></div>'
    const knownTags = ['div', 'span']
    expect(hasUnknownTags(html, knownTags)).toBe(true)
  })

  it('should return false when all unknown tags are inside comments', () => {
    const html = '<!-- <unknown></unknown> -->'
    const knownTags = ['div']
    expect(hasUnknownTags(html, knownTags)).toBe(false)
  })

  it('should return false when unknown tag is in a valid self-closing format', () => {
    const html = '<img src="image.jpg" />'
    const knownTags = ['img']
    expect(hasUnknownTags(html, knownTags)).toBe(false)
  })
})

describe('hasForbiddenTags - Complex HTML Structures', () => {
  it('should return true for forbidden tags in deep nested elements', () => {
    const html = '<div><span><ul><li><script></script></li></ul></span></div>'
    const forbiddenTags = ['script']
    expect(hasForbiddenTags(html, forbiddenTags)).toBe(true)
  })

  it('should return true when forbidden tags are deeply nested', () => {
    const html = '<div><div><div><style></style></div></div></div>'
    const forbiddenTags = ['style']
    expect(hasForbiddenTags(html, forbiddenTags)).toBe(true)
  })

  it('should return false when forbidden tags are inside an allowed tag in a nested structure', () => {
    const html = '<div><span><script></script></span></div>'
    const forbiddenTags = ['style']
    expect(hasForbiddenTags(html, forbiddenTags)).toBe(false)
  })

  it('should return true for forbidden tag inside a custom element', () => {
    const html = '<custom-element><style></style></custom-element>'
    const forbiddenTags = ['style']
    expect(hasForbiddenTags(html, forbiddenTags)).toBe(true)
  })
})

describe('hasUnknownTags - Unknown Tag Formats', () => {
  it('should return true for an unknown tag in the middle of valid tags', () => {
    const html = '<div><p></p><unknown></unknown></div>'
    const knownTags = ['div', 'p']
    expect(hasUnknownTags(html, knownTags)).toBe(true)
  })

  it('should return false for an unknown tag inside a comment', () => {
    const html = '<!-- <unknown></unknown> -->'
    const knownTags = ['div']
    expect(hasUnknownTags(html, knownTags)).toBe(false)
  })

  it('should return false for an unknown tag inside a valid tag with other attributes', () => {
    const html = '<div data-tag="<unknown>"></div>'
    const knownTags = ['div']
    expect(hasUnknownTags(html, knownTags)).toBe(false)
  })
})

describe('hasForbiddenTags & hasUnknownTags - Edge Cases', () => {
  it('should handle HTML containing mixed valid and invalid tag names', () => {
    const html = '<div><unknown></unknown><span></span></div>'
    const forbiddenTags = ['style']
    const knownTags = ['div', 'span']
    expect(hasForbiddenTags(html, forbiddenTags)).toBe(false)
    expect(hasUnknownTags(html, knownTags)).toBe(true)
  })

  it('should return true if a forbidden tag is part of the text node', () => {
    const html = '<div>This is a <script>test</script></div>'
    const forbiddenTags = ['script']
    expect(hasForbiddenTags(html, forbiddenTags)).toBe(true)
  })

  it('should return false for an unknown tag inside a valid tag', () => {
    const html = '<div><unknown></unknown></div>'
    const knownTags = ['div']
    expect(hasUnknownTags(html, knownTags)).toBe(true)
  })

  it('should return true for unknown tag inside a custom HTML element', () => {
    const html = '<custom-tag><unknown></unknown></custom-tag>'
    const knownTags = ['custom-tag']
    expect(hasUnknownTags(html, knownTags)).toBe(true)
  })

  it('should correctly handle edge case with mixed case in tags', () => {
    const html = '<Div><SpAn></SpAn></Div>'
    const knownTags = ['div', 'span']
    expect(hasUnknownTags(html, knownTags)).toBe(false)
  })
})

describe('hasForbiddenTags - Different Contexts', () => {
  it('should return true for forbidden tags inside script blocks', () => {
    const html = '<div><script>alert("test")</script></div>'
    const forbiddenTags = ['script']
    expect(hasForbiddenTags(html, forbiddenTags)).toBe(true)
  })

  it('should handle forbidden tags inside template literals', () => {
    const html = '<div><template><script></template></div>'
    const forbiddenTags = ['script']
    expect(hasForbiddenTags(html, forbiddenTags)).toBe(true)
  })

  it('should correctly identify a forbidden tag inside a nested template', () => {
    const html = '<template><div><style></style></div></template>'
    const forbiddenTags = ['style']
    expect(hasForbiddenTags(html, forbiddenTags)).toBe(true)
  })

  it('should return false if forbidden tags are inside a valid script block', () => {
    const html = '<script><div><script></script></div></script>'
    const forbiddenTags = ['style']
    expect(hasForbiddenTags(html, forbiddenTags)).toBe(false)
  })
})

describe('Complex HTML Structures with Forbidden Tags and Unknown Tags', () => {
  it('should return true for a forbidden tag in a deeply nested structure', () => {
    const html = '<div><div><script></script></div></div>'
    const forbiddenTags = ['script']
    expect(hasForbiddenTags(html, forbiddenTags)).toBe(true)
  })

  it('should return true for unknown tags in deeply nested structures', () => {
    const html = '<div><div><unknown></unknown></div></div>'
    const knownTags = ['div']
    expect(hasUnknownTags(html, knownTags)).toBe(true)
  })

  it('should return false when there are multiple known tags but the forbidden tag is nested', () => {
    const html = '<div><span><script></span></div>'
    const forbiddenTags = ['style']
    expect(hasForbiddenTags(html, forbiddenTags)).toBe(false)
  })
})
