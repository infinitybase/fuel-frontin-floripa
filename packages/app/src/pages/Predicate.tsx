import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { type BN, type InputValue, type Predicate, Wallet, bn } from 'fuels';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { PredicateExample } from '../artifacts';
import { Button } from '../components/Button.tsx';
import { FuelLogo } from '../components/FuelLogo';
import { Input } from '../components/Input.tsx';
import { getTruncatedAddress } from '../components/WalletDisplay.tsx';
import { useActiveWallet } from '../hooks/useActiveWallet';
import { FAUCET_PRIVATE_KEY } from '../lib.ts';

export default function PredicatePage() {
  const { wallet } = useActiveWallet();
  const [predicate, setPredicate] = useState<Predicate<InputValue[]>>();
  const [_predicateBalance, setPredicateBalance] = useState<BN>();
  const [_pin, _setPin] = useState<string>('');
  const [receiver, setReceiver] = useState('');
  const [txAddress, setTxAddress] = useState('');

  const createPredicate = async () => {
    if (wallet) {
      const provider = wallet.provider;
      const predicateInstance = new PredicateExample({
        provider,
        configurableConstants: {
          RECEIVER: { bits: receiver },
        },
      });
      setPredicate(predicateInstance);
      const walletUnlocked = Wallet.fromPrivateKey(
        FAUCET_PRIVATE_KEY,
        wallet.provider
      );
      const tx = await walletUnlocked.transfer(
        predicateInstance.address,
        bn.parseUnits('1')
      );
      await tx.waitForResult();
      setPredicateBalance(await predicateInstance.getBalance());
    }
  };

  const sendTransaction = async () => {
    if (predicate) {
      try {
        const transactionResponse = await predicate.transfer(
          txAddress,
          bn.parseUnits('1')
        );
        const { id } = await transactionResponse.waitForResult();
        toast(() => (
          <span>
            <CheckCircleIcon color="success" />
            Predicate transaction success! View it on the
            <a
              target="_blank"
              className="pl-1 underline"
              href={`https://app.fuel.network/tx/${id}`}
              rel="noreferrer"
            >
              block explorer
            </a>
          </span>
        ));
        setPredicateBalance(await predicate.getBalance());
      } catch (_e) {
        toast.error('Transaction failed');
      }
    }
  };

  return (
    <>
      <div className="flex justify-center items-center gap-4">
        <FuelLogo />
        <h3 className="text-2xl font-semibold">Predicate</h3>
      </div>

      {predicate ? (
        <>
          <div className="flex gap-2 md:gap-4 items-center flex-wrap mt-10 mb-2">
            <Link
              to={`https://app.fuel.network/account/${predicate.address.toB256()}`}
              target="_blank"
              className="text-gray-400 hover:underline hover:text-green-400"
            >
              {getTruncatedAddress(predicate.address.toB256() as string)}
            </Link>
            <span data-testid="wallet-balance" className="text-gray-400">
              Balance:{' '}
              {_predicateBalance?.format({
                precision: 5,
              })}{' '}
              ETH
            </span>
          </div>
          <div className="flex flex-col my-10">
            <Input
              value={txAddress}
              onChange={(e) => setTxAddress(e.target.value)}
            />
            <Button onClick={sendTransaction} className={'mt-6'}>
              Send transaction
            </Button>
          </div>
        </>
      ) : (
        <div className="flex flex-col my-10">
          <Input
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
          />
          <Button onClick={createPredicate} className={'mt-6'}>
            Create Predicate
          </Button>
        </div>
      )}
    </>
  );
}
