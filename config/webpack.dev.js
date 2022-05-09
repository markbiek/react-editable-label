const { merge } = require('webpack-merge')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const common = require('./webpack.common.js')

module.exports = merge(common, {
	// Set the mode to development or production
	mode: 'development',

	// Control how source maps are generated
	devtool: 'source-map',

	plugins: [
		new FriendlyErrorsPlugin()
	],
})
