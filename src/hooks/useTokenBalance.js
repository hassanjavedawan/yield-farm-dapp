import { useState, useEffect } from 'react';
import { useReadContract } from 'wagmi';
import { formatUnits } from 'viem';
import { ERC20_ABI } from '../config/farmConfig';

export const useTokenBalance = (tokenAddress, walletAddress) => {
  const [tokenBalance, setTokenBalance] = useState('0');
  const [tokenDecimals, setTokenDecimals] = useState(18);

  const { data: balanceData, isError, isLoading, refetch } = useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: [walletAddress],
    enabled: !!tokenAddress && !!walletAddress,
  });

  const { data: decimalsData } = useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: 'decimals',
    enabled: !!tokenAddress,
  });

  useEffect(() => {
    if (decimalsData) {
      setTokenDecimals(Number(decimalsData));
    }
  }, [decimalsData]);

  useEffect(() => {
    if (balanceData) {
      setTokenBalance(formatUnits(balanceData, tokenDecimals));
    }
  }, [balanceData, tokenDecimals]);

  return {
    tokenBalance,
    isLoading,
    isError,
    refetch
  };
};
