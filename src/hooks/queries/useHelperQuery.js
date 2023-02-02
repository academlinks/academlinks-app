import { axiosQuery } from "../../store/axiosConfig";
import { useState } from "react";

function useHelperQuery() {
  const [loading, setLoading] = useState(false);

  const [optionsRules, setOptionsRules] = useState(null);

  async function getOptionsRulesQuery(postId) {
    setLoading(true);
    const { data } = await axiosQuery(`/posts/${postId}/options`);
    setOptionsRules(data);
    setLoading(false);
  }

  async function getFriendShipQuery(profileId) {
    const { data } = await axiosQuery(`/user/${profileId}/isFriend`);
    return data;
  }

  return {
    getOptionsRulesQuery,
    getFriendShipQuery,
    loading,
    optionsRules,
    setOptionsRules,
  };
}

export default useHelperQuery;
