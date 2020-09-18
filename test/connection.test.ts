import { expect } from "chai"
import { DB } from "dbasefy"
import { OracleConnection, OracleSqlCommand, OracleSqlQuery } from "../src"



describe('Oracle connection', () => {

    it('config manual', async () => {
        const conn = await new OracleConnection().open({ 
            user: 'kunden',
            password: 'k11desenv18',
            connectionString: '192.168.20.239:1521/DESENVV4.kunden.local'
        })
        await conn.close()
    })

    it('session', async () => {
        DB.session(OracleConnection, async conn => {
            const query = conn.createQuery() as OracleSqlQuery
            query.commandText = 'SELECT * FROM DUAL'
            await query.execute()
        })
    })

    it('query', async () => {
        DB.session(OracleConnection, async conn => {
            const query = conn.createQuery() as OracleSqlQuery
            query.commandText = 'SELECT * FROM DUAL'
            const data = await query.execute()
            expect(data).to.be.an('Array')
        })
    })

    it('transaction', async () => {
        DB.session(OracleConnection, async conn => {
            const trx = (conn as OracleConnection).createTransaction()
            try {
                const query = conn.createCommand() as OracleSqlCommand
                query.commandText = `UPDATE TIAGO SET TEXTO = 'test transaction' WHERE SEQ = 2`
                await query.execute()
                await trx.commit()
            } catch (err) {
                await trx.rollback()
                throw err
            }
        })
    })
})