// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// our default array of dreams
const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

app.post("/OneTec", function(request, response) {
  var connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB
  });

  connection.connect();

  var intentName = request.body.queryResult.intent.displayName;
  //### CRIAR CADASTRO ###//
  if (intentName == "addCadastro") {
    console.log("incluir");

    var cadastroNome = request.body.queryResult.parameters["nome"];
    var cadastroSobreNome = request.body.queryResult.parameters["sobrenome"];
    var cadastroTelefone = request.body.queryResult.parameters["telefone"];
    var query =
      'Insert into Cadastro values ("' +
      cadastroNome +
      '","' +
      cadastroSobreNome +
      '","' +
      cadastroTelefone +
      '")';

    connection.query(query, function(error, results, fields) {
      if (error) throw error;
      connection.end();
        response.json({ fulfillmentText: "Contato Adicionado com sucesso!" });
    });
    //### PESQUISAR CADASTRO ###//
  }else if(intentName == "Identificar") {
    console.log("Identificando cliente");
    
    let telContato = request.body.queryResult.parameters["telefone"];
    let query = 'select * from Cadastro where telefone = "'+telContato+'"';
    
    connection.query( query, function( error, results, fields ){
      if( results[0]){
        var contato = 'Seu nome é...'+results[0].nome;
        response.json({ "fulfillmentText": contato })
      
      } else{
          /*let richResponses = [
                {
                    "quickReplies": {
                        "title": "Você ainda não possui cadastro. Por favor, clique no botão abaixo",
                        "quickReplies": [
                            "Cadastrar"
                        ]
                    },
                    "platform": "FACEBOOK"
                }
            ] 
        response.json({ fulfillmentMessages: richResponses});*/
        agent.setFollowupEvent("aaCadastro");
      }
    });
    connection.end();
             
  }
  
});

// ####### CHAMAR CADASTRO #######
//agent.setFollowupEvent("Pedidos");

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

