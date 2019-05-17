export const routes: any = {};

import express, { Application, Request, Response } from "express";
const app: Application = express();

app.get("*", (req: Request, res: Response) => {
  const clearPath = req.path
    .replace(/\/+/gi, " ")
    .trim()
    .split(" ");
  const handlerObject = routes[clearPath[0]];
  const handlerClass = handlerObject.class;
  const handlerMethodUrl =
    clearPath.slice(1).length !== 0 ? "/" + clearPath.slice(1).join("/") : "/";

  const getMethods = (handlerObject.constructor.get as [
    { url: string; method: string }
  ]).filter(method => {
    return method.url === handlerMethodUrl;
  })[0];
  const params = handlerObject.constructor.parameters[getMethods.method];
  const parameters = params.map((param: string) => {
    switch (param) {
      case "req":
        return req;
      case "res":
        return res;
    }
  });

  (handlerClass[getMethods.method] as Function)(...parameters);
});

app.listen(8080, () => {
  console.log("server up & running!");
});
