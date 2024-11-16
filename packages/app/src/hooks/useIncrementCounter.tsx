import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import type {
  QueryObserverResult,
  RefetchOptions,
} from '@tanstack/react-query';
import type { BN } from 'fuels';
import { useState } from 'react';
import toast from 'react-hot-toast';
import type { Counter } from '../artifacts';

interface UseIncrementCounterProps {
  contract: Counter | undefined;
  isConnected: boolean | null;
  walletBalance: BN | null;
  setCounter: (value: number) => void;
  refetchBalance?: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<BN | null, Error>>;
}

export const useIncrementCounter = ({
  contract,
  isConnected,
  walletBalance,
  setCounter,
  refetchBalance,
}: UseIncrementCounterProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onIncrementPressed = async () => {
    if (!isConnected)
      return toast.error('Please connect your wallet to increment the counter');
    if (!contract) {
      return toast.error('Contract not loaded');
    }

    if (walletBalance?.eq(0)) {
      return toast.error(
        "Your wallet does not have enough funds. Please click the 'Faucet' button in the top right corner, or use the local faucet."
      );
    }

    try {
      setIsLoading(true);

      const { waitForResult } = await contract.functions.increment().call();

      const { transactionId } = await waitForResult();

      toast(() => (
        <span>
          <CheckCircleIcon color="success" />
          Counter Incremented! View it on the
          <a
            target="_blank"
            className="pl-1 underline"
            href={`https://app.fuel.network/tx/${transactionId}`}
            rel="noreferrer"
          >
            block explorer
          </a>
        </span>
      ));

      const { value } = await contract.functions.count().get();
      setCounter(value.toNumber());

      await refetchBalance?.();
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while incrementing the counter.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    onIncrementPressed,
    isLoading,
  };
};
