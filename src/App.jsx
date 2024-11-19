import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import './App.css'
import LoginForm from "./components/login/LoginForm.tsx";
import SegmentForm from "./components/segments/SegmentForm.tsx";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginForm/>} />
                <Route path="/" element={<SegmentForm/>}/>
            </Routes>
        </Router>
    )
}

export default App
