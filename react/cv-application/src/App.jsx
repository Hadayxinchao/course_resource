import { useState } from 'react'
import './styles/App.css'
import './styles/CVForm.css'
import GeneralInfo from './components/GeneralInfo'
import Education from './components/Education'
import Experience from './components/Experience'
import Preview from './components/Preview'

function App() {
  const [cv, setCv] = useState({
    generalInfo: {
      name: '',
      email: '',
      phone: ''
    },
    education: [],
    experience: []
  })
  const [activeTab, setActiveTab] = useState('edit') // 'edit' or 'preview'

  const updateGeneralInfo = (info) => {
    setCv({
      ...cv, generalInfo: info
    })
  }

  const addEducation = (edu) => {
    setCv({
      ...cv, education: [...cv.education, edu]
    })
  }

  const updateEducation = (updateEdu) => {
    setCv({
      ...cv, education: cv.education.map((edu) => edu.id === updateEdu.id ? updateEdu : edu)
    })
  }

  const removeEducation = (removeId) => {
    setCv({
      ...cv, education: cv.education.filter((edu) => edu.id !== removeId)
    })
  }

  const addExperience = (exp) => {
    setCv({
      ...cv, experience: [...cv.experience, exp]
    })
  }

  const updateExperience = (updateExp) => {
    setCv({
      ...cv, experience: cv.experience.map((exp) => exp.id === updateExp.id ? updateExp : exp)
    })
  }

  const removeExperience = (removeId) => {
    setCv({
      ...cv, experience: cv.experience.filter((exp) => exp.id !== removeId)
    })
  }
  
  const TabSelector = () => (
    <div className="tab-selector">
      <button 
        className={`tab-btn ${activeTab === 'edit' ? 'active' : ''}`}
        onClick={() => setActiveTab('edit')}
      >
        Edit CV
      </button>
      <button 
        className={`tab-btn ${activeTab === 'preview' ? 'active' : ''}`}
        onClick={() => setActiveTab('preview')}
      >
        Preview CV
      </button>
    </div>
  );

  const handlePrint = () => {
    window.print()
  }

  return (
    <>
      <div className="app-header">
        <h1>CV Builder</h1>
        <button className="print-btn" onClick={handlePrint}> Print </button>
      </div>

      <div className="mobile-only">
        <TabSelector />
      </div>
      <div className="app-container">
        <div className={`form-container ${activeTab === 'edit' ? 'active' : ''}`}>
          <GeneralInfo info={cv.generalInfo} updateInfo={updateGeneralInfo}/>
          <Education 
            addEducation={addEducation}
            updateEducation={updateEducation}
            removeEducation={removeEducation}
            educations={cv.education}
          />
          <Experience
            addExperience={addExperience}
            updateExperience={updateExperience}
            removeExperience={removeExperience}
            experiences={cv.experience}
          />
        </div>
        <div className={`preview-container ${activeTab === 'preview' ? 'active' : ''}`}>
          <Preview cv={cv}/>
        </div>
      </div>
    </>
  )
}

export default App
