import firebase from 'firebase';

async function filterByCity(city: string) {
  try {
    const snapshot = await firebase
      .firestore()
      .collection('flats')
      .where('city', '==', city)
      .get();
    const result = snapshot.docs.filter((doc) => doc.data());
    return result;
  } catch (e) {
    console.log(e.error);
  }
  return null;
}
export default filterByCity;
