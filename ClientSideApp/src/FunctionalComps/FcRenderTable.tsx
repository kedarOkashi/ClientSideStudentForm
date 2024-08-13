import React, { useState } from 'react'
import { City, Student } from '../types/types'
import { Table, Button, Dropdown } from 'react-bootstrap';
import '../css/table.css'
import { Link } from 'react-router-dom'
import { format } from 'date-fns';



type FcRenderTableProps = {
  students: Student[],
  citys: City[],
}



const FcRenderTable = ({ students, citys }: FcRenderTableProps) => {
  //State for dropDown
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const [selectedCityId, setSelectedCityId] = useState<number | null>(null);



  const handleSelect = (city: City) => {
    setSelectedCity(city);
    setSelectedCityId(city.cityId)
    console.log(`Selected city: ${city.cityName}`);
  };

  const handleClearFilter = (): void => {
    setSelectedCityId(null);
  }


  // Filter students based on the selected city ID
  const filteredStudents = selectedCityId
    ? students.filter(student => student.cityId === selectedCityId)
    : students;

  return (

    <div className="student-table-container">
      <br />
      <h6>סנן ע''פ עיר מגורים</h6>
      <div className='filter-div-options'>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {selectedCity ? selectedCity.cityName : 'סנן על פי מקום מגורים'}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {citys.map(city => (
              <Dropdown.Item
                key={city.cityId}
                onClick={() => handleSelect(city)}
              >
                {city.cityName}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Button onClick={handleClearFilter}>נקה סינון</Button>
        <Link to='/'>להגשת טופס לחץ כאן</Link>
      </div>

      <br />
      {
        filteredStudents.length === 0 ? (<p>אין נתונים להצגה</p>) :
          <div className="table-responsive">
            <Table striped bordered hover className="student-table">
              <thead>
                <tr>
                  <th>שם פרטי</th>
                  <th>שם משפחה</th>
                  <th>תאריך לידה</th>
                  <th>תעודת זהות</th>
                  <th>מקום מגורים</th>
                </tr>
              </thead>
              <tbody>
                {
                  filteredStudents.map((student, index) => (
                    <tr key={index}>
                      <td>{student.firstName}</td>
                      <td>{student.lastName}</td>
                      <td>{format(new Date(student.dateOfBirth), 'dd/MM/yyyy')}</td>
                      <td>{student.israeliID}</td>
                      <td>{citys.find(c => c.cityId == student.cityId)?.cityName}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
      }
    </div>
  )
}

export default FcRenderTable