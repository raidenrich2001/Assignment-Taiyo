import { Route, Routes } from 'react-router-dom';
import './App.css';
import ChartsAndMaps from './components/ChartsAndMaps';
import Contact from './components/Contact';
import Index from './components/Index';

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Index></Index>}>
            <Route path='/' element={<Contact></Contact>}></Route>
            <Route path='/charts' element={<ChartsAndMaps></ChartsAndMaps>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
