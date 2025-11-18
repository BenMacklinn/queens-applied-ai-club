import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TargetCursor from './components/TargetCursor';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <TargetCursor 
          parallaxOn={true}
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
