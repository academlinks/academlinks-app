/** extract tags from draftjs */
export default function extractTagsFromDraft(reservedContentState) {
  if (!reservedContentState || reservedContentState?.trim()?.length <= 0)
    return;

  const draftState = JSON.parse(reservedContentState || "");

  if (!draftState) return JSON.stringify([]);

  const tags = [];
  for (const key in draftState.entityMap) {
    const entity = draftState.entityMap[key];
    if (entity.type === "mention") {
      tags.push(entity.data.mention);
    }
  }

  return JSON.stringify(Array.from(new Set(tags.map((t) => t._id))));
}
