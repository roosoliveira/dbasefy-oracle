import { SqlStatement } from "dbasefy/lib/SQL/statements";
import OracleSqlStatementBuilder from "./OracleSqlStatementBuilder";
export default class SqlStatementDirector {
    createSqlStatement(builder: OracleSqlStatementBuilder): SqlStatement;
}
