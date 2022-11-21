const { getCurves } = require('../')

/**
 * Get curve
 */
const curve = getCurves().brainpoolP256t1

/**
 * {
      privLength: 32,
      pubLength: 65,
      privHeader: '30780201010420',
      privOptions: 'a00b06092b2403030208010108a144034200',
      pubHeader: '305a301406072a8648ce3d020106092b2403030208010108034200',
      curveName: 'brainpoolP256t1',
      encode: 'hex'
    }
 */
console.dir(curve)
