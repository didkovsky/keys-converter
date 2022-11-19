'use strict'
const { createPublicKey } = require('crypto')
const assert = require('assert/strict')
const { Key } = require('./types')
const { Converter } = require('./converter')

/**
 * Implementation of Converter for public keys
 */
class PubConverter extends Converter {

  /**
   * Use PubConverter.for()
   */
  constructor(curve) {
    super(curve)
  }

  /**
   * Default factory
   * @param {*} curve - watch ./types
   * @returns PubConverter instance
   */
  static for(curve) {
    return new PubConverter(curve)
  }

  /**
   * Validate key. Will thow error if key invalid.
   * @param {*} key - key as Buffer.
   */
  validateKey(key) {
    Key.validate({key})
    const { pubLength } = this
    assert(key[0] === 0x04, 'Invalid public key prefix.')
    assert(
      key.length === pubLength,
      `Invalid public key length. Expected: ${pubLength} bytes. ` +
      `Received: ${key.length}.`
    )
  }

  /**
   * Convert key to DER format.
   * @param {*} pub - key as Buffer.
   * @returns public key buffer in DER format specified in rfc7468
   * https://datatracker.ietf.org/doc/html/rfc7468
   */
  toDer(pub) {
    this.validateKey(pub)
    return Buffer.concat([ this.pubHeader, pub ])
  }

  /**
   * Convert key to KeyObject from @node/crypto.
   * @param {*} pub - key as Buffer.
   * @returns KeyObject specified in nodejs/crypto
   * https://nodejs.org/dist/latest-v17.x/docs/api/crypto.html#class-keyobject
   */
  toKeyObject(pub) {
    const key = this.toDer(pub)
    const type = 'spki'
    const format = 'der'
    const input = { key, type, format }
    return createPublicKey(input)
  }

  /**
   * Convert key to PEM format.
   * @param {*} pub - key as Buffer.
   * @returns string in PEM format specified in rfc7468
   * https://datatracker.ietf.org/doc/html/rfc7468
   */
  toPem(pub) {
    const keyObj = this.toKeyObject(pub)
    const type = 'spki'
    const format = 'pem'
    const options = { type, format }
    return keyObj.export(options)
  }
}

module.exports = { PubConverter }
