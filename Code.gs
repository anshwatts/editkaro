function doPost(e) {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const firstSheet = activeSpreadsheet.getSheets()[0];
  const currentTimestamp = new Date();
  const submittedFormType = e.parameter.formType || "contact";

  if (submittedFormType === "newsletter") {
    firstSheet.appendRow([currentTimestamp, "VIP Newsletter", e.parameter.email, "", ""]);
  } else {
    const senderName = e.parameter.name || "";
    const senderEmail = e.parameter.email || "";
    const senderPhone = e.parameter.phone || "";
    const senderMessage = e.parameter.message || "";
    firstSheet.appendRow([currentTimestamp, senderName, senderEmail, senderPhone, senderMessage]);
  }

  const jsonResponse = JSON.stringify({ result: "success" });
  return ContentService.createTextOutput(jsonResponse).setMimeType(ContentService.MimeType.JSON);
}
