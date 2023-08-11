const calcPosted = (posted: string): string => {
  let postedDate = new Date(posted);
  const now = new Date();
  const utc1 = Date.UTC(
    postedDate.getFullYear(),
    postedDate.getMonth(),
    postedDate.getDate()
  );
  const utc2 = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());

  let diff: number = Math.floor((utc2 - utc1) / 1000);

  if (diff / 60 < 1) {
    return diff + "s ago";
  }

  diff = Math.floor(diff / 60);
  if (diff / 60 < 1) {
    return diff + "m ago";
  }

  diff = Math.floor(diff / 60);
  if (diff / 24 < 1) {
    return diff + "h ago";
  }

  diff = Math.floor(diff / 24);
  if (diff / 7 < 1) {
    return diff + "d ago";
  }

  diff = Math.floor(diff / 7);
  if (diff / 31 < 1) {
    return diff + "w ago";
  }

  diff = Math.floor(diff / 31);
  if (diff / 12 < 1) {
    return diff + "m ago";
  }

  diff = Math.floor(diff / 12);

  return diff + "y ago";
};

export default calcPosted;

/*
Padding :)











Enough padding
*/
