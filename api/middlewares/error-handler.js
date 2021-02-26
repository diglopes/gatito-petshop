const NotFoundError = require("../errors/not-found");

module.exports = (err, req, res, next) => {
    if (err instanceof NotFoundError) {
      res.status(404);
    } else {
      res.status(400);
    }
    res.json({ error: { msg: err.message, id: err.idError }});
}