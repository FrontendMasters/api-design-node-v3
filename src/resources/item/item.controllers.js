import { Item } from './item.model'
// export default {}

export const getItem = (req, res) => {
  res.status(200).json({
    data: req.item
  })
}

export const createItem = (req, res) => {
  res.status(200).json({
    data: req.item
  })
}

export const updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.item._id, req.body, {
        new: true
      })
      .lean()
      .exec()

    res.status(200).json({
      data: item
    })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.item._id, req.body, {
        new: true
      })
      .lean()
      .exec()

    res.status(200).json({
      data: item
    })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}
