import fs from 'fs';

var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()+=';
var charLength = chars.length;
var length = 30;
var result = '';
for (var i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charLength));
}

const asciiStringEncoded = btoa(result);

const filePath = '.env'; // Specify the path to your file

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    // Split the content into an array based on a delimiter (newline character '\n' in this example)
    const dataArray = data.split('\n');

    // Make necessary modifications to the array
    // For example, changing the value at index 0
    if (dataArray.length > 0) {
        dataArray[0] = `APP_KEY=${asciiStringEncoded}`;
    }

    // Join the array back into a string with the same delimiter
    const updatedContent = dataArray.join('\n');

    // Write the updated content back to the file
    fs.writeFile(filePath, updatedContent, 'utf8', (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return;
        }
        console.log(`App Key: ${asciiStringEncoded}`);
    });
});