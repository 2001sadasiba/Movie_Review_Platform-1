import dotenv from 'dotenv';

dotenv.config();

const { env } = process;

export const config = {
    server: {
        port: Number(env.PORT),
        nodeEnv: env.NODE_ENV,
        jwtSecret: env.JWT_SECRET,
    },
    database: {
        mongoUri: env.DB_STRING as string,
    },
    omdb: {
        apiKey: env.OMDB_API_KEY,
        baseUrl: env.OMDB_BASE_URL,
        imageBaseUrl: env.OMDB_IMAGE_BASE_URL,
    },
    cors: {
        corsOrigin: env.CORS_ORIGINS,
        corsMethod: env.CORS_METHODS,
        corsCredentials: env.CORS_CREDENTIALS,
    }
} as const; 