const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');
app.use(express.json({extended: true}))
app.get('/register', (req, res) => {
    console.log(req.query)
    const user_email = req.query.user_email;

    if (user_email === undefined) {
        res.status(404).jsonp({status: "failure", "message": 'Please provide a valid email address.'});
    }

    if (!validateEmail(user_email)) {
        res.status(404).jsonp({status: "failure", "message": 'Please provide a valid email address.'});
    }

    const users = JSON.parse(fs.readFileSync('early_registrations.json'));
    console.log(user_email);

    if (users[user_email]) {
        res.status(404).jsonp({status: "failure", "message": 'Email already registered.'});
    } else {
        users[user_email] = new Date().getTime();
        fs.writeFileSync('early_registrations.json', JSON.stringify(users));
        res.status(200).jsonp({status: "success", "message": 'Registration successful!'});
    }
});

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

app.listen(port, () => {
    console.log(`Aigenapp server running on ${port}`)
})
