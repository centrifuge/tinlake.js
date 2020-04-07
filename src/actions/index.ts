import admin, { IAdminActions } from './admin';
import borrower,  { IBorrowerActions } from './borrower';
import lender, { ILenderActions } from './lender';
import currency, { ICurrencyActions } from './currency';
import collateral, { ICollateralActions } from './collateral';
import analytics, { IAnalyticsActions } from './analytics';
import governance, { IGovernanceActions } from './governance';
import proxy, { IProxyActions } from './proxy';

export default {
  Admin,
  Borrower,
  Lender,
  Currency,
  Collateral,
  Analytics,
  Governance,
  Proxy,
};

export type TinlakeActions =
    IAdminActions &
    IBorrowerActions &
    ILenderActions &
    ICurrencyActions &
    ILenderActions &
    IAnalyticsActions &
    ICollateralActions &
    IGovernanceActions &
    IProxyActions;
