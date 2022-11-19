const { PubConverter, getCurves } = require('../lib')
const { createECDH } = require('crypto')

/**
 * Get list of supported curves
 */
const curves = getCurves()

/**
 * Create converter for specified curve.
 */
const converter = PubConverter.for(curves.secp256k1)

/**
 * Create keypair
 */
const priv = Buffer.alloc(32, 0x1)
const ecdh = createECDH('secp256k1')
ecdh.setPrivateKey(priv)
const pub = ecdh.getPublicKey()

// BBuExVZ7EmRAmV0+1aq6BWXXHhg0YEgZ/5wX9enV3QePcL6vj1iLVBUH/tamQsWrQt/fgSCn9jneUSLUemmo6NE=
console.log(pub.toString('base64'))

/**
 * GetPem string.
 */
const pem = converter.toPem(pub)

/*
-----BEGIN PUBLIC KEY-----
MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEG4TFVnsSZECZXT7VqroFZdceGDRgSBn/
nBf16dXdB49wvq+PWItUFQf+1qZCxatC39+BIKf2Od5RItR6aajo0Q==
-----END PUBLIC KEY-----
*/
console.log(pem)

/**
 * Get der Buffer.
 */
const der = converter.toDer(pub)

// Buffer(88) [Uint8Array] [ ... ]
console.dir(der)

/**
 * Get KeyObject from @node/crypto
 */
const keyObj = converter.toKeyObject(pub)

// PublicKeyObject { [Symbol(kKeyType)]: 'public' }
console.dir(keyObj)
