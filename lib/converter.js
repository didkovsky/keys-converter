'use strict'
const { Curve } = require('./types')

/**
 * Abstract converter,
 * see PrivConverter and PubConverter.
 */
class Converter {

  constructor(curve) {
    Curve.validate(curve)
    const { privHeader, privOptions, pubHeader,
      privLength, pubLength, curveName, encode } = curve
    Object.assign(this, { privLength, pubLength, curveName })
    this.privHeader = Buffer.from(privHeader, encode)
    this.privOptions = Buffer.from(privOptions, encode)
    this.pubHeader = Buffer.from(pubHeader, encode)
  }

  /**
   * Validate key. Will thow error if key invalid.
   */
  validateKey() {
    throw new Error('Method not implemented.')
  }

  /**
   * Convert key to DER format.
   */
  toDer() {
    throw new Error('Method not implemented.')
  }

  /**
   * Convert key to KeyObject from @node/crypto.
   */
  toKeyObject() {
    throw new Error('Method not implemented.')
  }

  /**
   * Convert key to PEM format.
   */
  toPem() {
    throw new Error('Method not implemented.')
  }
}

module.exports = { Converter }
