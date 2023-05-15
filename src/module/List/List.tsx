import style from './List.module.scss';
import { TableBody } from './TableBody/TableBody';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addTask, getData, getTask, getUserName } from '../UsersData/user';
import { setUser, setUserId, setUserTask } from '../../store/reducer';
import { Button } from 'react-bootstrap';
import { ClearTable } from '../ClearTable/ClearTable';
import { useNavigate } from 'react-router-dom';

export const List = () => {
  const [text, setText] = useState('');
  const [Disabled, setDisabled] = useState(true);
  const task: { taskId: string; text: string; status: string }[] = useAppSelector(
    (state) => state.userReducer.task,
  );
  const id = useAppSelector((state) => state.userReducer.id);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (text.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [text]);

  useEffect(() => {
    getData();
  });

  useEffect(() => {
    const id = location.pathname.slice(6);
    dispatch(setUser(getUserName(id)));
    dispatch(setUserTask(getTask(id)));
    dispatch(setUserId(id));
  }, []);

  const handleChange = (e: React.ChangeEvent<EventTarget>) => {
    e.preventDefault();
    if (e.target instanceof HTMLInputElement) {
      setText(e.target.value.trimStart());
    }
  };

  const newTask = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    addTask(id, text, 'В процессе');
    dispatch(setUserTask(getTask(id)));
    setText('');
  };

  return (
    <>
      <div className='app-container d-flex align-items-center justify-content-center flex-column'>
        <h3>Список дел</h3>

        <div className={style.wrap_header}>
          <form onSubmit={newTask} className='d-flex align-items-center mb-3'>
            <label className='form-group me-3 mb-0'>
              <input
                onChange={handleChange}
                value={text}
                type='text'
                className='form-control'
                placeholder='ввести задачу'
              />
            </label>

            <Button type='submit' className='btn btn-primary me-3' disabled={Disabled}>
              Сохранить
            </Button>

            <Button
              onClick={() => {
                setText('');
              }}
              type='reset'
              className='btn btn-warning'
              disabled={Disabled}
            >
              Очистить
            </Button>
          </form>
          <Button
            onClick={() => {
              navigate('/');
            }}
            className='btn btn-secondary ms-3 mb-3'
            type='submit'
          >
            Выйти
          </Button>
        </div>

        <div className={style.table_wrapper}>
          <table className='table table-hover table-bordered'>
            <thead>
              <tr>
                <th className='col-1 col-sm-1'>№</th>
                <th className='col-6 col-sm-6'>Задача</th>
                <th className='col-2 col-sm-1'>Статус</th>
                <th className='col-3 col-sm-1'>Действия</th>
              </tr>
            </thead>

            <tbody>
              {task === null ? (
                <ClearTable />
              ) : task.length !== 0 ? (
                task.map((item, index) => <TableBody key={item.taskId} item={item} index={index} />)
              ) : (
                <ClearTable />
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
