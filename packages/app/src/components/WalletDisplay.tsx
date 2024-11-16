import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import CopyIconDark from '../assets/copy.svg';
import { useActiveWallet } from '../hooks/useActiveWallet';
export const getTruncatedAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  toast.success('Address copied to clipboard');
};

export const WalletDisplay: React.FC = () => {
  const { wallet, walletBalance } = useActiveWallet();
  const CopyIcon = CopyIconDark;
  return (
    wallet && (
      <div className="flex gap-2 md:gap-4 items-center flex-wrap mt-10 mb-2">
        <Link
          to={`https://app.fuel.network/account/${wallet.address.toB256()}`}
          target="_blank"
          className="text-gray-400 hover:underline hover:text-green-400"
        >
          {getTruncatedAddress(wallet.address.toB256() as string)}
        </Link>
        <img
          src={CopyIcon}
          alt="copy"
          style={{ color: '#dddddd' }}
          className="cursor-pointer h-5 hover:opacity-80 active:scale-[90%]"
          onClick={() => copyToClipboard(wallet.address.toB256() as string)}
        />
        <span data-testid="wallet-balance" className="text-gray-400">
          Balance:{' '}
          {walletBalance?.format({
            precision: 5,
          })}{' '}
          ETH
        </span>
      </div>
    )
  );
};
