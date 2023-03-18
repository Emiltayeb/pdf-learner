import path from "path"
import fs from "fs"
import { appConfig } from "../config"
import { runPDFReader } from "../services/pdf-reader"
import debug from "debug"

const logger = debug("controller:pdf")
export const parsePdf = async function () {
	try {
		const results = await runPDFReader()
		fs.writeFileSync(path.resolve(__dirname, `../pdf-reader-output/${appConfig.pdfFileName}.json`), JSON.stringify(results, null, 2))
		logger(`save writing pdf file: ${appConfig.pdfFileName}.json`)
	} catch (error) {

	}
}