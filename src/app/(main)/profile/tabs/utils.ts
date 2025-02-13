import { TranslateFunction } from '@/i18n/types';
import sectionsJSON from '../../consign/assetMetadata/newSections.json';

type SectionsJSONType = typeof sectionsJSON;
export type CreatorFieldInfo = SectionsJSONType['creators']['schema']['items']['properties'];
export type ProvenanceFieldInfo = SectionsJSONType['provenance']['schema']['properties'];

type FieldDetail<T> = {
    title: string;
    description: string;
    info: T;
};

export const getSectionFields = <T>({
    section,
    language,
}: {
    section: keyof SectionsJSONType;
    language: { [x: string]: string | TranslateFunction };
}) => {
    const fieldsDetails: { [key in keyof T]?: FieldDetail<T[key]> } = {};

    if (sectionsJSON[section]) {
        const properties =
            section === 'creators'
                ? sectionsJSON[section].schema.items.properties
                : sectionsJSON[section].schema.properties;

        Object.entries(properties).forEach(([key, value]) => {
            fieldsDetails[key as keyof T] = {
                title: language[`studio.consignArtwork.assetMetadata.field.${key}`] as string,
                description: language[`studio.consignArtwork.assetMetadata.field.${key}.description`] as string,
                info: value as T[keyof T],
            };
        });
    }

    return fieldsDetails;
};

export const mergeSelectOptions = ({ info }: { info?: { enum: string[]; enumNames: string[] } }) => {
    if (info) return info.enumNames.map((v, i) => ({ title: v, value: info.enum[i] }));
    return [];
};
