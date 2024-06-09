/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrder } from '../slices/ordersSlice';
import OrderDetails from '../components/OrderDetails';

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const order = useSelector((state) => state.orders.order);

  useEffect(() => {
    dispatch(fetchOrder(orderId));
  }, [dispatch, orderId]);

  return (
    <div>
      {order ? (
        <OrderDetails order={order} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default OrderDetailsPage;
