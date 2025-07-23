const fs = require('fs').promises;
const path = require('path');
const convert = require('heic-convert');

class HeicConverter {
    constructor() {
        this.supportedFormats = ['.heic', '.heif'];
        this.outputFormats = ['JPEG', 'PNG'];
    }

    async isHeicFile(filePath) {
        const ext = path.extname(filePath).toLowerCase();
        return this.supportedFormats.includes(ext);
    }

    async getFileSize(filePath) {
        const stats = await fs.stat(filePath);
        return {
            bytes: stats.size,
            mb: (stats.size / (1024 * 1024)).toFixed(2)
        };
    }

    async convertSingle(inputPath, outputPath, options = {}) {
        const {
            format = 'JPEG',
            quality = 0.85,
            validateInput = true
        } = options;

        try {
            // Validate input file
            if (validateInput && !(await this.isHeicFile(inputPath))) {
                throw new Error('Input file is not a HEIC/HEIF format');
            }

            // Check if input file exists
            await fs.access(inputPath);

            // Get original file size
            const originalSize = await this.getFileSize(inputPath);
            console.log(`Original file size: ${originalSize.mb} MB`);

            // Read and convert
            const inputBuffer = await fs.readFile(inputPath);
            
            const convertOptions = {
                buffer: inputBuffer,
                format: format
            };

            // Add quality only for JPEG
            if (format === 'JPEG') {
                convertOptions.quality = quality;
            }

            const outputBuffer = await convert(convertOptions);

            // Create output directory if it doesn't exist
            const outputDir = path.dirname(outputPath);
            await fs.mkdir(outputDir, { recursive: true });

            // Write converted file
            await fs.writeFile(outputPath, outputBuffer);

            // Get converted file size
            const convertedSize = await this.getFileSize(outputPath);
            console.log(`Converted file size: ${convertedSize.mb} MB`);

            return {
                success: true,
                inputPath,
                outputPath,
                originalSize: originalSize.mb,
                convertedSize: convertedSize.mb,
                format
            };

        } catch (error) {
            console.error(`Conversion failed for ${inputPath}:`, error.message);
            return {
                success: false,
                inputPath,
                error: error.message
            };
        }
    }

    async convertBatch(inputDir, outputDir, options = {}) {
        try {
            const files = await fs.readdir(inputDir);
            const heicFiles = files.filter(file => 
                this.supportedFormats.includes(path.extname(file).toLowerCase())
            );

            if (heicFiles.length === 0) {
                console.log('No HEIC files found in the input directory');
                return [];
            }

            console.log(`Found ${heicFiles.length} HEIC files to convert`);

            const results = [];
            for (const file of heicFiles) {
                const inputPath = path.join(inputDir, file);
                const outputName = path.basename(file, path.extname(file)) + '.jpg';
                const outputPath = path.join(outputDir, outputName);

                const result = await this.convertSingle(inputPath, outputPath, options);
                results.push(result);
            }

            return results;

        } catch (error) {
            console.error('Batch conversion failed:', error);
            throw error;
        }
    }
}

// Usage examples
const converter = new HeicConverter();

// Single file conversion
converter.convertSingle('./data/jatin.HEIC', './data/jatin.jpg', {
    quality: 0.9,
    format: 'JPEG'
}).then(result => {
    if (result.success) {
        console.log('Conversion successful:', result);
    } else {
        console.error('Conversion failed:', result.error);
    }
});

// Batch conversion
converter.convertBatch('./data', './data', {
    quality: 0.85,
    format: 'JPEG'
}).then(results => {
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;
    console.log(`Batch conversion completed: ${successful} successful, ${failed} failed`);
});
