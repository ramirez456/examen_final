module.exports = {
    type: 'mysql',
    url: 'mysql://root:ebcnemj987@localhost:3306/asistencia_ddd_nest', //process.env.BANKING_DDD_NEST_MYSQL,
    migrationsRun: true,
    logging: true,
    timezone: '+0',
    bigNumberStrings: false,
    entities: [process.env.ENVIRONMENT == 'prod' ? '**/infrastructure/persistence/typeorm/entities/*.js' : 'dist/**/infrastructure/persistence/typeorm/entities/*.js'],
    migrations: [process.env.ENVIRONMENT == 'prod' ? 'eventos/infrastructure/persistence/typeorm/migrations/*.js' : 'dist/eventos/infrastructure/persistence/typeorm/migrations/*.js'],
    cli: {
      migrationsDir: process.env.ENVIRONMENT == 'prod' ? 'eventos/infrastructure/persistence/typeorm/migrations' : 'src/eventos/infrastructure/persistence/typeorm/migrations',
    },
  };