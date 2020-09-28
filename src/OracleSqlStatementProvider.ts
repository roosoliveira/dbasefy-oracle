import { SqlFilter, SqlStatement, SqlStatementProvider } from 'dbasefy/lib/SQL/statements'
import DeleteSqlStatementBuilder from './statements/DeleteSqlStatementBuilder'
import InsertSqlStatementBuilder from './statements/InsertSqlStatementBuilder'
import SelectSqlStatementBuilder from './statements/SelectSqlStatementBuilder'
import SqlStatementDirector from './statements/SqlStatementDirector'
import UpdateSqlStatementBuilder from './statements/UpdateSqlStatementBuilder'
import WhereSqlStatementBuilder from './statements/WhereSqlStatementBuilder'

export default class OracleSqlStatementProvider implements SqlStatementProvider {

    private $sqlDirector: SqlStatementDirector

    constructor() {
        this.$sqlDirector = new SqlStatementDirector()
    }

    insert(tableName: string, data: any): SqlStatement {
        return this.$sqlDirector.createSqlStatement(new InsertSqlStatementBuilder(tableName, data))
    }

    update(tableName: string, data: any): SqlStatement {
        return this.$sqlDirector.createSqlStatement(new UpdateSqlStatementBuilder(tableName, data))
    }

    delete(tableName: string): SqlStatement {
        return this.$sqlDirector.createSqlStatement(new DeleteSqlStatementBuilder(tableName))
    }

    select(tableName: string, fields: string[]): SqlStatement {
        return this.$sqlDirector.createSqlStatement(new SelectSqlStatementBuilder(tableName, fields))
    }

    where(filters: SqlFilter[]): SqlStatement {
        return this.$sqlDirector.createSqlStatement(new WhereSqlStatementBuilder(filters))
    }

}