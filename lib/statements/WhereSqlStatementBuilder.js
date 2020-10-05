"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ramda_1 = require("ramda");
var statements_1 = require("dbasefy/lib/SQL/statements");
var WhereSqlStatementBuilder = /** @class */ (function () {
    function WhereSqlStatementBuilder(filters) {
        this.$template = 'WHERE 1=1 AND %FILTERS%';
        this.$filters = filters;
    }
    WhereSqlStatementBuilder.prototype.createCommandText = function () {
        var expressions = this.$filters.map(toExpression);
        return this.$template.replace('%FILTERS%', expressions.join(' AND '));
    };
    WhereSqlStatementBuilder.prototype.createBinds = function () {
        return ramda_1.mergeAll(this.$filters.map(toBinds));
    };
    return WhereSqlStatementBuilder;
}());
exports.default = WhereSqlStatementBuilder;
//#region private methods
function getCondition(condition) {
    switch (condition) {
        case statements_1.SqlCondition.EQUAL:
            return '= %BINDS%';
        case statements_1.SqlCondition.DIFFERENT:
            return '!= %BINDS%';
        case statements_1.SqlCondition.GREATER_THAN:
            return '> %BINDS%';
        case statements_1.SqlCondition.LESS_THAN:
            return '< %BINDS%';
        case statements_1.SqlCondition.BETWEEN:
            return 'BETWEEN %BINDS%';
        case statements_1.SqlCondition.IN:
            return 'IN (%BINDS%)';
        case statements_1.SqlCondition.NOT_IN:
            return 'NOT IN (%BINDS%)';
    }
}
function toExpression(filter, indexFilter) {
    var binds = Object.keys(toBinds(filter, indexFilter)).map(function (b) { return ':' + b; });
    var bindValues = binds.join(', ');
    if (filter.condition === statements_1.SqlCondition.BETWEEN)
        bindValues = binds.join(' AND ');
    return filter.expression + " " + getCondition(filter.condition).replace('%BINDS%', bindValues);
}
function createBindName(indexFilter, indexValue) {
    return "FILTER_" + indexFilter + "_" + indexValue;
}
function toBinds(filter, indexFilter) {
    var binds = {};
    switch (filter.condition) {
        case statements_1.SqlCondition.EQUAL:
        case statements_1.SqlCondition.DIFFERENT:
        case statements_1.SqlCondition.GREATER_THAN:
        case statements_1.SqlCondition.LESS_THAN:
            binds[createBindName(indexFilter, 0)] = filter.value;
            break;
        case statements_1.SqlCondition.BETWEEN:
            binds[createBindName(indexFilter, 0)] = filter.value[0];
            binds[createBindName(indexFilter, 1)] = filter.value[1];
            break;
        case statements_1.SqlCondition.IN:
        case statements_1.SqlCondition.NOT_IN:
            filter.value.forEach(function (val, indexValue) {
                binds[createBindName(indexFilter, indexValue)] = val;
            });
    }
    return binds;
}
//#endregion
