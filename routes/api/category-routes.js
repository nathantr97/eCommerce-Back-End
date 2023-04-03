const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [
      {
        model: Product,
      },
    ],
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(503).json({
        message: "Service Unavailable",
        err: err,
      });
    });
  });
router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id, {
    include: [
      {
        model: Product,
      },
    ],
  })
    .then((data) => {
      if (data) {
        return res.json(data);
      } else {
        res.status(404).json({
          message: "category not found!",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(503).json({
        message: "Service unavailable",
        err: err,
      });
    });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    id: req.body.id,
    category_name: req.body.category_name,
  })
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(503).json({
        message: "Service Unavailable!",
        err: err,
      });
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      id: req.body.id,
      category_name: req.body.category_name,
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
        return res.status(404).json({
          message: "category not found!",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(503).json({
        message: "Service unavailable!",
        err: err,
      });
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      if (data) {
        return res.json(data);
      } else {
        return res.status(404).json({
          message: "category not found!",
        });
      }
})
    .catch((err) => {
      console.log(err);
      res.status(503).json({
        message: "Service unavailable!",
        err: err,
      });
    });
  });
module.exports = router;
