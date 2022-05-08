import firebase from 'firebase';

async function filterByCity(city: string | null) {
  if (city) {
    const trimmedCity = city.trim().split(',')[0];
    try {
      const snapshot = await firebase
        .firestore()
        .collection('flats')
        .where('cityName', '==', trimmedCity)
        .limit(20)
        .get();
      const result = snapshot.docs.map((doc) => doc.data());
      return result;
    } catch (e) {
      console.log(e.error);
    }
  } else {
    try {
      const snapshot = await firebase
        .firestore()
        .collection('flats')
        .orderBy('publishedAt')
        .limit(20)
        .get();
      const result = snapshot.docs.map((doc) => doc.data());
      return result;
    } catch (e) {
      console.log(e.error);
    }
  }
  return null;
}

export default filterByCity;
