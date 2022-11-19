'use strict'
const { curves } = require('../curves.json')

/**
 * Get available curves.
 * @returns { curves } from ../curves.json
 */
const getCurves = () => curves

module.exports = { getCurves }
