
import { useContext, useEffect, useState } from 'react';
import { CityContext } from '../contexts/cityContext/cityContext';
import axios from 'axios';
import { Student } from '../types/types';
import FcRenderTable from './FcRenderTable';

const FcStudentsTable = () => {

  //useContext city
  const { citys, error, loading } = useContext(CityContext)


  const [loadingStudent, setLoadingStudent] = useState<boolean>(true);
  const [errorStudent, setErrorStudent] = useState<string | null>(null);

  const [students, setStudents] = useState<Student[]>([])






  const fetchStudents = async () => {
    setLoadingStudent(true);
    setErrorStudent(null);

    try {
      const response = await axios.get<Student[]>('https://localhost:7286/api/Students/GetAllStudents')
      console.log(response.data)
      setStudents(response.data)
    } catch (error: any) {
      setErrorStudent('Failed to fetch cities');
    } finally {
      setLoadingStudent(false);
    }
  }
  useEffect(() => {
    fetchStudents();
  }, [])

  // check the fetch
  if (loading || loadingStudent) return <p>טוען נתונים</p>;
  if (error || errorStudent) return <p>שגיאה: {error}</p>;


  return (
    <FcRenderTable students={students} citys={citys} />
  )
}

export default FcStudentsTable