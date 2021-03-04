const Supplier = require("../routes/suppliers/supplier");

module.exports = async (req, res, next) => {
    try {
        const id = req.params.idFornecedor
        const supplier = new Supplier({ id });
        await supplier.load();
        req.supplier = supplier
        next()
    } catch (error) {
        next(error)
    }
}