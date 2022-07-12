"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainEndpoint = void 0;
//import express
var express_1 = __importDefault(require("express"));
//import writeFile function
var routes_1 = require("./utilities/routes");
//create an instance of the express router object to creat new route that we will use with the app object
exports.mainEndpoint = express_1.default.Router();
//require path module
var path_1 = __importDefault(require("path"));
//import fs module
var fs_1 = __importDefault(require("fs"));
// // create the 1st endpoint
exports.mainEndpoint.get('/', function (req, res) {
    // // get the query string from url to be used
    var data = req.query;
    // // get the width and the height from 'data' object
    var filename = data.filename;
    var width = parseInt(data.width);
    var height = parseInt(data.height);
    // //  in this section I want to check if width and height provided by the user is valid numbers
    //dont give this variable a type because its already initialized according to Type Inference and to prevent my code from being verbose;
    var widthIsNaN = false; //false as default, assume the user input is correct
    var heightIsNan = false;
    // isNaNa return true if argument not a number.
    if (isNaN(width)) {
        widthIsNaN = true;
    }
    if (isNaN(height)) {
        heightIsNan = true;
    }
    // // SEND THE ERROR TO THE USER
    if (widthIsNaN && heightIsNan) {
        res.send("your input height : ( ".concat(data.height, " ) and width : ( ").concat(data.width, " ) is not a valid numbers, please insert a number"));
        //to end execution of the whole endpoint
        return;
    }
    else if (widthIsNaN) {
        res.send("your input width : ( ".concat(data.width, " ) is not a valid number, please insert a number"));
        return;
    }
    else if (heightIsNan) {
        res.send("your input height : ( ".concat(data.height, " ) is not a valid number, please insert a number"));
        return;
    }
    // // if the width or the height is less than 1 , return error to the user.
    if (width < 1 && height < 1) {
        res.send("Your entered width : ( ".concat(data.width, " ) and height : ( ").concat(data.height, " ) is less than 1 , please enter a number equal or higher than 1"));
        return;
    }
    else if (width < 1) {
        res.send("Your entered width : ( ".concat(data.width, " ) is less than 1 , please enter a number equal or higher than 1"));
        return;
    }
    else if (height < 1) {
        res.send("Your entered height : ( ".concat(data.height, " ) is less than 1 , please enter a number equal or higher than 1"));
        return;
    }
    // //  using path module, determine the path to image files inside assets folder
    var fullFolderPath = path_1.default.resolve('./assets/full'); //path to full folder
    var pathToFullImage = path_1.default.join(fullFolderPath, filename); //path to full selected image
    var thumbFolderPath = path_1.default.resolve('./assets/thumb'); //path to thumb folder
    var pathToThumbImage = path_1.default.join(thumbFolderPath, "name-".concat(filename, "-width=").concat(width, "-height=").concat(height)); //path to images inside thumb folder
    // // in this section I want to check that the filename user provide is already in the full folder.
    //thumbFolderContent is the content inside thumb folder, which is the previously processed images.
    var thumbFolderContent = [];
    // this read all the previously processed images inside thumb folder
    fs_1.default.readdirSync('assets/full').forEach(function (file) {
        // append item to thumbFolderContent array
        thumbFolderContent.push(file);
    });
    //indexOf array method returns -1 if the argument is not inside the caller array, and buy comparing with (!= -1 )we are saying that if it's in .
    //this conditional means that the input file name is not in full folder.
    if (thumbFolderContent.indexOf("".concat(filename, ".jpeg")) == -1) {
        res.send("Your input file name : ( ".concat(data.filename, " ) is not inside /assets/full folder, please insert your image first"));
        return;
    }
    // //  add these two calls inside IIFE and make it asynchronous to force readeFile to wait for the promise returned by writeFile, so  the API dos'nt read before it write's.
    (function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    //call the function to process and write new images, and add await before it to make readFile waits for it's return
                    return [4 /*yield*/, (0, routes_1.writeFile)(width, height, pathToFullImage, pathToThumbImage, thumbFolderPath, filename)];
                    case 1:
                        //call the function to process and write new images, and add await before it to make readFile waits for it's return
                        _a.sent();
                        //call the readFile function
                        (0, routes_1.readFile)(res, pathToThumbImage);
                        return [2 /*return*/];
                }
            });
        });
    })();
});
exports.default = exports.mainEndpoint;
