import { useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import './css/socialtrends.css';

const Aefi = (props) => {
  const formattedData = (data) => {
    let vacDate =  [];
    let aefi = []
    data.forEach(data => {
      vacDate.push(data.vaccine_date)
      aefi.push(data.aefi)
    })
    return {'vacDate':vacDate, 'aefi':aefi};
  }
  const data = formattedData(props.data);
  const dataset = {
    labels: data.vacDate,
    datasets: [
      {
        label: 'AEFI Reported',
        data: data.aefi,
        fill: true,
        backgroundColor: 'pink',
        borderColor: 'pink',
      }
    ]
  };
  const options = {
  }
  return (
    <div className="aefi">
        <Line data={dataset} options={options} />
    </div>
  )
}

const RuralAndUrban = (props) => {
  const data = props.data;
  const formatData = (data) => {
    let rural = [];
    let urban = [];
    let dates = [];
    data.forEach(data => {
      rural.push(data.rural);
      urban.push(data.urban);
      dates.push(data.ts);
    })
    return {
      "rural": rural,
      "urban": urban,
      "dates": dates
    }
  }
  const myData = formatData(data);

  const dataset = {
    labels: myData.dates,
    datasets: [
      {
        label: 'Rural',
        data: myData.rural,
        fill: false,
        backgroundColor: 'pink',
        borderColor: 'pink',
      },
      {
        label: 'Urban',
        data: myData.urban,
        fill: false,
        backgroundColor: 'blue',
        borderColor: 'blue',
      }
    ]
  };
  return (
    <div className="aefi">
        <Line data={dataset} options={{}} />
    </div>
  )
}
const Socialtrends = () => {
  const {dataAsPerStateAndDistrict} = useSelector(state => state);
  return (
    <div className="aefiAndRuralData">
      <Aefi data={dataAsPerStateAndDistrict.last30DaysAefi || []} />
      <RuralAndUrban data={dataAsPerStateAndDistrict.vaccinationDoneByTimeAgeWise || []} />
    </div>
  )
}

export default Socialtrends;
