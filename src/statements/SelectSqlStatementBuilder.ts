import OracleSqlStatementBuilder from './OracleSqlStatementBuilder'

export default class SelectSqlStatementBuilder implements OracleSqlStatementBuilder {

    private $template = 'SELECT %FIELDS% FROM %TABLE%'
    private $tableName: string
    private $fields: string[]

    constructor(tableName: string, fields: string[]) {
        this.$tableName = tableName
        this.$fields = fields
    }

    createCommandText(): string {
        return this.$template
            .replace('%FIELDS%', this.$fields.join(', '))
            .replace('%TABLE%', this.$tableName)
    }

    createBinds(): any {
        return {}
    }

}
