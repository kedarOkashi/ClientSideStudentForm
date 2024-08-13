import { Link } from 'react-router-dom'

const DonePage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>הטופס נשלח בהצלחה, לצפיה בכל הנתונים לחץ <Link to='/displayData'>כאן</Link></div>
  )
}

export default DonePage