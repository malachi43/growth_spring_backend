

const notFound = (req, res) => {
    res.status(404).json({
        error_code: 404,
        message: "the requested resource cannot be found."
    })
}

export default notFound;