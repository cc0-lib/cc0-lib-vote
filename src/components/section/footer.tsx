"use client";
import { createClient } from "@/lib/supabase/client";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useEffect, useState } from "react";

const Footer = () => {
  const { isAuthenticated, authToken } = useDynamicContext();
  const [votes, setVotes] = useState<any>();
  const [totalSubmissions, setTotalSubmissions] = useState(0);

  const fetchVotes = async () => {
    const supabase = createClient();

    const { data, error } = await supabase.from("vote").select().eq("user", 5);

    const { data: totalSubmission } = await supabase.from("submission").select("*", { count: "exact" }).eq("round", 1);

    if (data) {
      setVotes(data);
      console.log(data);
    }

    if (totalSubmission) {
      setTotalSubmissions(totalSubmission.length);
    }
  };

  useEffect(() => {
    fetchVotes();
  }, []);
  return (
    <div className="flex w-full flex-row items-center justify-between">
      <div>cover art round 2 community voting</div>
      {authToken ? <div>{`total voted: 5/${totalSubmissions}`}</div> : <></>}
    </div>
  );
};
export default Footer;
