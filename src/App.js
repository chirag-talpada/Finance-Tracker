import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import AddTransaction from "./pages/AddTransaction/AddTransaction";
import EditTransaction from "./pages/EditTransaction/EditTransaction";
import ShowTransaction from "./pages/ShowTransaction/ShowTransaction";
import TransactionCard from "./pages/TransactionCard/TransactionCard";
import Signin from "./pages/Signin/Signin";
import Signup from "./pages/Signup/Signup";
import AuthGuard from "./auth/AuthGuard";
import AppState from "./context/AppContext";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <AppState>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route exact path="" element={<Signin />}></Route>
            <Route exact path="/signup" element={<Signup />}></Route>

            <Route
              path="transaction/add"
              element={<AuthGuard Component={AddTransaction}></AuthGuard>}
            ></Route>
            <Route
              path="transaction/edit/:id"
              element={<AuthGuard Component={EditTransaction}></AuthGuard>}
            ></Route>
            <Route
              path="transactions"
              element={<AuthGuard Component={ShowTransaction}></AuthGuard>}
            ></Route>
            <Route
              path="transaction/:id"
              element={<AuthGuard Component={TransactionCard}></AuthGuard>}
            ></Route>
            <Route
              path="*"
              element={<h1 style={{ color: "white" }}>Not Found</h1>}
            ></Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </AppState>
  );
}

export default App;
