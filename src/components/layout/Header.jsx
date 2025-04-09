import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ConnectWallet from '../wallet/ConnectWallet';
import { Sparkles } from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300 ${scrolled ? 'bg-[#0a0a0f]/90 shadow-lg shadow-black/20' : 'bg-transparent'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="relative mr-3">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-30"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'loop',
              }}
            />
            <div className="relative z-10 bg-gradient-to-br from-blue-600 to-purple-700 h-10 w-10 rounded-full flex items-center justify-center border border-blue-500/20">
              <Sparkles size={20} className="text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 m-0">BSC Yield Farm</h1>
            <motion.div 
              className="h-0.5 w-0 bg-gradient-to-r from-blue-500 to-purple-600"
              animate={{ width: '100%' }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <ConnectWallet />
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
