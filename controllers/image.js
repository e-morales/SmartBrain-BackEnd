const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'e36448ce334345da940e3d9632ba644a'
  });

const handleApiCall = (req, res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('not working'))
}


const handleImage = (req,res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0])
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = { handleImage: handleImage, handleApiCall: handleApiCall };