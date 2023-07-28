import {
  GetAllResponse,
  GetNameRequest,
  GetNameResponse,
  GetOneRequest,
  GetOneResponse
} from './contract';

const countries = [
  {
    "name": "Afghanistan",
    "alpha3Code": "AFG",
    "capital": "Kabul",
    "nativeName": "افغانستان",
    "population": 40218234,
    "subregion": "Southern Asia",
    "region": "Asia",
    "topLevelDomain": [
      ".af"
    ],
    "currencies": [
      {
        "code": "AFN",
        "name": "Afghan afghani",
        "symbol": "؋"
      }
    ],
    "languages": [
      {
        "name": "Pashto"
      },
      {
        "name": "Uzbek"
      },
      {
        "name": "Turkmen"
      }
    ],

    "borders": [
      "IRN",
      "PAK",
      "TKM",
      "UZB",
      "TJK",
      "CHN"
    ],
    "flags": {
      "png": "https://upload.wikimedia…g_of_the_Taliban.svg.png"
    }
  }
];

export const getAll = async () => new Promise<GetAllResponse>((resolve) => {
  resolve(countries);
});


export const getOne = async (payload: GetOneRequest) => new Promise<GetOneResponse>((resolve, reject) => {
  if (payload.alpha === "AFG") {
    resolve(countries[0]);
  }
  else reject();

});


export const getName = async (payload: GetNameRequest) => new Promise<GetNameResponse>((resolve, reject) => {
  if (payload.alpha === "AFG") {
    resolve({ name: countries[0].name });
  }
  else reject();

});