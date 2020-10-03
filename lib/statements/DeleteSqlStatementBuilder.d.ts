import OracleSqlStatementBuilder from './OracleSqlStatementBuilder';
export default class DeleteSqlStatementBuilder implements OracleSqlStatementBuilder {
    private $template;
    private $tableName;
    constructor(tableName: string);
    createCommandText(): string;
    createBinds(): any;
}
