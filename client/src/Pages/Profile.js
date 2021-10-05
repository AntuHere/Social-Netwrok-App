import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition } from 'semantic-ui-react';
import { AuthContext } from '../context/auth';
import PostCard from '../Components/PostCard';

import { FETCH_POSTS_QUERY } from '../util/graphql';

function Profile() {
  const { user } = useContext(AuthContext);
  const {
    loading,
    data
  } = useQuery(FETCH_POSTS_QUERY);


 let postMarkup;
 if (loading) {
   postMarkup = <p>Loading post..</p>
 } else {
 
  const posts = data.getPosts;

   
   postMarkup = (
    <Grid columns={1}>
      
      <Grid.Row>
      <h2>Username: {user.username}</h2>
          <Transition.Group>
            {posts &&
              posts.map((post) => (
                <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                   {user && user.username === post.username &&  <PostCard post={post} />}
                </Grid.Column>
              ))}
          </Transition.Group>
        
      </Grid.Row>
    </Grid>
   )
    }
  return postMarkup;
}


export default Profile;






