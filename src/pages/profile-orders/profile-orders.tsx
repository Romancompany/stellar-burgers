import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { fetchOrdersAll, fetchOrders } from '../../services/slices/actions';
import { getOrders } from '../../services/slices/orderSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrdersAll());
    dispatch(fetchOrders());
  }, []);

  const orders = useSelector(getOrders);

  return <ProfileOrdersUI orders={orders} />;
};
