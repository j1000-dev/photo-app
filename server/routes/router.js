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
    'resource_type:image' // add your folder
    )
    .sort_by('public_id','desc')
    .max_results(30)
    .execute()
    .then(result => res.send(result));
})

module.exports = router;