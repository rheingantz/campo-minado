import express from "express";

import { Router, Request, Response } from "express";

import fs from "fs";

const app = express();
const route = Router();
const dataPath = "../database/client.json";
const data = require(dataPath);
const clients: IclientInterface[] = data;

interface Iprofile {
  type: string;
  credit: number;
  business: boolean;
}

interface IclientInterface {
  id: string;
  name: string;
  age: number;
  email: string;
  profile: Iprofile;
}

function saveDataJson(data: IclientInterface[]) {
  const dataString = JSON.stringify(data);
  return fs.writeFileSync(dataPath, dataString);
}

function bodyVerify(returnApi: any, currentId: string) {
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

function verifyItemBody(body: any): { isValid: boolean; message: string } {
  if (!body) {
    return { isValid: false, message: "Corpo invalido" };
  }

  if (!body.name || typeof body.name !== "string") {
    return {
      isValid: false,
      message:
        "Name invalido. Campo name é obrigatório e deve receber uma string",
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
      message:
        "Email invalido. Campo email é obrigatório e deve receber uma string",
    };
  }

  if (!body.profile.type || typeof body.profile.type !== "string") {
    return {
      isValid: false,
      message:
        "Type invalido. Campo type é obrigatório e deve receber uma string",
    };
  }

  if (!body.profile.credit || typeof body.profile.credit !== "number") {
    return {
      isValid: false,
      message:
        "Credit invalido. Campo credit é obrigatório e deve receber um numero",
    };
  }

  if (
    body.profile.business === undefined ||
    typeof body.profile.business !== "boolean"
  ) {
    return {
      isValid: false,
      message:
        "Business invalido. Campo business é obrigatório e deve receber um boolean",
    };
  }

  return { isValid: true, message: "" };
}

function createIdByUser(name: string, email: string): string {
  const namePrefix = name.slice(0, 3).toLowerCase();
  const emailPrefix = email.slice(0, 3).toLowerCase();
  return `${namePrefix}${emailPrefix}-${Math.floor(Math.random() * 10000)}`;
}

app.use(express.json());

route.get("/listPritner", (req: Request, res: Response) => {
  res.json(clients);
});

route.post("/addClient", (req: Request, res: Response) => {
  const body = req.body;
  console.log(body);
  const validBody = verifyItemBody(body);
  if (validBody.isValid) {
    let idClient = createIdByUser(body.name, body.email);
    let client = bodyVerify(body, idClient);
    clients.push(client);
    saveDataJson(clients);
    res.json({ message: "Cliente cadastrado com sucesso" });
  } else {
    res.json({ message: "Cliente não cadastrado" });
  }
});

app.use(route);

app.listen(3000, () => "server running port 3000");