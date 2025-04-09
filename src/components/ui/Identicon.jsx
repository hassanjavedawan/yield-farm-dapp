import React, { useEffect, useRef } from 'react';
import { createAvatar } from '@dicebear/core';
import { identicon } from '@dicebear/collection';

const Identicon = ({ address, size = 32 }) => {
  const ref = useRef();

  useEffect(() => {
    if (address && ref.current) {
      try {
        const avatar = createAvatar(identicon, {
          seed: address,
          size: size,
          backgroundColor: ['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']
        });
        
        const svg = avatar.toString();
        ref.current.innerHTML = svg;
      } catch (error) {
        console.error('Error generating identicon:', error);
      }
    }
  }, [address, size]);

  return (
    <div 
      ref={ref} 
      className="rounded-full overflow-hidden bg-gray-700"
      style={{ width: size, height: size }}
    />
  );
};

export default Identicon;
