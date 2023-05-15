import { List } from './module/List/List';
import { Home } from './module/Home/Home';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <>
        <Route path='/user/:id' element={<List />} />
        <Route path='/' element={<Home />} />
      </>
    </Routes>
  );
}

export default App;
