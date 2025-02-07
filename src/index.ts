import nodeSchema from './schema'

const result = nodeSchema({
  type: 'EMAIL-HTML',
  children: '<span><strong>Click me</strong> Outside </span>',
})

console.log(result)
