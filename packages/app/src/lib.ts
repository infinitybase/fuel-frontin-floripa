import type { Account, BN } from 'fuels';

type DappEnvironment = 'local' | 'testnet';

const getEnv = () => {
  try {
    if (import.meta.env) {
      return import.meta.env;
    }
    return process.env;
  } catch {
    return process.env;
  }
};

const env = getEnv();

export const CURRENT_ENVIRONMENT: DappEnvironment =
  (env.VITE_PUBLIC_DAPP_ENVIRONMENT as DappEnvironment) || 'local';

export const NODE_URL =
  CURRENT_ENVIRONMENT === 'local'
    ? `http://localhost:${env.VITE_PUBLIC_FUEL_NODE_PORT || 4000}/v1/graphql`
    : 'https://testnet.fuel.network/v1/graphql';

export interface AppWallet {
  wallet?: Account;
  walletBalance?: BN;
  refreshWalletBalance?: () => Promise<void>;
}

export const TESTNET_FAUCET_LINK = 'https://faucet-testnet.fuel.network/';
export const FAUCET_PRIVATE_KEY =
  '0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298';
export const WC_PROJECT_ID = env.VITE_PUBLIC_APP_WC_PROJECT_ID!;
export const VITE_BASE_URL = env.VITE_BASE_URL ?? '';
