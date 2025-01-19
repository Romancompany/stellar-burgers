import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';
import {
  getBunIngredient,
  getIngredients
} from '../../services/slices/burgerConstructorSlice';
import {
  getIsOrderLoading,
  getOrder,
  clearOrder
} from '../../services/slices/orderBurgerSlice';
import { orderBurger } from '../../services/slices/actions';
import { getUser } from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bun = useSelector(getBunIngredient);
  const ingredients = useSelector(getIngredients);
  const constructorItems = {
    bun,
    ingredients
  };

  const orderRequest = useSelector(getIsOrderLoading);
  const orderModalData = useSelector(getOrder);
  const user = useSelector(getUser);
  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (user) {
      const orderId = ingredients.map((item) => item._id);
      dispatch(orderBurger(orderId));
    } else {
      navigate('/login', { replace: true });
    }
  };
  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
