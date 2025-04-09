import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: 'var(--bg-dark)' }}>
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-28 pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key="page-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      
      {/* Background effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Dark theme glow effects */}
        <div className="absolute inset-0 bg-[#050508]" />
        <motion.div 
          className="absolute -top-[30%] -left-[10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
        <motion.div 
          className="absolute -bottom-[20%] -right-[10%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
        <motion.div 
          className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-pink-900/5 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      </div>
    </div>
  );
};

export default Layout;
