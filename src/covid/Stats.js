import { useState, useEffect, useMemo } from 'react';
import APIEndPoints from "./constants";
import StatBadge from "./statBadge";

const Stats = () => {
  const [stats, setStats] = useState({
    "getPublicReports" : {},
    "loading": true,
    "error" : false,
  });
  let getPublicReports = {};
  let getVacPublicReports = {};

  const fetchApis = () => {
    Object.keys(APIEndPoints).forEach((endpoint) => {
      fetch(APIEndPoints[endpoint])
      .then(res => res.json())
      .then(data => {
        setStats(stats => {return {...stats, "loading": false, "getPublicReports" : data, "error" : false}});
        },
        error => {
          setStats(stats => {return {...stats, "loading": false, "error" : true}});
        }
      )
    })
  }
  useEffect(fetchApis, []);
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