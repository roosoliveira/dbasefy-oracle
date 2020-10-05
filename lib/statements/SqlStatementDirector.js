"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SqlStatementDirector = /** @class */ (function () {
    function SqlStatementDirector() {
    }
    SqlStatementDirector.prototype.createSqlStatement = function (builder) {
        return {
            commandText: builder.createCommandText(),
            binds: builder.createBinds()
        };
    };
    return SqlStatementDirector;
}());
exports.default = SqlStatementDirector;
