import _ from 'lodash';
import {
  CREATE_FEATURE,
  DELETE_FEATURE,
  EDIT_FEATURE,
  FETCH_FEATURE,
  FETCH_FEATURES
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_FEATURES:
      // Burada action.payload bize bir array olarak geliyor. lodash'in mapKeys
      // fonksiyonu ile o array'i id'lerden key olacak sekilde bir key-value
      // nesnesine donusturuyoruz.
      // Aslinda fetchStreams ...state yapmamak lazim. Ornegin ilk seferinde 10
      // kayit okuduk diyelim server'dan. Arada server'da baska kullanici tarafindan
      // 3 kayit silindi. Sonra biz yeniden fetchStreams yaptik. Bu sefer 7 kayit
      // gostermek gerekirken, bizim ekranda yine 10 kayit gosterilecek.
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case CREATE_FEATURE:
      // NOT: Buradaki [action.payload.id]: olayina Key Interpolation deniyor.
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_FEATURE:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_FEATURE:
      // const newState = { ...state };
      // newState[action.payload.id] = action.payload;
      // return newState;
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_FEATURE:
      // Note that in the action creator, the payload is the id
      // this time. In others, payload was the entire feature object.
      // The omit function from lodash creates a new state object for us.
      // So, unlike what we did above, we don't need to create a new state object.
      const id = action.payload;
      return _.omit(state, id);
    default:
      return state;
  }
};

// Key Interpolation ornegi. Chrome console'da deneyebiliriz:
// const animalSounds = {cat: 'meow', dog: 'bark'}
// const animal = 'lion';
// const sound = 'roar';
// { ...animalSounds, [animal]: sound}
// >>> {cat: "meow", dog: "bark", lion: "roar"}
