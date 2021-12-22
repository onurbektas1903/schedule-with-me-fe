import {GENERAL_ERRORS} from "@/constants/errors/errorMessages";

export const meetingProviderExceptionHandler = (errorMessage) => {
    const errorCode = errorMessage.errorCode;
    let fields = errorMessage.errorList;
    let errMsg;
    switch (errorCode) {
        case GENERAL_ERRORS.NOT_UNIQUE_EXCEPTION:
            errMsg = '1den fazla oluşturulamaz';
            break;
        case GENERAL_ERRORS.OBJECT_IN_USE:
            errMsg = 'Silmeye çalışılan nesne kullanılıyor.';
            break;
        case GENERAL_ERRORS.NOT_FOUND:
            errMsg = 'Bulunamadı';
            break;
        case GENERAL_ERRORS.BUSINESS_VALIDATION:
            errMsg = 'Gönderilen değerler hatalı ya da eksik';
            break;
        default:
            errMsg = errorMessage.message;
            break;
    }
    // this.$toasted.show(errorMessage);
    return errMsg;
};
