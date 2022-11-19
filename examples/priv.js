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
 * GetPem string.
 */
const pem = converter.toPem(priv)

/*
-----BEGIN EC PRIVATE KEY-----
MHQCAQEEIAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBoAcGBSuBBAAK
oUQDQgAEG4TFVnsSZECZXT7VqroFZdceGDRgSBn/nBf16dXdB49wvq+PWItUFQf+
1qZCxatC39+BIKf2Od5RItR6aajo0Q==
-----END EC PRIVATE KEY-----
*/
console.log(pem)

/**
 * Get der Buffer.
 */
const der = converter.toDer(priv)

// Buffer(118) [Uint8Array] [ ... ]
console.dir(der)

/**
 * Get KeyObject from @node/crypto
 */
const keyObj = converter.toKeyObject(priv)

// PrivateKeyObject { [Symbol(kKeyType)]: 'private' }
console.dir(keyObj)
