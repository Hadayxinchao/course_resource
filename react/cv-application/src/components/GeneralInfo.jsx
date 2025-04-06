import { useState } from "react";

function GeneralInfo({ info, updateInfo }) {
  const [formData, setFormData] = useState(info);
  const [isEditing, setIsEditing] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newData = {
      ...formData,
      [name]: value
    }
    setFormData(newData);
    updateInfo(newData);
  }

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  }

  const isEmpty = !formData.name && !formData.email && !formData.phone;

  return (
    <section className="section">
      <h2>General Information</h2>

      {!isEditing && !isEmpty ? (
        <div className="info-item">
          <h4>{formData.name || 'Your Name'}</h4>
          <p><strong>Email:</strong> {formData.email || 'your.email@example.com'}</p>
          <p><strong>Phone:</strong> {formData.phone || '(123) 456-7890'}</p>
          <button
            type="button"
            className="btn edit-btn"
            onClick={toggleEdit}
          >
            Edit
          </button>
        </div>
      ) : (
        <form className="general-info-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input 
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input 
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </div>

          {!isEmpty && (
            <button
              type="button"
              className="btn save-btn"
              onClick={toggleEdit}
            >
              Save
            </button>
          )}
        </form>
      )}
    </section>
  )
}

export default GeneralInfo
