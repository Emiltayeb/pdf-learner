

// @ts-ignore
import pdfPrase from "pdf-parse";
import fs from "fs"
import path from "path";
import { appConfig } from "../config";
import debug from "debug"

const logger = debug("service:pdf-reader")

const textValidator = function (text: string) {
	return text.trim().length > 0 && !/This page intentionally left blank/gi.test(text);
}

function render_page(pageData: any, result: any) {
	return pageData.getTextContent({
		normalizeWhitespace: false,
		disableCombineTextItems: false
	})
		.then(function (textContent: any) {
			let lastY, text = '';
			const page_num = pageData.pageIndex;
			for (let item of textContent.items) {
				if (page_num < appConfig.startFromPage) {
					continue
				}
				if (lastY == item.transform[5] || !lastY) {
					text += item.str;
				}
				else {
					text += '\n' + item.str;
				}
				lastY = item.transform[5];
			}
			if (textValidator(text)) {
				result[(page_num - appConfig.startFromPage)] = text;
			}
			return text;
		})
}

export const runPDFReader = async function () {
	const result: any = {};
	try {
		logger(`Reading pdf file: ${appConfig.pdfFileName}.pdf`)
		const pathToSourcePdf = path.resolve(__dirname, `../assets/${appConfig.pdfFileName}.pdf`);
		await pdfPrase(fs.readFileSync(pathToSourcePdf), { pagerender: (pageData: any) => render_page(pageData, result) })
		logger(`Finished reading pdf file: ${appConfig.pdfFileName}.pdf`)
	} catch (error) {
		if (error instanceof Error) {
			logger(`Could not read pdf file: ${error.message}`)
			throw error
		}
	}
	return result
}

