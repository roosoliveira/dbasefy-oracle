import { SqlFilter, SqlStatement, SqlStatementProvider } from 'dbasefy/lib/SQL/statements';
export default class OracleSqlStatementProvider implements SqlStatementProvider {
    private $sqlDirector;
    constructor();
    insert(tableName: string, data: any): SqlStatement;
    update(tableName: string, data: any): SqlStatement;
    delete(tableName: string): SqlStatement;
    select(tableName: string, fields: string[]): SqlStatement;
    where(filters: SqlFilter[]): SqlStatement;
}
