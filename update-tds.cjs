"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var uuid_1 = require("uuid");
// Lê o arquivo data.json
var dataFilePath = 'src/data/data.json';
var data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
// Atualiza cada item com um novo UUID
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var updatedData = data.map(function (item) { return (__assign(__assign({}, item), { id: (0, uuid_1.v4)() // Gera um UUID para o campo id
 })); });
// Salva o arquivo atualizado
fs.writeFileSync(dataFilePath, JSON.stringify(updatedData, null, 2), 'utf-8');
console.log('IDs atualizados com sucesso!');
