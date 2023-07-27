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
      "flag": "https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_the_Taliban.svg"
    }
  ]);
});