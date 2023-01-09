import { DB_CONNECTION } from "../services/db";

export const checkDbConnection = async function () {
	try {
		await DB_CONNECTION.raw("SELECT NOW()")
	} catch (error: any) {
		throw Error(`Failed to connect to db: ${error.message}`,)
	}
}