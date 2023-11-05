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
    .with_field('tags')
    .sort_by('created_at','desc')
    .max_results(60)
    .execute()
    .then(result => res.send(result));
})

router.get('/fetch-favorite-images', (req, res) => {
  cloudinary.v2.search
  .expression(
    'resource_type:image AND tags=favorites' 
    )
    .sort_by('created_at','desc')
    .max_results(60)
    .execute()
    .then(result => res.send(result));
})

router.post('/add-favorite-tag', (req, res) => {
  const public_id = req.body.public_id;
  cloudinary.v2.uploader
  .add_tag('favorites', public_id)
  .then(result => {
    if (result.public_ids.length == 0) {
      res.status(500).send({message: 'Failed to add photo to Favorites'});
    } else {
      res.status(200).send({ message: 'Photo added to Favorites', result: result })
    }
  }).catch(error => {
    res.status(500).send({ message: 'Failed to add photo to Favorites', error: error.message })
  });
})


router.post('/remove-favorite-tag', (req, res) => {
  const public_id = req.body.public_id;
  cloudinary.v2.uploader
  .remove_tag('favorites', public_id).then(result => {
    res.status(200).send({ message: 'Photo removed from Favorites', result: result })
  }).catch(error => {
    res.status(500).send({ message: 'Failed to remove photo to Favorites', error: error.message })
  });
})

router.post('/add-image-to-album', (req, res) => {
  const image = req.body.imageData;
  const album = req.body.albumName;
  cloudinary.v2.api.create_folder(album);
  console.log(  `${album}/${image.public_id}`)
  cloudinary.v2.uploader.rename(
    image.public_id,
    `${album}/${image.public_id}`
  ).then(result => {
    res.status(200).send({ message: 'Photo added to album', result: result })
  }).catch(error => {
    res.status(500).send({ message: 'Failed to add photo to album', error: error.message })
  });
})

module.exports = router;