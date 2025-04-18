/**
 * Generated by orval v6.31.0 🍺
 * Do not edit manually.
 * LinkByte API
 * API for the LinkByte URL shortener
 * OpenAPI spec version: 0.1.0
 */
import {
  useInfiniteQuery,
  useQuery
} from '@tanstack/react-query'
import type {
  InfiniteData,
  QueryClient,
  QueryFunction,
  QueryKey,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query'
import type {
  ClickStats,
  GeoStats,
  GetLinkClicksApiAnalyticsLinksLinkIdClicksGetParams,
  GetLinkGeoStatsApiAnalyticsLinksLinkIdGeoGetParams,
  GetLinkReferrersApiAnalyticsLinksLinkIdReferrersGetParams,
  GetUserSummaryApiAnalyticsUserUserIdSummaryGet200,
  HTTPValidationError,
  ReferrerStats
} from '.././models'
import { customInstanceFn } from '../../custom-instance';



/**
 * Get click statistics for a specific link.
 * @summary Get Link Clicks
 */
export const getLinkClicksApiAnalyticsLinksLinkIdClicksGet = (
    linkId: string,
    params?: GetLinkClicksApiAnalyticsLinksLinkIdClicksGetParams,
 signal?: AbortSignal
) => {
      
      
      return customInstanceFn<ClickStats>(
      {url: `/api/analytics/links/${linkId}/clicks`, method: 'GET',
        params, signal
    },
      );
    }
  

export const getGetLinkClicksApiAnalyticsLinksLinkIdClicksGetQueryKey = (linkId: string,
    params?: GetLinkClicksApiAnalyticsLinksLinkIdClicksGetParams,) => {
    return [`/api/analytics/links/${linkId}/clicks`, ...(params ? [params]: [])] as const;
    }

    
export const getGetLinkClicksApiAnalyticsLinksLinkIdClicksGetInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getLinkClicksApiAnalyticsLinksLinkIdClicksGet>>>, TError = HTTPValidationError>(linkId: string,
    params?: GetLinkClicksApiAnalyticsLinksLinkIdClicksGetParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getLinkClicksApiAnalyticsLinksLinkIdClicksGet>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetLinkClicksApiAnalyticsLinksLinkIdClicksGetQueryKey(linkId,params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getLinkClicksApiAnalyticsLinksLinkIdClicksGet>>> = ({ signal }) => getLinkClicksApiAnalyticsLinksLinkIdClicksGet(linkId,params, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(linkId),  staleTime: 10000, retry: 3,  ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getLinkClicksApiAnalyticsLinksLinkIdClicksGet>>, TError, TData> & { queryKey: QueryKey }
}

export type GetLinkClicksApiAnalyticsLinksLinkIdClicksGetInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getLinkClicksApiAnalyticsLinksLinkIdClicksGet>>>
export type GetLinkClicksApiAnalyticsLinksLinkIdClicksGetInfiniteQueryError = HTTPValidationError

/**
 * @summary Get Link Clicks
 */
export const useGetLinkClicksApiAnalyticsLinksLinkIdClicksGetInfinite = <TData = InfiniteData<Awaited<ReturnType<typeof getLinkClicksApiAnalyticsLinksLinkIdClicksGet>>>, TError = HTTPValidationError>(
 linkId: string,
    params?: GetLinkClicksApiAnalyticsLinksLinkIdClicksGetParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getLinkClicksApiAnalyticsLinksLinkIdClicksGet>>, TError, TData>>, }

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetLinkClicksApiAnalyticsLinksLinkIdClicksGetInfiniteQueryOptions(linkId,params,options)

  const query = useInfiniteQuery(queryOptions) as  UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}

/**
 * @summary Get Link Clicks
 */
export const prefetchGetLinkClicksApiAnalyticsLinksLinkIdClicksGetInfinite = async <TData = Awaited<ReturnType<typeof getLinkClicksApiAnalyticsLinksLinkIdClicksGet>>, TError = HTTPValidationError>(
 queryClient: QueryClient, linkId: string,
    params?: GetLinkClicksApiAnalyticsLinksLinkIdClicksGetParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getLinkClicksApiAnalyticsLinksLinkIdClicksGet>>, TError, TData>>, }

  ): Promise<QueryClient> => {

  const queryOptions = getGetLinkClicksApiAnalyticsLinksLinkIdClicksGetInfiniteQueryOptions(linkId,params,options)

  await queryClient.prefetchInfiniteQuery(queryOptions);

  return queryClient;
}


export const getGetLinkClicksApiAnalyticsLinksLinkIdClicksGetQueryOptions = <TData = Awaited<ReturnType<typeof getLinkClicksApiAnalyticsLinksLinkIdClicksGet>>, TError = HTTPValidationError>(linkId: string,
    params?: GetLinkClicksApiAnalyticsLinksLinkIdClicksGetParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getLinkClicksApiAnalyticsLinksLinkIdClicksGet>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetLinkClicksApiAnalyticsLinksLinkIdClicksGetQueryKey(linkId,params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getLinkClicksApiAnalyticsLinksLinkIdClicksGet>>> = ({ signal }) => getLinkClicksApiAnalyticsLinksLinkIdClicksGet(linkId,params, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(linkId),  staleTime: 10000, retry: 3,  ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getLinkClicksApiAnalyticsLinksLinkIdClicksGet>>, TError, TData> & { queryKey: QueryKey }
}

export type GetLinkClicksApiAnalyticsLinksLinkIdClicksGetQueryResult = NonNullable<Awaited<ReturnType<typeof getLinkClicksApiAnalyticsLinksLinkIdClicksGet>>>
export type GetLinkClicksApiAnalyticsLinksLinkIdClicksGetQueryError = HTTPValidationError

/**
 * @summary Get Link Clicks
 */
export const useGetLinkClicksApiAnalyticsLinksLinkIdClicksGet = <TData = Awaited<ReturnType<typeof getLinkClicksApiAnalyticsLinksLinkIdClicksGet>>, TError = HTTPValidationError>(
 linkId: string,
    params?: GetLinkClicksApiAnalyticsLinksLinkIdClicksGetParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getLinkClicksApiAnalyticsLinksLinkIdClicksGet>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetLinkClicksApiAnalyticsLinksLinkIdClicksGetQueryOptions(linkId,params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}

/**
 * @summary Get Link Clicks
 */
export const prefetchGetLinkClicksApiAnalyticsLinksLinkIdClicksGet = async <TData = Awaited<ReturnType<typeof getLinkClicksApiAnalyticsLinksLinkIdClicksGet>>, TError = HTTPValidationError>(
 queryClient: QueryClient, linkId: string,
    params?: GetLinkClicksApiAnalyticsLinksLinkIdClicksGetParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getLinkClicksApiAnalyticsLinksLinkIdClicksGet>>, TError, TData>>, }

  ): Promise<QueryClient> => {

  const queryOptions = getGetLinkClicksApiAnalyticsLinksLinkIdClicksGetQueryOptions(linkId,params,options)

  await queryClient.prefetchQuery(queryOptions);

  return queryClient;
}


/**
 * Get geographic statistics for a specific link.
 * @summary Get Link Geo Stats
 */
export const getLinkGeoStatsApiAnalyticsLinksLinkIdGeoGet = (
    linkId: string,
    params?: GetLinkGeoStatsApiAnalyticsLinksLinkIdGeoGetParams,
 signal?: AbortSignal
) => {
      
      
      return customInstanceFn<GeoStats>(
      {url: `/api/analytics/links/${linkId}/geo`, method: 'GET',
        params, signal
    },
      );
    }
  

export const getGetLinkGeoStatsApiAnalyticsLinksLinkIdGeoGetQueryKey = (linkId: string,
    params?: GetLinkGeoStatsApiAnalyticsLinksLinkIdGeoGetParams,) => {
    return [`/api/analytics/links/${linkId}/geo`, ...(params ? [params]: [])] as const;
    }

    
export const getGetLinkGeoStatsApiAnalyticsLinksLinkIdGeoGetInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getLinkGeoStatsApiAnalyticsLinksLinkIdGeoGet>>>, TError = HTTPValidationError>(linkId: string,
    params?: GetLinkGeoStatsApiAnalyticsLinksLinkIdGeoGetParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getLinkGeoStatsApiAnalyticsLinksLinkIdGeoGet>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetLinkGeoStatsApiAnalyticsLinksLinkIdGeoGetQueryKey(linkId,params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getLinkGeoStatsApiAnalyticsLinksLinkIdGeoGet>>> = ({ signal }) => getLinkGeoStatsApiAnalyticsLinksLinkIdGeoGet(linkId,params, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(linkId),  staleTime: 10000, retry: 3,  ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getLinkGeoStatsApiAnalyticsLinksLinkIdGeoGet>>, TError, TData> & { queryKey: QueryKey }
}

export type GetLinkGeoStatsApiAnalyticsLinksLinkIdGeoGetInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getLinkGeoStatsApiAnalyticsLinksLinkIdGeoGet>>>
export type GetLinkGeoStatsApiAnalyticsLinksLinkIdGeoGetInfiniteQueryError = HTTPValidationError

/**
 * @summary Get Link Geo Stats
 */
export const useGetLinkGeoStatsApiAnalyticsLinksLinkIdGeoGetInfinite = <TData = InfiniteData<Awaited<ReturnType<typeof getLinkGeoStatsApiAnalyticsLinksLinkIdGeoGet>>>, TError = HTTPValidationError>(
 linkId: string,
    params?: GetLinkGeoStatsApiAnalyticsLinksLinkIdGeoGetParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getLinkGeoStatsApiAnalyticsLinksLinkIdGeoGet>>, TError, TData>>, }

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetLinkGeoStatsApiAnalyticsLinksLinkIdGeoGetInfiniteQueryOptions(linkId,params,options)

  const query = useInfiniteQuery(queryOptions) as  UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}

/**
 * @summary Get Link Geo Stats
 */
export const prefetchGetLinkGeoStatsApiAnalyticsLinksLinkIdGeoGetInfinite = async <TData = Awaited<ReturnType<typeof getLinkGeoStatsApiAnalyticsLinksLinkIdGeoGet>>, TError = HTTPValidationError>(
 queryClient: QueryClient, linkId: string,
    params?: GetLinkGeoStatsApiAnalyticsLinksLinkIdGeoGetParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getLinkGeoStatsApiAnalyticsLinksLinkIdGeoGet>>, TError, TData>>, }

  ): Promise<QueryClient> => {

  const queryOptions = getGetLinkGeoStatsApiAnalyticsLinksLinkIdGeoGetInfiniteQueryOptions(linkId,params,options)

  await queryClient.prefetchInfiniteQuery(queryOptions);

  return queryClient;
}


export const getGetLinkGeoStatsApiAnalyticsLinksLinkIdGeoGetQueryOptions = <TData = Awaited<ReturnType<typeof getLinkGeoStatsApiAnalyticsLinksLinkIdGeoGet>>, TError = HTTPValidationError>(linkId: string,
    params?: GetLinkGeoStatsApiAnalyticsLinksLinkIdGeoGetParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getLinkGeoStatsApiAnalyticsLinksLinkIdGeoGet>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetLinkGeoStatsApiAnalyticsLinksLinkIdGeoGetQueryKey(linkId,params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getLinkGeoStatsApiAnalyticsLinksLinkIdGeoGet>>> = ({ signal }) => getLinkGeoStatsApiAnalyticsLinksLinkIdGeoGet(linkId,params, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(linkId),  staleTime: 10000, retry: 3,  ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getLinkGeoStatsApiAnalyticsLinksLinkIdGeoGet>>, TError, TData> & { queryKey: QueryKey }
}

export type GetLinkGeoStatsApiAnalyticsLinksLinkIdGeoGetQueryResult = NonNullable<Awaited<ReturnType<typeof getLinkGeoStatsApiAnalyticsLinksLinkIdGeoGet>>>
export type GetLinkGeoStatsApiAnalyticsLinksLinkIdGeoGetQueryError = HTTPValidationError

/**
 * @summary Get Link Geo Stats
 */
export const useGetLinkGeoStatsApiAnalyticsLinksLinkIdGeoGet = <TData = Awaited<ReturnType<typeof getLinkGeoStatsApiAnalyticsLinksLinkIdGeoGet>>, TError = HTTPValidationError>(
 linkId: string,
    params?: GetLinkGeoStatsApiAnalyticsLinksLinkIdGeoGetParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getLinkGeoStatsApiAnalyticsLinksLinkIdGeoGet>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetLinkGeoStatsApiAnalyticsLinksLinkIdGeoGetQueryOptions(linkId,params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}

/**
 * @summary Get Link Geo Stats
 */
export const prefetchGetLinkGeoStatsApiAnalyticsLinksLinkIdGeoGet = async <TData = Awaited<ReturnType<typeof getLinkGeoStatsApiAnalyticsLinksLinkIdGeoGet>>, TError = HTTPValidationError>(
 queryClient: QueryClient, linkId: string,
    params?: GetLinkGeoStatsApiAnalyticsLinksLinkIdGeoGetParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getLinkGeoStatsApiAnalyticsLinksLinkIdGeoGet>>, TError, TData>>, }

  ): Promise<QueryClient> => {

  const queryOptions = getGetLinkGeoStatsApiAnalyticsLinksLinkIdGeoGetQueryOptions(linkId,params,options)

  await queryClient.prefetchQuery(queryOptions);

  return queryClient;
}


/**
 * Get referrer statistics for a specific link.
 * @summary Get Link Referrers
 */
export const getLinkReferrersApiAnalyticsLinksLinkIdReferrersGet = (
    linkId: string,
    params?: GetLinkReferrersApiAnalyticsLinksLinkIdReferrersGetParams,
 signal?: AbortSignal
) => {
      
      
      return customInstanceFn<ReferrerStats>(
      {url: `/api/analytics/links/${linkId}/referrers`, method: 'GET',
        params, signal
    },
      );
    }
  

export const getGetLinkReferrersApiAnalyticsLinksLinkIdReferrersGetQueryKey = (linkId: string,
    params?: GetLinkReferrersApiAnalyticsLinksLinkIdReferrersGetParams,) => {
    return [`/api/analytics/links/${linkId}/referrers`, ...(params ? [params]: [])] as const;
    }

    
export const getGetLinkReferrersApiAnalyticsLinksLinkIdReferrersGetInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getLinkReferrersApiAnalyticsLinksLinkIdReferrersGet>>>, TError = HTTPValidationError>(linkId: string,
    params?: GetLinkReferrersApiAnalyticsLinksLinkIdReferrersGetParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getLinkReferrersApiAnalyticsLinksLinkIdReferrersGet>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetLinkReferrersApiAnalyticsLinksLinkIdReferrersGetQueryKey(linkId,params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getLinkReferrersApiAnalyticsLinksLinkIdReferrersGet>>> = ({ signal }) => getLinkReferrersApiAnalyticsLinksLinkIdReferrersGet(linkId,params, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(linkId),  staleTime: 10000, retry: 3,  ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getLinkReferrersApiAnalyticsLinksLinkIdReferrersGet>>, TError, TData> & { queryKey: QueryKey }
}

export type GetLinkReferrersApiAnalyticsLinksLinkIdReferrersGetInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getLinkReferrersApiAnalyticsLinksLinkIdReferrersGet>>>
export type GetLinkReferrersApiAnalyticsLinksLinkIdReferrersGetInfiniteQueryError = HTTPValidationError

/**
 * @summary Get Link Referrers
 */
export const useGetLinkReferrersApiAnalyticsLinksLinkIdReferrersGetInfinite = <TData = InfiniteData<Awaited<ReturnType<typeof getLinkReferrersApiAnalyticsLinksLinkIdReferrersGet>>>, TError = HTTPValidationError>(
 linkId: string,
    params?: GetLinkReferrersApiAnalyticsLinksLinkIdReferrersGetParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getLinkReferrersApiAnalyticsLinksLinkIdReferrersGet>>, TError, TData>>, }

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetLinkReferrersApiAnalyticsLinksLinkIdReferrersGetInfiniteQueryOptions(linkId,params,options)

  const query = useInfiniteQuery(queryOptions) as  UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}

/**
 * @summary Get Link Referrers
 */
export const prefetchGetLinkReferrersApiAnalyticsLinksLinkIdReferrersGetInfinite = async <TData = Awaited<ReturnType<typeof getLinkReferrersApiAnalyticsLinksLinkIdReferrersGet>>, TError = HTTPValidationError>(
 queryClient: QueryClient, linkId: string,
    params?: GetLinkReferrersApiAnalyticsLinksLinkIdReferrersGetParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getLinkReferrersApiAnalyticsLinksLinkIdReferrersGet>>, TError, TData>>, }

  ): Promise<QueryClient> => {

  const queryOptions = getGetLinkReferrersApiAnalyticsLinksLinkIdReferrersGetInfiniteQueryOptions(linkId,params,options)

  await queryClient.prefetchInfiniteQuery(queryOptions);

  return queryClient;
}


export const getGetLinkReferrersApiAnalyticsLinksLinkIdReferrersGetQueryOptions = <TData = Awaited<ReturnType<typeof getLinkReferrersApiAnalyticsLinksLinkIdReferrersGet>>, TError = HTTPValidationError>(linkId: string,
    params?: GetLinkReferrersApiAnalyticsLinksLinkIdReferrersGetParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getLinkReferrersApiAnalyticsLinksLinkIdReferrersGet>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetLinkReferrersApiAnalyticsLinksLinkIdReferrersGetQueryKey(linkId,params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getLinkReferrersApiAnalyticsLinksLinkIdReferrersGet>>> = ({ signal }) => getLinkReferrersApiAnalyticsLinksLinkIdReferrersGet(linkId,params, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(linkId),  staleTime: 10000, retry: 3,  ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getLinkReferrersApiAnalyticsLinksLinkIdReferrersGet>>, TError, TData> & { queryKey: QueryKey }
}

export type GetLinkReferrersApiAnalyticsLinksLinkIdReferrersGetQueryResult = NonNullable<Awaited<ReturnType<typeof getLinkReferrersApiAnalyticsLinksLinkIdReferrersGet>>>
export type GetLinkReferrersApiAnalyticsLinksLinkIdReferrersGetQueryError = HTTPValidationError

/**
 * @summary Get Link Referrers
 */
export const useGetLinkReferrersApiAnalyticsLinksLinkIdReferrersGet = <TData = Awaited<ReturnType<typeof getLinkReferrersApiAnalyticsLinksLinkIdReferrersGet>>, TError = HTTPValidationError>(
 linkId: string,
    params?: GetLinkReferrersApiAnalyticsLinksLinkIdReferrersGetParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getLinkReferrersApiAnalyticsLinksLinkIdReferrersGet>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetLinkReferrersApiAnalyticsLinksLinkIdReferrersGetQueryOptions(linkId,params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}

/**
 * @summary Get Link Referrers
 */
export const prefetchGetLinkReferrersApiAnalyticsLinksLinkIdReferrersGet = async <TData = Awaited<ReturnType<typeof getLinkReferrersApiAnalyticsLinksLinkIdReferrersGet>>, TError = HTTPValidationError>(
 queryClient: QueryClient, linkId: string,
    params?: GetLinkReferrersApiAnalyticsLinksLinkIdReferrersGetParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getLinkReferrersApiAnalyticsLinksLinkIdReferrersGet>>, TError, TData>>, }

  ): Promise<QueryClient> => {

  const queryOptions = getGetLinkReferrersApiAnalyticsLinksLinkIdReferrersGetQueryOptions(linkId,params,options)

  await queryClient.prefetchQuery(queryOptions);

  return queryClient;
}


/**
 * Get analytics summary for a user.
 * @summary Get User Summary
 */
export const getUserSummaryApiAnalyticsUserUserIdSummaryGet = (
    userId: string,
 signal?: AbortSignal
) => {
      
      
      return customInstanceFn<GetUserSummaryApiAnalyticsUserUserIdSummaryGet200>(
      {url: `/api/analytics/user/${userId}/summary`, method: 'GET', signal
    },
      );
    }
  

export const getGetUserSummaryApiAnalyticsUserUserIdSummaryGetQueryKey = (userId: string,) => {
    return [`/api/analytics/user/${userId}/summary`] as const;
    }

    
export const getGetUserSummaryApiAnalyticsUserUserIdSummaryGetInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getUserSummaryApiAnalyticsUserUserIdSummaryGet>>>, TError = HTTPValidationError>(userId: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getUserSummaryApiAnalyticsUserUserIdSummaryGet>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetUserSummaryApiAnalyticsUserUserIdSummaryGetQueryKey(userId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getUserSummaryApiAnalyticsUserUserIdSummaryGet>>> = ({ signal }) => getUserSummaryApiAnalyticsUserUserIdSummaryGet(userId, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(userId),  staleTime: 10000, retry: 3,  ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getUserSummaryApiAnalyticsUserUserIdSummaryGet>>, TError, TData> & { queryKey: QueryKey }
}

export type GetUserSummaryApiAnalyticsUserUserIdSummaryGetInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getUserSummaryApiAnalyticsUserUserIdSummaryGet>>>
export type GetUserSummaryApiAnalyticsUserUserIdSummaryGetInfiniteQueryError = HTTPValidationError

/**
 * @summary Get User Summary
 */
export const useGetUserSummaryApiAnalyticsUserUserIdSummaryGetInfinite = <TData = InfiniteData<Awaited<ReturnType<typeof getUserSummaryApiAnalyticsUserUserIdSummaryGet>>>, TError = HTTPValidationError>(
 userId: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getUserSummaryApiAnalyticsUserUserIdSummaryGet>>, TError, TData>>, }

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetUserSummaryApiAnalyticsUserUserIdSummaryGetInfiniteQueryOptions(userId,options)

  const query = useInfiniteQuery(queryOptions) as  UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}

/**
 * @summary Get User Summary
 */
export const prefetchGetUserSummaryApiAnalyticsUserUserIdSummaryGetInfinite = async <TData = Awaited<ReturnType<typeof getUserSummaryApiAnalyticsUserUserIdSummaryGet>>, TError = HTTPValidationError>(
 queryClient: QueryClient, userId: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getUserSummaryApiAnalyticsUserUserIdSummaryGet>>, TError, TData>>, }

  ): Promise<QueryClient> => {

  const queryOptions = getGetUserSummaryApiAnalyticsUserUserIdSummaryGetInfiniteQueryOptions(userId,options)

  await queryClient.prefetchInfiniteQuery(queryOptions);

  return queryClient;
}


export const getGetUserSummaryApiAnalyticsUserUserIdSummaryGetQueryOptions = <TData = Awaited<ReturnType<typeof getUserSummaryApiAnalyticsUserUserIdSummaryGet>>, TError = HTTPValidationError>(userId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUserSummaryApiAnalyticsUserUserIdSummaryGet>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetUserSummaryApiAnalyticsUserUserIdSummaryGetQueryKey(userId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getUserSummaryApiAnalyticsUserUserIdSummaryGet>>> = ({ signal }) => getUserSummaryApiAnalyticsUserUserIdSummaryGet(userId, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(userId),  staleTime: 10000, retry: 3,  ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getUserSummaryApiAnalyticsUserUserIdSummaryGet>>, TError, TData> & { queryKey: QueryKey }
}

export type GetUserSummaryApiAnalyticsUserUserIdSummaryGetQueryResult = NonNullable<Awaited<ReturnType<typeof getUserSummaryApiAnalyticsUserUserIdSummaryGet>>>
export type GetUserSummaryApiAnalyticsUserUserIdSummaryGetQueryError = HTTPValidationError

/**
 * @summary Get User Summary
 */
export const useGetUserSummaryApiAnalyticsUserUserIdSummaryGet = <TData = Awaited<ReturnType<typeof getUserSummaryApiAnalyticsUserUserIdSummaryGet>>, TError = HTTPValidationError>(
 userId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUserSummaryApiAnalyticsUserUserIdSummaryGet>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetUserSummaryApiAnalyticsUserUserIdSummaryGetQueryOptions(userId,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}

/**
 * @summary Get User Summary
 */
export const prefetchGetUserSummaryApiAnalyticsUserUserIdSummaryGet = async <TData = Awaited<ReturnType<typeof getUserSummaryApiAnalyticsUserUserIdSummaryGet>>, TError = HTTPValidationError>(
 queryClient: QueryClient, userId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUserSummaryApiAnalyticsUserUserIdSummaryGet>>, TError, TData>>, }

  ): Promise<QueryClient> => {

  const queryOptions = getGetUserSummaryApiAnalyticsUserUserIdSummaryGetQueryOptions(userId,options)

  await queryClient.prefetchQuery(queryOptions);

  return queryClient;
}


