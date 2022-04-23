// // CRUD creat read update delete

// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;

// const connectionURL = "mongodb://127.0.0.1:27017";
// const databaseName = 'taskManager';

// MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
//     if (error) {
//         return console.log('Unable to connect to database!');
//     }
//     // console.log('Connected correctly!');

//     const db = client.db(databaseName);

//     // db.collection('users').insertOne({
//     //     name: 'Roald1',
//     //     age: 21
//     // }, (error, result) => {
//     //     if (error) {
//     //         return console.log('Unable to insert user');
//     //     }
//     //     const data = result.ops;
//     //     console.log(data)
//     // });

//     // db.collection('users').insertMany([
//     //     {
//     //         name: 'Jen',
//     //         age: 28
//     //     }, {
//     //         name: 'Gunther',
//     //         age: 27
//     //     }
//     // ], (error, result) => {
//     //     if (error) {
//     //         return console.log('Unable to insert documents!');
//     //     }
//     //     console.log(result.ops);
//     // });

//     db.collection('tasks').insertMany([
//         {
//             description: 'Clear the house',
//             completed: true
//         }, {
//             description: 'Renew inspection',
//             completed: false
//         }, {
//             description: 'Post plants',
//             completed: false
//         }
//     ], (error, result) => {
//         if (error) {
//             return console.log('Unable to insert tasks!');
//         }
//         console.log(result)
//         console.log(result.ops)

//     });
// });


const { MongoClient, ObjectID, ObjectId } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'taskManager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!');
    }
    const db = client.db(databaseName);

    // db.collection('users').findOne({ name: "d" }, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch!');
    //     }
    //     console.log(user);
    // })
    // db.collection('users').findOne({ _id: new ObjectId("62507871c6ae79f2bb625e86") }, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch!');
    //     }
    //     console.log(user);
    // })

    // db.collection('users').find({ age: 21 }).toArray((error, users) => {
    //     console.log(users);
    // });

    // db.collection('users').find({ age: 21 }).count((error, users) => {
    //     console.log(users);
    // });

    // db.collection('tasks').findOne({ _id: new ObjectId("6250e40916774457641a0eca") }, (error, tasks) => {
    //     console.log(tasks);
    // });

    // db.collection('tasks').find({ completed: false }).toArray((error, users) => {
    //     console.log(users);
    // });

    // ffb9a4206bb7fc991a
    // const updatePromise = db.collection('users').updateOne({ _id: new ObjectId("625078ffb9a4206bb7fc991a") }, {
    // $set:{},
    //     $inc: {
    //         age: 1
    //     }
    // });
    // updatePromise.then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // })

    // const updatePromise = db.collection('tasks').updateMany({ completed: true }, {
    //     $set: {
    //         completed: false
    //     }
    // });
    // updatePromise.then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // })

    // db.collection('users').deleteOne({
    //     age: 22
    // }).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // })
});