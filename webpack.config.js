// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = (_, { mode }) => ({
	entry: {
		main: path.join(__dirname, 'src', 'main.ts'),
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.scss'],
		fallback: {},
	},
	output: {
		filename: '[contenthash].js',
		path: path.join(__dirname, 'build'),
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							//transpileOnly: true
						},
					},
				],
				exclude: /node_modules/,
			},
			{
				test: /\.scss$/,
				use: [
					mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
					'css-loader',
					'postcss-loader',
					'sass-loader',
				],
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg|png)(\?v=.+)?$/,
				type: 'asset/resource',
			},
		],
	},
	devtool: 'nosources-source-map',
	devServer: {
		open: true,
		port: 9001,
		host: '0.0.0.0',
		historyApiFallback: true,
	},
	plugins: [
		//new NodePolyfillPlugin(),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src', 'views/index_template.html'),
			filename: 'index.html',
			chunks: ['main'],
		}),
		new MiniCssExtractPlugin({
			filename: '[contenthash].css',
		}),
	],
	optimization: {
		minimize: mode === 'production' ? true : false,
	},
});
