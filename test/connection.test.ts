import { expect } from "chai"
import { DB } from "dbasefy"
import { SelectSqlStatement } from "dbasefy/lib/SQL/statements"
import { OracleConnection, OracleSqlCommand, OracleSqlQuery } from "../src"



describe('Oracle connection', function() {

    this.timeout(0)

    it('session', async () => {
        DB.session(OracleConnection, async (conn: OracleConnection) => {
            const query = conn.createQuery({ commandText: 'SELECT * FROM DUAL'})
            await query.execute()
        })
    })

    it('query', async () => {
        DB.session(OracleConnection, async (conn: OracleConnection) => {
            const query = conn.createQuery({ commandText: 'SELECT * FROM DUAL' })
            const data = await query.execute()
            expect(data).to.be.an('Array')
        })
    })

    it('transaction', async () => {
        DB.session(OracleConnection, async (conn: OracleConnection) => {
            const trx = conn.createTransaction()
            try {
                const query = conn.createCommand({ commandText: `UPDATE TIAGO SET TEXTO = 'test transaction' WHERE SEQ = 2` })
                await query.execute()
                await trx.commit()
            } catch (err) {
                await trx.rollback()
                throw err
            }
        })
    })

    it('query with SelectSqlStatement', async () => {
        await DB.session(OracleConnection, async (conn: OracleConnection) => {
            const select = new SelectSqlStatement(conn.createSqlStatementProvider())
            const query = conn.createQuery(select.field('*').from('DUAL').toStatement())
            const data = await query.execute()
            expect(data).to.be.an('Array').length(1)
            return data
        })
    })
})