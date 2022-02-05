import { getSigtapProperties } from "../decorators/sigtap-field";

export type LayoutField = {
    name: string;
    size: number;
    start: number;
    end: number;
    type: string;
    property?: string;
    propertyType?: string;
}

export abstract class SigtapTable {
    public static readonly fileName;

    public static getSigtapProperties(): any[] {
        return getSigtapProperties(this);
    }

    static getSyncLayout(layoutFileContent: string): LayoutField[] {
        let stringFields: String[] = layoutFileContent.split(/\r?\n/);

        // Remove a linha de título e possível linha vazia
        stringFields = stringFields.slice(1).filter(stringField => {
            return stringField !== '';
        });

        const sigtapFields = this.getSigtapProperties();

        let fields: LayoutField[] = [];

        stringFields.forEach(fieldLayoutString => {
            const fieldLayoutPart = fieldLayoutString.split(',');

            const sigtapField = sigtapFields.find(sigtapField => {
                return sigtapField.name === fieldLayoutPart[0];
            });

            if (sigtapField) {
                fields.push({
                    name: fieldLayoutPart[0],
                    size: parseInt(fieldLayoutPart[1]),
                    start: parseInt(fieldLayoutPart[2]),
                    end: parseInt(fieldLayoutPart[3]),
                    type: fieldLayoutPart[4],
                    property: sigtapField.property,
                    propertyType: sigtapField.propertyType
                });
            }
        });

        return fields;
    }
}
