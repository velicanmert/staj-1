import _ from 'lodash';
import { FETCH_ENTITY_PARENT_FILES } from '../../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_ENTITY_PARENT_FILES:
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
      // console.log('[FETCH_ENTITY_PARENT_FILES] reducer. Payload: ', action.payload);
      return { ..._.mapKeys(action.payload, 'id') };
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
