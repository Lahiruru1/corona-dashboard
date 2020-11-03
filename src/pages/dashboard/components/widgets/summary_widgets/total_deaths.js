const TotalDeaths = ({
  totalDeaths,
  todayDeaths
}) => {
  return (
    <div className="col-sm-6">
      <div className="card card-db-stats purple text-white">
        <div className="card-body">
          <div>
            <h2 className="card-main-count">{totalDeaths}</h2>
            <p className="card-main-text">Total Deaths</p>
          </div>

          <div>
            <h4 className="card-sub-count">{todayDeaths}</h4>
            <p className="card-sub-text">Today</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TotalDeaths;