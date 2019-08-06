import React, {Component} from 'react';
import {connect} from 'dva';
import router from 'umi/router';
import styles from './index.css';

class WordsList extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  loadData = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'wordList/getWordsList',
      payload: {
        PID: this.id
      }
    })
  };

  componentDidMount() {
    this.id = window.location.href.split('?')[1].split('=')[1];
    this.loadData()
  }

  render() {
    const {wordsLists} = this.props;
    console.log('wordlist', wordsLists)
    return (
      <div>
        <div className={styles.header}>
          <div className={styles.goback}>
            <img src="../../assets/goback.png" />
            <span className={styles.back}>返回</span>
          </div>
          <span className={styles.headerFont}>开场白</span>
        </div>
        {wordsLists && wordsLists.length > 0 && wordsLists.map((item, index) => {
          let context = item.context.split('^');
          console.log(context)
          return(
            <div className={styles.content}>
              {context.map((data) => {
                return (
                   <p>{data}</p>
                  )
              })}
            </div>
          )
        })}
      </div>
    )
  }

}

export default connect(({wordList}) => ({
  wordsLists: wordList.wordsLists
}))(WordsList)
