const TotalDeaths = ({
  totalRecovered,
  todayRecovered
}) => {
  return (
    <div className="col-sm-6">
      <div className="card card-db-stats green text-white">
        <div className="card-body">
          <div>
            <h2 className="card-main-count">{totalRecovered}</h2>
            <p className="card-main-text">Recovered</p>
          </div>
          
          <div>
            <h4 className="card-sub-count">{todayRecovered}</h4>
            <p className="card-sub-text">Today Recovered</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TotalDeaths;