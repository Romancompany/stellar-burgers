import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { getFeedOrdersAll } from '../../services/slices/feedSlice';
import { fetchOrdersAll } from '../../services/slices/actions';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrdersAll());
  }, []);

  const orders: TOrder[] = useSelector(getFeedOrdersAll);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(fetchOrdersAll());
      }}
    />
  );
};
