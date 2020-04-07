import TitleAbiJson from './Title.abi.json';
import SimpleTokenAbiJson from './test/SimpleToken.abi.json';
import ShelfAbiJson from './Shelf.abi.json';
import PrincipalAbiJson from './Principal.abi.json';
import CollectorAbiJson from './Collector.abi.json';
import PushRegistryAbiJson from './PushRegistry.abi.json';
import PricePoolAbiJson from './PricePool.abi.json';
import PileAbiJson from './Pile.abi.json';
import AllowanceOperatorAbiJson from './AllowanceOperator.abi.json';
import DefaultDistributorAbiJson from './DefaultDistributor.abi.json';
import DefaultAssessorAbiJson from './DefaultAssessor.abi.json';
import RootAbiJson from './Root.abi.json';
import ActionsAbiJson from './Actions.abi.json';
import ProxyAbiJson from './Proxy.abi.json';
import ProxyRegistryAbiJson from './ProxyRegistry.abi.json';
import TrancheAbiJson from './Tranche.abi.json';
import NftDataAbiJson from './NftData.abi.json';
import SimpleNFTAbiJson from './test/SimpleNFT.abi.json';
import { ContractAbis } from '../Tinlake';

export default {
  // COLLATERAL_NFT : contractAbiTitle,
  COLLATERAL_NFT : contractAbiNFT,
  COLLATERAL_NFT_DATA: contractAbiNFTData,
  TITLE : contractAbiTitle,
  TINLAKE_CURRENCY : contractAbiCurrency,
  SHELF : contractAbiShelf,
  CEILING : contractAbiCeiling,
  COLLECTOR : contractAbiCollector,
  THRESHOLD : contractAbiThreshold,
  PRICE_POOL : contractAbiPricePool,
  PILE: contractAbiPile,
  DISTRIBUTOR : contractAbiDistributor,
  ASSESSOR: contractAbiAssessor,
  ROOT_CONTRACT: contractAbiRoot,
  JUNIOR_TOKEN: contractAbiCurrency,
  SENIOR_TOKEN: contractAbiCurrency,
  PROXY: contractAbiProxy,
  PROXY_REGISTRY: contractAbiProxyRegistry,
  ACTIONS: contractAbiActions,
  JUNIOR_OPERATOR : contractAbiOperator,
  JUNIOR: contractAbiTranche,
  SENIOR: contractAbiTranche,
} as ContractAbis;
