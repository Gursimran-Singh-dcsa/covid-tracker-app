import './css/badge.css';

const StatBadge = ({badgeName, today, BadgeValue, BadgeCategories}) => {
  BadgeCategories = Object.entries(BadgeCategories);
  return (
    <div className="Badge">
      <div className="badgeNameValueAndToday">
        <span className="badgeNameAndValue">{badgeName}: {BadgeValue}</span>
        {undefined !== today ? <span>Today: {today ? today : 0}</span> : <span></span>}
      </div>
      <div className="badgeCategories">
        {BadgeCategories.map((badgeCategory) => {
          return (
            <div className="badgeCategory" key={badgeCategory[0]}>
              <span className="catName">{badgeCategory[0]}</span>
              <span className="catValue">{badgeCategory[1]}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default StatBadge;
