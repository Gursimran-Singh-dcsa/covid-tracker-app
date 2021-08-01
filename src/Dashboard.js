import './Dashboard.css';
import CovidData from './covid/CovidData';

const Dashboard = () => {
  return (
    <div className="page">
      <div className="header">Welcome to Covid 19 tracker Dashboard</div>
      <CovidData />
      <div className="footer">Footer</div>
    </div>
  )
}

export default Dashboard;
