import React, { useContext } from 'react';
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import MyPopup from '../util/myPopup';

function PostCard( {
  post: { body, createdAt, id, username, likeCount, commentCount, likes }
}) {
  const { user } = useContext(AuthContext);
  function deletePostCallback() {
    window.location.reload();
  }
  return (
    <Card fluid >
      <Card.Content>
        <Image
          floated="left"
          size="mini"
          src="https://react.semantic-ui.com//images/avatar/large/matthew.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description style={{fontSize: 26}}>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes, likeCount }} />
        <MyPopup content="Comment on post">
          <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
            <Button color="blue" basic>
              <Icon name="comments" />
            </Button>
            <Label basic color="blue" pointing="left">
              {commentCount}
            </Label>
          </Button>
        </MyPopup>
        <MyPopup content="View post">
          <Button as={Link} to={`/posts/${id}`}>
            View Post
          </Button>
        </MyPopup>
        {user && user.username === username && <DeleteButton postId={id} callback={deletePostCallback} />}
      </Card.Content>
    </Card>
  );
}

export default PostCard;