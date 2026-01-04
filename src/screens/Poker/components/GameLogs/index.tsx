import React, { useEffect, useRef } from "react";
import "./index.scss";

interface Props {
  logs: string[];
}

export const GameLogs = ({ logs }: Props) => {
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom when new logs are added
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div className="game-logs">
      <div className="game-logs__header">Game Log</div>
      <div className="game-logs__content">
        {logs && logs.length > 0 ? (
          logs.map((log, index) => (
            <div key={index} className="game-logs__entry">
              {log}
            </div>
          ))
        ) : (
          <div className="game-logs__empty">No game activity yet</div>
        )}
        <div ref={logsEndRef} />
      </div>
    </div>
  );
};
