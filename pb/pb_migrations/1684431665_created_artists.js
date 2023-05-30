migrate((db) => {
  const collection = new Collection({
    "id": "u7smteqv12unlcn",
    "created": "2023-05-18 17:41:05.034Z",
    "updated": "2023-05-18 17:41:05.034Z",
    "name": "artists",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "iwtdnauj",
        "name": "name",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
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
  const collection = dao.findCollectionByNameOrId("u7smteqv12unlcn");

  return dao.deleteCollection(collection);
})
