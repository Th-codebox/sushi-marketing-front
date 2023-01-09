export const state = ({
  api: process.env.NODE_ENV === 'production'
    ? 'https://api.sushifox.ru/crm'
    : 'https://test.sushifox.ru/crm',
  webApi: process.env.NODE_ENV === 'production'
    ? 'https://api.sushifox.ru/web'
    : 'https://test.sushifox.ru/web',
  storageApi: process.env.NODE_ENV === 'production'
    ? 'https://api.sushifox.ru/storage'
    : 'https://test.sushifox.ru/storage',
})
