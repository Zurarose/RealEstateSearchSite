function stringAvatar(name: string | null): string {
  if (!name) return 'U';
  const trimmedName = name.trimLeft().trimRight();
  let shortName: string;
  if (trimmedName.split(' ').length > 1) {
    shortName = `${trimmedName.split(' ')[0][0]}${
      trimmedName.split(' ')[1][0]
    }`;
  } else {
    shortName = `${trimmedName.split(' ')[0][0]}`;
  }
  return shortName;
}

export default stringAvatar;
