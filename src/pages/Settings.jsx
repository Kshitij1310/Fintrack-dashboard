import { useEffect, useMemo, useState } from 'react';
import { Moon, SunMedium, Bell, RefreshCw, Globe2, User2, Database, BadgeCheck } from 'lucide-react';
import Button from '../components/ui/Button';
import { useStore } from '../store/useStore';
import { exportToCSV } from '../utils/helpers';

const Card = ({ title, icon: Icon, children }) => (
  <div className="section-card card-hover p-4 space-y-3">
    <div className="flex items-center gap-2">
      <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-200 grid place-items-center">
        <Icon className="w-4 h-4" />
      </div>
      <p className="text-sm font-semibold text-slate-900 dark:text-white">{title}</p>
    </div>
    {children}
  </div>
);

const Settings = () => {
  const { darkMode, toggleDarkMode, role, transactions } = useStore();

  const [currency, setCurrency] = useState('INR');
  const [notifications, setNotifications] = useState({ email: true, push: false });
  const [profile, setProfile] = useState({
    name: 'Ariana Kapoor',
    email: 'ariana.kapoor@example.com',
  });
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileDraft, setProfileDraft] = useState(profile);

  const enrichedProfile = useMemo(
    () => ({
      ...profile,
      role: role === 'admin' ? 'Admin' : 'Viewer',
      org: 'Fintrack Demo Workspace',
    }),
    [profile, role]
  );

  // Load persisted preferences
  useEffect(() => {
    if (typeof localStorage === 'undefined') return;
    const storedProfile = localStorage.getItem('userProfile');
    const storedCurrency = localStorage.getItem('currency');
    const storedNotifications = localStorage.getItem('notifications');
    if (storedProfile) setProfile(JSON.parse(storedProfile));
    if (storedProfile) setProfileDraft(JSON.parse(storedProfile));
    if (storedCurrency) setCurrency(storedCurrency);
    if (storedNotifications) setNotifications(JSON.parse(storedNotifications));
  }, []);

  // Persist currency selection
  useEffect(() => {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem('currency', currency);
  }, [currency]);

  // Persist notifications
  useEffect(() => {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Persist profile
  useEffect(() => {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem('userProfile', JSON.stringify(profile));
  }, [profile]);

  const startEdit = () => {
    setProfileDraft(profile);
    setEditingProfile(true);
  };

  const saveProfile = () => {
    setProfile(profileDraft);
    setEditingProfile(false);
  };

  const cancelProfile = () => {
    setProfileDraft(profile);
    setEditingProfile(false);
  };

  const exportJson = () => {
    const data = JSON.stringify(transactions, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'fintrack-transactions.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportCsv = () => exportToCSV(transactions);

  const resetData = () => {
    if (!window.confirm('Reset all local financial data? This cannot be undone.')) return;
    localStorage.removeItem('fintrack-store');
    localStorage.removeItem('transactions');
    localStorage.removeItem('currency');
    localStorage.removeItem('notifications');
    localStorage.removeItem('userProfile');
    localStorage.removeItem('theme');
    localStorage.removeItem('fintrack-dark');
    window.location.reload();
  };

  return (
    <div className="space-y-5 lg:space-y-6">
      <header className="space-y-1">
        <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Preferences</p>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Settings</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Personalize your Fintrack experience.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="Profile" icon={User2}>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-600 to-blue-500 text-white grid place-items-center text-sm font-semibold">
              {enrichedProfile.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
            </div>
            <div className="space-y-0.5">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{enrichedProfile.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{enrichedProfile.email}</p>
              <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/50 text-[11px] font-semibold text-indigo-700 dark:text-indigo-100">
                <BadgeCheck className="w-3.5 h-3.5" /> {enrichedProfile.role}
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">Workspace: {enrichedProfile.org}</p>
          {!editingProfile && (
            <Button variant="secondary" size="sm" className="mt-3" onClick={startEdit}>Edit Profile</Button>
          )}
          {editingProfile && (
            <div className="mt-3 space-y-2">
              <input
                type="text"
                value={profileDraft.name}
                onChange={(e) => setProfileDraft((p) => ({ ...p, name: e.target.value }))}
                className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-white/90 dark:bg-slate-900/80 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Name"
              />
              <input
                type="email"
                value={profileDraft.email}
                onChange={(e) => setProfileDraft((p) => ({ ...p, email: e.target.value }))}
                className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-white/90 dark:bg-slate-900/80 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Email"
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={saveProfile}>Save</Button>
                <Button variant="secondary" size="sm" onClick={cancelProfile}>Cancel</Button>
              </div>
            </div>
          )}
        </Card>

        <Card title="Currency Selection" icon={Globe2}>
          <label className="text-sm text-slate-600 dark:text-slate-300">Display currency</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="mt-2 w-full text-sm border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-white/90 dark:bg-slate-900/80 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="INR">Indian Rupee (₹)</option>
            <option value="USD">US Dollar ($)</option>
            <option value="EUR">Euro (€)</option>
          </select>
        </Card>

        <Card title="Theme" icon={darkMode ? Moon : SunMedium}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Dark mode</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Toggle light/dark experience.</p>
            </div>
            <button
              onClick={toggleDarkMode}
              className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-semibold bg-white/80 dark:bg-slate-900/80"
              aria-label="Toggle dark mode"
            >
              {darkMode ? 'Disable' : 'Enable'}
            </button>
          </div>
        </Card>

        <Card title="Notification Preferences" icon={Bell}>
          <div className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={notifications.email}
                onChange={(e) => setNotifications((s) => ({ ...s, email: e.target.checked }))}
              />
              Email alerts
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={notifications.push}
                onChange={(e) => setNotifications((s) => ({ ...s, push: e.target.checked }))}
              />
              Push notifications
            </label>
          </div>
        </Card>

        <Card title="Export Data" icon={Database}>
          <p className="text-sm text-slate-600 dark:text-slate-300">Export your data snapshot for backup or migration.</p>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={exportJson}>Export JSON</Button>
            <Button variant="secondary" size="sm" onClick={exportCsv}>Export CSV</Button>
          </div>
        </Card>

        <Card title="Reset Financial Data" icon={RefreshCw}>
          <p className="text-sm text-slate-600 dark:text-slate-300">Clear local data and start fresh.</p>
          <Button variant="danger" size="sm" onClick={resetData}>Reset Data</Button>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
