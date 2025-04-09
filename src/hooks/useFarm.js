import { useState, useEffect } from 'react';
import { useReadContract, useWriteContract } from 'wagmi';
import { parseUnits, formatUnits } from 'viem';
import { FARM_ABI, ERC20_ABI } from '../config/farmConfig';

export const useFarm = (farmAddress, tokenAddress, walletAddress) => {
  const [stakedBalance, setStakedBalance] = useState('0');
  const [earnedRewards, setEarnedRewards] = useState('0');
  const [apr, setApr] = useState(null);
  const [tokenDecimals, setTokenDecimals] = useState(18);
  const [isStaking, setIsStaking] = useState(false);
  const [isUnstaking, setIsUnstaking] = useState(false);
  const [isHarvesting, setIsHarvesting] = useState(false);

  // Get token decimals
  const { data: decimalsData } = useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: 'decimals',
    enabled: !!tokenAddress,
  });

  // Get staked balance
  const { data: stakedData, refetch: refetchStakedBalance } = useReadContract({
    address: farmAddress,
    abi: FARM_ABI,
    functionName: 'balanceOf',
    args: [walletAddress],
    enabled: !!farmAddress && !!walletAddress,
  });

  // Get earned rewards
  const { data: earnedData, refetch: refetchEarnedRewards } = useReadContract({
    address: farmAddress,
    abi: FARM_ABI,
    functionName: 'earned',
    args: [walletAddress],
    enabled: !!farmAddress && !!walletAddress,
  });

  // Get APR
  const { data: aprData } = useReadContract({
    address: farmAddress,
    abi: FARM_ABI,
    functionName: 'getAPR',
    enabled: !!farmAddress,
  });

  const { writeContractAsync } = useWriteContract();

  useEffect(() => {
    if (decimalsData) {
      setTokenDecimals(Number(decimalsData));
    }
  }, [decimalsData]);

  useEffect(() => {
    if (stakedData && tokenDecimals) {
      setStakedBalance(formatUnits(stakedData, tokenDecimals));
    }
  }, [stakedData, tokenDecimals]);

  useEffect(() => {
    if (earnedData && tokenDecimals) {
      setEarnedRewards(formatUnits(earnedData, tokenDecimals));
    }
  }, [earnedData, tokenDecimals]);

  useEffect(() => {
    if (aprData) {
      setApr(Number(formatUnits(aprData, 0)));
    }
  }, [aprData]);

  // Stake tokens
  const stakeTokens = async (amount) => {
    if (!farmAddress || !walletAddress || !amount) return;

    try {
      setIsStaking(true);
      const parsedAmount = parseUnits(amount, tokenDecimals);
      
      const tx = await writeContractAsync({
        address: farmAddress,
        abi: FARM_ABI,
        functionName: 'stake',
        args: [parsedAmount],
      });

      // Wait for transaction to be mined
      await tx;
      
      // Refetch balances
      await refetchStakedBalance();
      await refetchEarnedRewards();
      
      return tx;
    } catch (error) {
      console.error('Staking error:', error);
      throw error;
    } finally {
      setIsStaking(false);
    }
  };

  // Unstake tokens
  const unstakeTokens = async (amount) => {
    if (!farmAddress || !walletAddress || !amount) return;

    try {
      setIsUnstaking(true);
      const parsedAmount = parseUnits(amount, tokenDecimals);
      
      const tx = await writeContractAsync({
        address: farmAddress,
        abi: FARM_ABI,
        functionName: 'withdraw',
        args: [parsedAmount],
      });

      // Wait for transaction to be mined
      await tx;
      
      // Refetch balances
      await refetchStakedBalance();
      await refetchEarnedRewards();
      
      return tx;
    } catch (error) {
      console.error('Unstaking error:', error);
      throw error;
    } finally {
      setIsUnstaking(false);
    }
  };

  // Harvest rewards
  const harvestRewards = async () => {
    if (!farmAddress || !walletAddress) return;

    try {
      setIsHarvesting(true);
      
      const tx = await writeContractAsync({
        address: farmAddress,
        abi: FARM_ABI,
        functionName: 'getReward',
      });

      // Wait for transaction to be mined
      await tx;
      
      // Refetch earned rewards
      await refetchEarnedRewards();
      
      return tx;
    } catch (error) {
      console.error('Harvesting error:', error);
      throw error;
    } finally {
      setIsHarvesting(false);
    }
  };

  return {
    stakedBalance,
    earnedRewards,
    apr,
    isStaking,
    isUnstaking,
    isHarvesting,
    stakeTokens,
    unstakeTokens,
    harvestRewards,
    refetchStakedBalance,
    refetchEarnedRewards
  };
};
