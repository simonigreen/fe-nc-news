import React from 'react';
import { navigate } from '@reach/router';
import * as api from '../utils/api';
import * as utils from '../utils/utils';
import CommentsList from '../partials/comments/CommentsList';
import Voter from '../components/Voter';
import Loading from '../components/Loading';
import styled from 'styled-components';
import LinkStyled from '../components/LinkStyled';

const SingleArticleWrapper = styled.div`
  padding: 10px 0 35px 0;
  border-bottom: 1px solid lightgray;
`;

const SingleArticlePostInfo = styled.div`
  font-size: 0.8rem;
`;

const PaleText = styled.span`
  color: var(--light-gray-text);
`;

class SingleArticle extends React.Component {
  state = {
    article: {},
    isLoading: true
  };
  render() {
    const {
      article_id,
      title,
      topic,
      author,
      created_at,
      votes,
      body
    } = this.state.article;
    return (
      <>
        {!this.state.isLoading && (
          <div>
            <SingleArticleWrapper>
              <h2>{title}</h2>
              <SingleArticlePostInfo>
                <LinkStyled to={`/articles/${topic}`}>
                  <span>{utils.capitaliseString(topic)}</span>
                </LinkStyled>
                <span> | </span>
                <PaleText>
                  <em>{author}</em>
                </PaleText>
                <span> | </span>
                <PaleText>{utils.formatDate(created_at)}</PaleText>
              </SingleArticlePostInfo>

              <p>{body}</p>
              <Voter votes={votes} type="articles" id={article_id} />
            </SingleArticleWrapper>
            <CommentsList
              article_id={article_id}
              loggedInUser={this.props.loggedInUser}
            />
          </div>
        )}
        {this.state.isLoading && <Loading />}
      </>
    );
  }

  componentDidMount() {
    this.fetchSingleArticle(this.props.article_id);
  }

  fetchSingleArticle = article_id => {
    api
      .getSingleArticle(article_id)
      .then(article => {
        this.setState({ article, isLoading: false });
      })
      .catch(({ response: { data } }) => {
        navigate(`/err`, {
          state: { msg: data.msg },
          replace: true
        });
      });
  };
}

export default SingleArticle;
