"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SelectSqlStatementBuilder = /** @class */ (function () {
    function SelectSqlStatementBuilder(tableName, fields) {
        this.$template = 'SELECT %FIELDS% FROM %TABLE%';
        this.$tableName = tableName;
        this.$fields = fields;
    }
    SelectSqlStatementBuilder.prototype.createCommandText = function () {
        return this.$template
            .replace('%FIELDS%', this.$fields.join(', '))
            .replace('%TABLE%', this.$tableName);
    };
    SelectSqlStatementBuilder.prototype.createBinds = function () {
        return {};
    };
    return SelectSqlStatementBuilder;
}());
exports.default = SelectSqlStatementBuilder;
