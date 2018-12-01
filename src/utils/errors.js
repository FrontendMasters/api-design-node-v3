export const errorHandler = (error, req, res, next) => {
  console.log(error.message, error.name)
  res.status(500).end()
}
