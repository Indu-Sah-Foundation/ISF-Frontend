import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Articlepage from './components/Pages/Articlepage';
import Navbarblack from './components/Navbarblack';
import ISFED from './components/Pages/ISFED';
import ISFHu from './components/Pages/ISFHu';
import ISFSmile from './components/Pages/ISFSmile';
import ISFCovid from './components/Pages/ISFCovid';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ISFrobotics" element={<Articles />} />
          <Route path="/ISFED" element={<ISFEDU />} />
          <Route path="/ISFHumanitarian" element={<ISFHus />} />
          <Route path="/ISFSMILE" element={<ISFSmiles />} />
          <Route path="/ISFCovid" element={<ISFCovids />} />

        </Routes>
        <Footer />
      </div>
    </Router>
  );
}


const ISFCovids = () => {
  return (
    <div>
      <Navbarblack />
      <ISFCovid />
      <div className="mt-4" />
    </div>
  );
};



const ISFSmiles = () => {
  return (
    <div>
      <Navbarblack />
      <ISFSmile />
      <div className="mt-4" />
    </div>
  );
};

const ISFEDU = () => {
  return (
    <div>
      <Navbarblack />
      <ISFED />
      <div className="mt-4" />
    </div>
  );
};

const ISFHus = () => {
  return (
    <div>
      <Navbarblack />
      <ISFHu />
      <div className="mt-4" />
    </div>
  );
};

const Articles = () => {
  return (
    <div>
      <Navbarblack />
      <Articlepage />
      <div className="mt-4" />
    </div>
  );
};

const Home = () => {
  return (
    <div>
      <Navbar />
    </div>
  );
};

export default App;