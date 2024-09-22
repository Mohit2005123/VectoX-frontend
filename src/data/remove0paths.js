import fs from 'fs';

// Step 1: Read the JSON file
const inputFile = 'output.json';
const outputFile = 'newoutput.json';

// Read the JSON file asynchronously
fs.readFile(inputFile, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading the file: ${err}`);
    return;
  }

  // Step 2: Parse the JSON data
  const jsonData = JSON.parse(data);

  // Function to filter icons with non-empty paths
  const filterIconsWithPath = (jsonData) => {
    const result = {};
    for (const key in jsonData) {
      if (jsonData[key].path.length > 0) {
        result[key] = jsonData[key];
      }
    }
    return result;
  };

  // Filter the data
  const filteredData = filterIconsWithPath(jsonData);

  // Step 3: Write the filtered data to a new file
  fs.writeFile(outputFile, JSON.stringify(filteredData, null, 2), (err) => {
    if (err) {
      console.error(`Error writing the file: ${err}`);
    } else {
      console.log(`Filtered data has been written to ${outputFile}`);
    }
  });
});
