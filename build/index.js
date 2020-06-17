import actions from './actions/index';
import Tinlake from './Tinlake';
var Admin = actions.Admin, Borrower = actions.Borrower, Lender = actions.Lender, Analytics = actions.Analytics, Currency = actions.Currency, Collateral = actions.Collateral, Governance = actions.Governance, Proxy = actions.Proxy;
export var TinlakeWithActions = (Proxy(Borrower(Admin(Lender(Analytics(Currency(Collateral(Governance(Tinlake)))))))));
export default TinlakeWithActions;
export * from './utils/baseToDisplay';
export * from './utils/bnToHex';
export * from './utils/displayToBase';
export * from './utils/feeToInterestRate';
export * from './utils/getLoanStatus';
export * from './utils/interestRateToFee';
//# sourceMappingURL=index.js.map