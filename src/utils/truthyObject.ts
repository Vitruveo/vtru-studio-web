export const hasTruthyObject = (obj: any): boolean => {
    return Object.values(obj || {}).some((value) => {
        if (value && typeof value === 'object') {
            return hasTruthyObject(value);
        }
        return Boolean(value);
    });
};

interface FilterFalsyValuesProps {
    input: any;
    keysToPreserve?: string[];
}

export const filterFalsyValues = ({ input, keysToPreserve }: FilterFalsyValuesProps): any => {
    const filterObject = (obj: any) => {
        const result: any = {};
        for (const key in obj) {
            const value = obj[key];
            if (Array.isArray(value)) {
                const filteredArray = value.filter((item) => {
                    if (Array.isArray(item)) {
                        return item.filter(Boolean).length > 0;
                    }
                    return item !== null && item !== undefined && item !== false && item !== '';
                });
                if (filteredArray.length > 0) {
                    result[key] = filteredArray;
                }
            } else if (typeof value === 'object' && value !== null) {
                const filteredObject = filterObject(value);
                if (Object.keys(filteredObject).length > 0) {
                    result[key] = filteredObject;
                }
            } else if (value !== null && value !== undefined && value !== false && value !== '') {
                result[key] = value;
            }
        }
        return result;
    };

    if (keysToPreserve) {
        const result: any = {};
        for (const key of keysToPreserve) {
            if (input[key]) {
                result[key] = filterObject(input[key]);
            } else {
                result[key] = {};
            }
        }

        return result;
    }
};
