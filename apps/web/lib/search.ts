import {
  createSearchParamsCache,
  parseAsIndex,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
} from 'nuqs/server'

export const shopSearchParsers = {
  q: parseAsString.withDefault(''),
  category: parseAsString.withDefault(''),
  sortBy: parseAsStringLiteral(['createdAt', 'name', 'price']).withDefault(
    'createdAt',
  ),
  orderBy: parseAsStringLiteral(['asc', 'desc']).withDefault('desc'),
  page: parseAsIndex.withDefault(1),
  limit: parseAsInteger.withDefault(12),
}

export const shopSearchCache = createSearchParamsCache(shopSearchParsers)
