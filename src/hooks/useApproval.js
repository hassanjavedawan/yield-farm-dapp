import { useState, useEffect } from 'react';
import { useReadContract, useWriteContract, useAccount } from 'wagmi';
import { parseUnits, formatUnits } from 'viem';
import { ERC20_ABI } from '../config/farmConfig';

export const useApproval = (tokenAddress, spenderAddress) => {
  const [allowance, setAllowance] = useState('0');
  const [isApproving, setIsApproving] = useState(false);
  const { address } = useAccount();

  const { data: decimalsData } = useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: 'decimals',
    enabled: !!tokenAddress,
  });

  const { data: allowanceData, refetch: refetchAllowance } = useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: 'allowance',
    args: [address, spenderAddress],
    enabled: !!address && !!tokenAddress && !!spenderAddress,
  });

  const { writeContractAsync } = useWriteContract();

  useEffect(() => {
    if (allowanceData && decimalsData) {
      setAllowance(formatUnits(allowanceData, Number(decimalsData)));
    }
  }, [allowanceData, decimalsData]);

  const approveToken = async (amount) => {
    if (!tokenAddress || !spenderAddress || !address || !decimalsData) return;

    try {
      setIsApproving(true);
      
      // Use a large approval amount (max uint256) to avoid needing multiple approvals
      const maxUint256 = 2n ** 256n - 1n;
      
      const tx = await writeContractAsync({
        address: tokenAddress,
        abi: ERC20_ABI,
        functionName: 'approve',
        args: [spenderAddress, maxUint256],
      });

      // Wait for transaction to be mined
      await tx;
      
      // Refetch allowance after approval
      await refetchAllowance();
      
      return tx;
    } catch (error) {
      console.error('Approval error:', error);
      throw error;
    } finally {
      setIsApproving(false);
    }
  };

  return {
    allowance,
    isApproving,
    approveToken,
    refetchAllowance
  };
};
