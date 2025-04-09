import { useAccount, useBalance, useDisconnect } from 'wagmi';
import { useAppKit } from "@reown/appkit/react";
export const useWallet = () => {
  const { address, isConnected, status } = useAccount();
  const { data: balanceData } = useBalance({ address });
  const { disconnect } = useDisconnect();
  const { open, } = useAppKit();

  return {
    address,
    isConnected,
    status,
    balance: balanceData?.value,
    balanceSymbol: balanceData?.symbol,
    disconnect,
    reownLogin: open,


  };
};
