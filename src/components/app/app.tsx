import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { FC, useEffect } from 'react';
import { AppHeader, OnlyUnAuth, OnlyAuth } from '@components';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Modal } from '../modal';
import { OrderInfo } from '../order-info';
import { IngredientDetails } from '../ingredient-details';
import { checkUserAuth } from '../../services/slices/actions';
import { useDispatch, useSelector } from '../../services/store';
import { fetchIngredients } from '../../services/slices/actions';
import { getOrder } from '../../services/slices/orderByNumberSlice';

const App: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state?.background;

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(fetchIngredients());
  }, []);

  const orderNumber = useSelector(getOrder)?.number;

  const getOrderTitle = () =>
    orderNumber ? '#' + orderNumber.toString() : 'Заказ';

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/'>
          <Route index element={<ConstructorPage />} />
          <Route path='ingredients/:id' element={<IngredientDetails />} />
        </Route>
        <Route path='/feed'>
          <Route index element={<Feed />} />
          <Route path=':number' element={<OrderInfo />} />
        </Route>
        <Route path='/profile'>
          <Route index element={<OnlyAuth component={<Profile />} />} />
          <Route
            path='orders'
            element={<OnlyAuth component={<ProfileOrders />} />}
          />
          <Route
            path='orders/:number'
            element={<OnlyAuth component={<OrderInfo />} />}
          />
        </Route>
        <Route path='/login' element={<OnlyUnAuth component={<Login />} />} />
        <Route
          path='/register'
          element={<OnlyUnAuth component={<Register />} />}
        />
        <Route
          path='/forgot-password'
          element={<OnlyUnAuth component={<ForgotPassword />} />}
        />
        <Route
          path='/reset-password'
          element={<OnlyUnAuth component={<ResetPassword />} />}
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route path='/'>
            <Route
              path='ingredients/:id'
              element={
                <Modal
                  title={'Детали инградиента'}
                  onClose={() => {
                    navigate(-1);
                  }}
                >
                  <IngredientDetails />
                </Modal>
              }
            />
          </Route>
          <Route path='/feed'>
            <Route
              path=':number'
              element={
                <Modal
                  title={getOrderTitle()}
                  onClose={() => {
                    navigate(-1);
                  }}
                >
                  <OrderInfo />
                </Modal>
              }
            />
          </Route>
          <Route path='/profile'>
            <Route
              path='orders/:number'
              element={
                <OnlyAuth
                  component={
                    <Modal
                      title={getOrderTitle()}
                      onClose={() => {
                        navigate(-1);
                      }}
                    >
                      <OrderInfo />
                    </Modal>
                  }
                />
              }
            />
          </Route>
        </Routes>
      )}
    </div>
  );
};

export default App;
