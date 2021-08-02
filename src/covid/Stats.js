import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import APIEndPoints from "./constants";
import StatBadge from "./statBadge";

const Stats = () => {
  const {states, selectedState, selectedDistrict, districts} = useSelector(state => state);
  const dispatch = useDispatch();
  const [stats, setStats] = useState({
    "getPublicReports" : {},
    "loading": true,
    "error" : false,
  });

  const fetchApis = () => {
    Object.keys(APIEndPoints).forEach((endpoint) => {
      fetch(`${APIEndPoints[endpoint]}?state_id=${selectedState.value}&district_id=${selectedDistrict.value}&date=${new Date().toISOString().slice(0, 10)}`)
      .then(res => res.json())
      .then(data => {
        setStats(stats => {return {...stats, "loading": false, "getPublicReports" : data, "error" : false}});
        dispatch({'type': 'dataLoaded', 'value': data})
        },
        error => {
          setStats(stats => {return {...stats, "loading": false, "error" : true}});
        }
      )
    })
  }
  useEffect(fetchApis, [selectedState, selectedDistrict]);
  if (stats.loading) {
    return (
      <div className="stats">
        loading
      </div>
    )
  }
  if (stats.error) {
    return (
      <div className="stats">
        error
      </div>
    )
  }
  return (
    <div className="stats">
      {'hr'==selectedState ? <span></span>: ''}
      <StatBadge badgeName="Total Vaccination Doses"
                 BadgeValue={stats.getPublicReports.topBlock.vaccination.total}
                 today={stats.getPublicReports.topBlock.vaccination.today}
                 BadgeCategories={{"dose1": stats.getPublicReports.topBlock.vaccination.tot_dose_1
                  ,"dose2": stats.getPublicReports.topBlock.vaccination.tot_dose_2
                }}
      />
      <StatBadge badgeName="Sites Conducting Vaccination"
                 BadgeValue={stats.getPublicReports.topBlock.sites.total}
                 BadgeCategories={{"government": stats.getPublicReports.topBlock.sites.govt
                  ,"private": stats.getPublicReports.topBlock.sites.pvt
                }}
      />
      <StatBadge badgeName="Total Registrations"
                 today={stats.getPublicReports.topBlock.registration.today}
                 BadgeValue={stats.getPublicReports.topBlock.registration.total}
                 BadgeCategories={{"Age 18-45": stats.getPublicReports.topBlock.registration.cit_18_45
                  ,"Age 45+": stats.getPublicReports.topBlock.registration.cit_45_above
                }}
      />
    </div>
  )
}
export default Stats;
//{badgeName, today, BadgeValue, BadgeCategories}