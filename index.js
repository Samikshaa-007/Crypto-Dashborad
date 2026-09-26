import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;

// Tell Express to use EJS for our HTML templates
app.set('view engine', "ejs");

// This allows you to use a public folder for external CSS if you ever try it again later
app.use(express.static('public'));

app.get('/', async (req, res) => {
  try {
    // Fetch data from CoinGecko
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,ripple,litecoin,cardano,polkadot,stellar,chainlink,uniswap,vechain'
    );
    
    const cryptoData = response.data;
    
    // Render the page and pass the data to EJS
    res.render('index.ejs', { coins: cryptoData });
    
  } catch (error) {
    console.error("API Error:", error.message);
    res.render("index.ejs", { coins: null, error: "Failed to fetch data from CoinGecko API" });
  }
});

// Start listening on port 3000
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});