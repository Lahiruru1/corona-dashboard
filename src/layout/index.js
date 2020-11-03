import AppHeader from './header'
import Dashboard from '../pages/dashboard';

const AppLayout = () => {
  return (
    <div>
      <AppHeader />
      <main className="app-container">
        <Dashboard />
      </main>
    </div>
  );
}

export default AppLayout;
