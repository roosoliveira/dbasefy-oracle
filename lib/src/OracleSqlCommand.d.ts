import OracleDB from 'oracledb';
import { Binds } from './configs';
import { SqlCommand } from 'dbasefy/lib/SQL';
export default class OracleSqlCommand implements SqlCommand {
    commandText: string;
    binds: Binds;
    private $conn;
    constructor(oracleConnection: OracleDB.Connection, commandText?: string);
    execute(): Promise<void>;
}
