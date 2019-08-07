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



  render() {
    const {searchData} = this.props;
    const{data} = searchData;

    console.log(JSON.stringify(this.props))




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
            <span className={styles.headerFont}>搜索{this.props.location.query.filterData}的结果</span>
          </Flex>
        </div>
        {searchData && searchData.length > 0 && searchData.map((item, index) => {
          console.log(item)
          let context = item.content.split('^');
          // let context = ''
          return(
            <div className={styles.content}>
              {context.map((dt) => {
                return (
                   <p>{dt}</p>
                  )
              })}
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
