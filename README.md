# DBasefy Oracle

````
npm i dbasefy-oracle -S
````

Encapsulates complexity from [oracledb](https://github.com/oracle/node-oracledb/blob/master/doc/api.md) library.

```typescript
import { OracleConnection } from 'dbasefy/lib'

async function sample(): Promise<void> {
    const conn = await new OracleConnection().open()
    const trx = conn.createTransaction()

    try {

        const query = conn.createQuery('SELECT * FROM DUAL')
        const rows = await query.execute()
        console.log(rows) // [OracleData { DUMMY: 'X'}]

        const sql = 'INSERT INTO TABLE_X (ID, VALUE) VALUES (:ID, :VALUE)'
        const cmd = conn.createCommand(sql, { ID: 1, VALUE: 'TEST' })
        await cmd.execute()
        await trx.commit()

    } catch (err) {

        await trx.rollback()
        throw err

    } finally {
        await conn.close()
    }
}

sample()
```

### Connection Config

Configurate the connection is quite simple. It's just necessary create a directory on the root of the your project with the name "config" and one file "default.json" (like follow bellow). This package uses the library [config](https://www.npmjs.com/package/config) to get configurations.

```json
// config/default.json
{
    "providers": {
        "oracledb": {
            "user": "db_user",
            "password": "db_password",
            "connectionString": "db_oracle_connection_string"
        }
    }
}
```

You can also creating a manual configuration:

```typescript
import { OracleConnection } from 'dbasefy/lib'

async function sample(): Promise<void> {
    const conn = await new OracleConnection().open({
        user: "db_user",
        password: "db_password",
        connectionString: "db_oracle_connection_string"
    })
    try {
        // your code
    } finally {
        await conn.close()
    }
}

sample()
```
