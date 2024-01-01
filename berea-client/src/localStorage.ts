import { Candidate } from "./graphql";

export interface Vote {
  race: string;
  candidate?: Candidate;
}

export type Votes = Map<string, Vote>;

export const handleVoteChange = (vote: Vote) => {
  const localStoredVotes = localStorage.getItem("votes");
  let votes = localStoredVotes
    ? (JSON.parse(localStoredVotes) as Record<string, Vote>)
    : undefined;
  if (!votes) {
    const initVotes: { [key: string]: Vote } = {};
    votes = initVotes;
    votes[vote.race] = vote;
  }
  votes[vote.race] = vote;

  localStorage.setItem("votes", JSON.stringify(votes));
};

export const getVotes = () => {
  const localStoredVotes = localStorage.getItem("votes");
  let votes = localStoredVotes
    ? (JSON.parse(localStoredVotes) as Record<string, Vote>)
    : undefined;
  const result: Vote[] = [];
  if (votes) {
    // eslint-disable-next-line
    Object.entries(votes).map(([k, v]) => {
      if (v) {
        result.push(v);
      }
    });
  }

  return result;
};

export const clearVotes = () => {
  localStorage.removeItem("votes");
};

export const getUserPreference = (preference: string) => {
  const localStoredPreference = localStorage.getItem("preference");
  let preferences = localStoredPreference
    ? (JSON.parse(localStoredPreference) as Record<string, string>)
    : undefined;

  return preferences ? preferences[preference] : undefined;
};

export const setUserPreference = (setting: string, value: string) => {
  const localStoredPreference = localStorage.getItem("preference");
  let preferences = localStoredPreference
    ? (JSON.parse(localStoredPreference) as Record<string, string>)
    : undefined;

  if (!preferences) {
    const initPreference: { [key: string]: string } = {};
    preferences = initPreference;
  }
  preferences[setting] = value;

  localStorage.setItem("preference", JSON.stringify(preferences));
};
