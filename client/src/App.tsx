import { BrowserRouter as Router } from 'react-router-dom';
import AllProviders from './wrappers/AllProviders';
import Layout from './wrappers/Layout';

function App() {
  return (
    <AllProviders>
      <Router>
        <Layout />
      </Router>
    </AllProviders>
  );
}

export default App;
