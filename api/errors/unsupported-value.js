class UnsupportedValueError extends Error {
    constructor(value, field) {
        const msg = `O valor '${value}' no campo '${field}' não é suportado`
        super(msg)
        this.name = 'UnsupportedValueError'
        this.idError = 3
    }
}

module.exports = UnsupportedValueError