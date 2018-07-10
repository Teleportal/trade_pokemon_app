import { FECTH_POST, NEW_POST } from '../actions/types.js';

const initialState = {
  items: [],
  item: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FECTH_POST:
      console.log('reducer');
      return {
        ...state,
        items: action.payload

      }
    default: 
      return state;
  }
}





