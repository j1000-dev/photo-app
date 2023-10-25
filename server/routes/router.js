const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary');
require('dotenv').config();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // add your cloud_name
  api_key: process.env.CLOUDINARY_API_KEY, // add your api_key
  api_secret: process.env.CLOUDINARY_API_SECRET, // add your api_secret
  secure: true
 });
 
 
router.get('/fetch-gallery-images', (req, res) => {
  cloudinary.v2.search
  .expression(
    'resource_type:image'
    )
    .sort_by('created_at','desc')
    .max_results(60)
    .execute()
    .then(result => res.send(result));
})

router.post('/set-image-favorite-tag', (req, res) => {
  const public_id = req.body.public_id;
  cloudinary.v2.uploader
  .add_tag('favorites', public_id)
  .then(result => res.status(200).send({ 
    message: 'Tag added to image successfully', 
    result: result})
  ).catch(error => {
    console.error('Error adding tag to image: ', error);
    res.status(500).send('Failed to add tag to image');
  });
})

module.exports = router;