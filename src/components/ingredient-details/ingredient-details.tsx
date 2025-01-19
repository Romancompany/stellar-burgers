import { useSelector } from '../../services/store';
import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams, useLocation } from 'react-router-dom';
import { TIngredient } from '@utils-types';
import { getIngredients } from '../../services/slices/ingredientSlice';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  const backgroundLocation = location.state?.background;
  const ingredients: TIngredient[] = useSelector(getIngredients);

  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return (
    <IngredientDetailsUI
      ingredientData={ingredientData}
      backgroundLocation={backgroundLocation}
    />
  );
};
