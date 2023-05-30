migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("u7smteqv12unlcn")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nh7auuaw",
    "name": "spotifyId",
    "type": "url",
    "required": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("u7smteqv12unlcn")

  // remove
  collection.schema.removeField("nh7auuaw")

  return dao.saveCollection(collection)
})
