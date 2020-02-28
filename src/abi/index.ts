import contractAbiTitle from './Title.abi.json';
import contractAbiCurrency from './test/SimpleToken.abi.json';
import contractAbiShelf from './Shelf.abi.json';
import contractAbiCeiling from './Principal.abi.json';
import contractAbiCollector from './Collector.abi.json';
import contractAbiThreshold from './PushRegistry.abi.json';
import contractAbiPricePool from './PricePool.abi.json';
import contractAbiPile from './Pile.abi.json';
import contractAbiOperator from './AllowanceOperator.abi.json';
import contractAbiDistributor from './DefaultDistributor.abi.json';
import contractAbiAssessor from './DefaultAssessor.abi.json';
import contractAbiRoot from './Root.abi.json';
import contractAbiActions from './Actions.abi.json';
import contractAbiProxy from './Proxy.abi.json';
import contractAbiProxyRegistry from './ProxyRegistry.abi.json';

import contractAbiTestProxyRegistry from './TestProxyRegistry.abi.json';
import contractAbiTestProxy from './TestProxy.abi.json';

import { ContractAbis } from '../types';

export default {
  COLLATERAL_NFT : contractAbiTitle,
  TITLE : contractAbiTitle,
  TINLAKE_CURRENCY : contractAbiCurrency,
  SHELF : contractAbiShelf,
  CEILING : contractAbiCeiling,
  COLLECTOR : contractAbiCollector,
  THRESHOLD : contractAbiThreshold,
  PRICE_POOL : contractAbiPricePool,
  PILE: contractAbiPile,
  JUNIOR_OPERATOR : contractAbiOperator,
  DISTRIBUTOR : contractAbiDistributor,
  ASSESSOR: contractAbiAssessor,
  ROOT_CONTRACT: contractAbiRoot,
  JUNIOR_TOKEN: contractAbiCurrency,
  SENIOR_TOKEN: contractAbiCurrency,
  PROXY: contractAbiProxy,
  PROXY_REGISTRY: contractAbiProxyRegistry,
  ACTIONS: contractAbiActions,
  TEST_PROXY_REGISTRY: contractAbiTestProxyRegistry,
  TEST_PROXY: contractAbiTestProxy,
} as ContractAbis;
