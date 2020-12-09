exports.validate = (schema, input) => {
    const validate = schema.validate(input, { abortEarly: false });

    if (validate.error) {
        const messages = validate.error.details.map(
            detail => {
                return {
                    key: detail.context.key,
                    value: detail.message.replace(/(")|(\")/g, '')
                }
            });

        throw {
            code: 400,
            message: messages
        };
    }
}