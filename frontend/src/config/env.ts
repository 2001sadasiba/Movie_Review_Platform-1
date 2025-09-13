function getEnvVariable(key: string): string {
    const value = import.meta.env[key];
    if (!value) {
        throw new Error(`Environment variable ${key} is missing. Please define it in your .env file.`);
    }
    return value;
}

export const env = {
    BACKEND_URL: getEnvVariable('VITE_BACKEND_URL'),
} as const;

export default env;
