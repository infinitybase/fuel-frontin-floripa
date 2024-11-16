import { useState } from 'react';
import useAsync from 'react-use/lib/useAsync';
import { Counter } from '../artifacts';
import contractIds from '../artifacts/contract-ids.json';
import { Button } from '../components/Button';
import { FuelLogo } from '../components/FuelLogo.tsx';
import { useActiveWallet } from '../hooks/useActiveWallet';
import { useIncrementCounter } from '../hooks/useIncrementCounter';
import { CURRENT_ENVIRONMENT } from '../lib';

const contractId =
  CURRENT_ENVIRONMENT === 'local'
    ? contractIds.counter
    : (process.env.VITE_PUBLIC_TESTNET_COUNTER_CONTRACT_ID as string);

export default function CounterPage() {
  const { wallet, walletBalance, refetchBalance, isConnected } =
    useActiveWallet();
  const [contract, setContract] = useState<Counter>();
  const [counter, setCounter] = useState<number>();

  useAsync(async () => {
    if (wallet) {
      const testContract = new Counter(contractId, wallet);
      setContract(testContract);
      const { value } = await testContract.functions.count().get();
      setCounter(value.toNumber());
    }
  }, [wallet]);

  const { onIncrementPressed, isLoading } = useIncrementCounter({
    contract,
    isConnected,
    walletBalance,
    setCounter,
    refetchBalance,
  });

  return (
    <>
      <div className="flex justify-center items-center gap-4">
        <FuelLogo />
        <h3 className="text-2xl font-semibold">Counter</h3>
      </div>

      <span data-testid="counter" className="text-gray-400 text-6xl">
        {counter}
      </span>

      <Button
        onClick={onIncrementPressed}
        className={`mt-6 ${
          isLoading
            ? 'bg-buttontransition border border-gray-400 pointer-events-none'
            : !isConnected
              ? 'bg-gray-500'
              : ''
        }`}
      >
        {isLoading ? 'Incrementing...' : 'Increment Counter'}
      </Button>
    </>
  );
}
