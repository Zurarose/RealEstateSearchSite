import firebase from 'firebase';

async function getFlats() {
  try {
    const snapshot = await firebase.firestore().collection('flats').get();
    const result = snapshot.docs.map((doc) => doc.data());
    return result;
  } catch (e) {
    console.log(e.error);
  }
  return null;
}
export default getFlats;
