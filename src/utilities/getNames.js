const getStateNameFromId = (states, id) => {
  const data = states[id-1];
  if (undefined !== data) {
    return data.name
  }
  return '';
}

const getDistrictNameFromId = (districts, id) => {
  let name = '';
  districts.forEach(district => {
    if (district.district_id == id) {
      name = district.district_name;
      return;
    }
  });
  return name;
}

export {getDistrictNameFromId, getStateNameFromId};
