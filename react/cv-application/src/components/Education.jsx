import { useState } from "react";

function Education({ addEducation, educations, updateEducation, removeEducation }) {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    startDate: '',
    endDate: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [displayForm, setDisplayForm] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editMode) {
      updateEducation({ ...formData, id: editId })
      setEditMode(false)
      setEditId(null)
    } else {
      addEducation({ ...formData, id: Date.now() })
    }

    setFormData({
      school: '',
      degree: '',
      startDate: '',
      endDate: ''
    })
    setDisplayForm(false)
  }

  const handleEdit = (edu) => {
    setFormData({
      school: edu.school,
      degree: edu.degree,
      startDate: edu.startDate,
      endDate: edu.endDate
    })
    setEditMode(true)
    setEditId(edu.id)
    setDisplayForm(true)
  }

  const handleDelete = (edu) => {
    removeEducation(edu.id)
  }

  return (
    <section className="section">
      <h2>Education</h2>

      {educations && educations.length > 0 ? (
        <div className="educations-list">
          {educations.map((edu) => (
            <div key={edu.id} className="info-item">
              <h4>{edu.school}</h4>
              <p><strong>Degree:</strong> {edu.degree}</p>
              <p><strong>Period:</strong> {edu.startDate} - {edu.endDate}</p>
              <div className="action-buttons">
                <button
                  type="button"
                  className="btn edit-btn"
                  onClick={() => handleEdit(edu)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn delete-btn"
                  onClick={() => handleDelete(edu)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>No education history added yet.</p>
          <button
            type="button"
            className="btn toggle-btn"
            onClick={() => setDisplayForm(true)}
          >
            Add Your First Education
          </button>
        </div>
      )}

      { educations && educations.length > 0 && (
        <button
          type="button"
          className="btn toggle-btn"
          onClick={() => setDisplayForm(!displayForm)}
        >
          {displayForm ? 'Hide Form' : 'Add New Education'}
        </button>
      )}

      {displayForm && (
        <form onSubmit={handleSubmit} className="education-form">
          <div className="form-group">
            <label htmlFor="school">School University</label>
            <input
              type="text"
              id="school"
              name="school"
              value={formData.school}
              onChange={handleChange}
              placeholder="Enter your school or university"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="degree">Degree/Title of Study</label>
            <input
              type="text"
              id="degree"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              placeholder="Enter your degree"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn">
            {editMode ? 'Update Education' : 'Add Education'}
          </button>

          {editMode && (
            <button
              type="button"
              className="btn cancel-btn"
              onClick={() => {
                setEditMode(false)
                setEditId(null)
                setFormData({
                  school: '',
                  degree: '',
                  startDate: '',
                  endDate: ''
                })
              }}
            >
              Cancel
            </button>
          )}
        </form>
      )}
      
    </section>
  )
}

export default Education;