# Projet Chat Tree - frontend

## Serveur Node.js
1. download all files
2. in the folder, use ``npm install`` (if you don't have npm, then install it first ;))
3. launch ``nodemon server.js``
4. It's alive !

## Comment installer MongoDB
_(instructions pour Windows)_

1. [Télécharger MongoDB](https://www.mongodb.com/download-center#community)

2. Ajouter  ``C:\Program Files\MongoDB\Server\3.4\bin`` au PATH System (PC > clic droit > propriétés > Paramètres systèmes avancés > Variables d'environnement > dans la partie "Variables système", sélectionner Path puis "modifier")

3. Créer le dossier ``C:\data\db``, il servira à stocker les bases de données de Mongo

4. Ouvrir une invite de commande (``cmd``) et entrer ``mongod``. Cela lance mongo et ouvre une connection sur le port ``127.0.0.1:27017`` pour accéder aux bases de données.

5. Ouvrir une nouvelle invite de commande et entrer ``mongo`` afin de naviguer au sein des bases.

6. Créer la base en entrant les instructions suivantes :
  ```
  use chattree

  db.createCollection('users')
  
  db.users.insertMany([{"id": 1, "surname": "Harry", "name": "Potter", "gender": "M", "mail": "h.potter@yahoo.fr", "contacts": [2,3], "pp": "hp.png", "lastco": 1493910799, "conversations": [1,2,3], "settings": {}, "links": {"Facebook": "https://www.facebook.com/harrypotterfilms/?fref=ts","Twitter": "https://twitter.com/HarryPotterFilm" } }, { "id": 2, "surname": "Ronald", "name": "Weasley", "gender": "M", "mail": "ronron@hotmail.fr", "contacts": [1,3], "pp": "rw.png", "lastco": 1493910799, "conversations": [1,2], "settings": {}, "links": {"Facebook": "https://www.facebook.com/pages/Ron-Weasley/107694199259953?fref=ts&rf=109574965726854","Twitter": "https://twitter.com/ronweasley" } }, { "id": 3, "surname": "Hermione", "name": "Granger", "gender": "F", "mail": "hermione.granger@gmail.com", "contacts": [1,2], "pp": "hg.png", "lastco": 1493910799, "conversations": [1,3], "settings": {}, "links": {"Facebook": "https://www.facebook.com/HermioneJeanGranger98/?fref=ts","Twitter": "https://twitter.com/HermioneGranger"}}])

  db.createCollection('threads')
  
  db.threads.insertMany([{"id": 1,"titre": "Le Trio de choc","creation": 1493910799,"tags": ["betises", "règlementlol"],"participants": [1,2,3],"muteby" : [],"sharedfiles" : [1,2],"children": [],"father": null }, {"id": 2,"titre": "","creation": 1493910799,"tags": [],"participants": [1,2],"muteby" : [],"sharedfiles" : [3],"children": [],"father": null }, {"id": 3,"titre": "","creation": 1493910799,"tags": [],"participants": [1,3],"muteby" : [],"sharedfiles" : [4,5],"children": [],"father": null}])

  db.createCollection('messages')
  
  db.messages.insertMany([{"id": 1,"author": 2,"date": 1493910799,"content": "Regardez ce que j'ai fait pendant le cours d'histoire de la magie ! ^^","father": 1,"children": [] }, {"id": 2,"author": 3,"date": 1493910800,"content": "C'est puéril --'","father": 1,"children": [] }, {"id": 1,"author": 1,"date": 1493910801,"content": "Haha ROFL !!","father": 1,"children": [] }, {"id": 4,"author": 1,"date": 1493910802,"content": "Parfois, vous me désespérez les garçons ...","father": 1,"children": [] }, {"id": 5,"author": 2,"date": 1493910803,"content": "Oh ça va !","father": 1,"children": [] }, {"id": 6,"author": 1,"date": 1493910804,"content": "Même toi tu trouves que l'histoire de la magie c'est chiant !","father": 1,"children": [] }, {"id": 7,"author": 3,"date": 1493910805,"content": "Je ne l'ai dit qu'une fois ...","father": 1,"children": [] }, {"id": 8,"author": 2,"date": 1493910806,"content": "Mais nous on n'oublie jamais :D","father": 1,"children": [] }, {"id": 9,"author": 2,"date": 1493910800,"content": "Hey Harry ! Pourquoi tu n'avais pas ton Eclair de Feu aujourd'hui ?","father": 2,"children": [] }, {"id": 10,"author": 1,"date": 1493910801,"content": "Malefoy m'a jeté un Petrificus Totalus et me l'a volé :(","father": 2,"children": [] }, {"id": 11,"author": 2,"date": 1493910802,"content": "OMG mais c'est terrible !!","father": 2,"children": [] }, {"id": 12,"author": 1,"date": 1493910803,"content": "Oh tkt Cho est venu me réconforter ;)","father": 2,"children": [] }, {"id": 13,"author": 2,"date": 1493910804,"content": "Passe moi les détails ...","father": 2,"children": [] }, {"id": 14,"author": 1,"date": 1493910805,"content": "On s'est embrassés :D","father": 2,"children": [] }, {"id": 15,"author": 2,"date": 1493910806,"content": "PASSE MOI LES DETAILS !","father": 2,"children": [] }, {"id": 16,"author": 2,"date": 1493910807,"content": "^^","father": 2,"children": [] }, {"id": 17,"author": 1,"date": 1493910800,"content": "Tu en es où dans le devoir de Rogue sur les Loups Garous en DCLFDM ?","father": 3,"children": [] }, {"id": 18,"author": 1,"date": 1493910801,"content": "Euh ...","father": 3,"children": [] }, {"id": 19,"author": 1,"date": 1493910802,"content": "J'avais Quidditch ...","father": 3,"children": [] }, {"id": 19,"author": 1,"date": 1493910803,"content": "Toi ?","father": 3,"children": [] }, {"id": 20,"author": 3,"date": 1493910804,"content": "J'ai cassé ma plume à mon 16e parchemin. J'irai en racheter une demain.","father": 3,"children": [] }, {"id": 21,"author": 1,"date": 1493910805,"content": "16 ???","father": 3,"children": [] }, {"id": 22,"author": 3,"date": 1493910806,"content": "Ne me dis pas que tu n'as pas commencé ?!","father": 3,"children": [] }, {"id": 23,"author": 1,"date": 1493910807,"content": "Tu pourras m'aider ?","father": 3,"children": [] }, {"id": 24,"author": 1, "date": 1493910808,"content": "STP :D","father": 3,"children": [] }, {"id": 25,"author": 3,"date": 1493910809,"content": "Si \"t'aider\" veut dire \"l'écrire à ta place\" c'est non.","father": 3,"children": [] }, {"id": 26,"author": 1,"date": 1493910810,"content": "Bien, je suppose que je vais devoir apprendre à vivre sans dormir...","father": 3,"children": []}])
  ```

# Comment utiliser MongoDB
_[Lien vers la doc officielle de MongoDB](https://docs.mongodb.com/manual/)_

1. créer une nouvelle base de données ou se rendre dans une base existante : ``use <nom de la (nouvelle) db>`` (**/!\\ la base ne sera pas visible tant qu'elle ne contiendra aucun document**)

2. Supprimer une db : ``<nom de la db>.dropDatabase()``

3. créer une nouvelle collection d'objets (sorte de tiroir d'une base) : ``<nom de la db>.createCollection('<nom de la collection>')``

4. supprimer une collection : ``<nom de la db>.<nom de la collection>.drop()``

5. ajouter un nouveau document à une collection : ``<nom de la db>.<nom de la collection>.insert(<document au format JSON>)``

6. ajouter plusieurs documents à une collection : ``<nom de la db>.<nom de la collection>.insertMany[{obj1}, ..., {obj n}]``

7. visualiser toutes les dbs : ``show dbs``

8. visualiser toutes les collections d'une db : ``show collections``

9. visualiser tous les documents d'une collection : ``<nom de la db>.<nom de la collection>.find().pretty()`` (_le pretty() sert à mettre en forme les documents avec les indentations du JSON etc_)

10. filtrer les documents récupérés (_par ex, on veut trouver tous les documents dont le champ "couleur" est à "bleu"_) : ``<nom de la db>.<nom de la collection>.find({couleur:'bleu'})``
