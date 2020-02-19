import { Constructor, Tinlake  } from '../types';
import { waitAndReturnEvents, executeAndRetry } from '../ethereum';

function CurrencyActions<ActionsBase extends Constructor<Tinlake>>(Base: ActionsBase) {
  return class extends Base implements ICurrencyActions {

  }
}

export type ICurrencyActions = {
  // add borrower tinlake type
}

export default CurrencyActions;
