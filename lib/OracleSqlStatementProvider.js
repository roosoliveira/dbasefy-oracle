"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DeleteSqlStatementBuilder_1 = __importDefault(require("./statements/DeleteSqlStatementBuilder"));
var InsertSqlStatementBuilder_1 = __importDefault(require("./statements/InsertSqlStatementBuilder"));
var SelectSqlStatementBuilder_1 = __importDefault(require("./statements/SelectSqlStatementBuilder"));
var SqlStatementDirector_1 = __importDefault(require("./statements/SqlStatementDirector"));
var UpdateSqlStatementBuilder_1 = __importDefault(require("./statements/UpdateSqlStatementBuilder"));
var WhereSqlStatementBuilder_1 = __importDefault(require("./statements/WhereSqlStatementBuilder"));
var OracleSqlStatementProvider = /** @class */ (function () {
    function OracleSqlStatementProvider() {
        this.$sqlDirector = new SqlStatementDirector_1.default();
    }
    OracleSqlStatementProvider.prototype.insert = function (tableName, data) {
        return this.$sqlDirector.createSqlStatement(new InsertSqlStatementBuilder_1.default(tableName, data));
    };
    OracleSqlStatementProvider.prototype.update = function (tableName, data) {
        return this.$sqlDirector.createSqlStatement(new UpdateSqlStatementBuilder_1.default(tableName, data));
    };
    OracleSqlStatementProvider.prototype.delete = function (tableName) {
        return this.$sqlDirector.createSqlStatement(new DeleteSqlStatementBuilder_1.default(tableName));
    };
    OracleSqlStatementProvider.prototype.select = function (tableName, fields) {
        return this.$sqlDirector.createSqlStatement(new SelectSqlStatementBuilder_1.default(tableName, fields));
    };
    OracleSqlStatementProvider.prototype.where = function (filters) {
        return this.$sqlDirector.createSqlStatement(new WhereSqlStatementBuilder_1.default(filters));
    };
    return OracleSqlStatementProvider;
}());
exports.default = OracleSqlStatementProvider;
