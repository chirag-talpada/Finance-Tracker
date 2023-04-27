import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css';

import AddTransaction from './pages/AddTransaction/AddTransaction';
import ShowTransaction from './pages/ShowTransaction/ShowTransaction';
import TransactionCard from './pages/TransactionCard/TransactionCard';

function App() {
  return (<BrowserRouter>
    <Routes>
      <Route exact path='transaction/add' element={<AddTransaction></AddTransaction>}></Route>
      <Route path='transactions' element={<ShowTransaction></ShowTransaction>}></Route>
      <Route path='transactions/:id' element={<TransactionCard></TransactionCard>}></Route>
      <Route path='*' element={<h1 style={{color:"white"}}>Not Found</h1>}></Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
