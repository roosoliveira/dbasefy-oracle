import OracleDB from 'oracledb';
import { SqlQuery } from 'dbasefy/lib/SQL';
import { OracleData } from './configs';
import { SqlStatement, Variant } from 'dbasefy/lib/SQL/statements';
export default class OracleSqlQuery implements SqlQuery {
    commandText: string;
    binds: Variant;
    private $conn;
    constructor(oracleConnection: OracleDB.Connection, statement?: SqlStatement);
    execute(): Promise<OracleData[]>;
}
