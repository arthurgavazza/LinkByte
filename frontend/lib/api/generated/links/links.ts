/**
 * Generated by orval v6.31.0 🍺
 * Do not edit manually.
 * LinkByte API
 * API for the LinkByte URL shortener
 * OpenAPI spec version: 0.1.0
 */
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import type {
  InfiniteData,
  MutationFunction,
  QueryClient,
  QueryFunction,
  QueryKey,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query'
import type {
  GetLinksApiLinksGetParams,
  HTTPValidationError,
  LinkCreate,
  LinkResponse,
  LinkUpdate,
} from '.././models'
import { customInstanceFn } from '../../custom-instance'

/**
 * Create a new shortened link.
 * @summary Create Link
 */
export const createLinkApiLinksPost = (linkCreate: LinkCreate) => {
  return customInstanceFn<LinkResponse>({
    url: `/api/links/`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: linkCreate,
  })
}

export const getCreateLinkApiLinksPostMutationOptions = <
  TError = HTTPValidationError,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof createLinkApiLinksPost>>,
    TError,
    { data: LinkCreate },
    TContext
  >
}): UseMutationOptions<
  Awaited<ReturnType<typeof createLinkApiLinksPost>>,
  TError,
  { data: LinkCreate },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {}

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof createLinkApiLinksPost>>,
    { data: LinkCreate }
  > = props => {
    const { data } = props ?? {}

    return createLinkApiLinksPost(data)
  }

  return { mutationFn, ...mutationOptions }
}

export type CreateLinkApiLinksPostMutationResult = NonNullable<
  Awaited<ReturnType<typeof createLinkApiLinksPost>>
>
export type CreateLinkApiLinksPostMutationBody = LinkCreate
export type CreateLinkApiLinksPostMutationError = HTTPValidationError

/**
 * @summary Create Link
 */
export const useCreateLinkApiLinksPost = <
  TError = HTTPValidationError,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof createLinkApiLinksPost>>,
    TError,
    { data: LinkCreate },
    TContext
  >
}): UseMutationResult<
  Awaited<ReturnType<typeof createLinkApiLinksPost>>,
  TError,
  { data: LinkCreate },
  TContext
> => {
  const mutationOptions = getCreateLinkApiLinksPostMutationOptions(options)

  return useMutation(mutationOptions)
}
/**
 * Get all links, with optional user filtering.
 * @summary Get Links
 */
export const getLinksApiLinksGet = (params?: GetLinksApiLinksGetParams, signal?: AbortSignal) => {
  return customInstanceFn<LinkResponse[]>({ url: `/api/links/`, method: 'GET', params, signal })
}

export const getGetLinksApiLinksGetQueryKey = (params?: GetLinksApiLinksGetParams) => {
  return [`/api/links/`, ...(params ? [params] : [])] as const
}

export const getGetLinksApiLinksGetInfiniteQueryOptions = <
  TData = InfiniteData<Awaited<ReturnType<typeof getLinksApiLinksGet>>>,
  TError = HTTPValidationError,
>(
  params?: GetLinksApiLinksGetParams,
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<Awaited<ReturnType<typeof getLinksApiLinksGet>>, TError, TData>
    >
  }
) => {
  const { query: queryOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getGetLinksApiLinksGetQueryKey(params)

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getLinksApiLinksGet>>> = ({ signal }) =>
    getLinksApiLinksGet(params, signal)

  return {
    queryKey,
    queryFn,
    staleTime: 10000,
    retry: 3,
    ...queryOptions,
  } as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getLinksApiLinksGet>>, TError, TData> & {
    queryKey: QueryKey
  }
}

export type GetLinksApiLinksGetInfiniteQueryResult = NonNullable<
  Awaited<ReturnType<typeof getLinksApiLinksGet>>
>
export type GetLinksApiLinksGetInfiniteQueryError = HTTPValidationError

/**
 * @summary Get Links
 */
export const useGetLinksApiLinksGetInfinite = <
  TData = InfiniteData<Awaited<ReturnType<typeof getLinksApiLinksGet>>>,
  TError = HTTPValidationError,
>(
  params?: GetLinksApiLinksGetParams,
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<Awaited<ReturnType<typeof getLinksApiLinksGet>>, TError, TData>
    >
  }
): UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getGetLinksApiLinksGetInfiniteQueryOptions(params, options)

  const query = useInfiniteQuery(queryOptions) as UseInfiniteQueryResult<TData, TError> & {
    queryKey: QueryKey
  }

  query.queryKey = queryOptions.queryKey

  return query
}

