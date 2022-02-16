const User = require('./models/User');
const bookRequest = require('./models/Request')
const  bcrypt = require('bcryptjs');
require('dotenv').config();

const mongoose = require('mongoose');

async function populateDB() {
    const encryptedPassword = await bcrypt.hash('password', 10);


    const exampleClient = new User({
        firstName: 'Timmy',
        lastName: 'Turner',
        password: encryptedPassword,
        username: 'tim10',
        isEmployee: false,
        isAuthorizor: false,
    })

    

    const exampleEmployee = new User({
        firstName: 'Barry',
        lastName: 'Larry',
        password: encryptedPassword,
        username: 'barry10',
        isEmployee: true,
        isAuthorizor: false,
    })

    

    const exampleAdmin = new User({
        firstName: 'Adam',
        lastName: 'Saveage',
        password: encryptedPassword,
        username: 'admin',
        isEmployee: false,
        isAuthorizor: true,
    })

    


    try{
        await exampleClient.save();
        await exampleEmployee.save();
        await exampleAdmin.save();

        let tim = await User.findOne({ username: 'tim10' }).select("-password")
        console.log(tim);
        const bookReq1 = new bookRequest({
            bookName: 'Terries Tips',
            bookAuthor: 'Terry',
            bookDesc: 'These tips from Terry are sure to BLOW your MIND!',
            bookGenre: 'Life, Non-fiction, Exciting',
            bookPrice: '20.00',
            date: new Date(),
            userId: tim._id,
        })
    
        
    
        const bookReq2 = new bookRequest({
            bookName: 'How to garden grow',
            bookAuthor: 'Donald Doinks',
            bookDesc: '',
            bookGenre: 'Life, Non-fiction, Gardening',
            bookPrice: '8.00',
            date: new Date(),
            userId: tim._id,
        })
    
        
    
        const bookReq3 = new bookRequest({
            bookName: 'The Small Giant',
            bookAuthor: '',
            bookDesc: 'Not all giants are born the same, some are small.',
            bookGenre: '',
            bookPrice: '15.00',
            date: new Date(),
            userId: tim._id,
        })
    
        
    
        const bookReq4 = new bookRequest({
            bookName: 'Node.js For Dummies',
            bookAuthor: 'Ben Sinyard',
            bookDesc: 'How to write Node.js',
            bookGenre: 'Educational',
            bookPrice: '50.00',
            date: new Date(),
            userId: tim._id,
        })
    
        await bookReq1.save();
        await bookReq2.save();
        await bookReq3.save();
        await bookReq4.save();
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
        populateDB()
        
    })
    .catch(err => console.log(err));