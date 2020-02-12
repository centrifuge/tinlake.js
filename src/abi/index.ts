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

export default {
    title : contractAbiTitle,
    currency : contractAbiCurrency,
    shelf : contractAbiShelf,
    ceiling : contractAbiCeiling,
    collector : contractAbiCollector, 
    threshold : contractAbiThreshold,
    pricePool : contractAbiPricePool, 
    pile : contractAbiPile, 
    operator : contractAbiOperator, 
    distributor : contractAbiDistributor, 
    assessor: contractAbiAssessor,
}