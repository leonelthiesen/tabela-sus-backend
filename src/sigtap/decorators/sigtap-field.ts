import { promises } from "dns";
import { throws } from "assert";

const sigtapFieldsKey = Symbol('sigtapFields')

export function SigtapField(param: string | Object): PropertyDecorator {
    return function (target: Object, key: string) {
        const designType = Reflect.getMetadata("design:type", target, key);
        const fields = Reflect.getOwnMetadata(sigtapFieldsKey, target.constructor) || [];

        let name = param;
        let propertyType;

        if (typeof param !== 'string') {
            name = param['name'];
            propertyType = param['type'];
        } else if (designType) { // design:type pode ser undefined dependendo das referência
            propertyType = designType.name;
        }

        if (!propertyType) {
            throw `Não foi possível obter o tipo da propriedade sigtap para a propriedade ${key}.`;
        }

        const field = {
            property: key,
            name: name,
            propertyType: propertyType
        }

        if (!fields.includes(field)) {
            fields.push(field);
        }

        Reflect.defineMetadata(sigtapFieldsKey, fields, target.constructor);
    };
}

export function getSigtapProperties(target: Object): string[] {
    return Reflect.getMetadata(sigtapFieldsKey, target) || [];
}

// function isFilter(): (target: object, propertyKey: string) => void {
//     return registerProperty;
//   }

//   function registerProperty(target: object, propertyKey: string): void {
//     let properties: string[] = Reflect.getMetadata(metadataKey, target);

//     if (properties) {
//       properties.push(propertyKey);
//     } else {
//       properties = [propertyKey];
//       Reflect.defineMetadata(metadataKey, properties, target);
//     }
//   }

//   function getFilteredProperties(origin: object): object {
//     const properties: string[] = Reflect.getMetadata(metadataKey, origin);
//     const result = {};
//     properties.forEach(key => result[key] = origin[key]);
//     return result;
//   }