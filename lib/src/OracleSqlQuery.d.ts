import OracleDB from 'oracledb';
import { SqlQuery } from 'dbasefy/lib/SQL';
import { Binds, OracleData } from './configs';
export default class OracleSqlQuery implements SqlQuery {
    commandText: string;
    binds: Binds;
    private $conn;
    constructor(oracleConnection: OracleDB.Connection, commandText?: string);
    execute(): Promise<OracleData[]>;
}
