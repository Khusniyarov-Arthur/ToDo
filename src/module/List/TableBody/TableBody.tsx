import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { setUserTask } from '../../../store/reducer';
import { changeStatus, delTask, getTask } from '../../UsersData/user';

interface IProps {
  item: { taskId: string; text: string; status: string };
  index: number;
}

export const TableBody = ({ item, index }: IProps) => {
  const { taskId, text, status } = item;
  const [statusTask, setStatusTask] = useState(false);
  const dispatch = useAppDispatch();

  const id: string = useAppSelector((state) => state.userReducer.id);

  const deleteTask = () => {
    delTask(id, taskId);
    dispatch(setUserTask(getTask(id)));
  };

  const doneTask = () => {
    setStatusTask(!statusTask);
    changeStatus(id, taskId, statusTask ? 'В процессе' : 'Выполнено');
    dispatch(setUserTask(getTask(id)));
  };

  useEffect(() => {
    dispatch(setUserTask(getTask(id)));
  }, [statusTask]);

  return (
    <>
      <tr className={statusTask ? 'table-success' : 'table-light'}>
        <td>{index + 1}</td>
        <td className={statusTask ? 'text-decoration-line-through table-success' : ''}>{text}</td>
        <td>{status}</td>
        <td>
          <button onClick={deleteTask} className='btn btn-danger me-1 mb-1'>
            Удалить
          </button>
          <button onClick={doneTask} className='btn btn-success mb-1'>
            {statusTask ? 'Выполнено' : 'Выполнить'}
          </button>
        </td>
      </tr>
    </>
  );
};
