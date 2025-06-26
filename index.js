const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Please DO NOT INCLUDE the private app access token in your repo. Don't do this practicum in your normal account.
const PRIVATE_APP_ACCESS = '';

app.get('/', async (req, res) => {
    const dogs = `https://api.hubapi.com/crm/v3/objects/2-169256626/?properties=bio,labrador,yellow`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try {
        const response = await axios.get(dogs, { headers });
        const data = response.data.results;
        res.render('homepage', {title: 'Homepage', data});
    } catch(err) {
        console.error(err);
    }
});

app.get('/update-cobj', async (req, res) => {
    const getDog = `https://api.hubapi.com/crm/v3/objects/2-169256626/?properties=bio,labrador,yellow`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try {
        const response = await axios.get(getDog, { headers });
        const data = response.data;
        console.log(data);
        res.render('updates', {title: 'Form | Integrating With HubSpot I Practicum'});
    } catch(err) {
        console.error(err);
    }
});

app.post('/update-cobj', async (req, res) => {
	const update = {
		properties: {
			"labrador": req.body.labrador,
			"yellow": req.body.yellow,
			"bio": req.body.bio
		}
	}
    const updateContact = `https://api.hubapi.com/crm/v3/objects/2-169256626/`;
	const headers = {
		Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
		'Content-Type': 'application/json'
	}
	try {
		await axios.post(updateContact, update, { headers });
		res.redirect('back');
	} catch (err) {
		console.error(err);
	}
});

// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));
