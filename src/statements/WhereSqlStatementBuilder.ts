import { mergeAll } from 'ramda'
import { SqlCondition, SqlFilter, Variant } from 'dbasefy/lib/SQL/statements'
import OracleSqlStatementBuilder from './OracleSqlStatementBuilder'

export default class WhereSqlStatementBuilder implements OracleSqlStatementBuilder {

    private $template = 'WHERE 1=1 AND %FILTERS%'
    private $filters: SqlFilter[]

    constructor(filters: SqlFilter[]) {
        this.$filters = filters
    }

    createCommandText(): string {
        const expressions = this.$filters.map(toExpression)
        return this.$template.replace('%FILTERS%', expressions.join(' AND '))
    }

    createBinds(): Variant {
        return mergeAll(this.$filters.map(toBinds))
    }

}

//#region private methods
function getCondition(condition: SqlCondition): string {
    switch (condition) {
        case SqlCondition.EQUAL:
            return '= %BINDS%'

        case SqlCondition.DIFFERENT:
            return '!= %BINDS%'

        case SqlCondition.IN:
            return 'IN (%BINDS%)'
    }
}

function toExpression(filter: SqlFilter, indexFilter: number): string {
    const binds = Object.keys(toBinds(filter, indexFilter)).map(b => ':' + b).join(', ')
    return `${filter.expression} ${getCondition(filter.condition).replace('%BINDS%',  binds)}`
}

function createBindName(indexFilter: number, indexValue: number): string {
    return `FILTER_${indexFilter}_${indexValue}`
}

function toBinds(filter: SqlFilter, indexFilter: number): Variant {
    const binds = {}
    switch (filter.condition) {
        case SqlCondition.EQUAL:
        case SqlCondition.DIFFERENT:
            binds[createBindName(indexFilter, 0)] = filter.value
            break

        case SqlCondition.IN:
            filter.value.forEach((val, indexValue) => {
                binds[createBindName(indexFilter, indexValue)] = val
            })
    }
    return binds
}
//#endregion