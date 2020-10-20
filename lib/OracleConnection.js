"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var oracledb_1 = __importDefault(require("oracledb"));
var SQL_1 = require("dbasefy/lib/SQL");
var JsonConfig_1 = __importDefault(require("dbasefy/lib/config/JsonConfig"));
var oracledb_2 = __importDefault(require("oracledb"));
var OracleSqlCommand_1 = __importDefault(require("./OracleSqlCommand"));
var OracleSqlQuery_1 = __importDefault(require("./OracleSqlQuery"));
var OracleTransaction_1 = __importDefault(require("./OracleTransaction"));
var OracleSqlStatementProvider_1 = __importDefault(require("./OracleSqlStatementProvider"));
var OracleConnection = /** @class */ (function (_super) {
    __extends(OracleConnection, _super);
    function OracleConnection() {
        var _this = _super.call(this) || this;
        oracledb_2.default.outFormat = oracledb_2.default.OUT_FORMAT_OBJECT;
        oracledb_2.default.maxRows = 100;
        return _this;
    }
    Object.defineProperty(OracleConnection.prototype, "bindSymbol", {
        get: function () {
            return ':';
        },
        enumerable: false,
        configurable: true
    });
    OracleConnection.prototype.open = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = this;
                        _c = (_b = oracledb_2.default).getConnection;
                        _d = config;
                        if (_d) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getConfig()];
                    case 1:
                        _d = (_e.sent());
                        _e.label = 2;
                    case 2: return [4 /*yield*/, _c.apply(_b, [_d])];
                    case 3:
                        _a.$conn = _e.sent();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    OracleConnection.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.$conn.close()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    OracleConnection.prototype.createTransaction = function () {
        return new OracleTransaction_1.default(this.$conn);
    };
    OracleConnection.prototype.createCommand = function (statement) {
        return new OracleSqlCommand_1.default(this.$conn, statement);
    };
    OracleConnection.prototype.createQuery = function (statement) {
        return new OracleSqlQuery_1.default(this.$conn, statement);
    };
    OracleConnection.prototype.createSqlStatementProvider = function () {
        return new OracleSqlStatementProvider_1.default();
    };
    OracleConnection.prototype.getConfig = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new JsonConfig_1.default().read('oracledb')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    OracleConnection.getBindType = function (type) {
        return oracledb_1.default["BIND_" + type];
    };
    return OracleConnection;
}(SQL_1.SqlConnection));
exports.default = OracleConnection;
