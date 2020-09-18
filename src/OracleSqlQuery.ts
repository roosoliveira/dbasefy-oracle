import OracleDB from 'oracledb'
import { SqlQuery } from 'dbasefy/lib/SQL'
import { Binds, OracleData } from './configs'

export default class OracleSqlQuery implements SqlQuery {

    commandText: string
    binds: Binds

    private $conn: OracleDB.Connection

    constructor(oracleConnection: OracleDB.Connection,commandText: string = '') {
        this.commandText = commandText
        this.$conn = oracleConnection
    }

    async execute(): Promise<OracleData[]> {
        const stream = this.$conn.queryStream(this.commandText, this.binds as OracleDB.BindParameters)

        return await new Promise<OracleData[]>((resolve, reject) => {
            const result: OracleData[] = []
            stream
                .on('data', populate(result))
                .on('error', reject)
                .on('end', endStream)


            function endStream() {
                resolve(result)
                stream.destroy()
            }

            function populate(result: OracleData[]) {
                return (chunk: any) => {
                    const item = new OracleData()
                    for(const key in chunk) item[key] = chunk[key]
                    result.push(item)
                }
            }
        })
    }
}