import { apiService } from '@/services/api';
import {
    BuidlQuery,
    Collections,
    CreateStoreArtworkParams,
    GetArtsAndArtistsParams,
    GetArtworkQuantityParams,
    Names,
    ResponseAssets,
    Subject,
    Tags,
} from './types';
import { convertHexToRGB } from '@/utils/convertColors';
import { APIResponse } from '../common/types';

export async function getArtworkTags(): Promise<Tags[]> {
    const URL_ASSETS_SEARCH = '/assets/public/search';
    const response = await apiService.post<ResponseAssets>(URL_ASSETS_SEARCH, { limit: 1 });
    return response.data?.tags || [];
}

export async function getArtworkCollections(collection: string): Promise<Collections[]> {
    const URL_ASSETS_COLLECTION = `/assets/public/collections?name=${collection}`;
    const response = await apiService.get<Collections[]>(URL_ASSETS_COLLECTION);
    return response.data || [];
}

export async function getArtworkSubject(subject: string): Promise<Subject[]> {
    const URL_ASSETS_SUBJECT = `/assets/public/subjects?name=${subject}`;
    const response = await apiService.get<Subject[]>(URL_ASSETS_SUBJECT);
    return response.data || [];
}

export async function getArtworkCreatorName(name: string): Promise<Names[]> {
    const URL_ASSETS_NAME = `/assets/public/creators?name=${name}`;
    const response = await apiService.get<Names[]>(URL_ASSETS_NAME);
    return response.data || [];
}

export async function createStoreArtwork({ id, stepName, data }: CreateStoreArtworkParams): Promise<void> {
    const URL_ASSETS = `/stores/${id}`;
    await apiService.patch(URL_ASSETS, { stepName, data });
}

export async function getArtworkQuantity({
    price,
    hasBts,
    colorPrecision,
    filters,
    storesId,
}: GetArtworkQuantityParams): Promise<number> {
    delete filters.context?.precision;
    const URL_ASSETS_SEARCH = '/assets/public/search';

    const buildFilters = {
        context: filters.context,
        taxonomy: filters.taxonomy,
        creators: filters.artists,
    };

    const wallets = filters.portfolio?.wallets;

    const buildQuery = Object.entries(buildFilters || {}).reduce<BuidlQuery>((acc, cur) => {
        const [key, value] = cur;

        Object.entries(value).forEach((item) => {
            const [keyFilter, valueFilter] = item as [string, string | string[]];

            if (!valueFilter) return;
            if (Array.isArray(valueFilter) && !valueFilter.length) return;

            if (Array.isArray(valueFilter)) {
                // @ts-expect-error return number in convertHexToRGB
                acc[`assetMetadata.${key}.formData.${keyFilter === 'arEnabled' ? 'arenabled' : keyFilter}`] = {
                    $in: keyFilter === 'colors' ? valueFilter.map((v) => convertHexToRGB(v)) : valueFilter,
                };
                return;
            }
            acc[`assetMetadata.${key}.formData.${keyFilter === 'arEnabled' ? 'arenabled' : keyFilter}`] = valueFilter;
        });

        return acc;
    }, {});

    if (wallets && wallets.length) {
        buildQuery['mintExplorer.address'] = {
            $in: wallets,
        };
    }

    const response = await apiService.post<ResponseAssets>(URL_ASSETS_SEARCH, {
        limit: 1,
        page: 1,
        query: buildQuery,
        minPrice: price?.min,
        maxPrice: price?.max,
        name: null,
        precision: colorPrecision || 0.7,
        showAdditionalAssets: false,
        hasBts,
        sort: { order: 'latest', isIncludeSold: false },
        storesId,
    });
    return response.data?.total || 0;
}

export async function getArtsAndArtists({
    price,
    hasBts,
    colorPrecision,
    filters,
    onlyInStore,
    search,
    page,
    limit,
}: GetArtsAndArtistsParams): Promise<ResponseAssets> {
    delete filters?.context?.precision;
    const URL_ASSETS_SEARCH = '/assets/public/search';

    let buildQuery: BuidlQuery = {};
    if (onlyInStore) {
        const wallets = filters?.portfolio?.wallets;
        const buildFilters = {
            context: filters?.context,
            taxonomy: filters?.taxonomy,
            creators: filters?.artists,
        };

        buildQuery = Object.entries(buildFilters || {}).reduce<BuidlQuery>((acc, cur) => {
            const [key, value] = cur;

            Object.entries(value || {}).forEach((item) => {
                const [keyFilter, valueFilter] = item as [string, string | string[]];

                if (!valueFilter) return;
                if (Array.isArray(valueFilter) && !valueFilter.length) return;

                if (Array.isArray(valueFilter)) {
                    // @ts-expect-error return number in convertHexToRGB
                    acc[`assetMetadata.${key}.formData.${keyFilter === 'arEnabled' ? 'arenabled' : keyFilter}`] = {
                        $in: keyFilter === 'colors' ? valueFilter.map((v) => convertHexToRGB(v)) : valueFilter,
                    };
                    return;
                }
                acc[`assetMetadata.${key}.formData.${keyFilter === 'arEnabled' ? 'arenabled' : keyFilter}`] =
                    valueFilter;
            });

            return acc;
        }, {});

        if (wallets && wallets.length) {
            buildQuery['mintExplorer.address'] = {
                $in: wallets,
            };
        }
    }

    const response = await apiService.post<ResponseAssets>(URL_ASSETS_SEARCH, {
        limit,
        page,
        query: buildQuery,
        minPrice: price?.min,
        maxPrice: price?.max,
        name: search,
        precision: colorPrecision || 0.7,
        showAdditionalAssets: false,
        hasBts,
        sort: { order: 'latest', isIncludeSold: false },
    });
    return response.data || { data: [], tags: [], total: 0, limit: 0, page: 0, totalPage: 0, maxPrice: 0 };
}

export async function getCreatorAvatar(id: string): Promise<string> {
    const URL_ASSETS_SEARCH = `/creators/avatar/${id}`;
    const response = await apiService.get<string>(URL_ASSETS_SEARCH);
    return response.data || '';
}
