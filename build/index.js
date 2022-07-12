"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.port = exports.app = void 0;
//require express to build a server
var express_1 = __importDefault(require("express"));
//import external middleware
var mainEndpoint_1 = __importDefault(require("./routes/mainEndpoint"));
//create an instance of the app object
exports.app = (0, express_1.default)();
exports.app.get('/', function (req, res) {
    res.send('this is the main page from another route!');
});
exports.app.use('/image', mainEndpoint_1.default);
//port number for server
//dont give this variable a type because its already initialized according to (Type Inference) and to prevent my code from being verbose
exports.port = 3000;
//function for checking the server status
var server = function () {
    console.log("the server is running on port ".concat(exports.port));
};
exports.server = server;
//listen to the port defined
exports.app.listen(exports.port, exports.server);
exports.default = exports.app;
