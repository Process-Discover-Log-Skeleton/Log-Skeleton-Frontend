import NavigationBar from './components/navigation'
import Content from './components/content'
import './App.css';
import { LogSkeletonProvider } from './lib/api/log-skeleton';
import { ToastProvider } from 'react-toast-notifications';

function App() {
  return (
    <div className="App">
      <ToastProvider
        autoDismiss
        autoDismissTimeout={2000}>
        <LogSkeletonProvider>
          <NavigationBar></NavigationBar>
          <Content></Content>
        </LogSkeletonProvider>
      </ToastProvider>
    </div>
  );
}

export default App;
