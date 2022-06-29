import {BsSearch} from 'react-icons/bs'
import Profile from '../Profile'
import './index.css'

const FiltersGroup = props => {
  const renderSearchElement = () => {
    const {searchValue, updateSearchValue, fetchingTheJobsList} = props
    return (
      <div className="search-input-icon-container">
        <input
          type="search"
          className="search-bar"
          placeholder="Search"
          value={searchValue}
          onChange={event => updateSearchValue(event.target.value)}
        />
        <button
          type="button"
          className="search-icon-button"
          testid="searchButton"
          onClick={() => fetchingTheJobsList()}
        >
          <BsSearch color="#ffffff" fontSize="20px" className="search-icon" />
        </button>
      </div>
    )
  }

  const renderEmploymentTypeFilter = () => {
    const {employmentTypesList, updateActiveEmploymentTypeIdList} = props
    const toggleCheckList = event => {
      //   console.log(event.target.id)
      //   console.log(event.target.checked)
      updateActiveEmploymentTypeIdList(event.target.id)
    }
    return (
      <ul className="unordered-list-of-employment-type">
        {employmentTypesList.map(eachType => (
          <li className="employment-type-item" key={eachType.employmentTypeId}>
            <input
              type="checkbox"
              name={eachType.employmentTypeId}
              value={eachType.employmentTypeId}
              id={eachType.employmentTypeId}
              onChange={toggleCheckList}
            />
            <label
              htmlFor={eachType.employmentTypeId}
              className="checkbox-label"
            >
              {eachType.label}
            </label>
          </li>
        ))}
      </ul>
    )
  }

  const renderSalaryRangeFilter = () => {
    const {salaryRangesList, updateActiveSalaryRangeId} = props
    return (
      <ul className="unordered-list-of-salary-range">
        {salaryRangesList.map(salaryRange => (
          <li className="salary-range-item" key={salaryRange.salaryRangeId}>
            <input
              type="radio"
              id={salaryRange.salaryRangeId}
              name="salary-range"
              value={salaryRange.salaryRangeId}
              onChange={event => updateActiveSalaryRangeId(event.target.id)}
            />
            <label htmlFor={salaryRange.salaryRangeId} className="radio-label">
              {salaryRange.label}
            </label>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <>
      <Profile />
      {renderSearchElement()}
      <h1 className="type-of-employment-heading">Type of Employment</h1>
      {renderEmploymentTypeFilter()}
      <hr />
      <h1 className="salary-range-heading">Salary Range</h1>
      {renderSalaryRangeFilter()}
    </>
  )
}

export default FiltersGroup
