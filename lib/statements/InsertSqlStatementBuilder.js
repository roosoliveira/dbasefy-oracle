"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ramda_1 = require("ramda");
var InsertSqlStatementBuilder = /** @class */ (function () {
    function InsertSqlStatementBuilder(tableName, data) {
        this.$template = 'INSERT INTO %TABLE% (%FIELDS%) VALUES (%VALUES%)';
        this.$tableName = tableName;
        this.$data = data;
    }
    InsertSqlStatementBuilder.prototype.createCommandText = function () {
        var fields = Object.keys(this.$data);
        var values = fields.map(function (f) { return ':' + f; });
        return this.$template
            .replace('%TABLE%', this.$tableName)
            .replace('%FIELDS%', fields.join(', '))
            .replace('%VALUES%', values.join(', '));
    };
    InsertSqlStatementBuilder.prototype.createBinds = function () {
        var _this = this;
        var binds = Object
            .keys(this.$data)
            .map(function (f) {
            var _a;
            return (_a = {}, _a[f] = _this.$data[f], _a);
        });
        return ramda_1.mergeAll(binds);
    };
    return InsertSqlStatementBuilder;
}());
exports.default = InsertSqlStatementBuilder;
