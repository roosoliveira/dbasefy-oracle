import { Converter, Data } from 'dbasefy/lib/core'

export interface OracleConfig  {
    user: string
    password: string
    connectionString: string
}

export class OracleData implements Data {
    [key: string]: any

    convertTo<T>(converter: new () => Converter<T>): T {
        return new converter().convertTo(this)
    }
}