const ctrlWrapper = ctrl => {
    const func = async(req, res, next) => {
        try {
            await ctrl(req, res, next)
        } catch (error) {
            next(res.json(error.status, { message: error.message }))
        }
    }

    return func;
}

module.exports = ctrlWrapper;
