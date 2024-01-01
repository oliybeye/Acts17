import NodeCache from "node-cache";
import {
  DB_Election_DB,
  DB_METADATA_COLLECTION,
  DB_NAME,
  QueryDB,
} from "../utils/dbAccesor";
import {
  Candidate as DbCandidate,
  County as DbCounty,
  News as DbNews,
  Platforms as DbPlatforms,
} from "../models/db";
import {
  Candidate,
  County,
  District,
  DistrictType,
  Race,
} from "../models/graphql";
import { ObjectId } from "mongodb";

const cache = new NodeCache({ stdTTL: 100, checkperiod: 14400 }); // every 4 hours is 14400 seconds
const electionCache = new NodeCache({ stdTTL: 100, checkperiod: 0 });

export const getCacheNews = async () => {
  let news = cache.get("news") as DbNews[];

  if (news === undefined) {
    news = await getNewsFromDb();
    cache.set("news", news);
  }

  return news;
};

const getNewsFromDb = async () => {
  const platformMetadatas = (await QueryDB({
    dbName: DB_NAME,
    collectionName: DB_METADATA_COLLECTION,
    filter: {},
  })) as DbPlatforms[];
  const newsPromises = platformMetadatas.map(async (platformMetadata) => {
    const collectionName = platformMetadata.organizationName;
    const dbnews = (await QueryDB({
      dbName: DB_NAME,
      collectionName,
      filter: {},
    })) as DbNews[];

    dbnews.forEach((news) => {
      news.platform = platformMetadata;
    });

    return dbnews;
  });

  const news = (await Promise.all(newsPromises)).reduce((n, p) => {
    return n.concat(p);
  });

  return news;
};

export const updateCache = async () => {
  const news = await getNewsFromDb();
  cache.set("news", news);
};

export const getCacheStateCounties = async () => {
  const stateCounties = "stateCounties";
  let counties = electionCache.get(stateCounties) as string[];

  if (counties == undefined) {
    counties = await getStateElectionCounties();
    electionCache.set(stateCounties, counties);
  }

  return counties;
};

const getStateElectionCounties = async () => {
  let stateCounties = (await QueryDB({
    dbName: DB_Election_DB,
    collectionName: DB_METADATA_COLLECTION,
    filter: {},
  })) as DbCounty[];

  const counties = stateCounties.map((county) => county.county).sort();
  return counties;
};

export const getCacheElection = async (state: string) => {
  let election = electionCache.get(state) as County[];

  if (election == undefined) {
    election = await getElection();
    electionCache.set(state, election);
  }

  return election;
};

const getElection = async () => {
  let stateCounties = (await QueryDB({
    dbName: DB_Election_DB,
    collectionName: DB_METADATA_COLLECTION,
    filter: {},
  })) as DbCounty[];

  const promiseCounties = stateCounties.map(async (county) => {
    const candidates = (await QueryDB({
      dbName: DB_Election_DB,
      collectionName: county.county,
      filter: {},
    })) as DbCandidate[];
    return {
      county: county.county,
      candidates: candidates,
    } as DbCounty;
  });

  const counties = await Promise.all(promiseCounties);

  return counties.map((county) => {
    const apiCounty: County = {
      id: new ObjectId().toString(),
      county: county.county,
    };

    const races: Race[] = [];
    const districts: District[] = [];
    const districtTypes: DistrictType[] = [];

    const mappingCountyDistrictType = new Map<string, District[]>();
    const mappingCountyDistrict = new Map<string, Race[]>();
    const mappingCountyRace = new Map<string, Candidate[]>();

    county.candidates.map((candidate) => {
      const key = `${candidate.districtType}${candidate.district}${candidate.race}`;
      if (mappingCountyRace.has(key)) {
        mappingCountyRace.get(key)?.push(candidate);
      } else {
        mappingCountyRace.set(key, [candidate]);
      }
    });

    mappingCountyRace.forEach((v, k) => {
      v.forEach((s) => {
        s.id = new ObjectId().toString();
      });

      races.push({
        id: new ObjectId().toString(),
        position: v[0].race ?? "",
        candidates: v,
        district: v[0].district ?? "",
        districtType: v[0].districtType ?? "",
        termLength: v[0].termLength,
        termType: v[0].termType,
      });
    });

    races.map((race) => {
      const key = `${race.districtType}${race.district}`;
      if (mappingCountyDistrict.has(key)) {
        mappingCountyDistrict.get(key)?.push(race);
      } else {
        mappingCountyDistrict.set(key, [race]);
      }
    });

    mappingCountyDistrict.forEach((v, k) => {
      districts.push({
        type: v[0].district,
        races: v.sort(),
        districtType: v[0].districtType,
      });
    });

    districts.map((district) => {
      if (mappingCountyDistrictType.has(district.districtType)) {
        mappingCountyDistrictType.get(district.districtType)?.push(district);
      } else if (district.districtType) {
        mappingCountyDistrictType.set(district.districtType, [district]);
      }
    });

    mappingCountyDistrictType.forEach((v, k) => {
      districtTypes.push({
        type: v[0].districtType,
        districts: v.sort((a, b) =>
          a.districtType.toLocaleLowerCase() > b.districtType.toLocaleLowerCase()
            ? -1
            : b.districtType.toLocaleLowerCase() > a.districtType.toLocaleLowerCase()
            ? 1
            : 0
        ),
      });
    });

    apiCounty.districts = districtTypes.sort((a, b) => {
      return a.type.toLocaleLowerCase() > b.type.toLocaleLowerCase()
        ? 1
        : b.type.toLocaleLowerCase() > a.type.toLocaleLowerCase()
        ? -1
        : 0
  });

    return apiCounty;
  });
};
