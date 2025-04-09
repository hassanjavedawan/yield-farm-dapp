import React from 'react';
import { motion } from 'framer-motion';
import FarmCard from './FarmCard';
import { FARMS } from '../../config/farmConfig';
import { useAccount } from 'wagmi';
import { TrendingUp, AlertCircle } from 'lucide-react';

const FarmList = () => {
  const { isConnected } = useAccount();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="py-6">
      <motion.div 
        className="mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="inline-flex items-center justify-center mb-4"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative">
            <motion.div 
              className="absolute inset-0 rounded-full bg-blue-500/30"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="relative z-10 bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-full">
              <TrendingUp size={24} className="text-white" />
            </div>
          </div>
        </motion.div>
        
        <motion.h2 
          className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Yield Farms
        </motion.h2>
        
        <motion.p 
          className="text-gray-300 max-w-2xl mx-auto text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Stake your tokens and earn rewards. Choose from our selection of high-yield farms on the BSC network.
        </motion.p>
        
        {!isConnected && (
          <motion.div 
            className="mt-6 p-4 bg-yellow-900/20 backdrop-blur-sm border border-yellow-700/30 rounded-xl inline-flex items-center space-x-2 text-yellow-400"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <AlertCircle size={20} />
            <p>
              Connect your wallet to start staking and earning rewards.
            </p>
          </motion.div>
        )}
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        viewport={{ once: true }}
      >
        {FARMS.map((farm, index) => (
          <motion.div 
            key={farm.id} 
            variants={itemVariants}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <FarmCard farm={farm} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default FarmList;
