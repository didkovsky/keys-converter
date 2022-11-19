const { createSign } = require('crypto')
const { PrivConverter, getCurves } = require('../lib')

/**
 * Get list of supported curves
 */
const curves = getCurves()

/**
 * Create converter for specified curve.
 */
const converter = PrivConverter.for(curves.secp256k1)
 
/**
 * Some private key.
 */
const priv = Buffer.alloc(32, 0x1)

/**
 * Get keyObject from @node/crypto
 */
const privObj = converter.toKeyObject(priv)

/**
 * Signing some message.
 */
const message = 'Hello world!'
const signer = createSign('sha256')
signer.update(message).end()
const signature = signer.sign(privObj)

// MEUCIDHplD47Iy3PaSspcMmAScvE8Acdwc+4nrlPJwq64oynAiEA5+kGFrOqaihg7OQekCae5eKNprwweT02cKNQ5MPBrAE=
console.log(signature.toString('base64'))
