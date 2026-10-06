import React, { useState } from 'react';
import { Product } from '../types';
import { ImageOff } from 'lucide-react';
import { resolveImage } from '../utils/image';

interface ProductImageProps {
  product: Product;
  className?: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({ product, className = '' }) => {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-slate-100 ${className}`}>
      {!failed ? (
        <img
          src={resolveImage(product.image)}
          alt={`${product.name} (${product.code})`}
          loading="lazy"
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-1">
          <ImageOff className="w-6 h-6" />
          <span className="text-[10px] font-mono">{product.code}</span>
        </div>
      )}
    </div>
  );
};
