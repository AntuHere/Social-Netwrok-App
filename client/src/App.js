import {BrowserRouter as Router, Route} from 'react-router-dom'

import 'semantic-ui-css/semantic.min.css'
import './App.css';
import Home from './Pages/Home';
import login from './Pages/Login';
import Register from './Pages/Register';

function App() {
  return (

    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={login} />
      <Route exact path="/register" component={Register}/>
    </Router>
    
  );
}

export default App;
