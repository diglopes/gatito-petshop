class NotFoundError extends Error {
    constructor(id) {
        const idMsg = id ? ` de id '${id}' ` : ' '
        const msg = `Recurso${idMsg}não encontrado`
        super(msg)
        this.name = 'NotFoundError'
        this.idError = 0
    }
}

module.exports = NotFoundError