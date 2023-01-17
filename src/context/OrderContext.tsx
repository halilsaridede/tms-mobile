import {createContext, useContext, useState} from 'react';

const OrderContext = createContext(null);

export const useOrder = () => {
  return useContext(OrderContext);
};

const OrderProvider = ({children}) => {
  const [order, setOrder] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null);
  return (
    <OrderContext.Provider value={[order, setOrder], [orderStatus, setOrderStatus]}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
