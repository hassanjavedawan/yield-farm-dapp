import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

const UnstakeModal = ({ isOpen, onClose, farm, stakedBalance, onUnstake, isUnstaking }) => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
      setError('');
      
      if (parseFloat(value) > parseFloat(stakedBalance)) {
        setError(`Insufficient staked balance. You have ${parseFloat(stakedBalance).toFixed(4)} ${farm.depositToken} staked`);
      }
    }
  };

  const handleMaxClick = () => {
    setAmount(stakedBalance);
    setError('');
  };

  const handleUnstake = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (parseFloat(amount) > parseFloat(stakedBalance)) {
      setError(`Insufficient staked balance. You have ${parseFloat(stakedBalance).toFixed(4)} ${farm.depositToken} staked`);
      return;
    }

    try {
      await onUnstake(amount);
      setAmount('');
      onClose();
    } catch (error) {
      console.error('Unstaking failed:', error);
      setError('Failed to unstake tokens. Please try again.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Unstake ${farm.depositToken}`}
    >
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <label htmlFor="unstake-amount" className="block text-gray-300">
            Amount to Unstake
          </label>
          <span className="text-gray-400">
            Staked: {parseFloat(stakedBalance).toFixed(4)} {farm.depositToken}
          </span>
        </div>
        
        <div className="flex items-center">
          <input
            id="unstake-amount"
            type="text"
            value={amount}
            onChange={handleInputChange}
            placeholder="0.0"
            className="input-primary flex-grow mr-2"
          />
          <Button
            variant="secondary"
            size="sm"
            onClick={handleMaxClick}
          >
            MAX
          </Button>
        </div>
        
        {error && (
          <p className="mt-2 text-red-400 text-sm">{error}</p>
        )}
      </div>
      
      <div className="bg-gray-700 bg-opacity-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-gray-300">Farm</span>
          <span>{farm.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">APR</span>
          <span className="text-green-400">{farm.baseApy}%</span>
        </div>
      </div>
      
      <div className="flex flex-col space-y-3">
        <Button
          variant="primary"
          onClick={handleUnstake}
          disabled={isUnstaking || !amount || parseFloat(amount) <= 0 || parseFloat(amount) > parseFloat(stakedBalance)}
          fullWidth
        >
          {isUnstaking ? 'Unstaking...' : 'Unstake'}
        </Button>
        
        <Button
          variant="secondary"
          onClick={onClose}
          fullWidth
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default UnstakeModal;
