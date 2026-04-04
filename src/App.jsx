import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Insights from './pages/Insights';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import { useStore } from './store/useStore';

const App = () => {
  const { darkMode } = useStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen transition-colors bg-slate-50 dark:bg-slate-950">
        <BrowserRouter>
          <div className="flex min-h-screen">
            <Sidebar
              isOpen={isSidebarOpen}
              isCollapsed={isSidebarCollapsed}
              onClose={() => setIsSidebarOpen(false)}
              onCollapseToggle={() => setIsSidebarCollapsed((v) => !v)}
            />

            <div
              className={`flex-1 min-h-screen transition-[margin] duration-200 ${
                isSidebarCollapsed ? 'md:ml-[96px]' : 'md:ml-[240px]'
              }`}
            >
              <Navbar onMenuToggle={() => setIsSidebarOpen((v) => !v)} />

              <main className="px-4 sm:px-6 lg:px-8 pb-10">
                <div className="max-w-[1280px] mx-auto space-y-6 lg:space-y-7 pt-4">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/transactions" element={<Transactions />} />
                    <Route path="/insights" element={<Insights />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                </div>
              </main>
            </div>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
