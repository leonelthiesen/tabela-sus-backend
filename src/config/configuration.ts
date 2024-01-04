export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
        url: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/tabela-sus',
        ssl: process.env.DATABASE_SSL === 'true',
    }
});
