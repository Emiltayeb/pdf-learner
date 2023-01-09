import knex from "knex";


export const DB_CONNECTION = knex({
	client: "mysql2",
	connection: {
		host: process.env.MYSQL_HOST,
		password: process.env.MYSQL_ROOT_PASSWORD,
		user: process.env.MYSQL_USER,
		database: "sys"
	}
})