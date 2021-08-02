import './Dashboard.css';
import CovidData from './covid/CovidData';
import Stats from './covid/Stats';
import Charts from './covid/chart';

const Dashboard = () => {
  return (
    <div className="page">
      <div className="header">Welcome to Covid 19 tracker Dashboard</div>
      <CovidData />
      <Stats />
      <Charts />
      <div className="footer">Footer</div>
    </div>
  )
}

export default Dashboard;
