import { useConnectUI, useIsConnected } from '@fuels/react';
import { useEffect } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { useActiveWallet } from './hooks/useActiveWallet';
import CounterPage from './pages/Counter.tsx';
import PredicatePage from './pages/Predicate.tsx';

export default function App() {
  const { wallet } = useActiveWallet();
  const { connect } = useConnectUI();
  const { isConnected } = useIsConnected();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  if (!isConnected && !wallet) {
    return (
      <div className="w-full h-screen flex flex-col bg-background text-text-primary justify-center items-center">
        <button
          type="button"
          className="bg-green-500 block rounded-md p-2"
          onClick={() => connect()}
        >
          Connect
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col bg-background text-text-primary justify-center items-center">
      <div className="mt-10 flex flex-col bg-background text-text-primary justify-center items-center">
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex gap-2 mt-4">
                <NavLink
                  className="bg-green-500 block rounded-md p-2"
                  to="/counter"
                >
                  Counter
                </NavLink>
                <NavLink
                  className="bg-green-500 block rounded-md p-2"
                  to="/predicate"
                >
                  Predicate
                </NavLink>
              </div>
            }
          />
          <Route path={'/counter'} element={<CounterPage />} />
          <Route path={'/predicate'} element={<PredicatePage />} />
        </Routes>{' '}
      </div>
    </div>
  );
}
