const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/main.js',  
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,  
                    'css-loader'  
                ],
            },
            
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css',  // имя файла с собранными стилями
        }),
    ],
    mode: 'development',  
};
