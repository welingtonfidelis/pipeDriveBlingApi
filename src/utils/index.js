module.exports = {
    errorResponse(res, error) {
        console.log('ERROR ===> \n', error, '\n <=== ERROR');

        const code = error.code || 500;
        const message = error.message || 'Internal server error';

        res.status(code).json({ ok: false, message });
    },

    dateTimeToDate(dateStr) {
        const date = new Date(dateStr);

        const year = date.getFullYear();
        const month = (`${date.getMonth() + 1}`).padStart(2, '0');
        const day = (`${date.getDate()}`).padStart(2, '0');

        return `${day}/${month}/${year}`;
    },
}