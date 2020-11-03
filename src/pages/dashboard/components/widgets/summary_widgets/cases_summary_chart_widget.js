import React from 'react'

import Chart from 'chart.js'
import numeral from 'numeral'

class CasesSummaryChartWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	chartData: []
    };
  }

  componentDidMount = async () => {
  	await this.setChartDataSet();
  	await this.createChart();
  }

  setChartDataSet = () => {
    const {
      casesPerOneMillion,
      deathsPerOneMillion,
      activePerOneMillion,
      recoveredPerOneMillion,
      criticalPerOneMillion
    } = this.props

    const data = {
      datasets: [{
          data: [
            casesPerOneMillion,
            deathsPerOneMillion,
            activePerOneMillion,
            recoveredPerOneMillion,
            criticalPerOneMillion
          ],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCD56",
            "#A426D4",
            "#9DE206"

          ]
      }],
  
      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: [
        'Cases Per One Million',
        'Deaths Per One Million',
        'Active Per One Million',
        'Recovered Per One Million',
        'Critical Per One Million'
      ]
    };

    this.setState({
      chartData: data
    })
  }

  createChart = () => {
    const ctx = document.getElementById('CasesSummaryChart').getContext('2d')
    const chart = new Chart(ctx, {
                        type: 'doughnut',
                        data: this.state.chartData,
                        options: {}
                      });
  
    return chart;
  }
  render() {
    
    const _affectedCountries = numeral(this.props.affectedCountries).format('0,0')
    const _population = numeral(this.props.population).format('0,0')

    return (
      <div className="card card-db-stats" style={{padding: '30px'}}>
        <canvas id="CasesSummaryChart"></canvas>

        <div className="d-flex justify-content-between">
          <div>
            <h4>{_population}</h4>
            <p>World Population</p>
          </div>

          <div>
            <h4>{_affectedCountries}</h4>
            <p>Affected Countries</p>
          </div>
        </div>
      </div>
    )
  }

}

export default CasesSummaryChartWidget;