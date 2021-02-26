class InsufficientDataError extends Error {
    constructor() {
        const msg = `Os dados fornecidos são insuficientes para completar esta operação`
        super(msg)
        this.name = 'InsufficientDataError'
        this.idError = 2
    }
}

module.exports = InsufficientDataError