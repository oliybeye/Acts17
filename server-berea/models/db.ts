import { ObjectId } from "mongodb";

export type News = {
  _id: ObjectId;
  date: string;
  title: string;
  url: string;
  source: string;
  sourceSite: string;
  author: Author[];
  imageurl: string;
  time: string;
  platform?: Platforms;
  like: number;
  dislike: number;
};

export type Author = {
  first: string;
  last: string;
  middle: string;
};

export type Platforms = {
  site: string;
  name: string;
  organizationName: string;
  clickBaitingScore: number;
  owner: string;
  political: {
    leaning: string;
    topDonors: string[];
    topIssues: string[];
  };
};

export type Comment = {
  _id: ObjectId;
  comment: string;
  userId: string;
  parentCommentId: string;
  like: Number;
  dislike: Number;
  timestamp: string;
};

export type Candidate = {
  id: string;
  county: string;
  districtType: string;
  district: string;
  race: string;
  termType: string;
  termLength: string;
  firstName: string;
  middleName: string;
  lastName: string;
  mailingAddress: string;
  email: string;
  phone: string;
  filingDate: string;
  partyPreference: string;
  status: string;
  electionStatus: string;
  url: string;
  img: string;
  statement: string;
};

export type County = {
  id: string;
  county: string;
  candidates: Candidate[];
};
