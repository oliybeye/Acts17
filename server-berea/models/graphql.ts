import { GraphQLResolveInfo } from 'graphql';
import { gql } from "apollo-server";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Credibility: ResolverTypeWrapper<Credibility>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  News: ResolverTypeWrapper<News>;
  Query: ResolverTypeWrapper<{}>;
  Source: ResolverTypeWrapper<Source>;
  String: ResolverTypeWrapper<Scalars['String']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Credibility: Credibility;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  News: News;
  Query: {};
  Source: Source;
  String: Scalars['String'];
};

export type CredibilityResolvers<ContextType = any, ParentType extends ResolversParentTypes['Credibility'] = ResolversParentTypes['Credibility']> = {
  clickBaiting?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  fundingSource?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NewsResolvers<ContextType = any, ParentType extends ResolversParentTypes['News'] = ResolversParentTypes['News']> = {
  date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  newsTitle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  newsUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  source?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sourceSite?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  news?: Resolver<Maybe<Array<Maybe<ResolversTypes['News']>>>, ParentType, ContextType>;
  newsSources?: Resolver<Maybe<Array<Maybe<ResolversTypes['Source']>>>, ParentType, ContextType>;
};

export type SourceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Source'] = ResolversParentTypes['Source']> = {
  credibility?: Resolver<Maybe<ResolversTypes['Credibility']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  site?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Credibility?: CredibilityResolvers<ContextType>;
  News?: NewsResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Source?: SourceResolvers<ContextType>;
};


const TypeDefs = gql`
type Credibility {
  clickBaiting: Int
  fundingSource: String
}

type News {
  date: String
  id: ID
  newsTitle: String
  newsUrl: String
  source: String
  sourceSite: String
}

type Query {
  news: [News]
  newsSources: [Source]
}

type Source {
  credibility: Credibility
  name: String
  owner: String
  site: String
}
`;

export default TypeDefs;