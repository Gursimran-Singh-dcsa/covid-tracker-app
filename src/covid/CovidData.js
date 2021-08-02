import './main.css'
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const CovidData = () => {
  const {states, selectedState, selectedDistrict, districts} = useSelector((state) => state);
  const [myState, setState] = useState(
    {
      "selectedState": selectedState.name,
      "stateVal" : selectedState.value,
      "selectedDistrict": selectedDistrict.name,
      "districtVal": selectedDistrict.value
    }
  );

  const dispatch = useDispatch();

  const handleSelector = (event, type) => {
    const val = event.target.attributes.selectorval.value;
    const name = event.target.attributes.value.value
    setState((state) => {
      if ('state' === type) {
        return {
          ...state, "selectedState": name, "selectedDistrict": "Select A District"
        }
      }
      if ('district' == type) {
        return {
          ...state, "selectedDistrict": name
        }
      }
    });
    if ('state' === type) {
      dispatch({type: 'StateSelected', value : {name: name, value: val}});
    }
    if ('district' === type) {
      dispatch({type: 'DistrictSelected', value : {name: name, value: val}});
    }
  }
  const stateSelectorHandler = (event) => {
    event.preventDefault();
    handleSelector(event, 'state');
  }
  const districtSelectorHandler = (event) => {
    event.preventDefault();
    handleSelector(event, 'district');
  }
  return (
    <div className="section1">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house-fill" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
        <path fillRule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
      </svg>
      <div className="btns">
        <DropdownButton id="dropdown-basic-buttonA" title={myState.selectedState}>
          {states.map((state) => {
            if (myState.selectedState == state.name) {
              return (<Dropdown.Item key={state.value} selectorval={state.value} value={state.name} active onClick={stateSelectorHandler}>{state.name}</Dropdown.Item>)
            }
              return (<Dropdown.Item key={state.value} selectorval={state.value} value={state.name} onClick={stateSelectorHandler}>{state.name}</Dropdown.Item>)
            })
          }
        </DropdownButton>
        <DropdownButton id="dropdown-basic-buttonB" title={myState.selectedDistrict}>
          {districts.map((district, index) => {
            if (myState.selectedDistrict == district.district_name) {
              return (<Dropdown.Item key={index} selectorval={district.district_id} value={district.district_name} active onClick={districtSelectorHandler}>{district.district_name}</Dropdown.Item>)
            }
              return (<Dropdown.Item key={index} selectorval={district.district_id} value={district.district_name} onClick={districtSelectorHandler}>{district.district_name}</Dropdown.Item>)
            })
          }
        </DropdownButton>
      </div>
    </div>
  )
}

export default CovidData;