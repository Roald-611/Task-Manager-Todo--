const { MongoClient, ServerApiVersion } = require('mongodb');

const mongoAtlasUri = process.env.MONGODB_URL.toString();

const client = new MongoClient(mongoAtlasUri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("task-manager-api").collection("taskManager-API");
    // perform actions on the collection object
    client.close();
});