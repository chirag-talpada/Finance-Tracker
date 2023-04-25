import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css';

import Form from './pages/Form/Form';
import TableGrid from './pages/TableGrid/TableGrid';

function App() {
  return (<BrowserRouter>
    <Routes>
      <Route exact path='' element={<Form></Form>}></Route>
      <Route path='/show' element={<TableGrid></TableGrid>}></Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
