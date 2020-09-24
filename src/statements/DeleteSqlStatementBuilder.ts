import { Variant } from 'dbasefy/lib/SQL/statements'
import OracleSqlStatementBuilder from './OracleSqlStatementBuilder'

export default class DeleteSqlStatementBuilder implements OracleSqlStatementBuilder {

    private $template = 'DELETE %TABLE%'
    private $tableName: string

    constructor(tableName: string) {
        this.$tableName = tableName
    }

    createCommandText(): string {
        return this.$template
            .replace('%TABLE%', this.$tableName)
    }

    createBinds(): Variant {
        return {}
    }

}
