import OracleDB from 'oracledb'
import { SqlQuery } from 'dbasefy/lib/SQL'
import { SqlStatement } from 'dbasefy/lib/SQL/statements'

export default class OracleSqlQuery implements SqlQuery {

    commandText: string
    binds: any

    private $conn: OracleDB.Connection

    constructor(oracleConnection: OracleDB.Connection, statement: SqlStatement = null) {
        this.$conn = oracleConnection
        this.commandText = (statement || {}).commandText
        this.binds = (statement || {}).binds || {}
    }

    async execute(): Promise<any[]> {
        const stream = this.$conn.queryStream(this.commandText, this.binds as OracleDB.BindParameters)

        return await new Promise<any[]>((resolve, reject) => {
            const result: any[] = []
            stream
                .on('data', populate(result))
                .on('error', reject)
                .on('end', endStream)


            function endStream() {
                resolve(result)
                stream.destroy()
            }

            function populate(result: any[]) {
                return (chunk: any) => {
                    result.push(chunk)
                }
            }
        })
    }
}