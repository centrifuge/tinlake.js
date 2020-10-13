import BN from 'bn.js'

/**
 * The limitations are:
 * - only input variables (those in state or orderState) can be on the right side of the constraint (the bnds key)
 * - only output variables ([dropRedeem,tinRedeem,tinInvest,dropInvest]) can be on the left side of the constraint (the vars key)
 * - variables can have coefficients, but there's no option for brackets or other more advanced equation forms
 *   (e.g. it's limited to a * x_1 + b * x_2 + ..., where [a,b] are coefficients and [x_1,x_2] are variables)
 * - larger than or equals, less than or equals, and equals constraints are all allowed ([<=,>=,=])
 */
export const calculateOptimalSolution = async (
  state: State,
  orderState: OrderState,
  weights: SolverWeights
): Promise<SolverResult> => {
  return require('glpk.js').then((glpk: any) => {
    const lp = {
      name: 'LP',
      objective: {
        // Maximize: dropRedeem > tinRedeem > tinInvest > dropInvest
        direction: glpk.GLP_MAX,
        name: 'obj',
        vars: [
          { name: 'dropRedeem', coef: weights.seniorRedeem },
          { name: 'tinRedeem', coef: weights.juniorRedeem },
          { name: 'tinInvest', coef: weights.juniorSupply },
          { name: 'dropInvest', coef: weights.seniorSupply },
        ],
      },
      subjectTo: [
        {
          name: 'currencyAvailable',
          vars: [
            { name: 'tinInvest', coef: 1.0 },
            { name: 'dropInvest', coef: 1.0 },
            { name: 'tinRedeem', coef: -1.0 },
            { name: 'dropRedeem', coef: -1.0 },
          ],
          bnds: { type: glpk.GLP_LO, ub: 0.0, lb: state.reserve.neg().toString() },
        },
        {
          name: 'dropRedeemOrder',
          vars: [{ name: 'dropRedeem', coef: 1.0 }],
          bnds: { type: glpk.GLP_UP, ub: orderState.dropRedeemOrder.toString(), lb: 0.0 },
        },
        {
          name: 'tinRedeemOrder',
          vars: [{ name: 'tinRedeem', coef: 1.0 }],
          bnds: { type: glpk.GLP_UP, ub: orderState.tinRedeemOrder.toString(), lb: 0.0 },
        },
        {
          name: 'dropInvestOrder',
          vars: [{ name: 'dropInvest', coef: 1.0 }],
          bnds: { type: glpk.GLP_UP, ub: orderState.dropInvestOrder.toString(), lb: 0.0 },
        },
        {
          name: 'tinInvestOrder',
          vars: [{ name: 'tinInvest', coef: 1.0 }],
          bnds: { type: glpk.GLP_UP, ub: orderState.tinInvestOrder.toString(), lb: 0.0 },
        },
        {
          name: 'maxReserve',
          vars: [
            { name: 'tinRedeem', coef: -1.0 },
            { name: 'dropRedeem', coef: -1.0 },
            { name: 'tinInvest', coef: 1.0 },
            { name: 'dropInvest', coef: 1.0 },
          ],
          bnds: { type: glpk.GLP_UP, ub: state.maxReserve.sub(state.reserve).toString(), lb: 0.0 },
        },
        /**
         * The next tow constraints were rewritten from the original equations in the epoch model.
         * For one, minTINRatio was rewritten as a lower bound, which means both sides were multiplied by -1.
         * Secondly, all output vars were moved to the left side, while all input vars were moved to the right side.
         *
         * E.g. for dropRedeem, in the epoch model there's both -I4*(1-B7) and +I4.
         * So: -I4*(1-B7) + I4 = -0.8 I4 + 1.0 I4 = 0.2 I4 = minTinRatio * dropRedeem.
         */
        {
          name: 'minTINRatio',
          vars: [
            { name: 'tinRedeem', coef: new BN(1).sub(state.minTinRatio).neg().toString() },
            { name: 'dropRedeem', coef: state.minTinRatio.toString() },
            { name: 'tinInvest', coef: new BN(1).sub(state.minTinRatio).toString() },
            { name: 'dropInvest', coef: state.minTinRatio.neg().toString() },
          ],
          bnds: {
            type: glpk.GLP_LO,
            ub: 0.0,
            lb: new BN(1)
              .sub(state.minTinRatio)
              .neg()
              .mul(state.netAssetValue)
              .sub(new BN(1).sub(state.minTinRatio).mul(state.reserve))
              .add(state.seniorAsset)
              .toString(),
          },
        },
        {
          name: 'maxTINRatio',
          vars: [
            { name: 'tinInvest', coef: new BN(1).sub(state.maxTinRatio).neg().toString() },
            { name: 'dropInvest', coef: state.maxTinRatio.toString() },
            { name: 'tinRedeem', coef: new BN(1).sub(state.maxTinRatio).toString() },
            { name: 'dropRedeem', coef: state.maxTinRatio.neg().toString() },
          ],
          bnds: {
            type: glpk.GLP_LO,
            ub: 0.0,
            lb: new BN(1)
              .sub(state.maxTinRatio)
              .mul(state.netAssetValue)
              .add(new BN(1).sub(state.maxTinRatio).mul(state.reserve))
              .sub(state.seniorAsset)
              .toString(),
          },
        },
      ],
    }

    try {
      const output = glpk.solve(lp, glpk.GLP_MSG_ERR)
      return output.result
    } catch (e) {
      console.error(`Error caught during solver execution: ${e}`)

      return {
        z: 0,
        status: 0,
        vars: {},
        error: e,
      }
    }
  })
}

export interface State {
  netAssetValue: BN
  reserve: BN
  seniorAsset: BN
  minTinRatio: BN
  maxTinRatio: BN
  maxReserve: BN
}

export interface OrderState {
  tinRedeemOrder: BN
  dropRedeemOrder: BN
  tinInvestOrder: BN
  dropInvestOrder: BN
}

export interface SolverWeights {
  seniorRedeem: number
  juniorRedeem: number
  juniorSupply: number
  seniorSupply: number
}

export interface SolverSolution {
  tinRedeem: number
  dropRedeem: number
  tinInvest: number
  dropInvest: number
}

export interface SolverResult {
  z: number
  status: number
  vars: SolverSolution
  error?: string
}
