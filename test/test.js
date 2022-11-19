const metatests = require('metatests')
const { PrivConverter, PubConverter, getCurves } = require('../lib')
const { createSign, createVerify, createECDH } = require('crypto')

/**
 * Supported curves list
 */
const curves = getCurves()

/**
 * Sign message with private KeyObject
 * @param {*} message - test message
 * @param {*} key - KeyObject
 * @returns signature as Buffer
 */
const sign = (message, key) => {
  const signer = createSign('sha256')
  signer.update(message).end()
  return signer.sign(key)
}

/**
 * Generate keypair for given curve
 * @param {*} curve - from getCurves()
 * @returns { priv, pub } as Buffer
 */
const keygen = (curve) => {
  const { curveName, privLength } = curve
  const priv = Buffer.alloc(privLength, 0x1)
  const ecdh = createECDH(curveName)
  ecdh.setPrivateKey(priv)
  const pub = ecdh.getPublicKey()
  return { priv, pub }
}

/**
 * Verify signature with public KeyObject
 * @param {*} message - test message
 * @param {*} key - KeyObject
 * @param {*} signature - signature (Buffer)
 * @returns true if signature ok
 */
const verify = (message, key, signature) => {
  const verifier = createVerify('sha256')
  verifier.update(message).end()
  return verifier.verify(key, signature)
}

/**
 * Running test for each curve
 */
for (const name in curves) {
  const curve = curves[name]
  metatests.test(name, test => {
    const message = 'message'
    const privConverter = PrivConverter.for(curve)
    const pubConverter = PubConverter.for(curve)
    const { priv, pub } = keygen(curve)
    const privObj = privConverter.toKeyObject(priv)
    const signature = sign(message, privObj)
    const pubObj = pubConverter.toKeyObject(pub)
    const result = verify(message, pubObj, signature)
    test.strictEqual(result, true, `${name} failed.`)
    test.end()
  })
}
