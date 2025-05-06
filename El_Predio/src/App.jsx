import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Court_Card from './components/court_card/Court_Card'
import Booking from './pages/booking/booking'

const App = () => {
  

  return (
    <>
      {/* {courts.map((court) => (
        <Court_Card
          key={court.id}
          court={court.court}
          duration={court.duration}
          price={court.price}
          description={court.description}
        />

      ))} */}
      <Booking/>
    </>
  )
}

export default App
