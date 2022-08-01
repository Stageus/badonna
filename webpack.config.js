
const HtmlWebpackPlugin = require("html-webpack-plugin")

const config = {
    mode: "development",
    resolve: {
        extensions: [".js", ".jsx", ".scss", ".css", ".json", "jpg", "jpeg", "png", "gif", "svg"]
    },
    entry: {
        app: ["./src/index"]
    },
    output: {
        filename: "bundle.js",
        path: __dirname + "/public",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: "babel-loader"
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ]
            },
            {
                test: /\.(png|jpeg|gif|jpg|svg)$/,
                loader: "file-loader",
                options: {
                    name: "[path][name].[ext]"
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/public/index.html"
        })
    ],
    devServer: {
        static: {
            directory: __dirname + "/public"
        },
        port: 3000,
        historyApiFallback: {
            index:'/'
        }
    }
}

module.exports = config