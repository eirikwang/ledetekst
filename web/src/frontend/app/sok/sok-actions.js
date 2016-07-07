export const QUERIED_TEKSTER = 'QUERIED_TEKSTER';

export const queryStatus = {
    IKKEHENTET_QUERY: 'IKKEHENTET_QUERY',
    HENTET_QUERY: 'HENTET_QUERY'
};

export function queryTekster(data) {
    return {
        type: QUERIED_TEKSTER,
        data
    };
}
