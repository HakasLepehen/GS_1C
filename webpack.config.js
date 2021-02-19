const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

console.log(process.env.NODE_ENV);
console.log(__dirname);
const isDev = process.env.NODE_ENV === "development";
const optimization = () => {
    const config = {
        splitChunks: {
            chunks: "all"
        }
    };

    if (!isDev) {
        config.minimizer = [new OptimizeCssAssetsPlugin(), new TerserWebpackPlugin(),];
    }

    return config;
};

const cssLoaders = (extra) => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                publicPath: ""
            }
        }, {
            loader: "css-loader"
        },
    ]

    if (extra) {
        loaders.push(extra)
    }

    return loaders;
}

// const copyMap = {
//     'axios': (!isDev) ? 'axios/dist/axios.js' : 'axios/dist/axios.min.js'
// }

console.log('IsDev:', isDev);

module.exports = {
    context: path.resolve(__dirname),
    entry: path.join(__dirname, "src", "index.js"),
    output:
        {
            filename: "[name].[contenthash].js",
            path: path.resolve(__dirname, "dist")
        },

    optimization: optimization(),

    devServer: {
        port: 4200
    },

    plugins: [
        new HTMLWebpackPlugin(
            {
                title: 'Evermix',
                template: "./index.html",
                minify: {
                    collapseWhitespace: !isDev
                }
            }
        ),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(
            {filename: "[name].[contenthash].css"}
        )
        // new CopyWebpackPlugin(
        //     {from: copyMap.axios, to: '/dist/src/axios.js'},
        //     {
        //         context: path.join(__dirname, './node_modules')
        //     }
        // )
    ],
    externals: {
        "axios": {
            "amd": "axios"
        }
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders()
            }, {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.(ico|gif|png|jpg|jpeg|svg)$/,
                loader: 'file-loader',
                options: {
                    name: 'src/media/[name].[ext]',
                    publicPath: ''
                }
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'src/fonts/'
                        }
                    }
                ],
            },
        ]
    }
};
