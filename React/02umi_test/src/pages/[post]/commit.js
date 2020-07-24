import React from 'react';
import styles from './commit.css';

export default props => {
  const { match: { params: { post } } } = props
  return (
    <div>
      <h1 className={styles.title}>Page post -- {post} commit.</h1>
    </div>
  );
}
