import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware'
import webpackConfig from '../webpack.config.dev';
import webpackHotMiddleware from 'webpack-hot-middleware';
import bodyParser from 'body-parser';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';


let app = express();

const compiler = webpack(webpackConfig);

app.use(webpackMiddleware(compiler, {
    hot:true,
    noInfo: true, 
    publicPath: webpackConfig.output.publicPath,
    contentBase: '/'
}));

app.use(webpackHotMiddleware(compiler));

app.use(express.static(path.resolve('server')));
app.use(bodyParser.json());

app.get('/*', (req, res, next)=>{
    res.sendFile(path.join(__dirname, './index.html'));
});

let IP = process.env.IP ? process.env.IP: 'localhost';
let port = process.env.PORT ? process.env.PORT: 3000;
app.listen( port, function(){
    console.log(`server is running on ${IP}:${port}`);
})