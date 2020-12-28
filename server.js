  
var  express  =  require ( 'express' ) ;
var  bodyParser  =  require ( 'body-parser' ) ;
var  app  =  express ( ) ;

// Autoriser toutes les demandes de tous les domaines et de l'hôte local
app . all ( '/ *' ,  function ( req ,  res ,  next )  {
  res . en-tête ( "Access-Control-Allow-Origin" ,  "*" ) ;
  res . en-tête ( "Access-Control-Allow-Headers" ,  "X-Requested-With, Content-Type, Accept" ) ;
  res . en-tête ( "Access-Control-Allow-Methods" ,  "POST, GET" ) ;
  suivant ( ) ;
} ) ;

app . use ( bodyParser . json ( ) ) ;
app . use ( bodyParser . urlencoded ( { extended : false } ) ) ;

var  BasedeDonnée  =  [
    {
        "Nom d'utilisateur" : "Carine" ,
        "Amis" : "Jean" ,
        "Adresse mail" : ,
         "mot de passe " : , 
         "messages" : ,
    } ,
    {
        "Nom d'utilisateur" : "Jean" ,
        "Amis" : "Florian", "Carine" ,
         "Adresse mail" : ,
         "mot de passe " : ,
          "messages" : ,
    } ,
    {
        "Nom d'utilisateur" : "Florian" ,
        "Amis" : "Jean", "Arthur" ,
         "Adresse mail" : ,
         "mot de passe " : ,
          "messages" : ,
    } ,
    {
        "Nom d'utilisateur" : "Arthur" ,
        "Amis" : "Florian" , 
         "Adresse mail" : ,
         "mot de passe " : ,
          "messages" : ,
    }
] ;


app . get ( '/  BasedeDonnée' ,  fonction ( req ,  res )  {
    console . log ( "GET From SERVER" ) ;
    res . envoyer (  BasedeDonnée ) ;
} ) ;

app . écouter ( 6069 ) ;
