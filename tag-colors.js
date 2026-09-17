const TAG_COLOR_COUNT = 6;

// djb2-style hash for a more even spread across colors than a plain char-code sum.
// Shared between the homepage (app.js) and individual recipe pages so a given
// tag always gets the same color everywhere.
function tagColorClass(tag) {
  let hash = 5381;
  for (let i = 0; i < tag.length; i++) {
    hash = ((hash << 5) + hash + tag.charCodeAt(i)) | 0;
  }
  return "tag-color-" + (Math.abs(hash) % TAG_COLOR_COUNT);
}
