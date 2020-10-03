import OracleDB from 'oracledb';
import { SqlCommand } from 'dbasefy/lib/SQL';
import { SqlStatement } from 'dbasefy/lib/SQL/statements';
export default class OracleSqlCommand implements SqlCommand {
    commandText: string;
    binds: any;
    private $conn;
    constructor(oracleConnection: OracleDB.Connection, statement?: SqlStatement);
    execute(): Promise<void>;
}
