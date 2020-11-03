import Axios from "axios";
import React from "react";
import GridLoader from "react-spinners/GridLoader";

import axios from 'axios';

import TotalCases from './components/widgets/summary_widgets/tatal_cases';
import TotalDeaths from './components/widgets/summary_widgets/total_deaths';
import TotalRecovered from './components/widgets/summary_widgets/total_recovered';
import TotalActive from './components/widgets/summary_widgets/total_active';
import CasesSummaryChartWidget from './components/widgets/summary_widgets/cases_summary_chart_widget'

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: {},
      isLoading: true,
    };
  }

  componentDidMount = async () => {
   await this.fetchCovid19Data()
  }

  fetchCovid19Data = () => {
    axios.get('https://corona.lmao.ninja/v2/all')
      .then(response => {
        this.setState({
          result: response.data,
          isLoading: false,
        })
      })
      .catch(error => {
        console.error(error.message)
        this.setState({
          isLoading: false,
        })
      })
  }

  render() {
    const {
      result,
      isLoading
    } = this.state

    if (isLoading) {
      return <GridLoader
                size={15}
                margin={2}
                color={"#f44336"}
                loading={isLoading}/>
    }else {
      return (
        <div>

          <div className="row">
            <div className="col-md-6">
              <CasesSummaryChartWidget
                casesPerOneMillion={result.casesPerOneMillion}
                deathsPerOneMillion={result.deathsPerOneMillion}
                activePerOneMillion={result.activePerOneMillion}
                recoveredPerOneMillion={result.recoveredPerOneMillion}
                criticalPerOneMillion={result.criticalPerOneMillion}
                affectedCountries={result.affectedCountries}
                population={result.population}
                 />
            </div>
            <div className="col-md-6 summary">
              <div className="row">
                <TotalCases
                  totalCases={result.cases}
                  todayCases={result.todayCases}
                />

                <TotalDeaths
                  totalDeaths={result.deaths}
                  todayDeaths={result.todayDeaths}
                />
              </div>
              <div className="row" style={{marginTop: '30px'}}>
                <TotalRecovered
                  totalRecovered={result.recovered}
                  todayRecovered={result.todayRecovered}
                />

                <TotalActive
                  totalActive={result.active}
                  critical={result.critical}
                />
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}


export default Dashboard;
