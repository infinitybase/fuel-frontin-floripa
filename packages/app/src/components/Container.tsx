import type { ReactNode } from 'react';

export const Container = (props: { children: ReactNode }) => {
  return (
    <div className="w-full h-screen flex flex-col bg-background text-text-primary justify-center items-center">
      {props.children}
    </div>
  );
};
