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

export type Author = {
  __typename?: 'Author';
  first?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['String']>;
  middle?: Maybe<Scalars['String']>;
};

export type Candidate = {
  __typename?: 'Candidate';
  county?: Maybe<Scalars['String']>;
  district?: Maybe<Scalars['String']>;
  districtType?: Maybe<Scalars['String']>;
  electionStatus?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  filingDate?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  id: Scalars['String'];
  img?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  mailingAddress?: Maybe<Scalars['String']>;
  middleName?: Maybe<Scalars['String']>;
  partyPreference?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  race?: Maybe<Scalars['String']>;
  statement?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  termLength?: Maybe<Scalars['String']>;
  termType?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type Comment = {
  __typename?: 'Comment';
  comment: Scalars['String'];
  id: Scalars['ID'];
  timeStamp: Scalars['String'];
  userId: Scalars['String'];
};

export type CommentMutationInput = {
  comment?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type CommentsQueryInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type County = {
  __typename?: 'County';
  county: Scalars['String'];
  districts?: Maybe<Array<DistrictType>>;
  id: Scalars['String'];
};

export type District = {
  __typename?: 'District';
  districtType: Scalars['String'];
  races: Array<Race>;
  type: Scalars['String'];
};

export type DistrictType = {
  __typename?: 'DistrictType';
  districts: Array<District>;
  type: Scalars['String'];
};

export type IncrementDislikeInput = {
  dislikeCount: Scalars['Int'];
  id: Scalars['String'];
  /** metadata, the news organization, or comments */
  type: Scalars['String'];
  userId?: InputMaybe<Scalars['String']>;
};

export type IncrementLikeInput = {
  id: Scalars['String'];
  likeCount: Scalars['Int'];
  /** metadata, the news organization, or comments */
  type: Scalars['String'];
  userId?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  comment?: Maybe<Scalars['Int']>;
  incrementDislike?: Maybe<Scalars['Int']>;
  incrementLike?: Maybe<Scalars['Int']>;
};


export type MutationCommentArgs = {
  input: CommentMutationInput;
};


export type MutationIncrementDislikeArgs = {
  input: IncrementDislikeInput;
};


export type MutationIncrementLikeArgs = {
  input: IncrementLikeInput;
};

/** An event that occurred that's been reported on */
export type News = {
  __typename?: 'News';
  author?: Maybe<Array<Maybe<Author>>>;
  comment?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['String']>;
  dislike?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  imgUrl?: Maybe<Scalars['String']>;
  like?: Maybe<Scalars['Int']>;
  platform?: Maybe<Platform>;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type NewsQueryInput = {
  page?: InputMaybe<Scalars['Int']>;
  today?: InputMaybe<Scalars['Boolean']>;
};

/** Platform is an organization that reports or comments on news */
export type Platform = {
  __typename?: 'Platform';
  clickBaitingScore?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  political?: Maybe<Political>;
  site?: Maybe<Scalars['String']>;
};

/** A Platform political view */
export type Political = {
  __typename?: 'Political';
  /** The platform's support of one or two political domain  */
  leaningSide?: Maybe<Scalars['String']>;
  /** The platforms's top donors publicly known */
  topDonors?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Most frequent issue discussed on the platform  */
  topIssues?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Query = {
  __typename?: 'Query';
  comments?: Maybe<Array<Comment>>;
  county?: Maybe<County>;
  news?: Maybe<Array<Maybe<News>>>;
  sources?: Maybe<Array<Platform>>;
  stateCounties: Array<Scalars['String']>;
};


export type QueryCommentsArgs = {
  input: CommentsQueryInput;
};


export type QueryCountyArgs = {
  name?: InputMaybe<Scalars['String']>;
};


export type QueryNewsArgs = {
  input: NewsQueryInput;
};

export type Race = {
  __typename?: 'Race';
  candidates?: Maybe<Array<Candidate>>;
  district: Scalars['String'];
  districtType: Scalars['String'];
  id: Scalars['String'];
  position: Scalars['String'];
  termLength?: Maybe<Scalars['String']>;
  termType?: Maybe<Scalars['String']>;
};

export type NewsQueryVariables = Exact<{
  today?: InputMaybe<Scalars['Boolean']>;
}>;


export type NewsQuery = { __typename?: 'Query', news?: Array<{ __typename?: 'News', date?: string | null | undefined, title?: string | null | undefined, id?: string | null | undefined, url?: string | null | undefined, comment?: string | null | undefined, imgUrl?: string | null | undefined, like?: number | null | undefined, dislike?: number | null | undefined, author?: Array<{ __typename?: 'Author', first?: string | null | undefined, last?: string | null | undefined } | null | undefined> | null | undefined, platform?: { __typename?: 'Platform', name?: string | null | undefined, clickBaitingScore?: number | null | undefined, site?: string | null | undefined } | null | undefined } | null | undefined> | null | undefined };

export type DistrictsQueryVariables = Exact<{
  name?: InputMaybe<Scalars['String']>;
}>;


export type DistrictsQuery = { __typename?: 'Query', county?: { __typename?: 'County', districts?: Array<{ __typename?: 'DistrictType', type: string, districts: Array<{ __typename?: 'District', type: string, districtType: string, races: Array<{ __typename?: 'Race', district: string, districtType: string, id: string, position: string, termLength?: string | null | undefined, termType?: string | null | undefined, candidates?: Array<{ __typename?: 'Candidate', county?: string | null | undefined, district?: string | null | undefined, districtType?: string | null | undefined, electionStatus?: string | null | undefined, email?: string | null | undefined, filingDate?: string | null | undefined, firstName: string, id: string, img?: string | null | undefined, lastName?: string | null | undefined, mailingAddress?: string | null | undefined, middleName?: string | null | undefined, partyPreference?: string | null | undefined, phone?: string | null | undefined, race?: string | null | undefined, statement?: string | null | undefined, status?: string | null | undefined, termLength?: string | null | undefined, termType?: string | null | undefined, url?: string | null | undefined }> | null | undefined }> }> }> | null | undefined } | null | undefined };

export type GetStateCountiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStateCountiesQuery = { __typename?: 'Query', stateCounties: Array<string> };

export type IncrementLikeMutationVariables = Exact<{
  id: Scalars['String'];
  likeCount: Scalars['Int'];
  type: Scalars['String'];
  userId: Scalars['String'];
}>;


export type IncrementLikeMutation = { __typename?: 'Mutation', incrementLike?: number | null | undefined };

export type IncrementDislikeMutationVariables = Exact<{
  id: Scalars['String'];
  dislikeCount: Scalars['Int'];
  type: Scalars['String'];
  userId: Scalars['String'];
}>;


export type IncrementDislikeMutation = { __typename?: 'Mutation', incrementDislike?: number | null | undefined };

export type CommentsQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
}>;


export type CommentsQuery = { __typename?: 'Query', comments?: Array<{ __typename?: 'Comment', comment: string, id: string, timeStamp: string, userId: string }> | null | undefined };

export type CommentMutationVariables = Exact<{
  comment?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
}>;


export type CommentMutation = { __typename?: 'Mutation', comment?: number | null | undefined };


export const NewsDocument = gql`
    query News($today: Boolean) {
  news(input: {today: $today}) {
    author {
      first
      last
    }
    date
    title
    id
    url
    platform {
      name
      clickBaitingScore
      site
    }
    comment
    imgUrl
    like
    dislike
    id
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
 *      today: // value for 'today'
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
export const DistrictsDocument = gql`
    query Districts($name: String) {
  county(name: $name) {
    districts {
      districts {
        type
        races {
          candidates {
            county
            district
            districtType
            electionStatus
            email
            filingDate
            firstName
            id
            img
            lastName
            mailingAddress
            middleName
            partyPreference
            phone
            race
            statement
            status
            termLength
            termType
            url
          }
          district
          districtType
          id
          position
          termLength
          termType
        }
        districtType
      }
      type
    }
  }
}
    `;

/**
 * __useDistrictsQuery__
 *
 * To run a query within a React component, call `useDistrictsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDistrictsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDistrictsQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useDistrictsQuery(baseOptions?: Apollo.QueryHookOptions<DistrictsQuery, DistrictsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DistrictsQuery, DistrictsQueryVariables>(DistrictsDocument, options);
      }
export function useDistrictsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DistrictsQuery, DistrictsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DistrictsQuery, DistrictsQueryVariables>(DistrictsDocument, options);
        }
export type DistrictsQueryHookResult = ReturnType<typeof useDistrictsQuery>;
export type DistrictsLazyQueryHookResult = ReturnType<typeof useDistrictsLazyQuery>;
export type DistrictsQueryResult = Apollo.QueryResult<DistrictsQuery, DistrictsQueryVariables>;
export const GetStateCountiesDocument = gql`
    query GetStateCounties {
  stateCounties
}
    `;

/**
 * __useGetStateCountiesQuery__
 *
 * To run a query within a React component, call `useGetStateCountiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStateCountiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStateCountiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetStateCountiesQuery(baseOptions?: Apollo.QueryHookOptions<GetStateCountiesQuery, GetStateCountiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStateCountiesQuery, GetStateCountiesQueryVariables>(GetStateCountiesDocument, options);
      }
export function useGetStateCountiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStateCountiesQuery, GetStateCountiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStateCountiesQuery, GetStateCountiesQueryVariables>(GetStateCountiesDocument, options);
        }
export type GetStateCountiesQueryHookResult = ReturnType<typeof useGetStateCountiesQuery>;
export type GetStateCountiesLazyQueryHookResult = ReturnType<typeof useGetStateCountiesLazyQuery>;
export type GetStateCountiesQueryResult = Apollo.QueryResult<GetStateCountiesQuery, GetStateCountiesQueryVariables>;
export const IncrementLikeDocument = gql`
    mutation IncrementLike($id: String!, $likeCount: Int!, $type: String!, $userId: String!) {
  incrementLike(
    input: {id: $id, likeCount: $likeCount, type: $type, userId: $userId}
  )
}
    `;
export type IncrementLikeMutationFn = Apollo.MutationFunction<IncrementLikeMutation, IncrementLikeMutationVariables>;

/**
 * __useIncrementLikeMutation__
 *
 * To run a mutation, you first call `useIncrementLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIncrementLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [incrementLikeMutation, { data, loading, error }] = useIncrementLikeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      likeCount: // value for 'likeCount'
 *      type: // value for 'type'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useIncrementLikeMutation(baseOptions?: Apollo.MutationHookOptions<IncrementLikeMutation, IncrementLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<IncrementLikeMutation, IncrementLikeMutationVariables>(IncrementLikeDocument, options);
      }
export type IncrementLikeMutationHookResult = ReturnType<typeof useIncrementLikeMutation>;
export type IncrementLikeMutationResult = Apollo.MutationResult<IncrementLikeMutation>;
export type IncrementLikeMutationOptions = Apollo.BaseMutationOptions<IncrementLikeMutation, IncrementLikeMutationVariables>;
export const IncrementDislikeDocument = gql`
    mutation IncrementDislike($id: String!, $dislikeCount: Int!, $type: String!, $userId: String!) {
  incrementDislike(
    input: {id: $id, dislikeCount: $dislikeCount, type: $type, userId: $userId}
  )
}
    `;
export type IncrementDislikeMutationFn = Apollo.MutationFunction<IncrementDislikeMutation, IncrementDislikeMutationVariables>;

/**
 * __useIncrementDislikeMutation__
 *
 * To run a mutation, you first call `useIncrementDislikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIncrementDislikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [incrementDislikeMutation, { data, loading, error }] = useIncrementDislikeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      dislikeCount: // value for 'dislikeCount'
 *      type: // value for 'type'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useIncrementDislikeMutation(baseOptions?: Apollo.MutationHookOptions<IncrementDislikeMutation, IncrementDislikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<IncrementDislikeMutation, IncrementDislikeMutationVariables>(IncrementDislikeDocument, options);
      }
export type IncrementDislikeMutationHookResult = ReturnType<typeof useIncrementDislikeMutation>;
export type IncrementDislikeMutationResult = Apollo.MutationResult<IncrementDislikeMutation>;
export type IncrementDislikeMutationOptions = Apollo.BaseMutationOptions<IncrementDislikeMutation, IncrementDislikeMutationVariables>;
export const CommentsDocument = gql`
    query Comments($id: ID) {
  comments(input: {id: $id}) {
    comment
    id
    timeStamp
    userId
  }
}
    `;

/**
 * __useCommentsQuery__
 *
 * To run a query within a React component, call `useCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCommentsQuery(baseOptions?: Apollo.QueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, options);
      }
export function useCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, options);
        }
export type CommentsQueryHookResult = ReturnType<typeof useCommentsQuery>;
export type CommentsLazyQueryHookResult = ReturnType<typeof useCommentsLazyQuery>;
export type CommentsQueryResult = Apollo.QueryResult<CommentsQuery, CommentsQueryVariables>;
export const CommentDocument = gql`
    mutation Comment($comment: String, $id: String, $userId: String) {
  comment(input: {comment: $comment, id: $id, userId: $userId})
}
    `;
export type CommentMutationFn = Apollo.MutationFunction<CommentMutation, CommentMutationVariables>;

/**
 * __useCommentMutation__
 *
 * To run a mutation, you first call `useCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commentMutation, { data, loading, error }] = useCommentMutation({
 *   variables: {
 *      comment: // value for 'comment'
 *      id: // value for 'id'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useCommentMutation(baseOptions?: Apollo.MutationHookOptions<CommentMutation, CommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CommentMutation, CommentMutationVariables>(CommentDocument, options);
      }
export type CommentMutationHookResult = ReturnType<typeof useCommentMutation>;
export type CommentMutationResult = Apollo.MutationResult<CommentMutation>;
export type CommentMutationOptions = Apollo.BaseMutationOptions<CommentMutation, CommentMutationVariables>;