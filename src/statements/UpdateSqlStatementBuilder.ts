import { mergeAll } from 'ramda'
import OracleSqlStatementBuilder from './OracleSqlStatementBuilder'

export default class UpdateSqlStatementBuilder implements OracleSqlStatementBuilder {

    private $template = 'UPDATE %TABLE% SET %VALUES%'
    private $tableName: string
    private $data: any

    constructor(tableName: string, data: any) {
        this.$tableName = tableName
        this.$data = data
    }

    createCommandText(): string {
        const fields = Object.keys(this.$data)
        const values = fields.map(f => f + ' = :' + f)
        return this.$template
            .replace('%TABLE%', this.$tableName)
            .replace('%VALUES%', values.join(', '))
    }

    createBinds(): any {
        const binds = Object
            .keys(this.$data)
            .map(f => ({ [f]: this.$data[f] }))
        return mergeAll(binds)
    }

}
