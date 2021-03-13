class NotFoundError extends Error {
    constructor(resourceName, id) {
        const idMsg = id ? ` '${resourceName}' de id '${id}' ` : ' '
        const msg = `Recurso${idMsg}não encontrado`
        super(msg)
        this.name = 'NotFoundError'
        this.idError = 0
    }
}

module.exports = NotFoundError