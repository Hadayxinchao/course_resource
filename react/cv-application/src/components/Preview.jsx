import "../styles/CVPreview.css"

function Preview({ cv }) {
  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  }

  return (
    <div className="cv-preview">
      <h2>CV preview</h2>
      <section className="preview-section">
        <h3>Personal Information</h3>
        <div className="preview-personal">
          {cv.generalInfo.name ? (
            <>
              <h1 className="cv-name">{cv.generalInfo.name}</h1>
              <div className="contact-info">
                {cv.generalInfo.email && <p>{cv.generalInfo.email}</p>}
                {cv.generalInfo.phone && <p>{cv.generalInfo.phone}</p>}
              </div>
            </>
          ) : (
            <p className="preview-placeholder">Add your personal information to see it here</p>
          )}
        </div>
      </section>

      <section className="preview-section">
        <h3>Education</h3>
        {cv.education.length === 0 ? (
          <p className="preview-placeholder">No education added yet.</p>
        ) : (
          cv.education.map((edu) => (
            <div key={edu.id} className="info-item">
              <div className="preview-header">
                <h4>{edu.school}</h4>
                <span className="preview-date">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
              </div>
              <p className="preview-subtitle">{edu.degree}</p>
            </div>
          ))
        )}
      </section>

      <section className="preview-section">
        <h3>Work Experience</h3>
        {cv.experience.length === 0 ? (
          <p className="preview-placeholder">No experience added yet.</p>
        ) : (
          cv.experience.map((exp) => (
            <div key={exp.id} className="info-item">
              <div className="preview-header">
                <h4>{exp.company}</h4>
                <span className="preview-date">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</span>
              </div>
              <p className="preview-subtitle">{exp.position}</p>
              <p className="preview-description">{exp.responsibilities}</p>
            </div>
          ))
        )}
      </section>
    </div>
  )
}

export default Preview