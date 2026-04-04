import SummaryCards from '../components/dashboard/SummaryCards';
import BarChart from '../components/dashboard/BarChart';
import PieChart from '../components/dashboard/PieChart';
import LineChart from '../components/dashboard/LineChart';
import InsightsSection from '../components/dashboard/InsightsSection';
import HealthScore from '../components/dashboard/HealthScore';
import RecentTransactions from '../components/dashboard/RecentTransactions';

const Dashboard = () => (
  <div className="grid grid-cols-12 gap-4 lg:gap-5">
    <div className="col-span-12">
      <SummaryCards />
    </div>

    <div className="col-span-12">
      <InsightsSection />
    </div>

    <div className="col-span-12 xl:col-span-8">
      <LineChart />
    </div>
    <div className="col-span-12 xl:col-span-4">
      <HealthScore />
    </div>

    <div className="col-span-12 lg:col-span-6">
      <BarChart />
    </div>
    <div className="col-span-12 lg:col-span-6">
      <PieChart />
    </div>

    <div className="col-span-12">
      <RecentTransactions />
    </div>
  </div>
);

export default Dashboard;
