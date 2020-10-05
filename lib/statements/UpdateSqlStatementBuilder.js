"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ramda_1 = require("ramda");
var UpdateSqlStatementBuilder = /** @class */ (function () {
    function UpdateSqlStatementBuilder(tableName, data) {
        this.$template = 'UPDATE %TABLE% SET %VALUES%';
        this.$tableName = tableName;
        this.$data = data;
    }
    UpdateSqlStatementBuilder.prototype.createCommandText = function () {
        var fields = Object.keys(this.$data);
        var values = fields.map(function (f) { return f + ' = :' + f; });
        return this.$template
            .replace('%TABLE%', this.$tableName)
            .replace('%VALUES%', values.join(', '));
    };
    UpdateSqlStatementBuilder.prototype.createBinds = function () {
        var _this = this;
        var binds = Object
            .keys(this.$data)
            .map(function (f) {
            var _a;
            return (_a = {}, _a[f] = _this.$data[f], _a);
        });
        return ramda_1.mergeAll(binds);
    };
    return UpdateSqlStatementBuilder;
}());
exports.default = UpdateSqlStatementBuilder;
