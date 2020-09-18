import { Query } from 'dbasefy'
import { Connection } from 'dbasefy'
import { SqlConnection, SqlQuery, Transaction } from 'dbasefy/lib/SQL'
import { Binds } from './configs'
import JsonConfig from 'dbasefy/lib/config/JsonConfig'
import OracleDB from 'oracledb'
import OracleSqlCommand from './OracleSqlCommand'
import OracleSqlQuery from './OracleSqlQuery'
import OracleTransaction from './OracleTransaction'

export default class OracleConnection extends SqlConnection {

    private $conn: OracleDB.Connection

    get bindSymbol(): string {
        return ':'
    }

    constructor() {
        super()
        OracleDB.outFormat = OracleDB.OUT_FORMAT_OBJECT
        OracleDB.maxRows = 100
    }

    async open(): Promise<Connection> 
    async open(config: OracleDB.ConnectionAttributes): Promise<Connection> 
    async open(config?: OracleDB.ConnectionAttributes): Promise<Connection> {
        this.$conn = await OracleDB.getConnection(config || await this.getConfig())
        return this
    }

    async close(): Promise<Connection> {
        await this.$conn.close()
        return this
    }

    createTransaction(): Transaction {
        return new OracleTransaction(this.$conn)
    }

    createCommand(): OracleSqlCommand 
    createCommand(commandText: string): OracleSqlCommand
    createCommand(commandText: string, binds: Binds): OracleSqlCommand
    createCommand(commandText?: string, binds?: Binds): OracleSqlCommand {
        const cmd = new OracleSqlCommand(this.$conn, commandText)
        cmd.binds = binds || {}
        return cmd
    }

    createQuery(): Query
    createQuery(commandText: string): SqlQuery
    createQuery(commandText: string, binds: Binds): SqlQuery
    createQuery(commandText?: string, binds?: Binds): SqlQuery {
        const qry = new OracleSqlQuery(this.$conn, commandText)
        qry.binds = binds || {}
        return qry
    }

    async getConfig(): Promise<OracleDB.ConnectionAttributes> {
        return await new JsonConfig<OracleDB.ConnectionAttributes>().read('oracledb')
    }

}