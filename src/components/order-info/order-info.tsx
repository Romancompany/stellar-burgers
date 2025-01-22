import { FC, useMemo, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';
import { fetchOrderByNumber } from '../../services/slices/actions';
import { getIngredients } from '../../services/slices/ingredientSlice';
import { getOrder } from '../../services/slices/orderByNumberSlice';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  const { number } = useParams<{ number: string }>();
  let numberId = Number(number);
  if (!Number.isInteger(numberId)) numberId = 0;

  useEffect(() => {
    dispatch(fetchOrderByNumber(numberId));
  }, []);

  const ingredients: TIngredient[] = useSelector(getIngredients);

  const orderData = useSelector(getOrder);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total,
      backgroundLocation
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
