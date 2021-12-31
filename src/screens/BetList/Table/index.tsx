import { useState, useEffect } from "react";
import { QuotaComponent } from "./QuotaComponent";
import { fetchBetList } from "../../../service";
import { parseDate } from "../../../utils/betStartParser";
import { CHAMPIONSHIPS, MARKETS } from "../../../consts";
import { TableHead } from "./TableHead";

interface Props {
  championship: CHAMPIONSHIPS;
}
export const Table = ({ championship }: Props) => {
  const [list, setList] = useState<any>(null);
  const [market, setMarket] = useState<MARKETS>(MARKETS.H2H);

  const updateList = async () => {
    const res = await fetchBetList(championship, market);
    setList(res);
  };

  useEffect(() => {
    updateList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [championship, market]);

  useEffect(() => {
    const interval = setInterval(async () => {
      await updateList();
    }, 60000);
    return () => clearInterval(interval);
  });

  return (
    <div className="betlist_container">
      {list?.length ? (
        <table className="bet_buttons">
          <TableHead market={market} setMarket={setMarket} />
          <tbody>
            {list?.map((betQuota: any, index: number) => (
              <QuotaComponent
                key={championship + market + index}
                betQuota={betQuota}
                matchNumber={index}
                isEven={index % 2 === 0}
                market={market}
                start={parseDate(betQuota.start * 1000)}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <h2>Something went wrong while fetching odds</h2>
      )}
    </div>
  );
};
