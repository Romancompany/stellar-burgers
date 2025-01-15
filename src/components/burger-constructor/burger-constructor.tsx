import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  getBun,
  getIngredients,
  clearIngredient
} from '../../services/slices/burgerConstructorSlice';
import {
  getIsOrderLoading,
  getOrderData,
  clearOrder
} from '../../services/slices/orderBurgerSlice';
import { orderBurger } from '../../services/slices/actions';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const bun = useSelector(getBun);
  const ingredients = useSelector(getIngredients);
  const constructorItems = {
    bun,
    ingredients
  };

  const orderRequest = useSelector(getIsOrderLoading);
  const orderData = useSelector(getOrderData);
  const orderModalData = orderData.order;
  //console.log('orderData.name=' + orderData.name);
  //console.log(orderModalData);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    const orderId = ingredients.map((item) => item._id);
    dispatch(orderBurger(orderId));
    //dispatch(clearIngredient());
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
