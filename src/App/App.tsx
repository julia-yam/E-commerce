import { Outlet } from 'react-router';
import { Header } from 'components';
import './App.module.scss';
import 'styles/variables.scss';

function App() {
  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
