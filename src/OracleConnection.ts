import { Command, Query } from 'dbasefy'
import { Connection } from 'dbasefy'
import { SqlCommand, SqlConnection, SqlQuery, Transaction } from 'dbasefy/lib/SQL'
import JsonConfig from 'dbasefy/lib/config/JsonConfig'
import OracleDB from 'oracledb'
import OracleSqlCommand from './OracleSqlCommand'
import OracleSqlQuery from './OracleSqlQuery'
import OracleTransaction from './OracleTransaction'
import { SqlStatement, SqlStatementProvider } from 'dbasefy/lib/SQL/statements'
import OracleSqlStatementProvider from './OracleSqlStatementProvider'

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

    createCommand(): Command
    createCommand(statement: SqlStatement): SqlCommand
    createCommand(statement?: any) {
        return new OracleSqlCommand(this.$conn, statement)
    }

    createQuery(): Query
    createQuery(statement: SqlStatement): SqlQuery
    createQuery(statement?: any) {
        return new OracleSqlQuery(this.$conn, statement)
    }

    createSqlStatementProvider(): SqlStatementProvider {
        return new OracleSqlStatementProvider()
    }

    async getConfig(): Promise<OracleDB.ConnectionAttributes> {
        return await new JsonConfig<OracleDB.ConnectionAttributes>().read('oracledb')
    }

}