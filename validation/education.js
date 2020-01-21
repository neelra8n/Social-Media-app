const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validatorExperienceInput(data){
    let errors = {};

    data.school = !isEmpty(data.school) ? data.school: '';
    data.degree = !isEmpty(data.degree) ? data.degree: '';
    data.college = !isEmpty(data.college) ? data.college: '';
    data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy: '';
    
    if(Validator.isEmpty(data.school)){
        errors.school = 'School field is required';
    };

    if(Validator.isEmpty(data.degree)){
        errors.degree = 'Degree field is required';
    };

    if(Validator.isEmpty(data.college)){
        errors.college = ' College field is required';
    };

    if(Validator.isEmpty(data.fieldofstudy)){
        errors.fieldofstudy = ' Study field is required';
    };

    return {
        errors,
        isValid: isEmpty(errors)
    };
};