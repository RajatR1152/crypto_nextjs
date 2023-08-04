const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const server = '127.0.0.1:27017';
const db = 'next_crypto';
const mongoose = require('mongoose');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

mongoose.set('strictQuery', false);
mongoose.connect(`mongodb://${server}/${db}`, { useNewUrlParser: true }).then(() => {
    console.log('connection successful');
})

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    mobile: String,
    password: String,
    profileImg: String,
    bookmarks: [{
        id: String,
        image: String,
    }]
})

const user = mongoose.model('user', userSchema);

app.get('/', (req, res) => {
    res.send('this is homepage');
})

app.post('/register', (req, res) => {
    const userData = new user(req.body);
    userData.save().then(() => {
        res.status(200).send({ 'message': 'user created successfully' });
    });
})

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    user.findOne({ username, password }).then((data) => {
        if (data) {
            res.status(200).send(data);
        }
        else {
            res.status(401).send({ 'message': 'user not found' });
        }
    })
})

app.post('/bookmarks', (req, res) => {
    user.findOne(req.body).then((user) => {
        res.status(200).send({ 'data': user.bookmarks });
    })
})

app.post('/addbookmarks', (req, res) => {
    const { username, id } = req.body;
    user.findOne({ 'username': username }).then((data) => {
        data.bookmarks.push(req.body);
        data.save();
        res.status(200).send({ 'message': 'added successfull' });
    })
})

app.post('/remove', (req, res) => {
    const { id, username } = req.body;
    let remaining = [];

    user.findOne({ 'username': username }).then((data) => {
        data.bookmarks.map((b) => {
            if (b.id == id) {
                res.status(200).send({ 'message': 'bookmark removed' })
            }
            else {
                remaining.push(b);
            }
        })
        data.bookmarks = remaining;
        data.save();
    })

})

app.listen(port, () => {
    console.log('listening on port no.' + port)
})