import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Coins, ArrowUpCircle, AlertTriangle } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { useApproval } from '../../hooks/useApproval';
import { formatNumber } from '../../utils/formatters';
import { parseUnits } from 'viem';

const StakeModal = ({ isOpen, onClose, farm, tokenBalance, onStake, isStaking }) => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  
  const { 
    allowance, 
    isApproving, 
    approveToken 
  } = useApproval(farm.tokenAddress, farm.farmAddress);
  
  const needsApproval = allowance && amount && parseFloat(amount) > 0 
    ? parseFloat(allowance) < parseFloat(amount)
    : false;

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    
    if (value && parseFloat(value) > parseFloat(tokenBalance)) {
      setError('Insufficient balance');
    } else {
      setError('');
    }
  };
  
  const handleMaxClick = () => {
    setAmount(tokenBalance);
    setError('');
  };
  
  const handleApprove = async () => {
    if (!amount || parseFloat(amount) <= 0) return;
    
    try {
      await approveToken(amount);
    } catch (error) {
      console.error('Approval error:', error);
      setError('Failed to approve token');
    }
  };
  
  const handleStake = async () => {
    if (!amount || parseFloat(amount) <= 0) return;
    if (parseFloat(amount) > parseFloat(tokenBalance)) {
      setError('Insufficient balance');
      return;
    }
    
    try {
      await onStake(amount);
      setAmount('');
      onClose();
    } catch (error) {
      console.error('Staking error:', error);
      setError('Failed to stake tokens');
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50" 
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-gray-800/90 backdrop-blur-md rounded-xl p-6 w-full max-w-md shadow-2xl border border-gray-700/50" 
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-full">
              <ArrowUpCircle size={20} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Stake {farm.name}
            </h2>
          </div>
          <motion.button 
            className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700/50 transition-colors"
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={20} />
          </motion.button>
        </div>
        
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex justify-between mb-2">
            <label className="text-gray-300 flex items-center space-x-2">
              <Coins size={16} className="text-blue-400" />
              <span>Amount</span>
            </label>
            <motion.div 
              className="text-gray-400 flex items-center space-x-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Balance: {formatNumber(tokenBalance)} {farm.tokenSymbol}</span>
            </motion.div>
          </div>
          <div className="relative">
            <motion.div 
              className="flex overflow-hidden rounded-lg border border-gray-600/50 bg-gray-700/50 backdrop-blur-sm"
              whileFocus={{ borderColor: 'rgba(59, 130, 246, 0.5)' }}
              animate={{ 
                boxShadow: error ? '0 0 0 1px rgba(239, 68, 68, 0.5)' : 'none'
              }}
            >
              <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                placeholder="0.0"
                className="flex-1 bg-transparent px-4 py-3 focus:outline-none text-lg"
              />
              <motion.button
                onClick={handleMaxClick}
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 px-4 font-medium transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                MAX
              </motion.button>
            </motion.div>
            
            <AnimatePresence>
              {error && (
                <motion.div 
                  className="absolute left-0 right-0 mt-1 text-red-400 text-sm flex items-center space-x-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <AlertTriangle size={14} />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div 
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {needsApproval ? (
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                onClick={approve} 
                disabled={isApproving || !amount || parseFloat(amount) <= 0}
                isLoading={isApproving}
                fullWidth
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 py-3"
              >
                Approve {farm.tokenSymbol}
              </Button>
            </motion.div>
          ) : (
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                onClick={handleStake} 
                disabled={isStaking || !amount || parseFloat(amount) <= 0 || parseFloat(amount) > parseFloat(tokenBalance)}
                isLoading={isStaking}
                fullWidth
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 py-3 flex items-center justify-center space-x-2"
              >
                <ArrowUpCircle size={18} />
                <span>Stake {farm.tokenSymbol}</span>
              </Button>
            </motion.div>
          )}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button 
              onClick={onClose} 
              variant="secondary" 
              fullWidth
              className="border border-gray-600/50 py-3"
            >
              Cancel
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default StakeModal;
