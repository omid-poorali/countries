import { useMemo } from "react";
import {Option} from "../types";
import * as utils from '../utils';

export const useFindOptionIndex = (deps:[Option[], any]):number => {
  const selectedOptionIndex = useMemo((): number => {
    for (let i = 0; i < deps[0].length; i++) {
        if (typeof deps[0][i].value !== "object") {
            if (deps[0][i].value === deps[1]) {
                return i;
            }
        }

        if (utils.deepEqualObjects(deps[0][i].value, deps[1])) {
            return i;
        }
    }

  return -1;
  }, deps);
  return selectedOptionIndex;
};

