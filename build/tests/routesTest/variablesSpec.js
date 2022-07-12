"use strict";
// in this file we check all the variables in our project with different tests
Object.defineProperty(exports, "__esModule", { value: true });
//import variables
var mainEndpoint_1 = require("../../routes/mainEndpoint"); //express instance
var index_1 = require("../../index");
//1) test if all the variables are initialized or not
describe('Check if the variables at index.ts is initialized or not', function () {
    it('check is (app) is defined', function () {
        expect(index_1.app).toBeDefined();
    });
    it('check if (port) is defined', function () {
        expect(index_1.port).toBeDefined();
    });
});
describe('Check if the variables at mainEndpoint.ts is initialized or not', function () {
    it('check if (mainEndpoint) is defined', function () {
        expect(mainEndpoint_1.mainEndpoint).toBeDefined();
    });
});
