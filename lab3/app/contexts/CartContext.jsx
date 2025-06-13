import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem('yggdrasil-cart');
    return savedCart ? JSON.parse(savedCart) : { items: [] };
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    return { items: [] };
  }
};

const cartReducer = (state, action) => {
  let newState;
  
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        newState = {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        newState = {
          ...state,
          items: [...state.items, { 
            ...action.payload, 
            quantity: 1,
            price: Number(action.payload.price)
          }],
        };
      }
      break;

    case 'REMOVE_ITEM':
      newState = {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
      break;

    case 'UPDATE_QUANTITY':
      newState = {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(1, action.payload.quantity) }
            : item
        ),
      };
      break;

    case 'CLEAR_CART':
      newState = { items: [] };
      break;

    default:
      return state;
  }

  localStorage.setItem('yggdrasil-cart', JSON.stringify(newState));
  return newState;
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, loadCartFromStorage());

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'yggdrasil-cart') {
        dispatch({ type: 'RELOAD_CART', payload: loadCartFromStorage() });
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};