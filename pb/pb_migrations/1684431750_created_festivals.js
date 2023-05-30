migrate((db) => {
  const collection = new Collection({
    "id": "molg498mzjjs5zn",
    "created": "2023-05-18 17:42:30.451Z",
    "updated": "2023-05-18 17:42:30.451Z",
    "name": "festivals",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "peewdi1y",
        "name": "name",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "mvnn2bmd",
        "name": "startDate",
        "type": "date",
        "required": true,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "zlor0hvx",
        "name": "endDate",
        "type": "date",
        "required": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "zntvnkrn",
        "name": "location",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "6wkjvwjv",
        "name": "artists",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "u7smteqv12unlcn",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "7ae4rl68",
        "name": "url",
        "type": "url",
        "required": false,
        "unique": false,
        "options": {
          "exceptDomains": null,
          "onlyDomains": null
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("molg498mzjjs5zn");

  return dao.deleteCollection(collection);
})
