import OracleDB from 'oracledb'
import { Binds } from './configs'
import { SqlCommand } from 'dbasefy/lib/SQL'

export default class OracleSqlCommand implements SqlCommand {

    commandText: string
    binds: Binds

    private $conn: OracleDB.Connection

    constructor(oracleConnection: OracleDB.Connection, commandText: string = '') {
        this.commandText = commandText
        this.$conn = oracleConnection
        this.binds = {}
    }

    async execute(): Promise<void> {
        await this.$conn.execute(this.commandText, this.binds)
    }
}