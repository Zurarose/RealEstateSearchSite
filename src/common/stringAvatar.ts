const stringAvatar = (name: string | null) => {
  if (!name) return 'U';
  let shortName: string;
  if (name.split(' ').length > 1) {
    shortName = `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`;
  } else {
    shortName = `${name.split(' ')[0][0]}`;
  }
  return shortName;
};

export default stringAvatar;
