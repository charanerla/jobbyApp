import {AiFillStar} from 'react-icons/ai'
import {ImLocation} from 'react-icons/im'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = jobDetails

  return (
    <li className="similar-job-item" id={id}>
      <div className="similar-job-item-header">
        <img
          src={companyLogoUrl}
          className="company-logo"
          alt="similar job company logo"
        />
        <div className="job-title-rating-container">
          <h1 className="job-title">{title}</h1>
          <div className="star-rating-container">
            <AiFillStar color="#fbbf24" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="description-title">Description</h1>
      <p className="job-description">{jobDescription}</p>
      <div className="location-job-type-container">
        <ImLocation color="#f8fafc" />
        <p className="location-text">{location}</p>
        <BsFillBriefcaseFill fontSize="20px" color="#f8fafc" />
        <p className="job-type">{employmentType}</p>
      </div>
    </li>
  )
}

export default SimilarJobItem
