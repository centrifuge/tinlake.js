import Admin, { IAdminActions } from './admin';
import Borrower,  { IBorrowerActions } from './borrower';
import Lender, { ILenderActions } from './lender';
import Currency, { ICurrencyActions } from './currency';
import Collateral, { ICollateralActions } from './collateral';
import Analytics, { IAnalyticsActions } from './analytics';

export default {
  Admin,
  Borrower,
  Lender,
  Currency,
  Collateral,
  Analytics,
};

export type TinlakeActions =
    IAdminActions &
    IBorrowerActions &
    ILenderActions &
    ICurrencyActions &
    ILenderActions &
    IAnalyticsActions;
