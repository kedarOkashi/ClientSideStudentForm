import { createContext, useEffect, useState } from "react";
import { City } from "../../types/types";
import axios from "axios";


//States for fetch
// const [loading, setLoading] = useState<boolean>(true);
// const [error, setError] = useState<string | null>(null);
export interface CityContextInterface {
  citys: City[],
  loading: boolean,
  error: string | null
}


const initialCitys: City[] = [];


export const CityContext = createContext<CityContextInterface>({
  citys: initialCitys,
  loading: true,
  error: null
});

type CityProviderProps = {
  children: React.ReactNode
}


export default function CityProvider({ children }: CityProviderProps) {

  const [citys, setCitys] = useState<City[]>(initialCitys)
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  const fetchCitys = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<City[]>('https://localhost:7286/api/City/GetAllCitys')
      setCitys(response.data)
      console.log(citys)
    } catch (error: any) {
      setError('Failed to fetch cities');
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchCitys();
  }, [])


  return (
    <CityContext.Provider value={{ citys, loading, error }}>
      {children}
    </CityContext.Provider>
  )
}





