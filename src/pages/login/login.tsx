import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { loginUser } from '../../services/slices/actions';
import {
  getIsAuthChecked,
  getUser,
  getError,
  setError
} from '../../services/slices/userSlice';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  //const isAuthChecked = useSelector(getIsAuthChecked);
  //const user = useSelector(getUser);
  const errorText = useSelector(getError);
  //const errorText = 0 < error.length && 0 < email.length ? error : '';

  //dispatch(setError(''));

  return (
    <LoginUI
      errorText={errorText}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
