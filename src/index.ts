import { Controller, Get, Req, Res } from "./lib/decrators";
import { Request, Response } from "express";

@Controller("User")
class User {
  @Get()
  public mainUserPage(@Req() req: Request, @Res() res: Response) {
    // console.log("req", req, "res", res);
    res.send("[FROM mainUserPage]");
  }

  @Get("/test")
  public testUserPage(@Res() res: Response) {
    // console.log("res", res);
    res.send("[FROM testUserPage]");
  }

  @Get("/test/2")
  public test2UserPage(@Res() res: Response, @Req() req: Request) {
    // console.log("res", res);
    res.send("[FROM test2UserPage]");
  }
}
