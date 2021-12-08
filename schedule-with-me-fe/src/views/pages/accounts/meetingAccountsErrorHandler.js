import {GENERAL_ERRORS} from "@/constants/errors/errorMessages";

export const accountExceptionHandler = (errorMessage) => {
    const errorCode = errorMessage.errorCode;
    let fields = errorMessage.errorList;
    let errMsg;
    switch (errorCode) {
        case GENERAL_ERRORS.NOT_UNIQUE_EXCEPTION:
            errMsg = '1den fazla oluşturulamaz';
            break;
        default:
            errMsg=errorMessage.message;
            break;
    }
    // this.$toasted.show(errorMessage);
    return errMsg;
};
