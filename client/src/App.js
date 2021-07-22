import React from 'react';
import Fib from './Fib';
import OtherPage from './OtherPage';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div>
        <Link to='/'>Home</Link>
        <Link to='/otherpage'>Other Page</Link>
      </div>
      <div>
        <Route exact path='/' component={Fib} />
        <Route exact path='/otherpage' component={OtherPage} />
      </div>
    </Router>
  );
};

export default App;
