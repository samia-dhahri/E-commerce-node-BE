export const cacheKeys = {
    productsList: () => "cache:products:list",
    productById: (id) => `cache:product:${id}`
}
