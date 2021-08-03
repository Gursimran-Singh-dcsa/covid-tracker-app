import {useSelector} from 'react-redux';
import {getStateNameFromId } from '../utilities/getNames';
import states from '../reducers/indianStates';
import { Bar } from 'react-chartjs-2';

const Statetrends = () => {
  const {stateWiseData} = useSelector(state => state);
  const formatStateWiseData = (data) => {
    const stateNames = [];
    const dose1 = [];
    const dose2 = [];
    const color1 = [];
    const color2 = [];
    for( const [key, value] of Object.entries(data)) {
      stateNames.push(getStateNameFromId(states, key));
      dose1.push(value[0].topBlock.vaccination.tot_dose_1);
      dose2.push(value[0].topBlock.vaccination.tot_dose_2);
      color1.push('pink');
      color2.push('blue');
    }
    return {
      "names": stateNames,
      "dose1": dose1,
      "dose2": dose2,
      "color1": color1,
      "color2": color2
    }
  }
  const data = formatStateWiseData(stateWiseData || {});
  const dataSet = {
    labels: data.names,
    datasets: [
      {
        label: 'Vaccination Coverage dose1',
        data: data.dose1,
        backgroundColor: data.color1,
        borderColor: data.color1,
        borderWidth: 1,
      },
      {
        label: 'Vaccination Coverage dose2',
        data: data.dose2,
        backgroundColor: data.color2,
        borderColor: data.color2,
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="statestrend">
      <Bar data={dataSet} options={{}} />
    </div>
  )
}

export default Statetrends;
