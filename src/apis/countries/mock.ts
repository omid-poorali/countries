import { GetAllResponse } from './contract';

export const getAll = async () => new Promise<GetAllResponse>((resolve) => {
  resolve([
    {
      "name": "Afghanistan",
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
        "png":"https://upload.wikimedia…g_of_the_Taliban.svg.png"
      }
    }
  ]);
});