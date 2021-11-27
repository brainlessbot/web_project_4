const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const config = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, 'src/pages/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: ''
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: path.resolve(__dirname, 'src')
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    'postcss-loader'
                ],
                include: path.resolve(__dirname, 'src')
            },
            {
                type: 'asset/resource',
                test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
                include: [
                    path.resolve(__dirname, 'src/fonts'),
                    path.resolve(__dirname, 'src/images')
                ]
            }
        ]
    },
    devtool: 'inline-source-map',
    target: ['web', 'es5'],
    stats: {
        children: true
    },
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        compress: true,
        port: 8080,
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/pages/index.html')
        }),
        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin()
    ]
};

module.exports = config;
