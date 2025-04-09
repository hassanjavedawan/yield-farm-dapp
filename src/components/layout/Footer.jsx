import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, MessageCircle, ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: 'GitHub', icon: <Github size={18} />, url: 'https://github.com' },
    { name: 'Twitter', icon: <Twitter size={18} />, url: 'https://twitter.com' },
    { name: 'Discord', icon: <MessageCircle size={18} />, url: 'https://discord.com' },
  ];

  return (
    <footer className="bg-gray-900/50 backdrop-blur-md border-t border-gray-800/50 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="mb-6 md:mb-0">
            <div className="flex items-center mb-2">
              <motion.div 
                className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-2"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              >
                <div className="h-2 w-2 bg-white rounded-full"></div>
              </motion.div>
              <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                BSC Yield Farm
              </h3>
            </div>
            <p className="text-gray-400 text-sm">
              © {currentYear} BSC Yield Farm. All rights reserved.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-800/50 transition-all duration-300 glow-effect"
                  whileHover={{ scale: 1.1 }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  viewport={{ once: true }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
            <motion.div
              className="text-xs text-gray-500 flex items-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <span>Powered by BSC Network</span>
              <ExternalLink size={12} className="ml-1" />
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div 
          className="mt-6 pt-6 border-t border-gray-800/30 text-center text-xs text-gray-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p>Trading cryptocurrencies involves risk. Please do your own research before investing.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
