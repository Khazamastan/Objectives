export function listToTree(list) {
  const roots = [];
  let i;

  for (i = 0; i < list.length; i += 1) {
    if (!list[i].parent_objective_id) {
      roots.push(list[i]);
      roots[roots.length - 1].children = [];
    } else {
      roots[roots.length - 1].children.push(list[i]);
    }
  }
  return roots;
}
