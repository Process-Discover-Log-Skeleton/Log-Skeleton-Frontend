import NavigationBar from './components/navigation'
import Content from './components/content'
import { ErrorContext, ErrorProvider } from './lib/util/error'
import './App.css';
import ErrorToast from './components/error-toast';
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
