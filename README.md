### Setup:

1. Download het project.
2. Open 2 aparte VSCode instances, één voor het consumer project, één voor het provider project. 
3. In beide projecten, run 'npm install' en 'npm start'.
4. Als je nu naar http://localhost:3000 gaat zou je de pagina moeten kunnen zien. 

# TODO:
laat iedereen zelf het model maken ipv degene die al bestaat

### Test
1. Bekijk de tests in api.pact.spec.js
Je ziet hier... TODO:
2. Run npm test
3. Er zou nu een contract gegenereerd moeten zijn in de /pacts folder. 

### Contract
Wat kunnen we met dit contract? Omdat we geen toegang hebben tot een PactFlow broker, momenteel niet veel!
DELA heeft wel een broker (https://delagroup.pactflow.io), maar daar kunnen we niet zomaar bij, en het zou te veel tijd kosten om voor iedereen een eigen broker op te zetten. 

Om toch het idee duidelijk te maken gebruiken schetsen we hier een scenario:
We hebben een nieuw project opgezet waar wij de consumer zijn, laten we zeggen dat we bestellingen voor telefoons willen kunnen plaatsen via een API. 
We hebben op papier wel een contract afgestemd met de provider <i>(besteltel\.nl)</i> maar dit is nog niet met hen afgetest. 

Omdat we herhaalbaar de benodigde stappen kunnen belopen hebben we deze in een pipeline opgenomen. De pipeline gaat kijken of ons contract voldoet, en geeft een go/no-go resultaat terug. 
Om dit te doen doorloopt de pipeline de volgende stappen:

TODO: link naar illustration
[x](http://localhost:3000/img/1)
1. Run tests & genereer contract 
We hebben het afgestemde contract in code verwerkt zoals in api.pact.spec.js, op basis van deze code genereert Pact een contract.
2. Publish het contract naar de broker (PactFlow)

3. Run can-i-deploy (https://docs.pact.io/pact_broker/can_i_deploy)
Dit is een tool die gaat verifiëren dat de provider het nieuwe contract geaccepteerd heeft.
Op dit punt zou hij dus moeten falen, want Besteltel heeft nog niet geverifieerd dat het contract ook aan hun tests voldoet.
Dat betekent dat we nu niet mogen deployen. 

x

↓

↓

