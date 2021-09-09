import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import PostCard from '../Components/PostCard';
import PostForm from '../Components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function Home() {
  const { user } = useContext(AuthContext);
  const {
    loading,
    data
  } = useQuery(FETCH_POSTS_QUERY);


 let postMarkup;
 if (loading) {
   postMarkup = <p>Loading post..</p>
 } else {
  //  console.log(loading);
 
  const posts = data.getPosts;
  // //  console.log(data.getPosts);
  //  console.log(posts);
   
   postMarkup = (
    <Grid columns={1}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
          <Transition.Group>
            {posts &&
              posts.map((post) => (
                <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        
      </Grid.Row>
    </Grid>
   )
    }
  return postMarkup;
}


export default Home;






