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
 

/*
* ************
*   Gallery *
* ************
*/ 

/*
 * Fetches all gallery images from cloudinary 
*/ 
router.get('/fetch-gallery-images', (req, res) => {
  const tag = req.query.search;
  cloudinary.v2.search
  .expression(
    `resource_type:image${(tag != '') ? ` AND tags=${tag}` : ''}`
    )
    .with_field('tags')
    .sort_by('created_at','desc')
    .max_results(60)
    .execute()
    .then(result => res.send(result));
});

/*
* Filters images by tag in the gallery 
*/
router.get('/search-by-tag', (req, res) => {
  const tag = req.query.tag;
  console.log(tag)
});

/*
* ************
*    Albums  *
* ************
*/ 

/*
* Fetches all albums from cloudinary
*/
router.get('/get-root-folders', (req, res) => {
  cloudinary.v2.api.root_folders().then(result => res.send(result));
});

/*
* Fetches all images from a specific album
*/
router.get('/fetch-album-images', (req, res) => {
  const folder = req.query.folder
  cloudinary.v2.search
  .expression(
    `resource_type:image AND folder=${folder}`
    )
    .with_field('tags')
    .sort_by('created_at','desc')
    .max_results(60)
    .execute()
    .then(result => res.send(result));
});

/*
* Adds an image to an album
*/
router.post('/add-image-to-album', async (req, res) => {
  const image = req.body.imageData;
  const album = req.body.albumName;

  await cloudinary.v2.api.create_folder(album);

  let parts = image.public_id.split("/");
  if (parts.length > 1) {
    parts = parts.slice(1);
  }
  const publicId = parts.join("/");

  await cloudinary.v2.uploader.rename(image.public_id, `${album}/${publicId}`);
});

/*
* ************
*  Favorites *
* ************
*/ 

/*
* Fetches all images that have been favorited
*/
router.get('/fetch-favorite-images', (req, res) => {
  cloudinary.v2.search
  .expression(
    'resource_type:image AND tags=favorites' 
    )
    .sort_by('created_at','desc')
    .max_results(60)
    .execute()
    .then(result => res.send(result));
});

/*
* Adds an image to favorites
*/
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
});

/*
* Removes an image to favorites
*/
router.post('/remove-favorite-tag', (req, res) => {
  const public_id = req.body.public_id;
  cloudinary.v2.uploader
  .remove_tag('favorites', public_id).then(result => {
    res.status(200).send({ message: 'Photo removed from Favorites', result: result })
  }).catch(error => {
    res.status(500).send({ message: 'Failed to remove photo to Favorites', error: error.message })
  });
});

module.exports = router;