export declare function executeAndRetry(f: Function, args?: Array<any>): Promise<any>;
export declare const waitAndReturnEvents: (eth: any, txHash: string, abi: any, transactionTimeout: number) => Promise<unknown>;
export declare const waitForTransaction: (eth: any, txHash: any, transactionTimeout: number) => Promise<unknown>;
export declare const findEvent: (abi: {
    filter: (arg0: (item: any) => boolean | undefined) => any[];
}, funcSignature: any) => any[];
