export type TErrorSources = {
    path: string | number;
    message: string
}[];

export type TGenericError = {
    message: string,
    statusCode: number,
    errorSources: TErrorSources
}