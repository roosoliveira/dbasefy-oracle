import { mergeAll } from 'ramda'
import { SqlCondition, SqlFilter } from 'dbasefy/lib/SQL/statements'
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

    createBinds(): any {
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

        case SqlCondition.GREATER_THAN:
            return '> %BINDS%'

        case SqlCondition.LESS_THAN:
            return '< %BINDS%'

        case SqlCondition.BETWEEN:
            return 'BETWEEN %BINDS%'

        case SqlCondition.IN:
            return 'IN (%BINDS%)'

        case SqlCondition.NOT_IN:
            return 'NOT IN (%BINDS%)'
    }
}

function toExpression(filter: SqlFilter, indexFilter: number): string {
    const binds = Object.keys(toBinds(filter, indexFilter)).map(b => ':' + b)
    let bindValues = binds.join(', ')
    if (filter.condition === SqlCondition.BETWEEN) bindValues = binds.join(' AND ')
    return `${filter.expression} ${getCondition(filter.condition).replace('%BINDS%',  bindValues)}`
}

function createBindName(indexFilter: number, indexValue: number): string {
    return `FILTER_${indexFilter}_${indexValue}`
}

function toBinds(filter: SqlFilter, indexFilter: number): any {
    const binds = {}
    switch (filter.condition) {
        case SqlCondition.EQUAL:
        case SqlCondition.DIFFERENT:
        case SqlCondition.GREATER_THAN:
        case SqlCondition.LESS_THAN:
            binds[createBindName(indexFilter, 0)] = filter.value
            break

        case SqlCondition.BETWEEN:
            binds[createBindName(indexFilter, 0)] = filter.value[0]
            binds[createBindName(indexFilter, 1)] = filter.value[1]
            break

        case SqlCondition.IN:
        case SqlCondition.NOT_IN:
            filter.value.forEach((val, indexValue) => {
                binds[createBindName(indexFilter, indexValue)] = val
            })
    }
    return binds
}
//#endregion