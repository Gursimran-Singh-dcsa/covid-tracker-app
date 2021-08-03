import {useSelector} from 'react-redux';
import { Line } from 'react-chartjs-2';
import { useState, Fragment } from 'react';
import VaccinationComponents from './vaccinationComponents';
import Socialtrends from './socialtrends';
import Statetrends from './statetrends';
import './css/chart.css';

const VaccinationTrends = (props) => {
  const colors = ['red', 'green', 'blue', 'orange'];
  const {vac_18_45, vac_45_60, vac_60_above, dose_one, dose_two} = props.chartData;
  let datas = [];
  if (props.byAge) {
    datas = [vac_18_45, vac_45_60, vac_60_above];
  }
  if (props.byDose) {
    datas = [dose_one, dose_two];
  }
  const data={
    labels: props.chartData.labels,
    datasets: []
  };
  datas.forEach((val, index) => {
    data['datasets'].push({
      label: `${props.byAge ? (index == 0 ? '18-45' : (index== 1) ? '45-60' : 'above 60') : (index == 0) ? 'dose 1' : 'dose 2'}`,
      data: val,
      fill: false,
      borderColor: colors[index],
      backgroundColor: colors[index],
    })
  })
  
  const options = {
    responsive: true
  };
  //https://www.npmjs.com/package/react-chartjs-2
  //https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/Line.js
  return (
        <Line data={data} options={options}/>
  )
}

const Charts = () => {
  const {dataAsPerStateAndDistrict} = useSelector(state => state);
  const [useBy, setUseBy] = useState(
    {
      "byAge": true,
      "byDose": false
    }
  )
  const dataExtracter = () => {
    const timeAgeData = dataAsPerStateAndDistrict['vaccinationDoneByTimeAgeWise'] || [];
    const doseTimeData = dataAsPerStateAndDistrict['vaccinationDoneByTime'] || [];
    const labels = [],vac_18_45 = [],vac_45_60 = [],vac_60_above = [],dose_one = [],dose_two = [];
    timeAgeData.forEach(data => {
      labels.push(data.ts)
      vac_18_45.push(data.vac_18_45);
      vac_45_60.push(data.vac_45_60);
      vac_60_above.push(data.vac_60_above);
    });
    doseTimeData.forEach(
      data => {
        dose_one.push(data.dose_one);
        dose_two.push(data.dose_two)
      }
    )
    const chart1Data = {
      "labels": labels,"vac_18_45": vac_18_45,"vac_45_60": vac_45_60, "vac_60_above": vac_60_above,
      "dose_one": dose_one, "dose_two": dose_two
    }
    return chart1Data;
  }
  const handleByUse = (event) => {
    event.preventDefault();
    if ('Dose' == event.target.value) {
      setUseBy((useby) => {
        return {
          ...useBy,
          byAge : false,
          byDose: true
        }
      })
      return;
    }
    setUseBy((useby) => {
      return {
        ...useBy, 
        byAge: true,
        byDose: false
      }
    })
  }
  return (
    <Fragment>
      <div className="vaccinationTrends">
        <div className="options">
          {
            ['Dose', 'Age'].map(val => {
              return (
                <button
                  key={val}
                  value={val}
                  className={`by${val} ${useBy['by'+val] ? 'active': ''}`}
                  onClick={handleByUse} >
                    By {val}
                </button>
              )
            })
          }
          <VaccinationTrends chartData={dataExtracter()} byAge={useBy.byAge} byDose={useBy.byDose} />
        </div>
      </div>
      <VaccinationComponents />
      <Socialtrends />
      <Statetrends />
    </Fragment>
  )
}

export default Charts;