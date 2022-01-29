import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Credibility = {
  __typename?: 'Credibility';
  clickBaiting?: Maybe<Scalars['Int']>;
  fundingSource?: Maybe<Scalars['String']>;
};

export type News = {
  __typename?: 'News';
  date?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  newsTitle?: Maybe<Scalars['String']>;
  newsUrl?: Maybe<Scalars['String']>;
  source?: Maybe<Scalars['String']>;
  sourceSite?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  news?: Maybe<Array<Maybe<News>>>;
  newsSources?: Maybe<Array<Maybe<Source>>>;
};

export type Source = {
  __typename?: 'Source';
  credibility?: Maybe<Credibility>;
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  site?: Maybe<Scalars['String']>;
};

export type NewsQueryVariables = Exact<{ [key: string]: never; }>;


export type NewsQuery = { __typename?: 'Query', news?: Array<{ __typename?: 'News', newsUrl?: string | null | undefined, source?: string | null | undefined, sourceSite?: string | null | undefined, newsTitle?: string | null | undefined } | null | undefined> | null | undefined };

export type NewsSourcesQueryVariables = Exact<{ [key: string]: never; }>;


export type NewsSourcesQuery = { __typename?: 'Query', newsSources?: Array<{ __typename?: 'Source', name?: string | null | undefined, owner?: string | null | undefined, site?: string | null | undefined, credibility?: { __typename?: 'Credibility', clickBaiting?: number | null | undefined, fundingSource?: string | null | undefined } | null | undefined } | null | undefined> | null | undefined };


export const NewsDocument = gql`
    query News {
  news {
    newsUrl
    source
    sourceSite
    newsTitle
  }
}
    `;

/**
 * __useNewsQuery__
 *
 * To run a query within a React component, call `useNewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useNewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewsQuery({
 *   variables: {
 *   },
 * });
 */
export function useNewsQuery(baseOptions?: Apollo.QueryHookOptions<NewsQuery, NewsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NewsQuery, NewsQueryVariables>(NewsDocument, options);
      }
export function useNewsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NewsQuery, NewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NewsQuery, NewsQueryVariables>(NewsDocument, options);
        }
export type NewsQueryHookResult = ReturnType<typeof useNewsQuery>;
export type NewsLazyQueryHookResult = ReturnType<typeof useNewsLazyQuery>;
export type NewsQueryResult = Apollo.QueryResult<NewsQuery, NewsQueryVariables>;
export const NewsSourcesDocument = gql`
    query NewsSources {
  newsSources {
    credibility {
      clickBaiting
      fundingSource
    }
    name
    owner
    site
  }
}
    `;

/**
 * __useNewsSourcesQuery__
 *
 * To run a query within a React component, call `useNewsSourcesQuery` and pass it any options that fit your needs.
 * When your component renders, `useNewsSourcesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewsSourcesQuery({
 *   variables: {
 *   },
 * });
 */
export function useNewsSourcesQuery(baseOptions?: Apollo.QueryHookOptions<NewsSourcesQuery, NewsSourcesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NewsSourcesQuery, NewsSourcesQueryVariables>(NewsSourcesDocument, options);
      }
export function useNewsSourcesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NewsSourcesQuery, NewsSourcesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NewsSourcesQuery, NewsSourcesQueryVariables>(NewsSourcesDocument, options);
        }
export type NewsSourcesQueryHookResult = ReturnType<typeof useNewsSourcesQuery>;
export type NewsSourcesLazyQueryHookResult = ReturnType<typeof useNewsSourcesLazyQuery>;
export type NewsSourcesQueryResult = Apollo.QueryResult<NewsSourcesQuery, NewsSourcesQueryVariables>;