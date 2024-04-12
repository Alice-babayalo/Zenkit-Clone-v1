
const Configs = {
    MONGODB_CONNECTION_STRING: process.env.MONGODB_CONNECTION_STRING||"mongodb+srv://Alice:12345@cluster0.6eqmb7j.mongodb.net/Zemlit-Clone-V1",
    PORT: process.env.PORT||1011,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,
    JWT_REFRESH_COOKIE_NAME: process.env.JWT_REFRESH_COOKIE_NAME,
}

module.exports = Configs;