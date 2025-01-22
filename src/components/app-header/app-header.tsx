import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { getUser } from '../../services/slices/userSlice';

export const AppHeader: FC = () => {
  const name = useSelector(getUser)?.name;
  return <AppHeaderUI userName={name} />;
};
