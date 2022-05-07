function googleApi(
  value: EventTarget & (HTMLTextAreaElement | HTMLInputElement),
) {
  const options = {
    types: ['(cities)'],
  };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { google } = window;
  const autocomplete = new google.maps.places.Autocomplete(value, options);
  autocomplete.setFields(['address_components', 'formatted_address']);
}
export default googleApi;
