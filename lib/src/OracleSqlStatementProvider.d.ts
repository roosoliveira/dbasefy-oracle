import { SqlFilter, SqlStatement, SqlStatementProvider, Variant } from 'dbasefy/lib/SQL/statements';
export default class OracleSqlStatementProvider implements SqlStatementProvider {
    private $sqlDirector;
    constructor();
    insert(tableName: string, data: Variant): SqlStatement;
    update(tableName: string, data: Variant): SqlStatement;
    delete(tableName: string): SqlStatement;
    select(tableName: string, fields: string[]): SqlStatement;
    where(filters: SqlFilter[]): SqlStatement;
}
