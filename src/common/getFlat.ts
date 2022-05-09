import firebase from 'firebase';
import { Flat } from '../../types';

async function getFlat(
  document: string | undefined,
  callbackAlert: (message: string) => void,
): Promise<Flat | null> {
  if (document) {
    try {
      const snapshot = await firebase
        .firestore()
        .collection('flats')
        .doc(document)
        .get();
      if (snapshot) {
        return snapshot.data() as Flat;
      }
    } catch (e) {
      callbackAlert(e.error);
    }
  }
  return null;
}

export default getFlat;
