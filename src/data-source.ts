import "reflect-metadata"
import { DataSource, DataSourceOptions } from "typeorm"
import path from "path"
import "dotenv/config"



const setDataSourceConfig = (): DataSourceOptions => {
  const entitiesPath: string = path.join(__dirname, './entities/**.{js,ts}')
  const migrationsPath: string = path.join(__dirname, './migrations/**.{js,ts}')
  const nodeEnv = process.env.NODE_ENV

  if (nodeEnv === 'production') {
    return {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [entitiesPath],
      migrations: [migrationsPath],
    }
  }

  return {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(String(process.env.DB_PORT)),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    logging: true,
    synchronize: true,
    entities: [path.join(__dirname, './entities/**.{js,ts}')],
    migrations: [path.join(__dirname, './migrations/**.{js,ts}')],
  }

}


const AppDataSource = setDataSourceConfig()

export default new DataSource(AppDataSource)