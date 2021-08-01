const todayDate = new Date().toISOString().slice(0, 10);

const APIEndPoints = {
  "getPublicReports": "https://api.cowin.gov.in/api/v1/reports/v2/getPublicReports?state_id=&district_id=&"+todayDate,
}

export default APIEndPoints;
