import OracleSqlStatementBuilder from './OracleSqlStatementBuilder';
export default class SelectSqlStatementBuilder implements OracleSqlStatementBuilder {
    private $template;
    private $tableName;
    private $fields;
    constructor(tableName: string, fields: string[]);
    createCommandText(): string;
    createBinds(): any;
}
