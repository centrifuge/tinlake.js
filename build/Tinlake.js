import Eth from 'ethjs';
import abiDefinitions from './abi';
var contractNames = [
    'TINLAKE_CURRENCY',
    'JUNIOR_OPERATOR',
    'JUNIOR',
    'JUNIOR_TOKEN',
    'SENIOR',
    'SENIOR_TOKEN',
    'SENIOR_OPERATOR',
    'DISTRIBUTOR',
    'ASSESSOR',
    'TITLE',
    'PILE',
    'SHELF',
    'CEILING',
    'COLLECTOR',
    'THRESHOLD',
    'PRICE_POOL',
    'COLLATERAL_NFT',
    'COLLATERAL_NFT_DATA',
    'ROOT_CONTRACT',
    'PROXY',
    'PROXY_REGISTRY',
    'ACTIONS',
    'BORROWER_DEPLOYER',
    'LENDER_DEPLOYER',
    'NFT_FEED',
    'GOVERNANCE'
];
var Tinlake = /** @class */ (function () {
    function Tinlake(params) {
        var _this = this;
        this.contracts = {};
        this.contractAbis = {};
        this.contractConfig = {};
        this.setProvider = function (provider, ethOptions) {
            _this.provider = provider;
            _this.ethOptions = ethOptions || {};
            _this.eth = new Eth(_this.provider, _this.ethOptions);
            _this.setContracts();
        };
        this.setContracts = function () {
            // set root & proxy contracts
            contractNames.forEach(function (name) {
                if (_this.contractAbis[name] && _this.contractAddresses[name]) {
                    _this.contracts[name] = _this.eth.contract(_this.contractAbis[name])
                        .at(_this.contractAddresses[name]);
                }
            });
            // modular contracts
            if (_this.contractAddresses['JUNIOR_OPERATOR']) {
                _this.contracts['JUNIOR_OPERATOR'] = _this.contractConfig['JUNIOR_OPERATOR']
                    ? _this.createContract(_this.contractAddresses['JUNIOR_OPERATOR'], _this.contractConfig['JUNIOR_OPERATOR'])
                    : _this.createContract(_this.contractAddresses['JUNIOR_OPERATOR'], 'ALLOWANCE_OPERATOR');
            }
            if (_this.contractAddresses['SENIOR_OPERATOR']) {
                _this.contracts['SENIOR_OPERATOR'] = _this.contractConfig['SENIOR_OPERATOR']
                    ? _this.createContract(_this.contractAddresses['SENIOR_OPERATOR'], _this.contractConfig['SENIOR_OPERATOR'])
                    : _this.createContract(_this.contractAddresses['SENIOR_OPERATOR'], 'ALLOWANCE_OPERATOR');
            }
        };
        this.setEthConfig = function (ethConfig) {
            _this.ethConfig = ethConfig;
        };
        this.getOperatorType = function (tranche) {
            switch (tranche) {
                case 'senior':
                    return _this.contractConfig['SENIOR_OPERATOR'] || 'ALLOWANCE_OPERATOR';
                case 'junior':
                    return _this.contractConfig['SENIOR_OPERATOR'] || 'ALLOWANCE_OPERATOR';
                default:
                    return 'ALLOWANCE_OPERATOR';
            }
        };
        var provider = params.provider, contractAddresses = params.contractAddresses, transactionTimeout = params.transactionTimeout, contractAbis = params.contractAbis, ethOptions = params.ethOptions, ethConfig = params.ethConfig, contractConfig = params.contractConfig;
        if (!contractAbis) {
            this.contractAbis = abiDefinitions;
        }
        this.contractConfig = contractConfig || {};
        this.contractAddresses = contractAddresses || {};
        this.transactionTimeout = transactionTimeout;
        this.setProvider(provider, ethOptions);
        this.setEthConfig(ethConfig || {});
    }
    Tinlake.prototype.createContract = function (address, abiName) {
        var contract = this.eth.contract(this.contractAbis[abiName]).at(address);
        return contract;
    };
    return Tinlake;
}());
export default Tinlake;
//# sourceMappingURL=Tinlake.js.map