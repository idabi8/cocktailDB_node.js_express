
/*
Questo codice crea un servizio backend in Node.js con il framework Express per gestire richieste HTTP. Il servizio interagisce con l'API "The Cocktail DB" e permette di cercare cocktail in base alla prima lettera del nome.

Inizialmente, il codice importa le dipendenze necessarie, ovvero il framework Express e la libreria Axios, che permette di effettuare richieste HTTP. 

Viene quindi creato un'istanza di Express, che verrà usata per gestire le richieste in entrata. Viene anche assegnata una porta (3000) su cui il servizio ascolterà le richieste.

Successivamente, viene definito un endpoint per la ricerca dei cocktail in base alla prima lettera del nome. L'endpoint è definito come una funzione che viene eseguita quando viene ricevuta una richiesta GET a '/cocktails/:letter'. Il parametro 'letter' viene estratto dalla richiesta (req.params) e viene usato per costruire l'URL dell'API di The Cocktail DB.

Viene quindi effettuata una richiesta HTTP GET all'URL dell'API usando Axios. Quando la risposta è disponibile, i dati dei cocktail vengono estratti e restituiti come risposta in formato JSON. 

Se si verifica un errore durante la richiesta HTTP, viene stampato un messaggio di errore nella console e viene restituito uno status code 500 al client.

In sintesi, il codice crea un servizio backend per gestire richieste HTTP in Node.js e usa il framework Express per definire degli endpoint che interagiscono con l'API The Cocktail DB tramite la libreria Axios.

*/ 


const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Endpoint per cercare un cocktail dato la prima lettera
/* http://localhost:3000/cocktails/m */
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


/* modo alternativo: 
http://localhost:3000/cocktails/search/m

// Endpoint per cercare un cocktail dato la prima lettera
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


// Endpoint per recuperare i dettagli del singolo cocktail dato il nome
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


// Endpoint per recuperare i dettagli del singolo cocktail dato l'ID
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


// endpoint for random drink  
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


/* // versione alternativa a sopra
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

