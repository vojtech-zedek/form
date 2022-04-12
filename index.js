const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');



app.use(express.static("public"));

const urlencodedParser = bodyParser.urlencoded({
    extended: false
});

app.post('/save', urlencodedParser, (req, res) => {
    let jmeno = req.body.jmeno;
    let vek = req.body.vek;
    let cas = req.body.cas;
    let delka = req.body.delka;
    let date = new Date();
    let str = `${jmeno},${vek},${cas},${delka}\n`;
    fs.appendFile('./data/vysledky.csv', str, function(err) {
        if (err) {
            console.error(err);
            return res.status(400).json({
                success: false,
                message: 'Byla zjištěna chyba při zápisu do souboru'
            });
        }
    });
    res.redirect(301, '/');
});

app.listen(port, () => {
    console.log(`Server naslouchá na portu ${port}`);
    });
    