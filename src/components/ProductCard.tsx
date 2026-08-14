import React, { useState } from 'react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { ProductCutoutGraphic } from './ProductCutoutGraphic';
import { ShelfTagLabel } from './ShelfTagLabel';
import { ProductDetailModal } from './ProductDetailModal';

interface ProductCardProps {
  product: Product;
  onOpenDetailModal?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetailModal }) => {
  const { cart } = useCart();
  const [internalModalOpen, setInternalModalOpen] = useState(false);

  const productCartItems = cart.filter((item) => item.product.id === product.id);
  const currentQty = productCartItems.reduce((acc, i) => acc + i.quantity, 0);

  const handleOpenDetail = () => {
    if (onOpenDetailModal) {
      onOpenDetailModal(product);
    } else {
      setInternalModalOpen(true);
    }
  };

  return (
    <>
      <div className="mart-shelf-slot w-full flex flex-col justify-end">
        {/* Freestanding Cutout Merch sitting directly on top of the shelf */}
        <div className="w-full flex justify-center">
          <ProductCutoutGraphic
            product={product}
            onClickDetail={handleOpenDetail}
            currentQty={currentQty}
          />
        </div>

        {/* Shelf Tag Label mounted directly below the product on the shelf rail */}
        <div className="w-full mt-2">
          <ShelfTagLabel product={product} onOpenDetail={handleOpenDetail} />
        </div>
      </div>

      {/* Internal Modal if no global modal handler provided */}
      {internalModalOpen && (
        <ProductDetailModal
          product={product}
          onClose={() => setInternalModalOpen(false)}
        />
      )}
    </>
  );
};
