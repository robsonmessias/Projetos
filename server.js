// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");
const BuscaCep = require('busca-cep');
const CepCoords = require("coordenadas-do-cep");
const venom = require("venom-bot");

let nome = "";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




// our default array of dreams
const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

//=======================================================================================================================

venom.create().then((client) => start(client));

function start(client) {
  client.onMessage((message) => {
    if(message.body === "1"){
      client.sendText(message.from, 'Veja seu cardápio');
    }
  });
}




//=======================================================================================================================
app.post("/pizzas", function(request, response ){
  
  var intentName = request.body.queryResult.intent.displayName;
  
  if (intentName == "cep.consultar") {
    
    const endereco1 = "14055480";
    const endereco2 = request.body.queryResult.parameters["cep"];

    CepCoords.getDistEntreCeps(endereco1, endereco2)
    .then(distancia => {
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> parent of f0aa68e... Update server.js
      if(sem_cep == ''){
        
        if(distancia < 4) {
          response.json({ fulfillmentText:  "Este endereço fica a menos de 4 Km de distância.\nA taxa de entrega é R$ 3,00" });
         //retorna o mesmo 'distancia' da versão em promise
        }else if(distancia > 4 && distancia < 8 ){
          response.json({ fulfillmentText:  "Este endereço fica a mais de 4 Km de distância.\nA taxa de entrega é R$ 4,00" });
        }else {response.json({ fulfillmentText:  "Afim de manter a rapidez de nossas entregas não entregamos em endereços que ficam a mais de 8 Km de distância" });}
<<<<<<< HEAD
      }else {"Nossa taxa de entrega é de acordo com distância :\nAté  4 km.          R$3,00.\nDe 4 até  8km.  R$4,00.\nNÃO entregamos acima 8 km de distância para manter a rapidez de nossas entregas!"}
=======
>>>>>>> parent of 1e3eb3f... Update server.js
      if(distancia < 4) {
        response.json({ fulfillmentText:  "Este endereço fica a menos de 4 Km de distância.\nA taxa de entrega é R$ 3,00" });
       //retorna o mesmo 'distancia' da versão em promise
      }else if(distancia > 4 && distancia < 8 ){
        response.json({ fulfillmentText:  "Este endereço fica a mais de 4 Km de distância.\nA taxa de entrega é R$ 4,00" });
      }else {response.json({ fulfillmentText:  "Afim de manter a rapidez de nossas entregas não entregamos em endereços que ficam a mais de 8 Km de distância" });}
<<<<<<< HEAD
    })
    .catch(err => {
      response.json({ fulfillmentText: "Nossa taxa de entrega é de acordo com distância :\nAté  4 km.          R$3,00.\nDe 4 até  8km.  R$4,00.\nNÃO entregamos acima 8 km de distância para manter a rapidez de nossas entregas!" });
=======
      
>>>>>>> parent of 1e3eb3f... Update server.js
        
      }else {"Nossa taxa de entrega é de acordo com distância :\nAté  4 km.          R$3,00.\nDe 4 até  8km.  R$4,00.\nNÃO entregamos acima 8 km de distância para manter a rapidez de nossas entregas!"}
      
    })
    .catch(err => {
      response.json({ fulfillmentText: "CEP inválido.\nPor favor, digite seu CEP sem traço ou verifique se o número digitado está correto e tente de novo. " });
       //retorna o mesmo parâmetro 'err' da versão em promise
    })
    .catch(err => {
=======
        
      }else {"Nossa taxa de entrega é de acordo com distância :\nAté  4 km.          R$3,00.\nDe 4 até  8km.  R$4,00.\nNÃO entregamos acima 8 km de distância para manter a rapidez de nossas entregas!"}
      
    })
    .catch(err => {
>>>>>>> parent of f0aa68e... Update server.js
      response.json({ fulfillmentText: "CEP inválido.\nPor favor, digite seu CEP sem traço ou verifique se o número digitado está correto e tente de novo. " });
       //retorna o mesmo parâmetro 'err' da versão em promise
    })
  }
});



//=================================================================================
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

