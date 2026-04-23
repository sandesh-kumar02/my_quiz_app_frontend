import { useEffect, useState } from "react";
import LeaderboardList from "../Components/LeaderboardList";
import { getleaderboard } from "../Services/api";

function LeaderboardPage() {
  const [leaderboard, setleaderboard] = useState([]);

  useEffect(() => {
    async function leaderboard() {
      try {
        const fetchLeaderboard = await getleaderboard();
        console.log(fetchLeaderboard.data);
        setleaderboard(fetchLeaderboard.data.leaderboard);
      } catch (error) {
        console.log("leaderboard page error", error);
      }
    }
    leaderboard();
  }, []);

  return (
    <div>
      <LeaderboardList leaderboard={leaderboard} />
    </div>
  );
}

export default LeaderboardPage;
