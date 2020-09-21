import { Query } from 'dbasefy';
import { Connection } from 'dbasefy';
import { SqlConnection, SqlQuery, Transaction } from 'dbasefy/lib/SQL';
import { Binds } from './configs';
import OracleDB from 'oracledb';
import OracleSqlCommand from './OracleSqlCommand';
export default class OracleConnection extends SqlConnection {
    private $conn;
    get bindSymbol(): string;
    constructor();
    open(): Promise<Connection>;
    open(config: OracleDB.ConnectionAttributes): Promise<Connection>;
    close(): Promise<Connection>;
    createTransaction(): Transaction;
    createCommand(): OracleSqlCommand;
    createCommand(commandText: string): OracleSqlCommand;
    createCommand(commandText: string, binds: Binds): OracleSqlCommand;
    createQuery(): Query;
    createQuery(commandText: string): SqlQuery;
    createQuery(commandText: string, binds: Binds): SqlQuery;
    getConfig(): Promise<OracleDB.ConnectionAttributes>;
}
