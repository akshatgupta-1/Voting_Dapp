import Wallet from './components/Wallet'
import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import AccountList from './pages/AccountList';
import CandidateDisplay from './components/CandidateDisplay';
import CandidateRegister from './pages/CandidateRegister';
import ConnectedAccount from './components/ConnnectedAccount';
import ElectionComission from './pages/ElectionComissin';
import Vote from './components/Vote';
import VoterDisplay from './components/VoterDisplay';
import VoterRegister from './pages/VoterRegister';
import Navigation from './components/Navigation';
import { useState } from 'react';

function App() {
  const [account, setAccount] = useState("");
  const saveAccount = (address) => {
    setAccount(address);
  };
  const router = createBrowserRouter([
    { path: "/", element: <AccountList saveAccount={saveAccount} /> },
    { path: "/candidate", element: <CandidateRegister account={account} /> },
    { path: "/voter", element: <VoterRegister account={account} /> },
    {
      path: "/election-commision",
      element: <ElectionCommision account={account} />,
    },
  ]);

  return (
    <>
      <Wallet>
        <RouterProvider router={router}></RouterProvider>
      </Wallet>
    </>
  );
}

export default App;
