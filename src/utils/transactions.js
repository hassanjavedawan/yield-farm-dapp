import { parseUnits } from 'viem';

/**
 * Wait for a transaction to be confirmed
 * @param {Promise} txPromise - Transaction promise
 * @param {number} confirmations - Number of confirmations to wait for
 * @returns {Promise} Transaction receipt
 */
export const waitForTransaction = async (txPromise, confirmations = 1) => {
  try {
    const tx = await txPromise;
    return tx;
  } catch (error) {
    console.error('Transaction error:', error);
    throw error;
  }
};

/**
 * Parse token amount to the correct units based on decimals
 * @param {string|number} amount - Amount to parse
 * @param {number} decimals - Token decimals
 * @returns {bigint} Parsed amount
 */
export const parseTokenAmount = (amount, decimals = 18) => {
  if (!amount) return 0n;
  return parseUnits(amount.toString(), decimals);
};

/**
 * Handle transaction errors
 * @param {Error} error - Transaction error
 * @returns {string} Error message
 */
export const handleTransactionError = (error) => {
  console.error('Transaction error:', error);
  
  // Extract error message from different error formats
  let errorMessage = 'Transaction failed. Please try again.';
  
  if (error?.message) {
    // Check for common error patterns
    if (error.message.includes('user rejected')) {
      errorMessage = 'Transaction was rejected by the user.';
    } else if (error.message.includes('insufficient funds')) {
      errorMessage = 'Insufficient funds for gas * price + value.';
    } else if (error.message.includes('execution reverted')) {
      // Try to extract revert reason
      const revertReason = error.message.match(/execution reverted: (.*?)(?:$|")/);
      errorMessage = revertReason ? `Transaction reverted: ${revertReason[1]}` : 'Transaction reverted by the contract.';
    } else {
      errorMessage = error.message;
    }
  }
  
  return errorMessage;
};
