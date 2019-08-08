import React, {Component} from 'react';
import {connect} from 'dva'
import { WingBlank, SearchBar } from 'antd-mobile'
import styles from './index.css';
import router from 'umi/router';


class SessionCategoryList extends Component {
  constructor(props){
    super(props);
    this.state = {
      directorList: [],
      selectedTab: 'words'
    }
  }

  componentDidMount() {
    this.getWebHeader()
    this.loadData();

  }

  getWebHeader=()=>{
    const{dispatch} = this.props;
    dispatch({
      type:'header/getWebHeader',
      payload: {}
    })
  }

  gotoWordsList = (Id, Name) => {
    router.push({
      pathname: '/wordsList',
      query: {
        id: Id,
        name: Name
      }
    })
  };

  loadData = () =>{
    const{dispatch} = this.props;
    dispatch({
      type: 'home/getDirectorList',
      payload: {},
      callback: () => {}
    })
  };

  SearchValue= (value) => {
    router.push({
      pathname: '/home/HuaShuList',
      query: {
        filterData: value,
      },
    });
  };

  render() {
    return(
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
        <div className={styles.header}>
          <span className={styles.headerFont}>{this.props.header.name}</span>
        </div>
        <SearchBar placeholder="搜索话术" onChange={this.SearchValue}/>
        <WingBlank>
          {this.props.directorList.length > 0 && this.props.directorList.map((item, index) => {
            return(
              <div className={styles.container}>
                <span className={styles.firstDic}>{item.name}</span>
                <div className={styles.itemContain}>
                  {
                    item.data && item.data.length> 0 && item.data.map((item2, index2) => {
                      return (
                        <a href="" className={styles.link}>
                          <button className={styles.btn} onClick={() => this.gotoWordsList(item2.id, item2.name)}>{item2.name}</button>
                        </a>
                      )
                    })
                  }
                </div>
              </div>
            )
          })}
        </WingBlank>
      </div>
    )
  }
}


export default connect(({home, header}) => ({
  directorList: home.directorList,
  header
}))(SessionCategoryList)
