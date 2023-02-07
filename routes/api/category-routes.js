const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const  catData= await Category.findAll();
    return res.json(catData)
} catch(err){
    console.log(err);
    res.status(500).json({
        msg:"an error occurred",
        err:err
    })
}
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try{
    const oneCat = await Category.findByPk(req.params.id
    );
    if(oneCat) {
       return res.json(oneCat)
    } else {
        return res.status(404).json({msg:"no such record"})
    }
}catch(err){
    console.log(err);
    res.status(500).json({
        msg:"an error occurred",
        err:err
    })
}
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/',async (req, res) => {
  try{
    const newCat =  await Category.create({
        category_name:req.body.category_name,
    })
    res.status(201).json(newCat)
} catch(err){
    console.log(err);
    res.status(500).json({
        msg:"an error occurred",
        err:err
    })
}
  // create a new category
});

router.put('/:id', async (req, res) => {
  try {

    const updateCat = await Category.update({
        category_name:req.body.category_name,
    },{
        where:{
            id:req.params.id
        }
    })
    if(updateCat[0]){
        return res.json(updateCat)
    } else {
        return res.status(404).json({msg:"no such record"})
    }
}catch(err){
    console.log(err);
    res.status(500).json({
        msg:"an error occurred",
        err:err
    })
}
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  try{
    const delCat = await Category.destroy({
        where:{
            id:req.params.id
        }
    })
    if(delCat){
        return res.json(delCat)
    } else {
        return res.status(404).json({msg:"no such category"})
    }
}catch(err){
    console.log(err);
    res.status(500).json({
        msg:"an error occurred",
        err:err
    })
}
  // delete a category by its `id` value
});

module.exports = router;
