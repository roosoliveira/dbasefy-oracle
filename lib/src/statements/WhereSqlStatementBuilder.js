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
        case statements_1.SqlCondition.IN:
            return 'IN (%BINDS%)';
    }
}
function toExpression(filter, indexFilter) {
    var binds = Object.keys(toBinds(filter, indexFilter)).map(function (b) { return ':' + b; }).join(', ');
    return filter.expression + " " + getCondition(filter.condition).replace('%BINDS%', binds);
}
function createBindName(indexFilter, indexValue) {
    return "FILTER_" + indexFilter + "_" + indexValue;
}
function toBinds(filter, indexFilter) {
    var binds = {};
    switch (filter.condition) {
        case statements_1.SqlCondition.EQUAL:
        case statements_1.SqlCondition.DIFFERENT:
            binds[createBindName(indexFilter, 0)] = filter.value;
            break;
        case statements_1.SqlCondition.IN:
            filter.value.forEach(function (val, indexValue) {
                binds[createBindName(indexFilter, indexValue)] = val;
            });
    }
    return binds;
}
//#endregion
//# sourceMappingURL=WhereSqlStatementBuilder.js.map