import React, { useState } from 'react'
import './App.css'
import { createToast } from '../../src/main'
function App() {

  return (
    <div className="App">
      <button onClick={() => createToast({ title: 'yoyo', description: 'descriasfkahsflh' }, { position: 'top-left', timeout: 5000 })}>try</button>
    </div>
  )
}

export default App