/**
 * @summary Get Links
 */
export const prefetchGetLinksApiLinksGetInfinite = async <
  TData = Awaited<ReturnType<typeof getLinksApiLinksGet>>,
  TError = HTTPValidationError,
>(
  queryClient: QueryClient,
  params?: GetLinksApiLinksGetParams,
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<Awaited<ReturnType<typeof getLinksApiLinksGet>>, TError, TData>
    >
  }
): Promise<QueryClient> => {
  const queryOptions = getGetLinksApiLinksGetInfiniteQueryOptions(params, options)

  await queryClient.prefetchInfiniteQuery(queryOptions)

  return queryClient
}

export const getGetLinksApiLinksGetQueryOptions = <
  TData = Awaited<ReturnType<typeof getLinksApiLinksGet>>,
  TError = HTTPValidationError,
>(
  params?: GetLinksApiLinksGetParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getLinksApiLinksGet>>, TError, TData>>
  }
) => {
  const { query: queryOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getGetLinksApiLinksGetQueryKey(params)

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getLinksApiLinksGet>>> = ({ signal }) =>
    getLinksApiLinksGet(params, signal)

  return { queryKey, queryFn, staleTime: 10000, retry: 3, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getLinksApiLinksGet>>,
    TError,
    TData
  > & { queryKey: QueryKey }
}

export type GetLinksApiLinksGetQueryResult = NonNullable<
  Awaited<ReturnType<typeof getLinksApiLinksGet>>
>
export type GetLinksApiLinksGetQueryError = HTTPValidationError

/**
 * @summary Get Links
 */
export const useGetLinksApiLinksGet = <
  TData = Awaited<ReturnType<typeof getLinksApiLinksGet>>,
  TError = HTTPValidationError,
>(
  params?: GetLinksApiLinksGetParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getLinksApiLinksGet>>, TError, TData>>
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getGetLinksApiLinksGetQueryOptions(params, options)

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

  query.queryKey = queryOptions.queryKey

  return query
}

/**
 * @summary Get Links
 */
export const prefetchGetLinksApiLinksGet = async <
  TData = Awaited<ReturnType<typeof getLinksApiLinksGet>>,
  TError = HTTPValidationError,
>(
  queryClient: QueryClient,
  params?: GetLinksApiLinksGetParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getLinksApiLinksGet>>, TError, TData>>
  }
): Promise<QueryClient> => {
  const queryOptions = getGetLinksApiLinksGetQueryOptions(params, options)

  await queryClient.prefetchQuery(queryOptions)

  return queryClient
}

/**
 * Get link information by short code.
 * @summary Get Link
 */
export const getLinkApiLinksShortCodeGet = (shortCode: string, signal?: AbortSignal) => {
  return customInstanceFn<LinkResponse>({ url: `/api/links/${shortCode}`, method: 'GET', signal })
}

export const getGetLinkApiLinksShortCodeGetQueryKey = (shortCode: string) => {
  return [`/api/links/${shortCode}`] as const
}

export const getGetLinkApiLinksShortCodeGetInfiniteQueryOptions = <
  TData = InfiniteData<Awaited<ReturnType<typeof getLinkApiLinksShortCodeGet>>>,
  TError = HTTPValidationError,
>(
  shortCode: string,
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof getLinkApiLinksShortCodeGet>>,
        TError,
        TData
      >
    >
  }
) => {
  const { query: queryOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getGetLinkApiLinksShortCodeGetQueryKey(shortCode)

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getLinkApiLinksShortCodeGet>>> = ({
    signal,
  }) => getLinkApiLinksShortCodeGet(shortCode, signal)

  return {
    queryKey,
    queryFn,
    enabled: !!shortCode,
    staleTime: 10000,
    retry: 3,
    ...queryOptions,
  } as UseInfiniteQueryOptions<
    Awaited<ReturnType<typeof getLinkApiLinksShortCodeGet>>,
    TError,
    TData
  > & { queryKey: QueryKey }
}

export type GetLinkApiLinksShortCodeGetInfiniteQueryResult = NonNullable<
  Awaited<ReturnType<typeof getLinkApiLinksShortCodeGet>>
>
export type GetLinkApiLinksShortCodeGetInfiniteQueryError = HTTPValidationError

/**
 * @summary Get Link
 */
export const useGetLinkApiLinksShortCodeGetInfinite = <
  TData = InfiniteData<Awaited<ReturnType<typeof getLinkApiLinksShortCodeGet>>>,
  TError = HTTPValidationError,
>(
  shortCode: string,
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof getLinkApiLinksShortCodeGet>>,
        TError,
        TData
      >
    >
  }
): UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getGetLinkApiLinksShortCodeGetInfiniteQueryOptions(shortCode, options)

  const query = useInfiniteQuery(queryOptions) as UseInfiniteQueryResult<TData, TError> & {
    queryKey: QueryKey
  }

  query.queryKey = queryOptions.queryKey

  return query
}

