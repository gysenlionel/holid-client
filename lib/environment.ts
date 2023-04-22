export const environment = {
    isProduction: process.env.NEXT_PUBLIC_ENVIRONMENT! === 'production',
    apiUrl: process.env.NEXT_PUBLIC_BASE_URL!
}