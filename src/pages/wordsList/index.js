import React, {Component} from 'react';
import {connect} from 'dva';
import {Icon, Flex, List} from 'antd-mobile'
import router from 'umi/router';
import styles from './index.css';
import { sk_user_token } from '@/config/StorageKeys';



const Item = List.Item;
const Brief = Item.Brief;

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
    this.loadData();
  }


  returnPage = () => {
    router.push({
      pathname: '/',
      query: {
        token: this.props.location.query.token
      },
    });
  };

  listDataInfo = dataID => {
    if(this.props.location.query.filterData){
       router.push({
      pathname: '/wordsList/datainfo',
      query: {
        filterData: this.props.location.query.filterData,
      },
    });
    } else {
      router.push({
        pathname: '/wordsList/datainfo',
        query: {
          uid: dataID,
          titid: this.props.location.query.id,
          name: this.props.location.query.name,
        },
      });
    }

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
          // let context = item.context.split('^');
          return(
              <div className={styles.content}>
              {/*{context.slice(0,4).map((data, index) => {*/}
                {/*return (*/}
                   <div>
                     <p className={styles.sizeStyle} onClick={() => this.listDataInfo(item.ID)}>{item.context.replace('^', "").replace("^", "")}</p>

                     </div>
                  {/*)*/}
              {/*}*/}
                {/*)}*/}
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
