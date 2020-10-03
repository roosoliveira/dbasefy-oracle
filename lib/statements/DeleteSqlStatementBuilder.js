"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DeleteSqlStatementBuilder = /** @class */ (function () {
    function DeleteSqlStatementBuilder(tableName) {
        this.$template = 'DELETE %TABLE%';
        this.$tableName = tableName;
    }
    DeleteSqlStatementBuilder.prototype.createCommandText = function () {
        return this.$template
            .replace('%TABLE%', this.$tableName);
    };
    DeleteSqlStatementBuilder.prototype.createBinds = function () {
        return {};
    };
    return DeleteSqlStatementBuilder;
}());
exports.default = DeleteSqlStatementBuilder;
//# sourceMappingURL=DeleteSqlStatementBuilder.js.map