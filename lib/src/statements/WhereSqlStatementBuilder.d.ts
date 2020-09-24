import { SqlFilter, Variant } from 'dbasefy/lib/SQL/statements';
import OracleSqlStatementBuilder from './OracleSqlStatementBuilder';
export default class WhereSqlStatementBuilder implements OracleSqlStatementBuilder {
    private $template;
    private $filters;
    constructor(filters: SqlFilter[]);
    createCommandText(): string;
    createBinds(): Variant;
}
