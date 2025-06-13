import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

var posts = []

app.get('/', function (req, res) {
    res.render('index', {posts});
})

app.post('/posts', function (req, res) {
    console.log(req.body);
    posts.push(req.body);
    res.redirect("/");
})

app.post('/delete', function (req, res) {
    posts.splice(req.body.del_index, 1);
    res.redirect('/');
})

app.post('/edit', function (req, res) {
    var index = req.body.index;
    res.render('edit', { x: index });
});


app.post('/updated', function (req, res) {
    var update_data = req.body;
    posts[update_data["index"]].title = update_data.title;
    posts[update_data["index"]].description = update_data.description;
    res.redirect('/');
})

app.listen(8080);
