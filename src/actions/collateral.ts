import { Constructor, Tinlake  } from '../types';
import { waitAndReturnEvents, executeAndRetry } from '../ethereum';

function CollateralActions<ActionsBase extends Constructor<Tinlake>>(Base: ActionsBase) {
  return class extends Base implements ICollateralActions {

  }
}

export type ICollateralActions = {
  // add borrower tinlake type
}

export default CollateralActions;
