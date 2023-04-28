import React from 'react';
import './Home.css'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
        <Link className='link' to='/transactions'><h2>View Transaction</h2></Link>
        <Link className='link' to='/transaction/add' ><h2>Add Transaction</h2></Link>
    </div>
  )
}

export default Home