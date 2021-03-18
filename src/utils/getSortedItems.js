// sort items by listId
export const getSortedItems = (items) => {
  const sortedItemsByListId = items.sort((a, b) => {
    return parseInt(a.listId) - parseInt(b.listId);
  });

  const sortedItems = sortedItemsByListId.sort(
    // sort only by digits in name because all names have "item" in them.
    (a, b) => {
      const number1 = parseInt(a.name?.match(/\d+/));
      const number2 = parseInt(b.name?.match(/\d+/));
      // this doesn't work for  some reason
      return number1 - number2;
    }
  );

  return sortedItems;
};
