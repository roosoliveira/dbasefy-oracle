import OracleDB from 'oracledb';
import { Transaction } from 'dbasefy/lib/SQL';
export default class OracleTransaction implements Transaction {
    private $conn;
    constructor(conn: OracleDB.Connection);
    commit(): Promise<void>;
    rollback(): Promise<void>;
}
