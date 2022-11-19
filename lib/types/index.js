const { defineType } = require('@didkovsky/metatype')

/**
 * Curve schema
 */
const Curve = defineType('Curve', {
  privLength: 'number',
  pubLength: 'number',
  privHeader: 'string',
  privOptions: 'string',
  pubHeader: 'string',
  curveName: 'string',
  encode: 'string'
})

/**
 * For binary public and private keys
 */
const Key = defineType('Key', {
  key: Buffer
})

module.exports = { Curve, Key }
