import OracleDB from 'oracledb'
import { SqlCommand } from 'dbasefy/lib/SQL'
import { SqlStatement } from 'dbasefy/lib/SQL/statements'

export default class OracleSqlCommand implements SqlCommand {

    commandText: string
    binds: any

    private $conn: OracleDB.Connection

    constructor(oracleConnection: OracleDB.Connection, statement: SqlStatement = null) {
        this.$conn = oracleConnection
        this.commandText = (statement || {}).commandText
        this.binds = (statement || {}).binds || {}
    }

    async execute(): Promise<void> {
        await this.$conn.execute(this.commandText, this.binds)
    }
}