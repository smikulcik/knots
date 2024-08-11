/* globals describe, it */

import { rref2x3 } from '../src/linear.js'
import { expect } from 'chai'

/*
 * var { rref2x3 } = require('../src/linear')
 * var { expect } = require("chai")
 */

describe(
  'rref2x3',
  () => {
    describe(
      'given simple system',
      () => {
        it(
          'solves the matrix',
          () => {
            const input = [
              1, 2, 3,
              4, 5, 6,
            ]
            expect(rref2x3(...input)).to.deep.equal([
              -1,
              2,
            ])
          },
        )
      },
    )
  },
)
