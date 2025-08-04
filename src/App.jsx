import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
// other imports

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* other routes */}
    </Routes>
  );
}

export default App;