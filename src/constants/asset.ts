export const ASSET_STORAGE_URL =
    process.env.NEXT_PUBLIC_ASSET_STORAGE_URL || 'https://vitruveo-studio-qa-assets.s3.amazonaws.com';

export const GENERAL_STORAGE_URL =
    process.env.NEXT_PUBLIC_GENERAL_STORAGE_URL || 'https://vitruveo-studio-dev-general.s3.amazonaws.com';

export const STORE_STORAGE_URL =
    process.env.NEXT_PUBLIC_STORES_STORAGE_URL || 'https://vitruveo-studio-dev-stores.s3.amazonaws.com';

export const ASSET_STORAGE_BUCKET = process.env.NEXT_PUBLIC_ASSET_STORAGE_BUCKET || 'vitruveo-studio-qa-assets';

export const NO_IMAGE_ASSET = 'https://vitruveo-studio-production-general.s3.amazonaws.com/noImage.jpg';
