"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const route = (0, express_2.Router)();
const dataPath = "./database/client.json";
const data = require(dataPath);
const clients = data;
function saveDataJson(data) {
    const dataString = JSON.stringify(data);
    return fs_1.default.writeFileSync(dataPath, dataString);
}
function bodyVerify(returnApi, currentId) {
    const newClient = {
        id: currentId,
        name: returnApi.name,
        age: returnApi.age,
        email: returnApi.email,
        profile: {
            type: returnApi.profile.type,
            credit: returnApi.profile.credit,
            business: returnApi.profile.business,
        },
    };
    return newClient;
}
function verifyItemBody(body) {
    if (!body) {
        return { isValid: false, message: "Corpo invalido" };
    }
    if (!body.name || typeof body.name !== "string") {
        return {
            isValid: false,
            message: "Name invalido. Campo name é obrigatório e deve receber uma string",
        };
    }
    if (!body.age || typeof body.age !== "number") {
        return {
            isValid: false,
            message: "age invalida. Campo age é obrigatório e deve receber um número",
        };
    }
    if (!body.email || typeof body.email !== "string") {
        return {
            isValid: false,
            message: "Email invalido. Campo email é obrigatório e deve receber uma string",
        };
    }
    if (!body.profile.type || typeof body.profile.type !== "string") {
        return {
            isValid: false,
            message: "Type invalido. Campo type é obrigatório e deve receber uma string",
        };
    }
    if (!body.profile.credit || typeof body.profile.credit !== "number") {
        return {
            isValid: false,
            message: "Credit invalido. Campo credit é obrigatório e deve receber um numero",
        };
    }
    if (body.profile.business === undefined ||
        typeof body.profile.credit !== "boolean") {
        return {
            isValid: false,
            message: "Business invalido. Campo business é obrigatório e deve receber um boolean",
        };
    }
    return { isValid: true, message: "" };
}
function createIdByUser(name, email) {
    const namePrefix = name.slice(0, 3).toLowerCase();
    const emailPrefix = email.slice(0, 3).toLowerCase();
    return `${namePrefix}${emailPrefix}-${Math.floor(Math.random() * 10000)}`;
}
app.use(express_1.default.json());
route.get("/listPritner", (req, res) => {
    res.json(clients);
});
route.post("/addClient", (req, res) => {
    const body = req.body;
    const validBody = verifyItemBody(body);
    if (validBody.isValid) {
        let idClient = createIdByUser(body.name, body.email);
        let client = bodyVerify(body, idClient);
        clients.push(client);
        saveDataJson(clients);
        res.json({ message: 'Cliente cadastrado com sucesso' });
    }
    else {
        res.json({ message: 'Cliente não cadastrado' });
    }
});
app.use(route);
app.listen(3000, () => "server running port 3000");
