import { useState, useEffect, useCallback } from "react";
import mock from "../../../../assets/mock";
import { CHAMPIONSHIPS, MARKETS } from "../../../../consts";
import { fetchBetList, Match } from "../../../../service";

interface Props {
  market: MARKETS;
  championship: CHAMPIONSHIPS;
  delay: number;
}

export const useQueryBetList = ({ market, championship, delay }: Props) => {
  const [list, setList] = useState<Match[]>();

  const updateList = useCallback(async () => {
    const res = await fetchBetList(championship, market);
    setList(res);
  }, [market, championship]);

  useEffect(() => {
    updateList();
  }, [updateList]);

  useEffect(() => {
    const interval = setInterval(async () => {
      updateList();
    }, delay);
    return () => clearInterval(interval);
  }, [updateList]);

  return list;
};
