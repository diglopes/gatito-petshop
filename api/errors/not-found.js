class NotFoundError extends Error {
    constructor(msg) {
        super(msg)
        this.name = 'NotFoundError'
        this.idError = 0
    }
}

module.exports = NotFoundError