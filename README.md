### Setup:

1. Download het project.
2. Open 2 aparte VSCode instances, één voor het consumer project, één voor het provider project. 
3. In beide projecten, run 'npm install' en 'npm start'.
4. Als je nu naar http://localhost:3000 gaat zou je de pagina moeten kunnen zien. (Al is deze nog vrij leeg)


### Context
Er zijn een hoop producten die rondom een uitvaart besteld kunnen worden, en ons team heeft als taak gekregen om deze producten op 1 centrale plek weer te geven.
Een ander team, team UitvaartProducten (hierna te noemen UVP), heeft alle producten al in hun database staan. Na lang gediscussieerd te hebben is uiteindelijk afgestemd dat UVP een api gaat exposen waarbij wij de informatie van de producten kunnen ophalen. Deze zijn te benaderen via /products om alle producten op te halen, en /product/{id} om een specifiek product terug te krijgen.
De calls voor deze routes hebben we alvast gemaakt, en zijn terug te vinden in api.js

```js
// Hier zie je een voorbeeld
  async getProduct(id) {
    return axios
      .get(this.withPath('/product/' + id), {
        headers: {
          Authorization: this.generateAuthToken()
        }
      })
      // Hier mappen we de response naar een Product object, zie ./model/product.js
      .then((r) => new Product(r.data)); 
  }
```

Er is afgesproken dat wij de volgende properties mogen verwachten van de producten die wij terugkrijgen:
- Een <b>id</b>
- De <b>naam</b> van het product
- Een <b>type</b> die het producttype aangeeft

Id gingen we al van uit dus die hadden we al toegevoegd, maar de andere 2 missen nog. Dat is ook de reden dat de pagina er nog zo leeg uit ziet. 

##### opdracht i: voeg de missende properties toe aan product.js

Wanneer je de 'naam' en 'type' properties hebt toegevoegd zul je zien dat er diverse types getoond worden, echter blijven de namen nog leeg. 
Na uren debuggen vinden we de oorzaak, wij krijgen niet 'naam' terug, maar de Engelse variant 'name'! 
Na het veranderen van de name property zou je nu ook de namen te zien moeten krijgen.
Toch was dit wel vervelend, hadden we dit maar beter kunnen afstemmen...

Gelukkig voor ons is er de afgelopen week een consultant ingehuurd die het over een manier heeft gehad om dit soort fouten eerder en sneller te spotten: contract testing. 
De consultant is zelfs zo gallant geweest om met de tool 'PactFlow' alvast een test voor ons op te zetten. 


### Consumer PactFlow tests
In de /src folder kun je api.pact.spec.js terugvinden. 


1. Bekijk de test in api.pact.spec.js
2. Run npm test
3. Er zou nu een contract gegenereerd moeten zijn in de /pacts folder. 


### Contract
Wat kunnen we met dit contract? 
Normaliter zou je deze naar een broker uploaden, dat is een gecentraliseerde plek waar beide consumer en provider een 
Om redenen* gaan we het nu niet naar een broker uploaden, maar zullen we deze handmatig overzetten. Pak het gegenereerde bestand uit /pacts/ en stop deze in de /pacts folder in het provider project. 

Om wel het idee duidelijk te maken schetsen we het volgende scenario:
We hebben een nieuw project opgezet waar wij de consumer zijn, laten we zeggen dat we bestellingen voor telefoons willen kunnen plaatsen via een API. 
We hebben op papier wel een contract afgestemd met de provider <i>(besteltel\.nl)</i> maar dit is nog niet met hen afgetest. 

Omdat we herhaalbaar de benodigde stappen kunnen belopen hebben we deze in een pipeline opgenomen. De pipeline gaat kijken of ons contract voldoet, en geeft een go/no-go resultaat terug. 

<small><i>De volgende stappen hebben allemaal een illustratie om de uitleg te verhelderen</i></small>

[Om dit te doen doorloopt de pipeline de volgende stappen:](http://localhost:3000/img/1)

1. Run tests & genereer contract.
We hebben het afgestemde contract in code verwerkt zoals in api.pact.spec.js, op basis van deze code genereert Pact een contract.
2. Publish het contract naar de broker (PactFlow)
3. Run [can-i-deploy](https://docs.pact.io/pact_broker/can_i_deploy).
Dit is een tool die de vraag beantwoord: "Is het veilig om naar productie te deployen?" Dit doet hij door te verifiëren dat de provider het nieuwe contract geaccepteerd heeft.
Op dit punt zou hij dus moeten falen, want Besteltel heeft nog niet geverifieerd dat het contract ook aan hun tests voldoet.
Dat betekent dat we nu niet mogen deployen. 

We mogen dus niet deployen totdat de provider geverifieerd heeft dat onze wensen vervuld worden door hun api. 

[Om dit te doen gaat de provider een vergelijkbaar proces doorlopen:](http://localhost:3000/img/2)

1. Ontvang het contract vanuit de broker en run de eigen provider tests hiertegenaan. Als het goed is slagen deze. 
2. Publish de resultaten terug naar de broker. (OK/NOK, dit wordt zometeen door de consumer gebruikt)
3. Nu runt de provider zijn eigen can-i-deploy stap. Is het veilig om te deployen? Ja! Hij mag wel deployen omdat deze versie compatible is met het contract van de consumer. 
4. Deploy!

[De consumer mag nu 'mergen', ofwel deployen:](http://localhost:3000/img/3)

1. Run tests & genereer contract. 
Het contract van de consumer is niet gewijzigd, dus dit zal nog steeds werken.
2. Publish het contract naar de broker. 
3. Run can-i-deploy. 
Omdat de contracten compatible zijn krijgt nu ook de consumer een GO.
4. Deploy!

We hebben nu succesvol een werkende integratie opgebouwd tussen consumer en provider. (Zonder integratietests!)
Laten we ook kijken naar wat er kan gebeuren als er veranderingen plaatsvinden. 

Scenario 1: De provider doet een backwards incompatible change:
1. Ga naar de product.js class in het provider project, en comment de 'id' property uit. Als je nu npm test runt zal je zien dat de tests falen.
Dat is goed! We hebben nu meteen door dat we op het punt stonden om problemen te gaan deployen. 

2. Comment nu de property 'version' uit in plaats van 'id'. Als je nu npm test runt, zal je zien dat de tests niet falen!
Dat oogt in eerste instantie natuurlijk vreemd, maar de reden dat ze nu niet falen  is omdat de consumer het veld 'version' helemaal niet gebruikt. Het is dus veilig om deze aan te passen of te verwijderen. 





<small><small>*: We hebben momenteel geen toegang tot een PactFlow broker. [DELA heeft wel een broker](https://delagroup.pactflow.io), maar daar kunnen we niet zomaar bij. De gratis versie heeft een limiet op het aantal gebruikers, en het zou te veel tijd kosten om voor iedereen een eigen broker op te zetten.</small></small>
