
import { Routes, Route } from 'react-router-dom'
import StudentFormPage from '../Pages/StudentFormPage'
import DisplayStudentDataPage from '../Pages/DisplayStudentDataPage'
import DonePage from '../Pages/DonePage'
import CityProvider from '../contexts/cityContext/cityContext'

const FcRoute = () => {
  return (

    <CityProvider>
      <Routes>
        <Route path='/' element={<StudentFormPage />} />
        <Route path='/displayData' element={<DisplayStudentDataPage />} />
        <Route path='/done' element={<DonePage />} />
      </Routes>
    </CityProvider>
  )
}

export default FcRoute