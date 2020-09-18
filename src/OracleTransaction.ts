import OracleDB from 'oracledb'
import { Transaction } from 'dbasefy/lib/SQL'

export default class OracleTransaction implements Transaction {

    private $conn: OracleDB.Connection

    constructor(conn: OracleDB.Connection) {
        this.$conn = conn
    }

    async commit(): Promise<void> {
        await this.$conn.commit()
    }

    async rollback(): Promise<void> {
        await this.$conn.rollback()
    }

}