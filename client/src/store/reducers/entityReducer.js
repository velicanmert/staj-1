import _ from 'lodash';
import {
  CREATE_ENTITY,
  DELETE_ENTITY,
  EDIT_ENTITY,
  FETCH_ENTITY,
  FETCH_ENTITIES
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_ENTITIES:
      // Burada action.payload bize bir array olarak geliyor. lodash'in mapKeys
      // fonksiyonu ile o array'i id'lerden key olacak sekilde bir key-value
      // nesnesine donusturuyoruz.
      //
      // Aslinda fetchEntities ...state yapmamak lazim. Ornegin ilk seferinde 10
      // kayit okuduk diyelim server'dan. Arada server'da baska kullanici tarafindan
      // 3 kayit silindi. Sonra biz yeniden fetchEntities yaptik. Bu sefer 7 kayit
      // gostermek gerekirken, bizim ekranda yine 10 kayit gosterilecek.
      // return { ...state, ..._.mapKeys(action.payload, 'key') };
      //
      // Burada bir onceki state'i kullanmayip, sifirdan object olusturduk:
      // console.log('[FETCH_ENTITIES] reducer. Payload: ', action.payload);
      return { ..._.mapKeys(action.payload, 'id') };
    case CREATE_ENTITY:
      // NOT: Buradaki [action.payload.id]: olayina Key Interpolation deniyor.
      // NOT: Server'dan response olarak yeni olusturulan entity'nin geri gonderilmesi bekleniyor:
      // console.log('[CREATE_ENTITY] reducer. Payload: ', action.payload);
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_ENTITY:
      // console.log('FETCH_ENTITY: ', action.payload);
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_ENTITY:
      // const newState = { ...state };
      // newState[action.payload.id] = action.payload;
      // return newState;
      //
      // NOT: Server'dan response olarak edit edilmis entity'nin geri gonderilmesi bekleniyor:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_ENTITY:
      // Note that in the action creator, the payload is the id
      // this time. In others, payload was the entire entity object.
      // The omit function from lodash creates a new state object for us.
      // So, unlike what we did above, we don't need to create a new state object.
      //
      // NOT: Server'dan response olarak delete edilmis entity'nin id'sinin gonderilmesi bekleniyor:
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
