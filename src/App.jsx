import './App.css'
import { ClassState } from './ClassState'
import { UseReducer } from './UseReducer'
import { UseState } from './UseState'

function App() {

  return (
    <>
      <UseReducer name='Use Reducer' />
      <hr />
      <UseState name="Use State" />
      <hr />

      <ClassState name="Class State" />
    </>
  )
}

export default App
