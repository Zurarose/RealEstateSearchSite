function googleApi(
  value: EventTarget & (HTMLTextAreaElement | HTMLInputElement),
  callback: any,
) {
  const options = {
    fields: ['name'],
    types: ['(cities)'],
  };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { google } = window;
  const autocomplete = new google.maps.places.Autocomplete(value, options);
  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
    callback(place.name);
  });
}
export default googleApi;
