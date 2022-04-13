const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const sequelize = require('../../config/connection');

// The `/api/tags` endpoint
router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
    .then(dbData => res.json(dbData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});


router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
    .then(dbTag => {
      if (!dbTag) {
        res.status(404).json({ message: "There is no Tag with this ID" })
        return
      }
      res.json(dbTag)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    });
})

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
    .then(dbTag => {
      res.json(dbTag)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(dbTag => {
      if (!dbTag) {
        res.status(404).json({ message: 'There is no Tag with this ID' })
        return
      }
      res.json(dbTag)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.delete({
    where: {
      id: req.params.id
    }
  })
    .then(dbTag => {
      if (!dbTag) {
        res.status(404).json({ message: 'There is no Tag with this ID' })
        return
      }
      res.json(dbTag)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
});

module.exports = router;