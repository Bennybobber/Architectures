const User = require('./models/User');
const bookRequest = require('./models/Request')
const mongoose = require('mongoose');

/**
 * depopulateDB | A script function that deletes all the
 * pre-created objects that were populated in populateDB.js
 */
async function depopulateDB() {
    try{
        await User.deleteOne({username: 'tim10'});
        await User.deleteOne({username: 'barry10'});
        await User.deleteOne({username: 'admin'});

        await bookRequest.deleteOne({bookName: 'Terries Tips'});
        await bookRequest.deleteOne({bookBane: 'Donald Doinks'});
        await bookRequest.deleteOne({bookBane: 'The Small Giant'});
        await bookRequest.deleteOne({bookBane: 'How to write Node.js'});
    } catch (error) {
        console.log(error);
    }
    mongoose.connection.close();
    

}
mongoose 
    .connect("mongodb+srv://beb:bennybobber22@cluster0.sny8t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
        useNewUrlParser: true,
    })   
    .then(() => {
        depopulateDB();
    })
    .catch(err => console.log(err));