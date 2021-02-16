const express = require('express');
const router = express.Router();

const Image = require('../../models/Images')

// @route     POST api/images
// @desc      Add an image
// @access    Public

router.post('/', async (req, res) => {
  try {
      console.log(req.body)
    const newImage = new Image({
      category: req.body.category,
      source: req.body.source,
    });

    const image = await newImage.save();

    res.json(image);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET api/images?category=[cats|sharks]
// @desc      Get all images based on category, if none then get all images
// @access    Public

router.get('/', async (req, res) => {
  try {
    //category provided
    console.log(req.query)
    if (req.query.category){
        const images = await Image.find({category: req.query.category})
        res.json(images);

    }else{
        const images = await Image.find()
        res.json(images);}
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});



module.exports = router;

