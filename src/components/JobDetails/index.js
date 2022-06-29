import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import {ImLocation} from 'react-icons/im'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'

import './index.css'

const apiStatusContext = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobDetails extends Component {
  state = {
    apiStatus: apiStatusContext.initial,
    specificJobDetailsObj: {},
    skillsRequires: [],
    similarJobs: [],
  }

  componentDidMount() {
    this.fetchTheJobDetails()
  }

  fetchTheJobDetails = async () => {
    this.setState({apiStatus: apiStatusContext.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      //   console.log(data)
      const updatedSpecificJobDetail = {
        companyLogoUrl: data.job_details.company_logo_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
        companyWebsiteUrl: data.job_details.company_website_url,
        lifeAtCompanyDescription: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
      }

      //   console.log(updatedSpecificJobDetail)

      const updateSkillsRequired = data.job_details.skills.map(eachSkill => ({
        imageUrl: eachSkill.image_url,
        name: eachSkill.name,
      }))

      //   console.log(updateSkillsRequired)

      const updatedSimilarJobs = data.similar_jobs.map(eachSimilarJob => ({
        companyLogoUrl: eachSimilarJob.company_logo_url,
        employmentType: eachSimilarJob.employment_type,
        id: eachSimilarJob.id,
        jobDescription: eachSimilarJob.job_description,
        location: eachSimilarJob.location,
        rating: eachSimilarJob.rating,
        title: eachSimilarJob.title,
      }))

      //   console.log(updatedSimilarJobs)
      this.setState({
        apiStatus: apiStatusContext.success,
        specificJobDetailsObj: updatedSpecificJobDetail,
        skillsRequires: updateSkillsRequired,
        similarJobs: updatedSimilarJobs,
      })
    } else {
      this.setState({apiStatus: apiStatusContext.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSimilarJobs = () => {
    const {similarJobs} = this.state
    return (
      <div className="similar-jobs-container">
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="unordered-list-of-similar-jobs">
          {similarJobs.map(eachJob => (
            <SimilarJobItem key={eachJob.id} jobDetails={eachJob} />
          ))}
        </ul>
      </div>
    )
  }

  getJobDetails = () => {
    const {specificJobDetailsObj, skillsRequires} = this.state
    const {
      companyLogoUrl,
      employmentType,
      id,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      companyWebsiteUrl,
      lifeAtCompanyDescription,
      imageUrl,
    } = specificJobDetailsObj
    return (
      <>
        <div className="specific-job-details" id={id}>
          <div className="specific-job-details-header">
            <img
              src={companyLogoUrl}
              className="company-logo"
              alt="job details company logo"
            />
            <div className="job-title-rating-container">
              <h1 className="job-title">{title}</h1>
              <div className="star-rating-container">
                <AiFillStar color="#fbbf24" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-job-type-package-container">
            <div className="location-job-type-container">
              <ImLocation color="#f8fafc" />
              <p className="location-text">{location}</p>
              <BsFillBriefcaseFill fontSize="20px" color="#f8fafc" />
              <p className="job-type">{employmentType}</p>
            </div>
            <p className="package">{packagePerAnnum}</p>
          </div>
          <hr />
          <div className="description-title-company-link-container">
            <h1 className="description-title">Description</h1>
            <a
              href={companyWebsiteUrl}
              target="_blank"
              rel="noreferrer"
              className="anchor-tag"
            >
              Visit <FiExternalLink color="#6366f1" />
            </a>
          </div>
          <p className="job-description">{jobDescription}</p>
          <h1 className="skills-heading">Skills</h1>
          <ul className="unordered-list-of-skills">
            {skillsRequires.map(eachSkill => (
              <li className="skill-item" key={eachSkill.name}>
                <img
                  src={eachSkill.imageUrl}
                  alt={eachSkill.name}
                  className="skill-img"
                />
                <p className="skill-name">{eachSkill.name}</p>
              </li>
            ))}
          </ul>
          <div>
            <h1 className="life-at-company-heading">Life at Company</h1>
            <div className="company-life-description-container">
              <p className="company-life-description">
                {lifeAtCompanyDescription}
              </p>
              <img
                src={imageUrl}
                alt="life at company"
                className="company-img"
              />
            </div>
          </div>
        </div>
        {this.renderSimilarJobs()}
      </>
    )
  }

  renderFailureView = () => (
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
        onClick={() => this.fetchTheJobDetails}
      >
        Retry
      </button>
    </div>
  )

  renderTheJobDetailsPage = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusContext.success:
        return this.getJobDetails()
      case apiStatusContext.inProgress:
        return this.renderLoadingView()
      case apiStatusContext.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="specific-job-details-container">
        <Header />
        <div className="specific-job-details-body">
          {this.renderTheJobDetailsPage()}
        </div>
      </div>
    )
  }
}

export default JobDetails
