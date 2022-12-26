import { Routes, Route } from 'react-router-dom';
import DetailForm from './screens/DetailForm';
import DetailsInfo from './screens/DetailsInfo';

function App() {
  return (
    <Routes>
      <Route path='/' element={<DetailForm />} />
      <Route path='/:id' element={<DetailsInfo />} />
    </Routes>
  );
}

export default App;
