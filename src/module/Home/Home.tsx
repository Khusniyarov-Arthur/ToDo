import { Button } from 'react-bootstrap';
import { useAppDispatch } from '../../hooks';
import React, { useEffect, useState } from 'react';
import { DelUser, addUserInArr, arrUsers, getData, getUserId } from '../UsersData/user';
import { useNavigate } from 'react-router-dom';
import { setUser, setUserId } from '../../store/reducer';
import style from './Home.module.scss';
import { generateRandomId } from '../../utils/randomNumber';
import closeImg from '../Home/img/close.svg';

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [Disabled, setDisabled] = useState(true);
  const [name, setName] = useState('');
  const [lengthArr, setLengthArr] = useState(0);
  const [lengt, setLengt] = useState(arrUsers.length);

  const handleChange = (e: React.ChangeEvent<EventTarget>) => {
    e.preventDefault();
    if (e.target instanceof HTMLInputElement) {
      setName(e.target.value.trimEnd());
    }
  };

  const addUser = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    addUserInArr(name);
    dispatch(setUser(name));
    dispatch(setUserId(getUserId(name)));
    userPage();
  };

  const deleteUserInArr = (name: string) => {
    if (confirm('Безвозвратно удалить список задач данного пользователя?')) {
      DelUser(name);
      setLengt(arrUsers.length);
    }
  };

  const userPage = () => {
    navigate(`/user/${getUserId(name)}`);
  };

  useEffect(() => {
    if (name.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name]);

  useEffect(() => {
    getData();
    setLengthArr(arrUsers.length);
  }, [lengt]);

  return (
    <div className='container'>
      <h1 className='d-flex align-items-center'>Список дел</h1>
      {lengthArr > 0 && (
        <>
          <span>Войти как:</span>
          {arrUsers.map((item) => {
            return (
              <React.Fragment key={item.id}>
                <button
                  className={style.userAuth}
                  key={generateRandomId()}
                  onClick={() => {
                    navigate(`/user/${item.id}`);
                  }}
                >
                  {item.name}
                </button>
                <img
                  src={closeImg}
                  onClick={() => {
                    deleteUserInArr(item.name);
                  }}
                  className={style.delUser}
                />
              </React.Fragment>
            );
          })}
        </>
      )}

      <span className='d-block mb-2'>Пожалуйста авторизуйтесь</span>
      <form onSubmit={addUser} className='d-flex align-items-center'>
        <label className='form-group me-3 mb-0'>
          <input
            value={name}
            type='text'
            className='form-control'
            placeholder='Введите ваше имя'
            required
            onChange={handleChange}
          />
        </label>
        <Button type='submit' className='btn btn-primary' disabled={Disabled}>
          Войти
        </Button>
      </form>
    </div>
  );
};
