import states from './indianStates';
import districts from './indianDistricts'
const initialState = {
  "states": states,
  "selectedState": {name: "Select A State", value:''}, 
  "districts": [],
  "selectedDistrict": {name: "Select A District", value: ''},
  'dataAsPerStateAndDistrict': {}
}

const RootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'StateSelected':
      const selectedStateDistricts = getDistricts(action.value);
      state = {...state, "selectedState": action.value, "districts": selectedStateDistricts, "selectedDistrict": {name: "Select A District", value: ''}};
      return state;

    case 'DistrictSelected':
      state = {...state, "selectedDistrict": action.value};
      return state;
    case 'dataLoaded':
      state = {...state, "dataAsPerStateAndDistrict": action.value};
      return state;
  
    default:
      break;
  }
  return state;
}

const getDistricts = ({name, value}) => {
  const dist = [];
  districts.forEach(district => {
    if (value == district.state_id) {
      dist.push(district);
    }
  });
  return dist;
}

export default RootReducer;
