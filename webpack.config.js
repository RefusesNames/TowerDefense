/* eslint @typescript-eslint/no-var-requires: 0 */

const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
	entry: './typescript/main.ts',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	resolve: {
		extensions: ['.ts', '.js', 'scss'],
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: ['ts-loader'],
				exclude: /node_modules/,
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
				],
			},
		],
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 9000,
	},
	devtool: 'eval-source-map',
	plugins: [
		new CopyWebpackPlugin([
			{
				from: 'html/index.html',
			},
		]),
		new MiniCssExtractPlugin({
			filename: 'style.css',
		}),
	],
};