/**
 * @summary Get Link
 */
export const prefetchGetLinkApiLinksShortCodeGetInfinite = async <
  TData = Awaited<ReturnType<typeof getLinkApiLinksShortCodeGet>>,
  TError = HTTPValidationError,
>(
  queryClient: QueryClient,
  shortCode: string,
  options?: {
    query?: Partial<
      UseInfiniteQueryOptions<
        Awaited<ReturnType<typeof getLinkApiLinksShortCodeGet>>,
        TError,
        TData
      >
    >
  }
): Promise<QueryClient> => {
  const queryOptions = getGetLinkApiLinksShortCodeGetInfiniteQueryOptions(shortCode, options)

  await queryClient.prefetchInfiniteQuery(queryOptions)

  return queryClient
}

export const getGetLinkApiLinksShortCodeGetQueryOptions = <
  TData = Awaited<ReturnType<typeof getLinkApiLinksShortCodeGet>>,
  TError = HTTPValidationError,
>(
  shortCode: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getLinkApiLinksShortCodeGet>>, TError, TData>
    >
  }
) => {
  const { query: queryOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getGetLinkApiLinksShortCodeGetQueryKey(shortCode)

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getLinkApiLinksShortCodeGet>>> = ({
    signal,
  }) => getLinkApiLinksShortCodeGet(shortCode, signal)

  return {
    queryKey,
    queryFn,
    enabled: !!shortCode,
    staleTime: 10000,
    retry: 3,
    ...queryOptions,
  } as UseQueryOptions<Awaited<ReturnType<typeof getLinkApiLinksShortCodeGet>>, TError, TData> & {
    queryKey: QueryKey
  }
}

export type GetLinkApiLinksShortCodeGetQueryResult = NonNullable<
  Awaited<ReturnType<typeof getLinkApiLinksShortCodeGet>>
>
export type GetLinkApiLinksShortCodeGetQueryError = HTTPValidationError

/**
 * @summary Get Link
 */
export const useGetLinkApiLinksShortCodeGet = <
  TData = Awaited<ReturnType<typeof getLinkApiLinksShortCodeGet>>,
  TError = HTTPValidationError,
>(
  shortCode: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getLinkApiLinksShortCodeGet>>, TError, TData>
    >
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getGetLinkApiLinksShortCodeGetQueryOptions(shortCode, options)

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

  query.queryKey = queryOptions.queryKey

  return query
}

/**
 * @summary Get Link
 */
export const prefetchGetLinkApiLinksShortCodeGet = async <
  TData = Awaited<ReturnType<typeof getLinkApiLinksShortCodeGet>>,
  TError = HTTPValidationError,
>(
  queryClient: QueryClient,
  shortCode: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getLinkApiLinksShortCodeGet>>, TError, TData>
    >
  }
): Promise<QueryClient> => {
  const queryOptions = getGetLinkApiLinksShortCodeGetQueryOptions(shortCode, options)

  await queryClient.prefetchQuery(queryOptions)

  return queryClient
}

