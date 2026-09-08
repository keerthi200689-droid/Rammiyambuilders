/**
 * Google Apps Script to receive form submissions and append to Google Sheet.
 *
 * Steps to use:
 * 1. Create a Google Sheet and note its ID (from the URL:https://1drv.ms/x/c/5984F63E3D08A1C4/IQA0X8Xwt7QiQqUXtPDiLWGtATAFpwx4co2HCw4ksrYnH0w?e=D5Zc1f&nav=MTVfezAwMDAwMDAwLTAwMDEtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMH0 <SPREADSHEET_ID>/edit)
 * 2. In the Script Editor (Extensions > Apps Script), create a new project and paste this code.
 * 3. Replace SPREADSHEET_ID with your sheet ID and SHEET_NAME with the target sheet name (e.g., 'Sheet1' or 'Enquiries').
 * 4. Save and Deploy > New deployment > Select "Web app". Set "Who has access" to "Anyone" or "Anyone, even anonymous".
 * 5. Copy the Web app URL and paste it into script.js as GOOGLE_SHEET_ENDPOINT.
 */

const SPREADSHEET_ID = 'REPLACE_WITH_YOUR_SPREADSHEET_ID';
const SHEET_NAME = 'Sheet1';

function doPost(e) {
  try {
	const contents = e.postData && e.postData.contents ? JSON.parse(e.postData.contents) : {};

	const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
	const sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];

	const timestamp = new Date();
	const row = [
	  timestamp,
	  contents.name || '',
	  contents.phone || '',
	  contents.email || '',
	  contents.interest || '',
	  contents.message || ''
	];

	sheet.appendRow(row);

	const output = ContentService.createTextOutput(JSON.stringify({ status: 'success' }));
	output.setMimeType(ContentService.MimeType.JSON);
	return output;

  } catch (err) {
	const output = ContentService.createTextOutput(JSON.stringify({ status: 'error', message: err.message }));
	output.setMimeType(ContentService.MimeType.JSON);
	return output;
  }
}
