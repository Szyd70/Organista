export default async function handler(req, res) {
  const { date } = req.query; // oczekuje YYYY-MM-DD

  if (!date) {
    return res.status(400).json({ error: 'Brak parametru date' });
  }

  try {
    // Pobranie czytań liturgicznych z otwartego API Katolik.pl
    const response = await fetch(`https://dane.katolik.pl/reading/${date}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });

    if (!response.ok) {
      throw new Error(`Błąd HTTP: ${response.status}`);
    }

    const data = await response.json();
    
    // Ustawienie nagłówków cache oraz zezwolenie na CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Serverless function error:', error);
    return res.status(500).json({ error: 'Nie udało się pobrać czytań z zewnętrznego serwera' });
  }
}
