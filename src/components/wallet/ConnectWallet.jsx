import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccount, useDisconnect } from 'wagmi';
import { useAppKit } from "@reown/appkit/react";
import { Wallet } from 'lucide-react';
import Button from '../ui/Button';
import WalletInfo from './WalletInfo';

const ConnectWallet = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { open } = useAppKit();
  
  const handleOpenWalletModal = async () => {
    try {
      await open();
    } catch (error) {
      console.error('Wallet connection error:', error);
    }
  };

  if (isConnected) {
    return <WalletInfo address={address} disconnect={disconnect} />;
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex justify-center"
    >
      <Button
        onClick={handleOpenWalletModal}
        variant="primary"
        className="flex items-center space-x-2 glow-effect"
      >
        <Wallet size={18} />
        <span>Connect Wallet</span>
      </Button>
    </motion.div>
  );
};

export default ConnectWallet;
