// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// our default array of dreams
const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

app.post("/OneTec", function(request, response) {
  var intentName = request.body.queryResult.intent.displayName;

  if (intentName == "Pizzas") {
    response.json({
      fulfillmentText: "Sua mensagem teste deu certo!!!"
    });
  }
});

{
  "followupEventInput": {
    "name": "event-name",
    "parameters": {
      "parameter-name-1": "parameter-value-1",
      "parameter-name-2": "parameter-value-2"
    },
    "languageCode": "en-US"
  }
}





// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

// send the default array of dreams to the webpage
app.get("/dreams", (request, response) => {
  // express helps us take JS objects and send them as JSON
  response.json(dreams);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
