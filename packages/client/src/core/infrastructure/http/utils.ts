type HTTPStatus = 401 | 404;

type ErrorMap = {
    [key in HTTPStatus]?: string;
};

const errorMap: ErrorMap = {
    401: "Please login before continuing.",
};

export const getErrorMessageFromHTTPStatus = (httpStatus: number): string => {
    const errorMessage = errorMap[httpStatus as HTTPStatus];
    return errorMessage ?? "A general error occurred.";    
};
