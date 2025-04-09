import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBalance } from 'wagmi';
import { LogOut, Copy, CheckCircle, ExternalLink } from 'lucide-react';
import Button from '../ui/Button';
import Identicon from '../ui/Identicon';

const WalletInfo = ({ address, disconnect }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [copied, setCopied] = useState(false);
  const { data: balance } = useBalance({
    address: address,
  });

  const formatAddress = (address) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openExplorer = () => {
    window.open(`https://bscscan.com/address/${address}`, '_blank');
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center space-x-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm hover:from-blue-600/30 hover:to-purple-600/30 border border-blue-500/20 rounded-full py-1.5 px-4 transition-all duration-300"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative">
          <motion.div 
            className="absolute inset-0 rounded-full"
            animate={{ 
              boxShadow: ['0 0 0 0 rgba(59, 130, 246, 0)', '0 0 0 4px rgba(59, 130, 246, 0.3)', '0 0 0 0 rgba(59, 130, 246, 0)'] 
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <Identicon address={address} size={24} />
        </div>
        <span className="font-medium">{formatAddress(address)}</span>
      </motion.button>

      <AnimatePresence>
        {showDropdown && (
          <motion.div 
            className="absolute right-0 mt-2 w-72 bg-gray-800/90 backdrop-blur-md rounded-xl shadow-xl border border-gray-700/50 z-10 overflow-hidden"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          >
            <div className="p-5">
              <div className="flex items-start space-x-3 mb-4">
                <div className="relative">
                  <motion.div 
                    className="absolute inset-0 rounded-full"
                    animate={{ 
                      boxShadow: ['0 0 0 0 rgba(59, 130, 246, 0)', '0 0 0 4px rgba(59, 130, 246, 0.3)', '0 0 0 0 rgba(59, 130, 246, 0)'] 
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <Identicon address={address} size={40} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-400 mb-1">Connected as</p>
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{formatAddress(address)}</p>
                    <div className="flex space-x-1">
                      <motion.button 
                        className="p-1 text-gray-400 hover:text-white rounded-full hover:bg-gray-700/50"
                        onClick={copyToClipboard}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Copy address"
                      >
                        {copied ? <CheckCircle size={16} className="text-green-400" /> : <Copy size={16} />}
                      </motion.button>
                      <motion.button 
                        className="p-1 text-gray-400 hover:text-white rounded-full hover:bg-gray-700/50"
                        onClick={openExplorer}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="View on explorer"
                      >
                        <ExternalLink size={16} />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
              
              <motion.div 
                className="mb-4 p-3 bg-gray-700/50 backdrop-blur-sm rounded-lg border border-gray-600/30"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-300">Balance</p>
                  <motion.div 
                    className="h-1.5 w-1.5 rounded-full bg-green-400"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <p className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  {balance ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}` : 'Loading...'}
                </p>
              </motion.div>
              
              <motion.div 
                className="pt-3 border-t border-gray-700/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Button
                  onClick={() => {
                    disconnect();
                    setShowDropdown(false);
                  }}
                  variant="secondary"
                  size="sm"
                  fullWidth
                  className="flex items-center justify-center space-x-2"
                >
                  <LogOut size={16} />
                  <span>Disconnect</span>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WalletInfo;
