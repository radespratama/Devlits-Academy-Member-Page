const respondError = (errors) => {
    const fieldErrors = typeof errors === "object" && errors?.reduce( (listErrors, error)=> {
        if(errors?.field) listErrors[error.field] = error
        return listErrors
    }, {})
    return fieldErrors
}

export default respondError