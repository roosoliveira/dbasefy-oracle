import { Variant } from 'dbasefy/lib/SQL/statements';
import OracleSqlStatementBuilder from './OracleSqlStatementBuilder';
export default class InsertSqlStatementBuilder implements OracleSqlStatementBuilder {
    private $template;
    private $tableName;
    private $data;
    constructor(tableName: string, data: Variant);
    createCommandText(): string;
    createBinds(): Variant;
}
