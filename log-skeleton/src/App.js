import NavigationBar from './components/navigation'
import Content from './components/content'
import { ErrorContext, ErrorProvider } from './lib/util/error'
import './App.css';
import ErrorToast from './components/error-toast';

function App() {
  return (
    <div className="App">
      <ErrorProvider>
        <ErrorToast></ErrorToast>
        <NavigationBar></NavigationBar>
        <Content></Content>
      </ErrorProvider>
    </div>
  );
}

export default App;
