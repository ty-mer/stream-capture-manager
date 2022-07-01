const fs = require("fs");

async function main() {
	const directory = "/e/OBS-records";

	const files = fs.readdirSync(directory);

	// get today's date relative to Jan 1, 1970
	const today = Date.now();
	const todaysDate = new Date(today);
	console.log(todaysDate);

	// get 1 month ago relative to Jan 1, 1970
	const oneMonthAgo = new Date(today).setMonth(todaysDate.getMonth() - 1);
	console.log(oneMonthAgo);

	for (const fileName of files) {
		// get creation date from file name
		const dateTimeString = fileName.split(".")[0]
		const dateString = dateTimeString.split(" ")[0];

		// get created date relative to Jan 1, 1970
		const createdDate = Date.parse(dateString);

		// determine if createdDate is more than a month ago
		const isMoreThanAMonthOld = createdDate < oneMonthAgo;

		// if more than a month old, delete the file
		if (isMoreThanAMonthOld) {
			fs.unlinkSync(`${directory}/${fileName}`);
		}
	}
}

main();