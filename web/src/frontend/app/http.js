function fetchParse(fn) {
    return (resp) => new Promise((resolve, reject) => {
        fn(resp).then((value) => {
            resolve([resp, value]);
        }).catch((error) => {
            reject(error);
            throw new Error(error);
        });
    });
}

export const toJson = fetchParse((r) => r.json());
export const toText = fetchParse((r) => r.text());

export default {
    get: (...args) => fetch(...args)
};
