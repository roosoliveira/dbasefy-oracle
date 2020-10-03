export default interface OracleSqlStatementBuilder {
    createCommandText(): string;
    createBinds(): any;
}
