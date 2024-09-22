import fs from 'fs';
import path from 'path';
import xml2js from 'xml2js';

// Folder containing SVG files
const folderPath = '/Users/mohitmongia/Desktop/testsvgs/lucide/icons'; // Replace with your actual folder path
const outputFile = './output.json'; // Output JSON file to store the results

// Function to parse SVG content and extract viewBox, path, and circle information
const parseSVGToJson = (svgContent) => {
  return new Promise((resolve, reject) => {
    const parser = new xml2js.Parser();
    parser.parseString(svgContent, (err, result) => {
      if (err) {
        return reject(err);
      }

      // Extract viewBox and paths from the SVG content
      const svgElement = result.svg;
      const viewBox = svgElement.$?.viewBox || '';
      
      // Extract path elements
      const pathElements = svgElement.path || [];
      const paths = pathElements.map((p) => p.$.d); // Extract 'd' attribute from <path>

      // Extract circle elements
      const circleElements = svgElement.circle || [];
      const circles = circleElements.map((c) => ({
        cx: c.$.cx,
        cy: c.$.cy,
        r: c.$.r,
      }));

      // Resolve with viewBox, path, and circle information
      resolve({ viewBox, path: paths, circles });
    });
  });
};

// Read the SVG files from the folder
const convertSVGFilesToJson = async () => {
  const jsonData = {};
  try {
    const files = fs.readdirSync(folderPath);

    for (const file of files) {
      if (path.extname(file) === '.svg') {
        const filePath = path.join(folderPath, file);
        const svgContent = fs.readFileSync(filePath, 'utf8');
        const svgJson = await parseSVGToJson(svgContent);
        
        // Add file data to JSON output, using the file name (without extension) as the key
        const fileNameWithoutExt = path.basename(file, '.svg');
        jsonData[fileNameWithoutExt] = svgJson;
      }
    }

    // Write the final JSON data to the output file
    fs.writeFileSync(outputFile, JSON.stringify(jsonData, null, 2));
    console.log(`JSON data from SVG files has been written to ${outputFile}`);
  } catch (error) {
    console.error('Error processing SVG files:', error);
  }
};

convertSVGFilesToJson();
