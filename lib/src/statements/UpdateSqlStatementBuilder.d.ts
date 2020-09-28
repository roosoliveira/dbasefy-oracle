import OracleSqlStatementBuilder from './OracleSqlStatementBuilder';
export default class UpdateSqlStatementBuilder implements OracleSqlStatementBuilder {
    private $template;
    private $tableName;
    private $data;
    constructor(tableName: string, data: any);
    createCommandText(): string;
    createBinds(): any;
}
