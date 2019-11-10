export const getOne = model => async (req, res) => {
  const id = req.params.id
  const userId = req.params._id

  const doc = await model.findOne({ _id: id, createdBy: userId }).exec()
  if (!doc) {
    res.status(404).end
  }
  res.json({ data: doc })
}

export const getMany = model => async (req, res) => {}

export const createOne = model => async (req, res) => {}

export const updateOne = model => async (req, res) => {}

export const removeOne = model => async (req, res) => {}

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
})
