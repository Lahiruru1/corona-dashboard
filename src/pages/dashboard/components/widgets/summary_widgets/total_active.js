import numeral from 'numeral'

const TotalActive = ({
  totalActive,
  critical
}) => {
  const _totalActive = numeral(totalActive).format('0,0')
  const _critical = numeral(critical).format('0,0')

  return (
    <div className="col-sm-6">
      <div className="card card-db-stats yellow text-white">
        <div className="card-body">
          <div>
            <h2 className="card-main-count">{_totalActive}</h2>
            <p className="card-main-text">Total Active</p>
          </div>
          
          <div>
            <h4 className="card-sub-count">{_critical}</h4>
            <p className="card-sub-text">Critical Cases</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TotalActive;