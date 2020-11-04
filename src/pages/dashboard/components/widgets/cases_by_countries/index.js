import React from 'react'
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'

import BTable from 'react-bootstrap/Table';
import {matchSorter} from 'match-sorter'
import axios from 'axios'

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <span>
      Search:{' '}
      <input
        value={value || ""}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} Countries`}
        className="form-control"
      />
    </span>
  )
}

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length

  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  )
}


function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val

// Our table component
const Table =  ({ columns, data }) =>{
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      //defaultColumn, // Be sure to pass the defaultColumn option
      //filterTypes,
    },
    useFilters, // useFilters!
    useGlobalFilter // useGlobalFilter!
  )

  // We don't want to render all of the rows for this example, so cap
  // it for this use case
  const firstPageRows = rows.slice(0, 10)

  return (
    <>
      <BTable
        striped
        bordered
        hover
        {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                  {/* Render the columns filter UI */}

                </th>
              ))}
            </tr>
          ))}

          <tr>
            <th
              colSpan={visibleColumns.length}
              style={{
                textAlign: 'left',
              }}
            >
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </th>
          </tr>

        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </BTable>

      <br />
      <div>Showing the first 20 results of {rows.length} rows</div>
      <div>
        <pre>
          <code>{JSON.stringify(state.filters, null, 2)}</code>
        </pre>
      </div>
    </>
  )
}

const tableHeaderValues = [{
                              Header: 'Cases By Countries',
                              columns: [
                                {
                                  Header: 'Country',
                                  accessor: 'country',
                                },
                                {
                                  Header: 'Total Cases',
                                  accessor: 'cases',
                                },
                                {
                                  Header: 'Total Deaths',
                                  accessor: 'deaths',
                                },
                                {
                                  Header: 'Total Recovered',
                                  accessor: 'recovered',
                                },
                                {
                                  Header: 'Active Cases',
                                  accessor: 'active',
                                },
                                {
                                  Header: 'Population',
                                  accessor: 'population',
                                },
                              ],
                            }]

class CasesByCountries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      isLoading: true,
    };
  }

  componentDidMount = async () => {
    await this.fetchCasesByCountriesData()
  }

  fetchCasesByCountriesData = () => {
    axios.get('https://corona.lmao.ninja/v2/countries?sort=country')
      .then(response => {
        this.setState({
          tableData: response.data,
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
    const { isLoading, tableData } = this.state

    console.log(tableData)
    if(isLoading) {
      return ""
    }else {
      return(
        <div className="card" style={{padding: '30px'}}>
          <Table columns={tableHeaderValues} data={tableData} />
        </div>
      )
    }
  }

}

export default CasesByCountries
