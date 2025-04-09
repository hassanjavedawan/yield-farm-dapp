import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccount } from 'wagmi';
import { TrendingUp, Coins, ArrowUpCircle, ArrowDownCircle, Sparkles, AlertCircle } from 'lucide-react';
import Button from '../ui/Button';
import StakeModal from './StakeModal';
import UnstakeModal from './UnstakeModal';
import { useFarm } from '../../hooks/useFarm';
import { formatNumber } from '../../utils/formatters';

const FarmCard = ({ farm }) => {
  const { isConnected } = useAccount();
  const [isStakeModalOpen, setIsStakeModalOpen] = useState(false);
  const [isUnstakeModalOpen, setIsUnstakeModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { 
    stakedBalance, 
    pendingRewards, 
    apr, 
    totalStaked, 
    harvestRewards,
    isHarvesting,
    isStaking,
    isUnstaking
  } = useFarm(farm.id);

  // Calculate a color based on APR for visual indication
  const getAPRColor = () => {
    if (apr >= 100) return "from-green-500 to-emerald-400";
    if (apr >= 50) return "from-blue-500 to-cyan-400";
    return "from-purple-500 to-indigo-400";
  };

  return (
    <motion.div 
      className="relative bg-[#13131a]/90 backdrop-blur-sm rounded-xl overflow-hidden border border-[#2a2a35] shadow-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Background gradient effect */}
      <motion.div 
        className={`absolute inset-0 bg-gradient-to-br ${getAPRColor()} opacity-5`}
        animate={{ 
          opacity: isHovered ? 0.2 : 0.05 
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Glowing border effect on hover */}
      <motion.div 
        className="absolute inset-0 rounded-xl"
        animate={{ 
          boxShadow: isHovered 
            ? `0 0 20px 2px rgba(${apr >= 100 ? '34, 197, 94' : apr >= 50 ? '59, 130, 246' : '168, 85, 247'}, 0.3)` 
            : '0 0 0 0 rgba(0, 0, 0, 0)' 
        }}
        transition={{ duration: 0.3 }}
      />

      <div className="p-6 relative z-10">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center space-x-3">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <motion.div 
                className="absolute inset-0 rounded-full"
                animate={{ 
                  boxShadow: ['0 0 0 0 rgba(59, 130, 246, 0)', '0 0 0 4px rgba(59, 130, 246, 0.3)', '0 0 0 0 rgba(59, 130, 246, 0)'] 
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <img src={farm.logo} alt={farm.name} className="w-12 h-12 rounded-full border-2 border-blue-500/30" />
            </motion.div>
            <div>
              <motion.h3 
                className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300"
                animate={{ 
                  textShadow: isHovered ? '0 0 8px rgba(255, 255, 255, 0.5)' : '0 0 0px rgba(255, 255, 255, 0)' 
                }}
                transition={{ duration: 0.3 }}
              >
                {farm.name}
              </motion.h3>
              <p className="text-gray-400 text-sm">{farm.tokenSymbol}</p>
            </div>
          </div>
          <motion.div 
            className={`bg-gradient-to-r ${getAPRColor()} px-3 py-1.5 rounded-full text-white text-sm font-medium flex items-center space-x-1 shadow-lg`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <TrendingUp size={14} />
            <span>APR: {formatNumber(apr)}%</span>
          </motion.div>
        </div>

        <div className="space-y-4 mb-6">
          <motion.div 
            className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg border border-gray-600/30"
            whileHover={{ backgroundColor: 'rgba(55, 65, 81, 0.5)' }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center space-x-2 text-gray-300">
              <Coins size={16} className="text-blue-400" />
              <span>Staked Balance</span>
            </div>
            <span className="font-medium">
              {formatNumber(stakedBalance)} {farm.tokenSymbol}
            </span>
          </motion.div>
          
          <motion.div 
            className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg border border-gray-600/30"
            whileHover={{ backgroundColor: 'rgba(55, 65, 81, 0.5)' }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center space-x-2 text-gray-300">
              <Sparkles size={16} className="text-yellow-400" />
              <span>Pending Rewards</span>
            </div>
            <motion.span 
              className="font-medium text-yellow-300"
              animate={{ 
                textShadow: pendingRewards > 0 ? ['0 0 0px rgba(252, 211, 77, 0)', '0 0 8px rgba(252, 211, 77, 0.7)', '0 0 0px rgba(252, 211, 77, 0)'] : 'none' 
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {formatNumber(pendingRewards)} {farm.rewardSymbol}
            </motion.span>
          </motion.div>
          
          <motion.div 
            className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg border border-gray-600/30"
            whileHover={{ backgroundColor: 'rgba(55, 65, 81, 0.5)' }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center space-x-2 text-gray-300">
              <TrendingUp size={16} className="text-purple-400" />
              <span>Total Staked</span>
            </div>
            <span className="font-medium">
              {formatNumber(totalStaked)} {farm.tokenSymbol}
            </span>
          </motion.div>
        </div>

        <div className="space-y-3">
          {isConnected ? (
            <>
              <div className="grid grid-cols-2 gap-3">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button 
                    onClick={() => setIsStakeModalOpen(true)} 
                    disabled={isStaking || isUnstaking}
                    isLoading={isStaking}
                    className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400"
                  >
                    <ArrowUpCircle size={16} />
                    <span>Stake</span>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button 
                    onClick={() => setIsUnstakeModalOpen(true)} 
                    variant="secondary" 
                    disabled={isStaking || isUnstaking || stakedBalance <= 0}
                    isLoading={isUnstaking}
                    className="flex items-center justify-center space-x-2"
                  >
                    <ArrowDownCircle size={16} />
                    <span>Unstake</span>
                  </Button>
                </motion.div>
              </div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  onClick={harvestRewards} 
                  variant="outline" 
                  fullWidth 
                  disabled={isHarvesting || pendingRewards <= 0}
                  isLoading={isHarvesting}
                  className="flex items-center justify-center space-x-2 text-yellow-400 border-yellow-500/50 hover:bg-yellow-500/10"
                >
                  <Sparkles size={16} />
                  <span>Harvest Rewards</span>
                </Button>
              </motion.div>
            </>
          ) : (
            <motion.p 
              className="text-center p-3 bg-yellow-900/20 backdrop-blur-sm border border-yellow-700/30 rounded-lg text-yellow-400 text-sm flex items-center justify-center space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <AlertCircle size={16} />
              <span>Connect your wallet to interact with this farm</span>
            </motion.p>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isStakeModalOpen && (
          <StakeModal 
            farm={farm} 
            onClose={() => setIsStakeModalOpen(false)} 
          />
        )}

        {isUnstakeModalOpen && (
          <UnstakeModal 
            farm={farm} 
            stakedBalance={stakedBalance}
            onClose={() => setIsUnstakeModalOpen(false)} 
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FarmCard;
