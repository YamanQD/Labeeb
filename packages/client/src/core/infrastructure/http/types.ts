export type APIError = {
    message: string;
    /**
     * HTTP Status
     */
    status: number;
};

export type ErrorListener = (error: APIError) => void;
