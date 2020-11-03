const TotalCases = ({
  totalCases,
  todayCases
}) => {
  return (
    <div className="col-sm-6">
      <div className="card card-db-stats blue text-white">
        <div className="card-body">
          <div>
            <h2 className="card-main-count">{totalCases}</h2>
            <p className="card-main-text">Confirmed Cases</p>
          </div>

          <div>
            <h4 className="card-sub-count">{todayCases}</h4>
            <p className="card-sub-text">Today</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TotalCases;