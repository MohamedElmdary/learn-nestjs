import { routes } from "./factory";

export function Controller(url: string): ClassDecorator {
  url = url.toLocaleLowerCase();
  return (target: any): void => {
    if (routes[url]) throw new Error("Url Controller already exist");
    (target as any).controller = "/" + url;
    routes[url] = {
      class: new target(),
      constructor: target
    };
  };
}

export function Get(url: string = "/"): MethodDecorator {
  return (
    target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>
  ): void | TypedPropertyDescriptor<any> => {
    const handler = {
      url,
      method: propertyKey
    };
    if ((target.constructor as any).get) {
      (target.constructor as any).get.push(handler);
    } else {
      (target.constructor as any).get = [handler];
    }
    /* return {
      ...descriptor,
      value(...args: any[]) {
        return {
          mainUrl: (target.constructor as any).controller,
          url,
          handler: propertyKey
        };
      }
    }; */
  };
}

export function Req(): ParameterDecorator {
  return (
    target: any,
    propertyKey: string | symbol,
    parameterIndex: number
  ): void => {
    if (!target.constructor.parameters) {
      target.constructor.parameters = {};
    }
    if (!target.constructor.parameters[propertyKey]) {
      target.constructor.parameters[propertyKey] = [];
    }
    target.constructor.parameters[propertyKey][parameterIndex] = "req";
  };
}

export function Res(): ParameterDecorator {
  return (
    target: any,
    propertyKey: string | symbol,
    parameterIndex: number
  ): void => {
    if (!target.constructor.parameters) {
      target.constructor.parameters = {};
    }
    if (!target.constructor.parameters[propertyKey]) {
      target.constructor.parameters[propertyKey] = [];
    }
    target.constructor.parameters[propertyKey][parameterIndex] = "res";
  };
}
