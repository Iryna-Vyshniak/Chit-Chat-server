const email = errors => {
    errors.forEach(err => {
        const { code, message } = err;

        switch (code) { 
            case 'string.pattern.base': 
            message = 'Enter a valid email';
            break;

            case 'any.required':
            message = 'Email is required';
            break;

            default:
                break;
        }
    })
    return errors;
}

export default email;