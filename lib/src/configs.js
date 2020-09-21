"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OracleData = void 0;
var OracleData = /** @class */ (function () {
    function OracleData() {
    }
    OracleData.prototype.convertTo = function (converter) {
        return new converter().convertTo(this);
    };
    return OracleData;
}());
exports.OracleData = OracleData;
//# sourceMappingURL=configs.js.map