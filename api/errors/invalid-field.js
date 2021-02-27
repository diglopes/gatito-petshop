class InvalidFieldError extends Error {
    constructor(field) {
        const msg = `O campo '${field}' está inválido`
        super(msg)
        this.name = 'InvalidFieldError'
        this.idError = 1
    }
}

module.exports = InvalidFieldError