import OracleDB from 'oracledb';
import { SqlQuery } from 'dbasefy/lib/SQL';
import { SqlStatement } from 'dbasefy/lib/SQL/statements';
export default class OracleSqlQuery implements SqlQuery {
    commandText: string;
    binds: any;
    private $conn;
    constructor(oracleConnection: OracleDB.Connection, statement?: SqlStatement);
    execute(): Promise<any[]>;
}
