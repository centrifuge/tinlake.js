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

import { ContractAbis } from '../types';

export default {
    "NFT" : contractAbiTitle,
    "TITLE" : contractAbiTitle,
    "CURRENCY" : contractAbiCurrency,
    "SHELF" : contractAbiShelf,
    "CEILING" : contractAbiCeiling,
    "COLLECTOR" : contractAbiCollector, 
    "THRESHOLD" : contractAbiThreshold,
    "PRICE_POOL" : contractAbiPricePool, 
    "PILE": contractAbiPile, 
    "JUNIOR_OPERATOR" : contractAbiOperator, 
    "DISTRIBUTOR" : contractAbiDistributor, 
    "ASSESSOR": contractAbiAssessor
} as ContractAbis
