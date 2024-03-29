const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/',async (req, res) => {
  // find all tags
  try {
    const  tagData= await Tag.findAll({include:Product});
    return res.json(tagData)
} catch(err){
    console.log(err);
    res.status(500).json({
        msg:"an error occurred",
        err:err
    })
}
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  try{
    const oneTag = await Tag.findByPk(req.params.id,{
        include:Product,
    });
    if(oneTag) {
       return res.json(oneTag)
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
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try{
    const newTag =  await Tag.create({
        tag_name:req.body.tag_name,
    })
    res.status(201).json(newTag)
} catch(err){
    console.log(err);
    res.status(500).json({
        msg:"an error occurred",
        err:err
    })
}
  // create a new tag
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {

    const updateTag = await Tag.update({
        tag_name:req.body.tag_name,
    },{
        where:{
            id:req.params.id
        }
    })
    if(updateTag[0]){
        return res.json(updateTag)
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
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    const delTag = await Tag.destroy({
        where:{
            id:req.params.id
        }
    })
    if(delTag){
        return res.json(delTag)
    } else {
        return res.status(404).json({msg:"no such Tag"})
    }
}catch(err){
    console.log(err);
    res.status(500).json({
        msg:"an error occurred",
        err:err
    })
}
});

module.exports = router;
