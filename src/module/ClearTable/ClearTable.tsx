export const ClearTable = () => {
  return (
    <tr className='table-light'>
      <td>1</td>
      <td className='task'></td>
      <td></td>
      <td>
        <button className='btn btn-danger me-1 mb-1' disabled>
          Удалить
        </button>
        <button className='btn btn-success mb-1' disabled>
          Завершить
        </button>
      </td>
    </tr>
  );
};
