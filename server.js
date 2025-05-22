const express = require('express');
const connectDB = require('./config/db');
const geoip = require('geoip-lite');

const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());


// Default route
// app.get('/', (req, res) => {
//     const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
//     console.log('User IP:', ip);
//   res.send('API is running...');
// });

app.set('trust proxy', true);

function toDMS(coord, isLat) {
  const dir = coord >= 0 ? (isLat ? 'N' : 'E') : (isLat ? 'S' : 'W');
  const abs = Math.abs(coord);
  const deg = Math.floor(abs);
  const minFloat = (abs - deg) * 60;
  const min = Math.floor(minFloat);
  const sec = ((minFloat - min) * 60).toFixed(1);
  return `${deg}°${min}'${sec}"${dir}`;
}

app.get('/', (req, res) => {
  const ip = req.ip;
  const geo = geoip.lookup(ip);
  console.log('geo:', geo);

  if (geo && geo.ll) {
    const [lat, lon] = geo.ll;
    const latDMS = toDMS(lat, true);
    const lonDMS = toDMS(lon, false);

    console.log(`Coordinates: ${lat}, ${lon}`);
    console.log(`DMS: ${latDMS} ${lonDMS}`);
    console.log(`Location: ${geo.city}, ${geo.country}`);

    res.send(`
      IP: ${ip}<br>
      Location: ${geo.city}, ${geo.country}<br>
      Coordinates: ${lat}, ${lon}<br>
      DMS: ${latDMS} ${lonDMS}
    `);
  } else {
    res.send(`IP: ${ip}<br>Location: Unknown`);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
