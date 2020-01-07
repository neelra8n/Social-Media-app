const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validatorLoginInput(data){
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email: '';
    data.password = !isEmpty(data.password) ? data.password: '';



    if(!Validator.isEmail(data.email)){
        errors.email = 'email is invalid';
    };
    
    if(Validator.isEmpty(data.email)){
        errors.email = 'email field is required';
    };

    if(Validator.isEmpty(data.password)){
        errors.password = 'Password field is required';
    };

    return {
        errors,
        isValid: isEmpty(errors)
    };
};