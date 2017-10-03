var path=require('path')
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var UglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false });
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = [
//front-end part
{
  context: __dirname,
  entry: {
	index : "./public/js/index.jsx"
  },
  
  output: {
    path: path.join(__dirname,'build','public'),
    filename: "scripts.min.js"
  },
  
  resolve:{
	extensions:['.jsx','.js','.css']
  },
  
  module:{
		rules: [
		  {
			test: /\.jsx$/,
			use: {
			  loader: 'babel-loader',
			  options: {
				presets: ['es2017','react']
			  }
			}
		  },
		  
		{ test: /\.css$/, loader: "style-loader!css-loader" },]
	},
  
  plugins: [
	UglifyJsPlugin,
	new HtmlWebpackPlugin({
		title: 'Test',
		hash: true,
		template: './public/index.html'		
	})
  ]
},

//back-end part
{
	context: __dirname,
	entry: "./app.js",
	target: 'node',
	node: {
	  __dirname: false,
	  __filename: false
	},

	output: {
	path: path.join(__dirname,'build'),
		filename: "app.min.js"
	},

	resolve:{
		extensions:['.js']
	},
	
	module:{
		rules: [
		  {
			test: /\.js$/,
			use: {
			  loader: 'babel-loader',
			  options: {
				presets: ['env']
			  }
			}
		  }
		]
	},

	plugins: [
		UglifyJsPlugin		
	]
}];