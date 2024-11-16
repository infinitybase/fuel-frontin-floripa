import { FuelWalletConnector } from '@fuels/connectors';
import { FuelProvider } from '@fuels/react';
import { StyledEngineProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'fuels';
import type React from 'react';
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { NODE_URL } from '../lib';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => {
    return new QueryClient({});
  });
  const [_currentProvider] = useState(Provider.create(NODE_URL));

  return (
    <StyledEngineProvider injectFirst>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <FuelProvider
            fuelConfig={{
              connectors: [new FuelWalletConnector()],
            }}
          >
            {children}
          </FuelProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </StyledEngineProvider>
  );
};
