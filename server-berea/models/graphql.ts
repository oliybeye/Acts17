import { GraphQLResolveInfo } from 'graphql';
import { gql } from "apollo-server";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Author: ResolverTypeWrapper<Author>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Candidate: ResolverTypeWrapper<Candidate>;
  Comment: ResolverTypeWrapper<Comment>;
  CommentMutationInput: CommentMutationInput;
  CommentsQueryInput: CommentsQueryInput;
  County: ResolverTypeWrapper<County>;
  District: ResolverTypeWrapper<District>;
  DistrictType: ResolverTypeWrapper<DistrictType>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  IncrementDislikeInput: IncrementDislikeInput;
  IncrementLikeInput: IncrementLikeInput;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  News: ResolverTypeWrapper<News>;
  NewsQueryInput: NewsQueryInput;
  Platform: ResolverTypeWrapper<Platform>;
  Political: ResolverTypeWrapper<Political>;
  Query: ResolverTypeWrapper<{}>;
  Race: ResolverTypeWrapper<Race>;
  String: ResolverTypeWrapper<Scalars['String']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Author: Author;
  Boolean: Scalars['Boolean'];
  Candidate: Candidate;
  Comment: Comment;
  CommentMutationInput: CommentMutationInput;
  CommentsQueryInput: CommentsQueryInput;
  County: County;
  District: District;
  DistrictType: DistrictType;
  ID: Scalars['ID'];
  IncrementDislikeInput: IncrementDislikeInput;
  IncrementLikeInput: IncrementLikeInput;
  Int: Scalars['Int'];
  Mutation: {};
  News: News;
  NewsQueryInput: NewsQueryInput;
  Platform: Platform;
  Political: Political;
  Query: {};
  Race: Race;
  String: Scalars['String'];
};

export type AuthorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Author'] = ResolversParentTypes['Author']> = {
  first?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  last?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  middle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CandidateResolvers<ContextType = any, ParentType extends ResolversParentTypes['Candidate'] = ResolversParentTypes['Candidate']> = {
  county?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  district?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  districtType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  electionStatus?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  filingDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  img?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mailingAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  middleName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  partyPreference?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  race?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  statement?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  termLength?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  termType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  comment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  timeStamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CountyResolvers<ContextType = any, ParentType extends ResolversParentTypes['County'] = ResolversParentTypes['County']> = {
  county?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  districts?: Resolver<Maybe<Array<ResolversTypes['DistrictType']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DistrictResolvers<ContextType = any, ParentType extends ResolversParentTypes['District'] = ResolversParentTypes['District']> = {
  districtType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  races?: Resolver<Array<ResolversTypes['Race']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DistrictTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['DistrictType'] = ResolversParentTypes['DistrictType']> = {
  districts?: Resolver<Array<ResolversTypes['District']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  comment?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<MutationCommentArgs, 'input'>>;
  incrementDislike?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<MutationIncrementDislikeArgs, 'input'>>;
  incrementLike?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<MutationIncrementLikeArgs, 'input'>>;
};

export type NewsResolvers<ContextType = any, ParentType extends ResolversParentTypes['News'] = ResolversParentTypes['News']> = {
  author?: Resolver<Maybe<Array<Maybe<ResolversTypes['Author']>>>, ParentType, ContextType>;
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dislike?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  imgUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  like?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  platform?: Resolver<Maybe<ResolversTypes['Platform']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlatformResolvers<ContextType = any, ParentType extends ResolversParentTypes['Platform'] = ResolversParentTypes['Platform']> = {
  clickBaitingScore?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  political?: Resolver<Maybe<ResolversTypes['Political']>, ParentType, ContextType>;
  site?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PoliticalResolvers<ContextType = any, ParentType extends ResolversParentTypes['Political'] = ResolversParentTypes['Political']> = {
  leaningSide?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  topDonors?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  topIssues?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  comments?: Resolver<Maybe<Array<ResolversTypes['Comment']>>, ParentType, ContextType, RequireFields<QueryCommentsArgs, 'input'>>;
  county?: Resolver<Maybe<ResolversTypes['County']>, ParentType, ContextType, RequireFields<QueryCountyArgs, never>>;
  news?: Resolver<Maybe<Array<Maybe<ResolversTypes['News']>>>, ParentType, ContextType, RequireFields<QueryNewsArgs, 'input'>>;
  sources?: Resolver<Maybe<Array<ResolversTypes['Platform']>>, ParentType, ContextType>;
  stateCounties?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
};

export type RaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Race'] = ResolversParentTypes['Race']> = {
  candidates?: Resolver<Maybe<Array<ResolversTypes['Candidate']>>, ParentType, ContextType>;
  district?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  districtType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  position?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  termLength?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  termType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Author?: AuthorResolvers<ContextType>;
  Candidate?: CandidateResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  County?: CountyResolvers<ContextType>;
  District?: DistrictResolvers<ContextType>;
  DistrictType?: DistrictTypeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  News?: NewsResolvers<ContextType>;
  Platform?: PlatformResolvers<ContextType>;
  Political?: PoliticalResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Race?: RaceResolvers<ContextType>;
};


const TypeDefs = gql`
type Author {
  first: String
  last: String
  middle: String
}

type Candidate {
  county: String
  district: String
  districtType: String
  electionStatus: String
  email: String
  filingDate: String
  firstName: String!
  id: String!
  img: String
  lastName: String
  mailingAddress: String
  middleName: String
  partyPreference: String
  phone: String
  race: String
  statement: String
  status: String
  termLength: String
  termType: String
  url: String
}

type Comment {
  comment: String!
  id: ID!
  timeStamp: String!
  userId: String!
}

input CommentMutationInput {
  comment: String
  id: String
  userId: String
}

input CommentsQueryInput {
  id: ID
}

type County {
  county: String!
  districts: [DistrictType!]
  id: String!
}

type District {
  districtType: String!
  races: [Race!]!
  type: String!
}

type DistrictType {
  districts: [District!]!
  type: String!
}

input IncrementDislikeInput {
  dislikeCount: Int!
  id: String!

  """metadata, the news organization, or comments"""
  type: String!
  userId: String
}

input IncrementLikeInput {
  id: String!
  likeCount: Int!

  """metadata, the news organization, or comments"""
  type: String!
  userId: String
}

type Mutation {
  comment(input: CommentMutationInput!): Int
  incrementDislike(input: IncrementDislikeInput!): Int
  incrementLike(input: IncrementLikeInput!): Int
}

"""An event that occurred that's been reported on"""
type News {
  author: [Author]
  comment: String
  date: String
  dislike: Int
  id: ID
  imgUrl: String
  like: Int
  platform: Platform
  title: String
  url: String
}

input NewsQueryInput {
  page: Int
  today: Boolean
}

"""Platform is an organization that reports or comments on news"""
type Platform {
  clickBaitingScore: Int
  name: String
  owner: String
  political: Political
  site: String
}

"""A Platform political view"""
type Political {
  """The platform's support of one or two political domain """
  leaningSide: String

  """The platforms's top donors publicly known"""
  topDonors: [String]

  """Most frequent issue discussed on the platform """
  topIssues: [String]
}

type Query {
  comments(input: CommentsQueryInput!): [Comment!]
  county(name: String): County
  news(input: NewsQueryInput!): [News]
  sources: [Platform!]
  stateCounties: [String!]!
}

type Race {
  candidates: [Candidate!]
  district: String!
  districtType: String!
  id: String!
  position: String!
  termLength: String
  termType: String
}
`;

export default TypeDefs;