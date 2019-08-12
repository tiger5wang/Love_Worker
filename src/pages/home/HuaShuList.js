import React, {Component} from 'react';
import {connect} from 'dva';
import {Icon, Flex, } from 'antd-mobile'
import router from 'umi/router';
import styles from './HuaShuList.css';

class HuaShuList extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.searchDataList()
  }

  returnPage = () => {
    router.push({
      pathname: '/',
    });
  };

  searchDataList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'searchData/postSearchData',
      payload: {
        search_data: this.props.location.query.filterData,
      },
    });
  };


  listDataInfo = dataID => {
    router.push({
      pathname: '/wordsList/datainfo',
      query: {
        uid: dataID,
        titid: this.props.location.query.id,
        name: this.props.location.query.name,
        filterData: this.props.location.query.filterData,

      },
    });
  };



  render() {
    const {searchData} = this.props;
    const{data} = searchData;


    return (
      <div>
        <div className={styles.header}>

          <Flex justify="start">
            <div className={styles.goback}>
              <Icon onClick={() => this.returnPage()} color='#fff' type="left" size='lg'/>
            </div>
            <span className={styles.headerFont}>搜索{this.props.location.query.filterData}的结果</span>
          </Flex>
        </div>
        {searchData && searchData.length > 0 && searchData.map((item, index) => {
          // let context = item.content.split('^');
          // let context = ''
          return(
            <div className={styles.content}>

                     <p className={styles.sizeStyle} onClick={() => this.listDataInfo(item.id)}>{item.content.replace('^', "").replace("^", "")}</p>


            </div>
          )
        })}
      </div>
    )
  }

}

export default connect(({searchData}) => ({
  searchData: searchData.data
}))(HuaShuList)
