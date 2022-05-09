import firebase from 'firebase';
import { Flat } from '../../types';

async function filterByCity(
  city: string | null,
  callbackAlert: (message: string) => void,
): Promise<Array<Flat> | null> {
  if (city) {
    const trimmedCity = city.trim().split(',')[0];
    try {
      const snapshot = await firebase
        .firestore()
        .collection('flats')
        .where('cityName', '==', trimmedCity)
        .limit(20)
        .get();
      return snapshot.docs.map((doc) => {
        return Object.assign(doc.data(), { id: doc.id });
      }) as Array<Flat>;
    } catch (e) {
      callbackAlert(e.error);
    }
  } else {
    try {
      const snapshot = await firebase
        .firestore()
        .collection('flats')
        .orderBy('publishedAt')
        .limit(20)
        .get();
      return snapshot.docs.map((doc) => {
        return Object.assign(doc.data(), { id: doc.id });
      }) as Array<Flat>;
    } catch (e) {
      callbackAlert(e.error);
    }
  }
  return null;
}

export default filterByCity;
