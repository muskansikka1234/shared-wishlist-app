// src/components/ProductManagerWrapper.jsx
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppContent } from '../Context/AppContext';
import ProductManager from './ProductManager';

const ProductManagerWrapper = () => {
  const { id } = useParams();
  const { userData } = useContext(AppContent);

  return (
    <div className="p-4">
      <ProductManager wishlistId={id} userEmail={userData?.email} />
    </div>
  );
};

export default ProductManagerWrapper;
