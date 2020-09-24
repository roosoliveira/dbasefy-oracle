import { Variant } from "dbasefy/lib/SQL/statements";

export default interface OracleSqlStatementBuilder {
    createCommandText(): string
    createBinds(): Variant
}