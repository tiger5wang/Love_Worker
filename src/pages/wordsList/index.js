import React, {Component} from 'react';
import {connect} from 'dva';
import {Icon, Flex, WhiteSpace} from 'antd-mobile'
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
        PID: this.props.location.query.id
      }
    })
  };

  componentDidMount() {
    this.id = window.location.href.split('?')[1].split('=')[1];
    this.loadData()
  }


  returnPage = () => {
    router.push({
      pathname: '/',
    });
  };



  render() {
    const {wordsLists} = this.props;
    const PlaceHolder = ({ className = '', ...restProps }) => (
      <div className={`${className} placeholder`} {...restProps}>Block</div>
    );

    return (
      <div>
        <div className={styles.header}>

          <Flex justify="start">
            <div className={styles.goback}>
              <Icon onClick={() => this.returnPage()} color='#fff' type="left" size='lg'/>
            </div>
            <span className={styles.headerFont}>{this.props.location.query.name}</span>
          </Flex>
        </div>
        {wordsLists && wordsLists.length > 0 && wordsLists.map((item, index) => {
          let context = item.context.split('^');
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
