"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("../src");
var chai_1 = require("chai");
var statements_1 = require("dbasefy/lib/SQL/statements");
var conn = new src_1.OracleConnection();
describe('Creation of SQL Statements', function () {
    it('Select Statement', function () { return __awaiter(void 0, void 0, void 0, function () {
        var select, statement;
        return __generator(this, function (_a) {
            select = new statements_1.SelectSqlStatement(conn.createSqlStatementProvider());
            statement = select
                .field('ID')
                .field('TEXT')
                .from('TEST_TABLE')
                .where.field('ID').equal(10)
                .toStatement();
            chai_1.expect(statement.commandText).to.be.equal('SELECT ID, TEXT FROM TEST_TABLE WHERE 1=1 AND ID = :FILTER_0_0');
            chai_1.expect(statement.binds).to.own.include({ FILTER_0_0: 10 });
            return [2 /*return*/];
        });
    }); });
    it('Select Statement with two filters', function () { return __awaiter(void 0, void 0, void 0, function () {
        var select, statement;
        return __generator(this, function (_a) {
            select = new statements_1.SelectSqlStatement(conn.createSqlStatementProvider());
            statement = select
                .field('ID')
                .field('TEXT')
                .from('TEST_TABLE')
                .where.field('ID').equal(10)
                .and.field('TEXT').different('Test')
                .toStatement();
            chai_1.expect(statement.commandText).to.be.equal('SELECT ID, TEXT FROM TEST_TABLE WHERE 1=1 AND ID = :FILTER_0_0 AND TEXT != :FILTER_1_0');
            chai_1.expect(statement.binds).to.own.include({ FILTER_0_0: 10, FILTER_1_0: 'Test' });
            return [2 /*return*/];
        });
    }); });
    it('Select Statement with BETWEEN condition', function () { return __awaiter(void 0, void 0, void 0, function () {
        var select, statement;
        return __generator(this, function (_a) {
            select = new statements_1.SelectSqlStatement(conn.createSqlStatementProvider());
            statement = select
                .field('TEXT')
                .from('TEST_TABLE')
                .where.field('ID').between([1, 2])
                .toStatement();
            chai_1.expect(statement.commandText).to.be.equal('SELECT TEXT FROM TEST_TABLE WHERE 1=1 AND ID BETWEEN :FILTER_0_0 AND :FILTER_0_1');
            chai_1.expect(statement.binds).to.own.include({ FILTER_0_0: 1, FILTER_0_1: 2 });
            return [2 /*return*/];
        });
    }); });
    it('Select Statement without WHERE', function () { return __awaiter(void 0, void 0, void 0, function () {
        var select, statement;
        return __generator(this, function (_a) {
            select = new statements_1.SelectSqlStatement(conn.createSqlStatementProvider());
            statement = select
                .field('ID')
                .field('TEXT')
                .from('TEST_TABLE')
                .toStatement();
            chai_1.expect(statement.commandText).to.be.equal('SELECT ID, TEXT FROM TEST_TABLE');
            return [2 /*return*/];
        });
    }); });
    it('Insert Statement', function () { return __awaiter(void 0, void 0, void 0, function () {
        var insert, statement;
        return __generator(this, function (_a) {
            insert = new statements_1.InsertSqlStatement(conn.createSqlStatementProvider());
            statement = insert
                .into('TEST_TABLE')
                .value('ID', 10)
                .value('TEXT', 'Tst')
                .toStatement();
            chai_1.expect(statement.commandText).to.be.equal('INSERT INTO TEST_TABLE (ID, TEXT) VALUES (:ID, :TEXT)');
            chai_1.expect(statement.binds).to.own.include({ ID: 10, TEXT: 'Tst' });
            return [2 /*return*/];
        });
    }); });
    it('Update Statement', function () { return __awaiter(void 0, void 0, void 0, function () {
        var update, statement;
        return __generator(this, function (_a) {
            update = new statements_1.UpdateSqlStatement(conn.createSqlStatementProvider());
            statement = update
                .on('TEST_TABLE')
                .set('TEXT', 'tst')
                .where.field('ID').equal(10)
                .toStatement();
            chai_1.expect(statement.commandText).to.be.equal('UPDATE TEST_TABLE SET TEXT = :TEXT WHERE 1=1 AND ID = :FILTER_0_0');
            chai_1.expect(statement.binds).to.own.include({ TEXT: 'tst', FILTER_0_0: 10 });
            return [2 /*return*/];
        });
    }); });
    it('Delete Statement', function () { return __awaiter(void 0, void 0, void 0, function () {
        var del, statement;
        return __generator(this, function (_a) {
            del = new statements_1.DeleteSqlStatement(conn.createSqlStatementProvider());
            statement = del
                .from('TEST_TABLE')
                .where.field('ID').equal(10)
                .toStatement();
            chai_1.expect(statement.commandText).to.be.equal('DELETE TEST_TABLE WHERE 1=1 AND ID = :FILTER_0_0');
            chai_1.expect(statement.binds).to.own.include({ FILTER_0_0: 10 });
            return [2 /*return*/];
        });
    }); });
});
//# sourceMappingURL=Statements.test.js.map