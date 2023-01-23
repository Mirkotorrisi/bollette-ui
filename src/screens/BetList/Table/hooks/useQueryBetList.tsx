import { useState, useEffect, useCallback } from "react";
import mock from "../../../../assets/mock";
import { CHAMPIONSHIPS } from "../../../../consts";
import { fetchBetList, Match } from "../../../../service";
import { parseMinutes } from "./useParseDate";

interface Props {
  championship: CHAMPIONSHIPS;
  delay: number;
}

export const useQueryBetList = ({ championship, delay }: Props) => {
  const [list, setList] = useState<Match[]>();

  const updateList = useCallback(async () => {
    const res = await fetchBetList(championship);
    setList(res);
  }, [championship]);

  useEffect(() => {
    updateList();
  }, [updateList]);

  useEffect(() => {
    const interval = setInterval(async () => {
      updateList();
    }, delay);
    return () => clearInterval(interval);
  }, [updateList, delay]);

  return list?.filter((match) => {
    const minutes = parseMinutes(match.start);
    return isNaN(+minutes) || +minutes < 95;
  });
};
