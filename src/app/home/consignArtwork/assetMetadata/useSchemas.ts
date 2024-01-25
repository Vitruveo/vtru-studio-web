import { useI18n } from '@/app/hooks/useI18n';
import sectionsJson from './sections.json';

export const useAssetMetadataSchemas = () => {
    const { language } = useI18n();

    const langBasePath = 'studio.consignArtwork.assetMetadata.field';

    const texts = {
        artistName: language[`${langBasePath}.artistName`],
        title: language[`${langBasePath}.title`],
        description: language[`${langBasePath}.description`],
        date: language[`${langBasePath}.date`],
        place: `${langBasePath}.place`,
        objectType: language[`${langBasePath}.objectType`],
        category: language[`${langBasePath}.category`],
        medium: language[`${langBasePath}.medium`],
    } as { [key: string]: string };

    return {
        sections: sectionsJson,
    };
};
