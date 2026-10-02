export function errorMiddleware(err, req, res, next) {
    console.error(err);

    return res.status(500).render('mission/404', {
        message: 'Something went wrong!',
    })
}