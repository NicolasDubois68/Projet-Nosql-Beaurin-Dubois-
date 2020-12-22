  
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
        "Prénom" : "Carine" ,
        "Amis" : "Jean"
    } ,
    {
        "Prénom" : "Jean" ,
        "Amis" : "Florian", "Carine"
    } ,
    {
        "Prénom" : "Florian" ,
        "Amis" : "Jean", "Arthur"
    } ,
    {
        "Prénom" : "Arthur" ,
        "Amis" : "Florian"
    }
] ;


app . get ( '/  BasedeDonnée' ,  fonction ( req ,  res )  {
    console . log ( "GET From SERVER" ) ;
    res . envoyer (  BasedeDonnée ) ;
} ) ;

app . écouter ( 6069 ) ;
