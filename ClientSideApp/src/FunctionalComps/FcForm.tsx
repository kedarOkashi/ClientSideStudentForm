import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Form, Button, Container, Dropdown } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { he } from 'date-fns/locale';
import { addYears } from 'date-fns';
import '../css/form.css'
import axios from 'axios';
import { City, ServiceResponse, Student } from '../types/types';
import { useNavigate, Link } from 'react-router-dom';
import { useContext } from 'react';
import { CityContext } from '../contexts/cityContext/cityContext';




export const FcForm = () => {

  //useContext city
  const { citys, error, loading } = useContext(CityContext)

  //useNavigate
  const Navigate = useNavigate();

  //state for error-location-message
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showErrorMessagePost, setShowErrorMessagePost] = useState(false);

  //States for fetch
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);

  //State for dropDown
  const [selectedCity, setSelectedCity] = useState<City | null>(null);


  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState(new Date())
  const [israeliId, setIsraeliId] = useState('')
  const [cityId, setCityId] = useState<number | null>(null)


  const handleTextChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only Hebrew letters and spaces
    if (/^[א-ת\s]*$/.test(value)) {
      setter(value);
    }
  };


  const handleDateChange = (date: Date | null) => {
    console.log(formatDate(date as Date))
    setDateOfBirth(date as Date)
  };

  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };


  const handleSelect = (city: City) => {
    setSelectedCity(city);
    console.log(`Selected city: ${city.cityName}`);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();


    if (!selectedCity) {
      setShowErrorMessage(true)
      return;
    }

    const student: Student = {
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      israeliID: israeliId,
      cityId: selectedCity.cityId
    }

    console.log(student);

    try {
      const response = await axios.post<ServiceResponse<Student>>('https://localhost:7286/api/Students/CreateStudent', student);
      console.log(response)
      if (response.status === 201) {
        Navigate("/done")
      }
    } catch (error) {
      // Handle error as needed
      console.error('Error posting data', error);
      setShowErrorMessagePost(true);
    }
  };



  // check the fetch

  if (loading) return <p>טוען נתונים</p>;
  if (error) return <p>שגיאה: {error}</p>;


  return (
    <Container className='container-form' onSubmit={handleSubmit}>
      <h2>טופס רישום</h2>
      <Form className='form' >
        <Form.Group className="mb-3">
          <Form.Label>שם פרטי</Form.Label>
          <Form.Control
            onChange={handleTextChange(setFirstName)}
            type="text"
            value={firstName}
            placeholder="שם פרטי"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>שם משפחה</Form.Label>
          <Form.Control
            onChange={handleTextChange(setLastName)}
            type="text"
            placeholder="שם משפחה"
            value={lastName}
            required
          />
        </Form.Group>
        <Form.Group >
          <Form.Label>תאריך לידה</Form.Label>
          <DatePicker
            selected={dateOfBirth}
            onChange={handleDateChange}
            dateFormat="dd-MM-yyyy"
            locale={he}
            showFullMonthYearPicker
            showYearDropdown
            showMonthDropdown
            yearDropdownItemNumber={40}
            scrollableYearDropdown
            minDate={addYears(new Date(), -40)}
            maxDate={new Date()}
            className="form-control"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>תעודת זהות</Form.Label>
          <Form.Control
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const value = e.target.value;
              // Allow only 9 digits
              if (/^\d{0,9}$/.test(value)) {
                setIsraeliId(value);
              }
            }}
            value={israeliId}
            type="text"
            placeholder="תעודת זהות"
            pattern="\d{9}"
            title="אנא הכנס תעודת זהות בת 9 ספרות"
            inputMode="numeric"
            maxLength={9}
            required
          />
        </Form.Group>

        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {selectedCity ? selectedCity.cityName : 'אנא בחר את מקום מגורייך'}
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
          {showErrorMessage && <p className='error-message'>מקום מגורים הוא שדה חובה</p>}
        </Dropdown>
        <br />
        <hr />
        <div className='btn-div'>
          <Button variant="secondary" onClick={() => window.location.reload()}>נקה פרטים</Button>
          <Button variant="primary" type="submit">שלח טופס</Button>
        </div>
        {showErrorMessagePost && <p className='error-message'>נתקלנו בשגיאה, נא לנסות מאוחר יותר</p>}
      </Form>
      <Link to='/displayData'>לטבלת הנתונים לחץ כאן</Link>
    </Container>
  )
}
