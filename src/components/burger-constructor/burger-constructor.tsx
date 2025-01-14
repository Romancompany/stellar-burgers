import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { RootState, useSelector } from '../../services/store';
import { TIngredient } from '@utils-types';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const buns: TIngredient[] = useSelector(
    (state: RootState) => state.ingredient.ingredients
  ).filter((ingredient) => ingredient.type === 'bun');

  const el1: TConstructorIngredient = { ...buns[0], id: '1' };
  const el2: TConstructorIngredient = { ...buns[1], id: '2' };

  const buns2: TConstructorIngredient[] = [el1, el2];

  const constructorItems = {
    bun: {
      price: el1.price,
      name: el1.name,
      image: el1.image // 'https://code.s3.yandex.net/react/code/bun-01-large.png'
    },
    ingredients: buns2
  };

  const orderRequest = false;

  const orderModalData = null;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
  };
  const closeOrderModal = () => {};

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
