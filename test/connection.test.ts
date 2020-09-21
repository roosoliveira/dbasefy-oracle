import { expect } from "chai"
import { DB } from "dbasefy"
import { OracleConnection, OracleSqlCommand, OracleSqlQuery } from "../src"



describe('Oracle connection', () => {

    it('session', async () => {
        DB.session(OracleConnection, async (conn: OracleConnection) => {
            const query = conn.createQuery('SELECT * FROM DUAL')
            await query.execute()
        })
    })

    it('query', async () => {
        DB.session(OracleConnection, async (conn: OracleConnection) => {
            const query = conn.createQuery('SELECT * FROM DUAL')
            const data = await query.execute()
            expect(data).to.be.an('Array')
        })
    })

    it('transaction', async () => {
        DB.session(OracleConnection, async (conn: OracleConnection) => {
            const trx = conn.createTransaction()
            try {
                const query = conn.createCommand(`UPDATE TIAGO SET TEXTO = 'test transaction' WHERE SEQ = 2`)
                await query.execute()
                await trx.commit()
            } catch (err) {
                await trx.rollback()
                throw err
            }
        })
    })
})