Readme file
This is a Node.js application that provides endpoints to search for cocktails using the Cocktail DB API. The application uses the Express framework and the Axios library to handle HTTP requests.
Installation
To run this application locally, follow these steps:
1.	Clone this repository to your local machine.
2.	Navigate to the directory containing the code.
3.	Install the required dependencies by running the command npm install.
4.	Start the server by running the command npm start.
Note: You need to have Node.js and npm installed on your machine to run this application.
Endpoints
The application provides the following endpoints:
GET /cocktails/search/letter/:letter
This endpoint takes a single parameter letter which is a letter of the alphabet. It searches the Cocktail DB API for cocktails that start with the specified letter and returns an array of matching cocktails.
Example: http://localhost:3000/cocktails/search/letter/m
GET /cocktails/search/:letter
This endpoint is an alternative to the previous one. It takes a single parameter letter which is a letter of the alphabet. It searches the Cocktail DB API for cocktails that start with the specified letter and returns an array of matching cocktails.
Example: http://localhost:3000/cocktails/search/m
GET /cocktails/search/name/:name
This endpoint takes a single parameter name which is the name of a cocktail. It searches the Cocktail DB API for the specified cocktail and returns its details.
Example: http://localhost:3000/cocktails/search/name/margarita
GET /cocktails/search/id/:id
This endpoint takes a single parameter id which is the ID of a cocktail. It searches the Cocktail DB API for the specified cocktail and returns its details.
Example: http://localhost:3000/cocktails/search/id/11007
GET /cocktails/search/random
This endpoint returns a random cocktail from the Cocktail DB API.
Example: http://localhost:3000/cocktails/search/random
Error Handling
If an error occurs while fetching data from the Cocktail DB API, the server responds with a 500 Internal Server Error status code and a descriptive error message.
Conclusion
This is a simple application that demonstrates how to use the Cocktail DB API to search for cocktails. It can be used as a starting point for building more complex applications that use the API.

