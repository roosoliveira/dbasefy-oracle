import OracleDB from 'oracledb';
import { SqlCommand } from 'dbasefy/lib/SQL';
import { SqlStatement, Variant } from 'dbasefy/lib/SQL/statements';
export default class OracleSqlCommand implements SqlCommand {
    commandText: string;
    binds: Variant;
    private $conn;
    constructor(oracleConnection: OracleDB.Connection, statement?: SqlStatement);
    execute(): Promise<void>;
}
