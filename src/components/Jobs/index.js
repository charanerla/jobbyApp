import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import FiltersGroup from '../FiltersGroup'
import Header from '../Header'
import JobItem from '../JobItem'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    activeSalaryRangeId: '',
    activeEmploymentTypeIdList: [],
    searchValue: '',
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    // console.log('componentDidMount is called')
    this.fetchingTheJobsList()
  }

  fetchingTheJobsList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {
      activeSalaryRangeId,
      activeEmploymentTypeIdList,
      searchValue,
    } = this.state
    const joinedActiveEmploymentTypeIdList = activeEmploymentTypeIdList.join(
      ',',
    )
    const jwtToken = Cookies.get('jwt_token')
    // console.log(jwtToken)
    const url = `https://apis.ccbp.in/jobs?employment_type=${joinedActiveEmploymentTypeIdList}&minimum_package=${activeSalaryRangeId}&search=${searchValue}`
    // const url = 'https://apis.in/jobs'
    // console.log(url)
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      //   console.log(url)
      //   console.log(data)
      const updatedJobsList = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      //   console.log(updatedJobsList)

      this.setState({
        jobsList: updatedJobsList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  updateActiveSalaryRangeId = id => {
    this.setState({activeSalaryRangeId: id}, this.fetchingTheJobsList)
  }

  updateActiveEmploymentTypeIdList = id => {
    const {activeEmploymentTypeIdList} = this.state
    if (activeEmploymentTypeIdList.includes(id)) {
      const newActiveEmploymentTypeIdList = activeEmploymentTypeIdList.filter(
        eachType => eachType !== id,
      )
      //   console.log(newActiveEmploymentTypeIdList)
      this.setState(
        {activeEmploymentTypeIdList: newActiveEmploymentTypeIdList},
        this.fetchingTheJobsList,
      )
    } else {
      this.setState(
        prevState => ({
          activeEmploymentTypeIdList: [
            ...prevState.activeEmploymentTypeIdList,
            id,
          ],
        }),
        this.fetchingTheJobsList,
      )
    }
  }

  updateSearchValue = userSearch => {
    this.setState({searchValue: userSearch})
  }

  renderJobsList = () => {
    const {jobsList} = this.state
    if (jobsList.length > 0) {
      return (
        <ul className="unordered-list-of-jobs">
          {jobsList.map(eachJob => (
            <JobItem key={eachJob.id} jobDetails={eachJob} />
          ))}
        </ul>
      )
    }
    return (
      <div className="no-jobs-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs-image"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-description">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" weight="50" />
    </div>
  )

  renderProfileFailureSection = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="failure-view-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={() => this.fetchingTheJobsList}
      >
        Retry
      </button>
    </div>
  )

  renderJobsItems = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsList()
      case apiStatusConstants.failure:
        return this.renderProfileFailureSection()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {
      activeSalaryRangeId,
      activeEmploymentTypeIdList,
      searchValue,
    } = this.state
    return (
      <div className="jobs-app">
        <Header />
        <div className="jobs-body">
          <div className="filter-groups-container">
            <FiltersGroup
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              activeSalaryRangeId={activeSalaryRangeId}
              activeEmploymentTypeIdList={activeEmploymentTypeIdList}
              searchValue={searchValue}
              updateActiveEmploymentTypeIdList={
                this.updateActiveEmploymentTypeIdList
              }
              updateActiveSalaryRangeId={this.updateActiveSalaryRangeId}
              updateSearchValue={this.updateSearchValue}
              fetchingTheJobsList={this.fetchingTheJobsList}
            />
          </div>
          <div className="job-items-container">{this.renderJobsItems()}</div>
        </div>
      </div>
    )
  }
}

export default Jobs
