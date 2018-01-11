Om de server te laten draaien heb je nodeJS nodig.
index.js wordt gerund in nodeJS.
index.js is de enige code voor dit project.

index.js is een nodeJS server die gebruik maakt van een firebase server en een mqtt server.

regels      beschrijving
0   - 75    aanmaken van dummy data. Dit is data waar de database mee opgebouwd wordt
            Deze data wordt niet meer gebruikt, omdat dit hardcoded is.
            Deze data komt nu van de android applicatie (bas) en de camera appicatie (milan)

76  - 92    Initialisatie van de firebase database.
            Hier worden ook verschillende takken in de database opgeslagen.
            Zo kan data makkelijk naar de goede tak gepublished worden.

103 - 159   Listeners voor de firebase database worden aan gezet.
            wanneer er iets veranderd in de database wordt dat hier opgevangen.
            Wanneer er iets veranderd wordt dat naar de mqtt server gestuurd op het goede topic.
103 - 112   ***INTERESSANT OM TE BEKIJKEN***

165 - 179   Initialisatie van de MQTT server
            Hier worden ook verschillende Channels gemaakt om op te kunnen publishen

184 - 187   MQTT server listener wordt aan gezet.
            Wanneer er een bericht in de MQTT server komt binnen mijn topic ontvang ik deze.
            zo kan ik alles loggen wat er in de server gepost wordt.
