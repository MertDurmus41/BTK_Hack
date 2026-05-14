import { AnimatePresence } from 'framer-motion';
import { Header } from './layout/Header';
import { Landing } from './pages/Landing';

function App() {
  return (
    <AnimatePresence mode="wait">
      <div key="app-root" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Landing />
      </div>
    </AnimatePresence>
  );
}

export default App;
