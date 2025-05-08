import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Hotels } from './pages/Hotels';
import { NewHotel } from './pages/NewHotel';
import { HotelDetail } from './pages/HotelDetail';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotels/new" element={<NewHotel />} />
          <Route path="/hotels/:id" element={<HotelDetail />} />
          <Route path="/" element={<Hotels />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;