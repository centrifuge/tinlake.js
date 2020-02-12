import Eth from 'ethjs';
// TODO import collectively
// NFT
import contractAbiTitle from './abi/Title.abi.json';
import contractAbiCurrency from './abi/test/SimpleToken.abi.json';
import contractAbiShelf from './abi/Shelf.abi.json';
import contractAbiCeiling from './abi/Principal.abi.json';
import contractAbiCollector from './abi/Collector.abi.json';
import contractAbiThreshold from './abi/PushRegistry.abi.json';
import contractAbiPricePool from './abi/PricePool.abi.json';
import contractAbiPile from './abi/Pile.abi.json';
import contractAbiJOperator from './abi/AllowanceOperator.abi.json';
import contractAbiDistributor from './abi/DefaultDistributor.abi.json';
import contractAbiAssessor from './abi/DefaultAssessor.abi.json';
var Tinlake = /** @class */ (function () {
    // tslint:disable-next-line:max-line-length
    function Tinlake(provider, contractAddresses, nftDataOutputs, transactionTimeout, _a) {
        var _this = this;
        var _b = _a === void 0 ? {} : _a, contractAbis = _b.contractAbis, ethOptions = _b.ethOptions, ethConfig = _b.ethConfig;
        this.setProvider = function (provider, ethOptions) {
            _this.provider = provider;
            _this.ethOptions = ethOptions || {};
            _this.eth = new Eth(_this.provider, _this.ethOptions);
            _this.contracts = {
                // borrower
                title: _this.eth.contract(_this.contractAbis.title)
                    .at(_this.contractAddresses['BORROWER_TITLE']),
                currency: _this.eth.contract(_this.contractAbis.currency)
                    .at(_this.contractAddresses['TINLAKE_CURRENCY']),
                shelf: _this.eth.contract(_this.contractAbis.shelf)
                    .at(_this.contractAddresses['BORROWER_SHELF']),
                pile: _this.eth.contract(_this.contractAbis.pile)
                    .at(_this.contractAddresses['PILE']),
                ceiling: _this.eth.contract(_this.contractAbis.ceiling)
                    .at(_this.contractAddresses['BORROWER_CEILING']),
                collector: _this.eth.contract(_this.contractAbis.collector)
                    .at(_this.contractAddresses['BORROWER_COLLECTOR']),
                threshold: _this.eth.contract(_this.contractAbis.threshold)
                    .at(_this.contractAddresses['BORROWER_THRESHOLD']),
                pricePool: _this.eth.contract(_this.contractAbis.pricePool)
                    .at(_this.contractAddresses['BORROWER_PRICE_POOL']),
                nftData: _this.eth.contract(_this.contractAbis.nftData)
                    .at(_this.contractAddresses['NFT_COLLATERAL']),
                nft: _this.eth.contract(_this.contractAbis.nft)
                    .at(_this.contractAddresses['NFT_COLLATERAL']),
                // lender
                jOperator: _this.eth.contract(_this.contractAbis.jOperator)
                    .at(_this.contractAddresses['LENDER_JUNIOR_OPERATOR']),
                distributor: _this.eth.contract(_this.contractAbis.distributor)
                    .at(_this.contractAddresses['LENDER_DISTRIBUTOR']),
                assessor: _this.eth.contract(_this.contractAbis.assessor)
                    .at(_this.contractAddresses['LENDER_ASSESSOR']),
            };
        };
        this.setEthConfig = function (ethConfig) {
            _this.ethConfig = ethConfig;
        };
        this.contractAbis = contractAbis || {
            nft: contractAbiTitle,
            title: contractAbiTitle,
            shelf: contractAbiShelf,
            ceiling: contractAbiCeiling,
            collector: contractAbiCollector,
            currency: contractAbiCurrency,
            threshold: contractAbiThreshold,
            pricePool: contractAbiPricePool,
            pile: contractAbiPile,
            jOperator: contractAbiJOperator,
            distributor: contractAbiDistributor,
            assessor: contractAbiAssessor,
            // collateral: contractAbiCollateral,
            // pile: contractAbiPile,
            nftData: [{
                    constant: true,
                    inputs: [
                        {
                            name: '',
                            type: 'uint256',
                        },
                    ],
                    name: 'data',
                    outputs: nftDataOutputs,
                    payable: false,
                    stateMutability: 'view',
                    type: 'function',
                }],
        };
        this.contractAddresses = contractAddresses;
        this.transactionTimeout = transactionTimeout;
        this.setProvider(provider, ethOptions);
        this.setEthConfig(ethConfig || {});
    }
    return Tinlake;
}());
export { Tinlake };
export default Tinlake;
export * from './utils/baseToDisplay';
export * from './utils/bnToHex';
export * from './utils/displayToBase';
export * from './utils/feeToInterestRate';
export * from './utils/getLoanStatus';
export * from './utils/interestRateToFee';
//# sourceMappingURL=Tinlake.js.map