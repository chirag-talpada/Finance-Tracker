import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css';

import AddTransaction from './pages/AddTransaction/AddTransaction';
import EditTransaction from './pages/EditTransaction/EditTransaction';
import ShowTransaction from './pages/ShowTransaction/ShowTransaction';
import TransactionCard from './pages/TransactionCard/TransactionCard';
import Home from './pages/Home/Home';

function App() {
  return (<BrowserRouter>
    <Routes>
      <Route exact path='' element={<Home></Home>}></Route>
      <Route path='transaction/add' element={<AddTransaction></AddTransaction>}></Route>
      <Route path='transaction/edit/:id' element={<EditTransaction></EditTransaction>}></Route>
      <Route path='transactions' element={<ShowTransaction></ShowTransaction>}></Route>
      <Route path='transactions/:id' element={<TransactionCard></TransactionCard>}></Route>
      <Route path='*' element={<h1 style={{color:"white"}}>Not Found</h1>}></Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
