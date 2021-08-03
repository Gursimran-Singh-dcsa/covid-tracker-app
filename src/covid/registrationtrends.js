import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const Drawchart = (props) => {
  const data = props.data;
  const useBy = props.useBy;
  // const getchartData = () => {
  //   if (useBy.today) {
  //     return data.timeWiseTodayRegReport;
  //   }
  //   if (useBy.last7days) {
  //     return data.last7DaysRegistration;
  //   }
  //   return data.topBlock.registration;
  // }

  const getDataSet = () => {
    const labels = [];
    const total = [];
    const cit18_45 = [];
    // const cit
    if (useBy.last7days) {

    }
  }

  const datasets = getDataSet();
  return (
    <Line datasets={datasets} options={{}} />
  )
}
const Registrationtrends = () => {
  const {dataAsPerStateAndDistrict} = useSelector(state => state);
  const [regDate, setRegDate] = useState({});
  const [useBy, setUseBy] = useState(
    {
      "today": false,
      "last7days": true,
      "All": false,
    }
  )
  const dispatch = useDispatch();
  // const getRegData = () => {
  //   fetch(`https://api.cowin.gov.in/api/v1/reports/v2/getVacPublicReports?state_id=${selectedState.value}&district_id=${selectedDistrict.value}&date=${new Date().toISOString().slice(0, 10)}`)
  //   .then(res => res.json())
  //   .then(data => {
  //     dispatch({'type': 'setRegData', 'value': data});
  //     setRegDate((regData) => {
  //       return {
  //         ...regData, data
  //       }
  //     })
  //     },
  //     error => {
  //       alert('there is an Error Loading Data');
  //     }
  //   )
  // }
  // const data = [];
  // // const by = '';
  // if (data) {
  //   if (today) {
      
  //   }
  // }
  // useEffect(() => {
  //   getRegData();
  // }, [selectedState, selectedDistrict]);
  // console.log(regData);
  const handleBtn = (e) => {
    e.preventDefault();
    setUseBy((useBy)=>{
      return {
        ...useBy, today: false, All: false, last7days: false, [e.target.value]: true
      }
    })
  }
  return (
    <div className="registrationtrends">
      {
        ['today', 'last7days', 'All'].map((btn) => {
          return (
            <button key={btn} value={btn} onClick={handleBtn} className={`by${btn} ${useBy[btn] ? 'active': ''}`}>{btn}</button>
          )
        }) 
      }
      <Drawchart useBy={useBy} data={dataAsPerStateAndDistrict ?? {}} />
    </div>
  )
}

export default Registrationtrends;
