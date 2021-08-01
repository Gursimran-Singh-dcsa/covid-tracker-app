import './Dashboard.css';
import CovidData from './covid/CovidData';
import Stats from './covid/Stats';

const Dashboard = () => {
  return (
    <div className="page">
      <div className="header">Welcome to Covid 19 tracker Dashboard</div>
      <CovidData />
      <Stats />
      <div className="footer">Footer</div>
    </div>
  )
}

export default Dashboard;
