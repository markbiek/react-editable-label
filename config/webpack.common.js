const paths = require('./paths')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// Doing TypeScript type checking
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

//const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = {

	// Where webpack looks to start building the bundle and include polyfill
	entry: ['whatwg-fetch', paths.src + '/EditableLabel.tsx'],

	// Where webpack outputs the assets and bundles
	output: {
		path: paths.build,
		filename: 'react-editable-label.dist.js',
		library: 'react-editable-label',
		libraryTarget: 'umd'
	},

	resolve: {
		extensions: ['.tsx', '.ts', '.jsx', '.js'],
	},

	// Customize the webpack build process
	plugins: [
		// Removes/cleans build folders and unused assets when rebuilding
		new CleanWebpackPlugin(),

		new ForkTsCheckerWebpackPlugin({
			async: false,
		}),
	],

	// Determine how modules within the project are treated
	module: {
		rules: [
			// Note: These 2 rules could likely be handled in one test: statement.
			// However, using 2seperate statements each sttament could have different options if needed

			// Use Babel to transpile JavaScript ES6+ / React files to ES5
			{
				test: /\.(jsx|js)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},

			// Use Babel to transpile TypeScript and TypeScript / React files to ES5
			{
				test: /\.(tsx|ts)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
		],
	},
}
