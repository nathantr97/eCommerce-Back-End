const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [{ model: Product}],
  })
  .then((data) => {
    res.json(data);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id, {
    include: [{ model: Product}],
  })
  .then((data) => {
    if (data){
    return res.json(data);
   } else {
    res.status(404).json(err);
   }
 })
 .catch((err) => {
  console.log(err);
  res.status(504).json(err);
 });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
})
  .then((data) => {
    res.status(200).json(data);
  })
  .catch((err) => {
    console.log(err);
    res.status(504).json(err);
  });
});
router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
        id: req.body.id,
         tag_name: req.body.tag_name,
    },
    {
        where: {
          id: req.params.id,
        },
    }
  )
  .then((data) => {
    if (data[0]) {
      return res.json(data);
    } else {
      return res.status(404).json(err);
    }
  })
  .catch((err) => {
    console.log(err);
    res.status(504).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((data) => {
    if (data) {
      return res.json(data);
    } else {
      return res.status(404).json(err);
    }
  })
  .catch((err) => {
    console.log(err);
    res.status(504).json(err);
  });
});

module.exports = router;
