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

export type News = {
  __typename?: 'News';
  date?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  newTitle?: Maybe<Scalars['String']>;
  newsUrl?: Maybe<Scalars['String']>;
  source?: Maybe<Scalars['String']>;
  sourceSite?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  news?: Maybe<Array<Maybe<News>>>;
};

export type NewsQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type NewsQueryQuery = { __typename?: 'Query', news?: Array<{ __typename?: 'News', newsUrl?: string | null | undefined, source?: string | null | undefined, sourceSite?: string | null | undefined, newTitle?: string | null | undefined } | null | undefined> | null | undefined };