/**
 * Update an existing link.
 * @summary Update Link
 */
export const updateLinkApiLinksLinkIdPut = (linkId: string, linkUpdate: LinkUpdate) => {
  return customInstanceFn<LinkResponse>({
    url: `/api/links/${linkId}`,
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    data: linkUpdate,
  })
}

export const getUpdateLinkApiLinksLinkIdPutMutationOptions = <
  TError = HTTPValidationError,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof updateLinkApiLinksLinkIdPut>>,
    TError,
    { linkId: string; data: LinkUpdate },
    TContext
  >
}): UseMutationOptions<
  Awaited<ReturnType<typeof updateLinkApiLinksLinkIdPut>>,
  TError,
  { linkId: string; data: LinkUpdate },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {}

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof updateLinkApiLinksLinkIdPut>>,
    { linkId: string; data: LinkUpdate }
  > = props => {
    const { linkId, data } = props ?? {}

    return updateLinkApiLinksLinkIdPut(linkId, data)
  }

  return { mutationFn, ...mutationOptions }
}

export type UpdateLinkApiLinksLinkIdPutMutationResult = NonNullable<
  Awaited<ReturnType<typeof updateLinkApiLinksLinkIdPut>>
>
export type UpdateLinkApiLinksLinkIdPutMutationBody = LinkUpdate
export type UpdateLinkApiLinksLinkIdPutMutationError = HTTPValidationError

/**
 * @summary Update Link
 */
export const useUpdateLinkApiLinksLinkIdPut = <
  TError = HTTPValidationError,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof updateLinkApiLinksLinkIdPut>>,
    TError,
    { linkId: string; data: LinkUpdate },
    TContext
  >
}): UseMutationResult<
  Awaited<ReturnType<typeof updateLinkApiLinksLinkIdPut>>,
  TError,
  { linkId: string; data: LinkUpdate },
  TContext
> => {
  const mutationOptions = getUpdateLinkApiLinksLinkIdPutMutationOptions(options)

  return useMutation(mutationOptions)
}
/**
 * Delete a link.
 * @summary Delete Link
 */
export const deleteLinkApiLinksLinkIdDelete = (linkId: string) => {
  return customInstanceFn<void>({ url: `/api/links/${linkId}`, method: 'DELETE' })
}

export const getDeleteLinkApiLinksLinkIdDeleteMutationOptions = <
  TError = HTTPValidationError,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteLinkApiLinksLinkIdDelete>>,
    TError,
    { linkId: string },
    TContext
  >
}): UseMutationOptions<
  Awaited<ReturnType<typeof deleteLinkApiLinksLinkIdDelete>>,
  TError,
  { linkId: string },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {}

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof deleteLinkApiLinksLinkIdDelete>>,
    { linkId: string }
  > = props => {
    const { linkId } = props ?? {}

    return deleteLinkApiLinksLinkIdDelete(linkId)
  }

  return { mutationFn, ...mutationOptions }
}

export type DeleteLinkApiLinksLinkIdDeleteMutationResult = NonNullable<
  Awaited<ReturnType<typeof deleteLinkApiLinksLinkIdDelete>>
>

export type DeleteLinkApiLinksLinkIdDeleteMutationError = HTTPValidationError

/**
 * @summary Delete Link
 */
export const useDeleteLinkApiLinksLinkIdDelete = <
  TError = HTTPValidationError,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteLinkApiLinksLinkIdDelete>>,
    TError,
    { linkId: string },
    TContext
  >
}): UseMutationResult<
  Awaited<ReturnType<typeof deleteLinkApiLinksLinkIdDelete>>,
  TError,
  { linkId: string },
  TContext
> => {
  const mutationOptions = getDeleteLinkApiLinksLinkIdDeleteMutationOptions(options)

  return useMutation(mutationOptions)
}
