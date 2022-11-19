const { createVerify } = require('crypto')
const { PubConverter, getCurves } = require('../lib')

/**
 * Get list of supported curves
 */
const curves = getCurves()

/**
 * Create converter for specified curve.
 */
const converter = PubConverter.for(curves.secp256k1)

/**
 * Raw public key in base64 (65 bytes)
 */
const pub = 'BBuExVZ7EmRAmV0+1aq6BWXXHhg0YEgZ/5wX9enV3QePcL6vj1iLVBUH/tamQsWrQt/fgSCn9jneUSLUemmo6NE='

/**
 * Get keyObject from @node/crypto
 */
const pubObj = converter.toKeyObject(Buffer.from(pub, 'base64'))

/**
 * Our test signature and message
 */
const message = 'Hello world!'
const signature = 'MEUCIDHplD47Iy3PaSspcMmAScvE8Acdwc+4nrlPJwq64oynAiEA5+kGFrOqaihg7OQekCae5eKNprwweT02cKNQ5MPBrAE='

/**
 * Verifiyng signature
 */
const verifier = createVerify('sha256')
verifier.update(message).end()
const result = verifier.verify(pubObj, Buffer.from(signature, 'base64'))

// true
console.log(result)
