const paths = require('./paths')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
	mode: 'production',
	devtool: false,

	output: {
		path: paths.build,
		filename: 'react-editable-label.dist.js',
	},

	// Production: Magic happen here transpiling to es5 to partly support older browser like IE11
	target: ['web', 'es5'],

	performance: {
		hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000,
	},
})
