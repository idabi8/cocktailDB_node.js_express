
/*
In sintesi, il codice crea un servizio backend per gestire richieste HTTP in Node.js e usa il framework Express per definire degli endpoint che interagiscono con l'API The Cocktail DB tramite la libreria Axios.

The code creates a backend service to handle HTTP requests in Node.js and uses the Express framework to define endpoints that interact with The Cocktail DB API via the Axios library.
*/ 

const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

/* Endpoint to search for a cocktail given the first letter
   http://localhost:3000/cocktails/search/letter/:letter */
app.get('/cocktails/search/letter/:letter', (req, res) => {
  const { letter } = req.params;
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`;

  axios.get(url)
    .then(response => {
      const { drinks } = response.data;
      res.json(drinks);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('An error occurred while fetching cocktails');
    });
});

/* alternative way:
// Endpoint to search for a cocktail given the first letter
app.get('/cocktails/search/:letter', async (req, res) => {
  try {
    const { letter } = req.params;
    const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
    res.json(response.data.drinks);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
*/

// Endpoint to retrieve the details of the single cocktail given the name
app.get('/cocktails/search/name/:name', (req, res) => {
  const { name } = req.params;
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;

  axios.get(url)
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('An error occurred while searching cocktails');
    });
});

// Endpoint to retrieve the details of the single cocktail given the ID
app.get('/cocktails/search/id/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint for lookup a random cocktail
app.get('/cocktails/search/random', (req, res) => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

  axios.get(url)
    .then(response => {
      const { drinks } = response.data;
      if (drinks) {
        res.json(drinks[0]);
      } else {
        res.status(404).send('No cocktails found');
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('An error occurred while fetching a random cocktail');
    });
});

/* // alternative way:
app.get('/cocktails/random', async (req, res) => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

  try { 
    const response = await axios.get(url);
    if (response.data) {
      res.json(response.data[0]);
    } else {
      res.status(404).send('No cocktails found');
    }
  } catch(error) {
      console.log(error);
      res.status(500).send('An error occurred while fetching a random cocktail');
    }
});
*/
   
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

