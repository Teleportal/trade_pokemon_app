import { FECTH_POSTS, NEW_POST } from './types'

export const fetchPosts = () => dispacth => {
  console.log('fetching');
  fetch('https://jsonplaceholder.typicode.com/posts')
  .then(res => res.json)
  .then(posts => dispacth({
      type: FECTH_POSTS, 
      payload: posts
    })
  );
}