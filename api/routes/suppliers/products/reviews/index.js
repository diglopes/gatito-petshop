const router = require("express").Router({ mergeParams: true })
const Review = require("./review")
const ReviewsDAO = require("./reviews-dao")

router.get("/", async (req, res) => {
    const productId = req.params.idProduto
    const dao = new ReviewsDAO()
    const reviews = await dao.index(productId)
    res.send(JSON.stringify(reviews))
})

router.post("/", async (req, res) => {
    try {
        const { idProduto } = req.params
        const { titulo, descricao, nota } = req.body
        const review = new Review({ titulo, descricao, nota , idProduto })
        await review.create()
        res.send(JSON.stringify(review))
    } catch (error) {
        next(error)
    }
})

module.exports = router