import React from 'react';
import { motion } from 'framer-motion';
import Layout from './components/layout/Layout';
import FarmList from './components/farm/FarmList';
import { useAccount } from 'wagmi';

const App = () => {
  const { isConnected } = useAccount();

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
        style={{ background: 'var(--bg-dark)' }}
      >
        <motion.div 
          className="text-center mb-12 pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <motion.h1 
            className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            BSC Yield Farm
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Stake your tokens and earn rewards with our high-yield farming platform
          </motion.p>
        </motion.div>

        {!isConnected && (
          <motion.div 
            className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm p-6 rounded-2xl mb-12 border border-blue-700/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2 text-blue-300">Connect Your Wallet</h2>
                <p className="text-gray-300">Connect your wallet to start staking and earning rewards</p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="pulse-ring">
                  <span className="pulse-dot"></span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <FarmList />
      </motion.div>
    </Layout>
  );
};

export default App;
