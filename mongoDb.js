//buổi 13

// table -> collection // record -> document

// Show all db ~ show dbs ~ db
// Switch db ~ use dbname
// When will mongo create new db
// Create collections ~ db.words.insert({ en: ‘hello' });
// Get number of docs in a collection. ~ db.words.count();
// Query and explain ~ db.numbers.find({ “number”: 1 }).explain(“executionStats”) => find docsExamined, executionTimeMillis
// Create text indexed: db.tours.createIndex({ tourName: "text" })
// Search text: db.tours.find({ $text: { $search: "wine" } }
// Search with regex: t.find({ tourName: /the/i })
// Remove a doc ~
// Search text with score: t.find({ $text: { $search: "enjoy" } }, { score: {$meta: 'textScore'}, tourName: 1 })
// Show all collections show collections
// Create index in a field ~ db.numbers.createIndex({ number: 1 })db.numbers.createIndex({ number: 1 })
// Import a son file ~ mongoimport --db learning_mongo --collection tours --jsonArray --file tours.json
// Update set tours.update({ "tourName" : "aaa" }, { $set: { tourRegion: "aaa" }})
// Update addToSet: tours.find({ tourTags: "wine" }, { tourName: 1, _id: 0, tourTags: 1 })
// Drop a collection db.tours.drop()

const { MongoClient, ObjectId } = require('mongodb'); // <=> const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const parser = require('body-parser').urlencoded({ extended: false }); //Lấy được dữ liệu nhập vào (như trong req.body), CẦN SỬ DỤNG BODYPARSER() NẾU MUỐN DATA FORM CÓ SẴN TRONG REQ.BODY

let wordsCollection;

const app = express();
app.set('views', './views'); //set thư mục chưa các file view template engine
app.set('view engine', 'ejs'); //set view engine sử dụng ejs
app.use(express.static('public'));

app.get('/', (req, res) => {
    wordsCollection.find().toArray()
    .then(result => res.render('home1', { arrWords : result}))
    .catch(err => res.send(err.message));
});

//insert data (sử dụng body-parser)
app.post('/addWords', parser, (req, res) => {
    const { en, vn } = req.body;
    console.log( en, vn );
    wordsCollection.insert({ en, vn })
    .then(() => res.redirect('/'))
    .catch(err => res.send(err.message));
});

//remove data
app.get(`/deleteWords/:wordId`, (req, res) => {
    const { wordId } = req.params;
    wordsCollection.remove({ _id: ObjectId(wordId)})
    .then(() => res.redirect('/'))
    .catch(err => res.send(err.message));
});

//Edit data
app.get('/editWords/:wordId', (req, res) => {
    const id = req.params.wordId;
    wordsCollection.findOne({ _id: ObjectId(id)})
    // .then(result => res.send(result))
    .then(result => res.render('edit-word', { result })) //gửi { result: result } đến edit-word.ejs
    .catch(err => res.send(err.message));
});
app.post('/updateWord/:wordId', parser, (req, res) => {
    const { wordId } = req.params;
    const { en, vn } = req.body;
    wordsCollection.updateOne({ _id: ObjectId(wordId)}, { en, vn })
    .then(() => res.redirect('/'))
    .catch(err => res.send(err.message));
});

const url = 'mongodb://localhost:27017/shop';

// MongoClient.connect(url, { useUnifiedTopology: true }) // for new version
MongoClient.connect(url)
.then(db => {
    app.listen(3000, () => console.log('Server port 3000 started!')); //bất đồng bộ.  //connect db xong mới khởi động server
    wordsCollection = db.collection('words'); //lấy ra collection words (chạy trước dòng trên)
})
// .then(result => console.log(result))
.catch(err => console.log(err.message));