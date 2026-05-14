import { AnimatePresence } from 'framer-motion';
import { Header } from './layout/Header';
import { Landing } from './pages/Landing';
import { Archive } from './pages/Archive';
import { RemixModal } from './components/modals/RemixModal';
import { AppProvider, useAppContext } from './context/AppContext';

function AppContent() {
  const { currentPage } = useAppContext();

  return (
    <>
      <AnimatePresence mode="wait">
        <div key="app-root" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          {currentPage === 'landing' && <Landing />}
          {currentPage === 'archive' && <Archive />}
        </div>
      </AnimatePresence>
      <RemixModal />
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
