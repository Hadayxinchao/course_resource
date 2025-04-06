import { useState } from "react";

function Experience({ addExperience, experiences, updateExperience, removeExperience }) {
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    responsibilities: '',
    startDate: '',
    endDate: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [displayForm, setDisplayForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      updateExperience({ ...formData, id: editId });
      setEditMode(false);
      setEditId(null);
    } {
      addExperience({ ...formData, id: Date.now() });
    }
      setFormData({
      company: '',
      position: '',
      responsibilities: '',
      startDate: '',
      endDate: ''
    });
    setDisplayForm(false);
  }

  const handleEdit = (exp) => {
    setFormData({
      company: exp.company,
      position: exp.position,
      responsibilities: exp.responsibilities,
      startDate: exp.startDate,
      endDate: exp.endDate
    })
    setEditMode(true);
    setEditId(exp.id);
    setDisplayForm(true);
  }

  const handleDelete = (exp) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      removeExperience(exp.id);
    }
  }

  return (
    <section className="section">
      <h2>Work Experience</h2>

      {experiences && experiences.length > 0 ? (
        <div className="experiences-list">
          {experiences.map((exp) => (
            <div key={exp.id} className="info-item">
              <h4>{exp.company}</h4>
              <p><strong>Position:</strong> {exp.position}</p>
              <p><strong>Responsibilities:</strong> {exp.responsibilities}</p>
              <p><strong>Period:</strong> {new Date(exp.startDate).toLocaleDateString()} - {new Date(exp.endDate).toLocaleDateString()}</p>
              <div className="action-buttons">
                <button
                  type="button"
                  className="btn edit-btn"
                  onClick={() => handleEdit(exp)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn delete-btn"
                  onClick={() => handleDelete(exp)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ): (  
        <div className="empty-state">
          <p>No work experience added yet.</p>
          <button
            type="button"
            className="btn toggle-btn"
            onClick={() => setDisplayForm(true)}
          >
            Add Your First Experience
          </button>
        </div>
      )}

      {experiences.length > 0 && (
        <button
          type="button"
          className="btn toggle-btn"
          onClick={() => setDisplayForm(!displayForm)}
        >
          {displayForm ? 'Hide Form' : 'Add New Experience'}
        </button>
      )}

      {displayForm && (
        <form onSubmit={handleSubmit} className="experience-form">
          <div className="form-group">
            <label htmlFor="company">Company Name</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Enter the company name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="position">Position Title</label>
            <input
              type="text"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="Enter your position"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="responsibilities">Main Responsibilities</label>
            <textarea
              id="responsibilities"
              name="responsibilities"
              value={formData.responsibilities}
              onChange={handleChange}
              placeholder="Describe your main responsibilities"
              rows="4"
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
            {editMode ? 'Update Experience' : 'Add Experience'}
          </button>

          {editMode && (
            <button
              type="button"
              className="btn cancel-btn"
              onClick={() => {
                setEditMode(false);
                setEditId(null);
                setFormData({
                  company: '',
                  position: '',
                  responsibilities: '',
                  startDate: '',
                  endDate: ''
                });
              }}
            >
              Cancel Edit
            </button>
          )}
        </form>
      )}
    </section>
  )
}

export default Experience;