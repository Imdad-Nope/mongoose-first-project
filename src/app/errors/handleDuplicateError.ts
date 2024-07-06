import { TErrorSources, TGenericError } from "../interface/error"

const handleDuplicateError = (err: any): TGenericError=>{
    const text = 'E11000 duplicate key error collection: test.academicdepartments index: name_1 dup key: { name: "Dpartment of accounting" }';
    const pattern = /(?<=\{ name: ").*?(?=" \})/;
    
    const match = text.match(pattern);

    const errorSources: TErrorSources = [{
        path: '',
        message: `${match} is already exist`
    }];

    const statusCode = 400;
    return {
        statusCode,
        message: 'wrong input',
        errorSources
    }
};

export default handleDuplicateError;