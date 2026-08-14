import React from 'react';
import { Product } from '../data/products';
import { ProductCutoutGraphic } from './ProductCutoutGraphic';
import { ShelfTagLabel } from './ShelfTagLabel';
import { useCart } from '../context/CartContext';

interface ShelfDisplayRowProps {
  products: Product[];
  shelfIndex: number;
  columns: number;
  onSelectProduct: (product: Product) => void;
}

export const ShelfDisplayRow: React.FC<ShelfDisplayRowProps> = ({
  products,
  shelfIndex,
  columns,
  onSelectProduct
}) => {
  const { cart } = useCart();

  // Create an array of length equal to columns so empty slots maintain precise grid alignment
  const slots = Array.from({ length: columns }).map((_, index) => products[index] || null);

  return (
    <div className="relative w-full mb-10 sm:mb-14 md:mb-16">
      
      {/* 1. FREESTANDING MERCHANDISE RESTING ON TOP OF THE TEAL SHELF SURFACE */}
      <div
        className="relative z-10 grid gap-2 sm:gap-4 md:gap-6 px-1.5 sm:px-4 md:px-8"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`
        }}
      >
        {slots.map((product, idx) => {
          if (!product) {
            return <div key={`empty-prod-${idx}`} className="w-full" />;
          }

          const cartItem = cart.find((item) => item.product.id === product.id);
          const currentQty = cartItem ? cartItem.quantity : 0;

          return (
            <div
              key={product.id}
              className="flex flex-col items-center justify-end w-full"
            >
              <ProductCutoutGraphic
                product={product}
                onClickDetail={() => onSelectProduct(product)}
                currentQty={currentQty}
              />
            </div>
          );
        })}
      </div>

      {/* 2. ISOMETRIC 3D TEAL SHELF TOP SURFACE (PLANK) */}
      <div className="relative z-20 w-full -mt-2">
        {/* Top Teal Surface with 3D perspective depth */}
        <div className="relative h-5 sm:h-6 md:h-7 w-full">
          <svg
            className="w-full h-full overflow-visible drop-shadow-[0_4px_6px_rgba(0,0,0,0.12)]"
            preserveAspectRatio="none"
            viewBox="0 0 1000 36"
          >
            {/* 3D Isometric / Perspective Teal Shelf Top Plane */}
            <polygon
              points="12,0 988,0 1000,36 0,36"
              fill="#00BFA5"
              stroke="#261A14"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            {/* Subtle light reflection sheen along the back edge */}
            <polygon
              points="18,2 982,2 978,7 22,7"
              fill="rgba(255, 255, 255, 0.4)"
            />
            {/* Subtle shadow gradient at front edge */}
            <line
              x1="2"
              y1="34"
              x2="998"
              y2="34"
              stroke="#00897B"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* 3. FRONT WHITE FASCIA BEAM WITH BLACK OUTLINE */}
        <div className="w-full bg-white border-x-3 sm:border-x-4 border-b-3 sm:border-b-4 border-[#261A14] shadow-[0_10px_20px_rgba(62,39,35,0.15)] relative z-20">
          
          {/* Subtle top seam line */}
          <div className="h-[2px] w-full bg-[#261A14]" />

          {/* Embedded / Hanging Price Tag Rails directly underneath each product */}
          <div
            className="grid gap-2 sm:gap-3 md:gap-6 p-1.5 sm:p-2.5 md:p-3 -mt-1 sm:-mt-1.5 md:-mt-2"
            style={{
              gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`
            }}
          >
            {slots.map((product, idx) => {
              if (!product) {
                return <div key={`empty-tag-${idx}`} className="w-full" />;
              }

              return (
                <div key={product.id} className="w-full flex justify-center">
                  <ShelfTagLabel
                    product={product}
                    onOpenDetail={() => onSelectProduct(product)}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Shelf Under-Glow / Ambient Contact Shadow onto the background */}
        <div className="w-[96%] mx-auto h-3 sm:h-4 bg-[#261A14]/15 blur-sm rounded-full -mt-1" />
      </div>

    </div>
  );
};
