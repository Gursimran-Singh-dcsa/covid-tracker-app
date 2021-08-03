import { useSelector, useDispatch } from 'react-redux';
import { Doughnut, Pie } from 'react-chartjs-2';
import { useMemo, useEffect, useState } from 'react';
import { useTable } from 'react-table';
import states from '../reducers/indianStates';
import APIEndPoints from "./constants";
import { Table } from 'react-bootstrap';
import { getDistrictNameFromId, getStateNameFromId } from "../utilities/getNames";
import './css/VaccinationComponents.css';

const SemiDoughnet = (props) => {
  const data = props.data;
  const sexLabels = ['male', 'female', 'others'];
  const vaccineLabels = ["covishield", 'covaxin', 'sputnik']
  const colors = ['grey', 'brown', 'green']
  const sexData = {
    labels: sexLabels,
    datasets: 
    [
      {
        label: 'gender aspect',
        data: [data.male, data.female, data.others],
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
      }
    ]
  }
  const vaccineData = {
    labels: vaccineLabels,
    datasets: 
    [
      {
        label: 'vaccine aspect',
        data: [data.covishield, data.covaxin, data.sputnik],
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
      }
    ]
  }
  return (
    <div className='doughnetCharts'>
      <Doughnut data={sexData} />
      <Doughnut data={vaccineData} />
    </div>
  )
}

const PieChart = (props) => {
  const data = props.data;
  const labels = ['vac_18_45', 'vac_45_60', 'above_60'];
  const colors = ['grey', 'brown', 'green']
  const ageData = {
    labels: labels,
    datasets: [
      {
        label: 'Age Aspect',
        data: [data.vac_18_45, data.vac_45_60, data.above_60],
        backgroundColor: colors,
        borderColor: colors,
      }
    ]
  }
  return (
    <div className="pieChart">
      <Pie data={ageData} />
    </div>
  )
}

const DistrictTable = () => {
  const {dataAsPerStateAndDistrict, selectedState, districts, stateWiseData, districtWiseData} = useSelector(state => state);
  // districtWiseData = districtWiseData || [];
  const dispatch = useDispatch();

  const getAllStatesData = () => {
    states.forEach(state => {
      Object.keys(APIEndPoints).forEach((endpoint) => {
        fetch(`${APIEndPoints[endpoint]}?state_id=${state.value}&district_id=&date=${new Date().toISOString().slice(0, 10)}`)
        .then(res => res.json())
        .then(data => {
          dispatch({'type': 'stateDataAdded', 'stateId': state.value, 'data': data})
          },
          error => {
            alert('there is an Error Loading Data');
          }
        )
      })
    });
  }

  const getAllDistrictData = () => {
    districts.forEach(district => {
      Object.keys(APIEndPoints).forEach((endpoint) => {
        fetch(`${APIEndPoints[endpoint]}?state_id=${selectedState.value}&district_id${district.district_id}=&date=${new Date().toISOString().slice(0, 10)}`)
        .then(res => res.json())
        .then(data => {
          dispatch({'type': 'districtDataAdded', 'district_id': district.district_id, 'data': data})
          },
          error => {
            alert('there is an Error Loading Data');
          }
        )
      })
    })
  }

  const getStateWiseAndDistrictWiseData = () => {
    if ('' == selectedState.value) {
      getAllStatesData()
    } else {
      getAllDistrictData()
    }
  }

  useEffect(() => {
    getStateWiseAndDistrictWiseData();
  }, [selectedState]);

  const getArrangedData = () => {
    const dataVals = [];
    if (!selectedState.value) {
      Object.keys(stateWiseData).forEach(stateData => {
        dataVals.push(
          {
            name: getStateNameFromId(states, stateData),
            today: stateWiseData[stateData][0].topBlock.vaccination.today,
            total: stateWiseData[stateData][0].topBlock.vaccination.total
          }
        )
      });
    } else {
        Object.keys(districtWiseData).forEach(district_id => {
          dataVals.push(
            {
              name: getDistrictNameFromId(districts, district_id),
              today: districtWiseData[district_id][0].topBlock.vaccination.today,
              total: districtWiseData[district_id][0].topBlock.vaccination.total
            }
          )
        });
    }
    return dataVals;
  }
  const coldata = getArrangedData();
  const columnData = useMemo(() => coldata)

  const columns = useMemo(() => [
    {
      Header: 'State/District',
      accessor: 'name',
    },
    {
      Header: 'Today',
      accessor: 'today',
    },
    {
      Header: 'Total',
      accessor: 'total',
    }
  ]);
  return (
    <Table responsive size="sm" className="tablee">
      <thead>
        <tr>
          {columns.map((value, index) => (
            <th key={index}>{value.accessor}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {
          columnData.map((value, index) => {
            return (
              <tr key={value.total}>
                <td key={value.name}>{value.name}</td>
                <td key={value.today}>{value.today}</td>
                <td key={value.total}>{value.total}</td>
              </tr>
            )
          })
        }
      </tbody>
    </Table>
  ) 
}
const VaccinationComponents = () => {
  const {dataAsPerStateAndDistrict, selectedState, districts} = useSelector(state => state);
  const topBlock = dataAsPerStateAndDistrict['topBlock'] || [];
 return (
   <div className='vaccineComponents'>
     <SemiDoughnet data={topBlock['vaccination'] || []}/>
     <PieChart data={dataAsPerStateAndDistrict.vaccinationByAge || [] } />
     <DistrictTable />
   </div>
 )
}

export default VaccinationComponents;
