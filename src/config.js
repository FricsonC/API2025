import {config} from 'dotenv'
config()

export const BD_HOST=process.env.BD_HOST || 'mysql-fricson.alwaysdata.net'
export const BD_DATABASE=process.env.BD_DATABASE || 'fricson_base2025'
export const BD_USER=process.env.BD_USER || 'fricson_cl'
export const BD_PASSWORD=process.env.BD_PASSWORD || 'Carvajal10jhon05'
export const BD_PORT= process.env.BD_PORT || 3306
export const PORT=process.env.PORT || 10000