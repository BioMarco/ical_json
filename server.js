const express = require('express');
const ical = require('node-ical');
const cors = require('cors');

const app = express();
app.use(cors());

// Endpoint API per ottenere gli eventi da un file iCal
app.get('/events', (req, res) => {
  const url = req.query.url; // URL del file iCal fornito come parametro

  // Leggi il file iCal dalla URL
  ical.fromURL(url, {}, (err, data) => {
    if (err) {
      console.error('Errore nel leggere il file iCal:', err);
      res.status(500).json({ error: 'Errore nel leggere il file iCal' });
      return;
    }

    // Estrai gli eventi dal file iCal
    const events = Object.values(data).filter(event => event.type === 'VEVENT');
    const eventDates = events.map(event => {
      return {
        start: event.start,
        end: event.end
      };
    });

    // Restituisci gli eventi come JSON
    res.json(eventDates);
  });
});

// Porta del server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server in esecuzione sulla porta ${PORT}`);
});
