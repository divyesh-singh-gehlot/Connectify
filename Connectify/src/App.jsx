import React from 'react'
import Navbar from './pages/Navbar.jsx'
import Room from './pages/Room.jsx'


const App = () => {
  return (
    <main>
      <section className='h-fit w-full fixed top-0'>
        <Navbar />
      </section>
      <section>
        <div>
          <Room />
        </div>
      </section>
    </main>
  )
}

export default App
