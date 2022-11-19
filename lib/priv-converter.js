'use strict'
const { createECDH, createPrivateKey } = require('crypto')
const assert = require('assert/strict')
const { Key } = require('./types')
const { Converter } = require('./converter')

/**
 * Implementation of Converter for private keys
 */
class PrivConverter extends Converter {

  /**
   * Use PrivConverter.for()
   */
  constructor(curve) {
    super(curve)
  }

  /**
   * Default factory
   * @param {*} curve - watch ./types
   * @returns PrivConverter instance
   */
  static for(curve) {
    return new PrivConverter(curve)
  }

  /**
   * Validate key. Will thow error if key invalid.
   * @param {*} key - key as Buffer.
   */
  validateKey(key) {
    Key.validate({key})
    const { privLength } = this
    assert(
      key.length === privLength,
      `Invalid private key length. Required ${privLength} bytes. ` +
      `Received: ${key.length}.`
    )
  }

  /**
   * Get public key from private
   * @param {*} priv - private key as Buffer
   * @returns public key as Buffer
   */
  getPublicKey(priv) {
    this.validateKey(priv)
    const { curveName } = this
    const ecdh = createECDH(curveName)
    ecdh.setPrivateKey(priv)
    return ecdh.getPublicKey()
  }

  /**
   * Convert key to DER format.
   * @param {*} priv - key as Buffer.
   * @returns Private key buffer in DER format specified in rfc7468
   * https://datatracker.ietf.org/doc/html/rfc7468
   */
  toDer(priv) {
    const { privHeader, privOptions } = this
    const pub = this.getPublicKey(priv)
    return Buffer.concat([ privHeader, priv, privOptions, pub ])
  }

  /**
   * Convert key to KeyObject from @node/crypto.
   * @param {*} priv - key as Buffer.
   * @param passphrase - Passphrase to encrypt private key (optional)
   * @returns KeyObject specified in nodejs/crypto
   * https://nodejs.org/dist/latest-v17.x/docs/api/crypto.html#class-keyobject
   */
  toKeyObject(priv, passphrase) {
    const key = this.toDer(priv)
    const type = 'sec1'
    const format = 'der'
    const input = { key, type, format }
    if (passphrase) input.passphrase = passphrase
    return createPrivateKey(input)
  }

  /**
   * Convert key to PEM format.
   * @param {*} priv - key as Buffer.
   * @param passphrase - Passphrase to encrypt private key (optional)
   * @returns string in PEM format specified in rfc7468
   * https://datatracker.ietf.org/doc/html/rfc7468
   */
  toPem(priv, passphrase) {
    const keyObj = this.toKeyObject(priv, passphrase)
    const type = 'sec1'
    const format = 'pem'
    const options = { type, format }
    return keyObj.export(options)
  }
}

module.exports = { PrivConverter }
