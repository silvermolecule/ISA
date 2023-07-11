import {Route,Routes} from "react-router-dom"
import './App.css'
import { AuthContextProvider } from './context/AuthContext'
import SignUp from "./components/SignUp"
import Account from "./components/Account"
import SignIn from "./components/SignIn"
function App() {
    

  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<SignUp/>}/>
          <Route path="/account" element={<Account/>}/>
          <Route path="/signin" element={<SignIn/>}/>
        </Routes>
      </AuthContextProvider>
    </div>
  )
}

export default App
