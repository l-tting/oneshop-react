import React from 'react';
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';

const SaleCart = ({ cartItems, onUpdateQuantity, onRemoveItem, onClearCart }) => {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Shopping Cart</h3>
        {cartItems.length > 0 && (
          <button
            onClick={onClearCart}
            className="text-sm text-red-600 hover:text-red-700"
          >
            Clear Cart
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-center py-4">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b pb-4">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                  <p className="text-sm text-gray-500">Ksh.{item.price.toFixed(2)} each</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center border rounded">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                      disabled={item.quantity <= 1}
                    >
                      <FiMinus className="h-4 w-4" />
                    </button>
                    <span className="px-2 py-1 text-gray-700">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                    >
                      <FiPlus className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <FiTrash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total:</span>
              <span>Ksh.{total.toFixed(2)}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SaleCart; 