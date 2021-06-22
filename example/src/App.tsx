import React, { useState } from 'react'
import './App.css'
import { createToast } from '../../src/main'
function App() {

  return (
    <div className="App">
      <button onClick={() => createToast()}>try</button>
    </div>
  )
}

export default App
