import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css';

import AddTransaction from './pages/AddTransaction/AddTransaction';
import ShowTransaction from './pages/ShowTransaction/ShowTransaction';

function App() {
  return (<BrowserRouter>
    <Routes>
      <Route exact path='transaction/add' element={<AddTransaction></AddTransaction>}></Route>
      <Route path='transactions' element={<ShowTransaction></ShowTransaction>}></Route>
      <Route path='transactions/:id' element={<ShowTransaction></ShowTransaction>}></Route>
      <Route path='*' element={<h1>Not Found</h1>}></Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
