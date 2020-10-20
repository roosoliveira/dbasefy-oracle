import { Command, Query } from 'dbasefy';
import { Connection } from 'dbasefy';
import { SqlCommand, SqlConnection, SqlQuery, Transaction } from 'dbasefy/lib/SQL';
import OracleDB from 'oracledb';
import { SqlStatement, SqlStatementProvider } from 'dbasefy/lib/SQL/statements';
export default class OracleConnection extends SqlConnection {
    private $conn;
    get bindSymbol(): string;
    constructor();
    open(): Promise<Connection>;
    open(config: OracleDB.ConnectionAttributes): Promise<Connection>;
    close(): Promise<Connection>;
    createTransaction(): Transaction;
    createCommand(): Command;
    createCommand(statement: SqlStatement): SqlCommand;
    createQuery(): Query;
    createQuery(statement: SqlStatement): SqlQuery;
    createSqlStatementProvider(): SqlStatementProvider;
    getConfig(): Promise<OracleDB.ConnectionAttributes>;
    static getBindType(type: 'IN' | 'OUT' | 'INOUT'): number;
}
