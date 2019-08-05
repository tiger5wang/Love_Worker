import React, {Component} from 'react';
import {connect} from 'dva'
import {WingBlank, SearchBar , Flex, List} from 'antd-mobile'
import styles from './index.css';
import router from 'umi/router';


class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      directorList: []
    }
  }

  gotoWordsList = () => {
    router.push('')
  };

  loadData = () =>{
    const{dispatch} = this.props;
    dispatch({
      type: 'home/getDirectorList',
      payload: {},
      callback: () => {}
    })
  };

  componentDidMount = () => {
    this.loadData()
  };

  render() {
    return(
      <div>
        <div className={styles.header}>
          <span className={styles.headerFont}>页头</span>
        </div>
        <SearchBar placeholder="Search"  />
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
                          <button className={styles.btn} onClick={this.gotoWordsList}>{item2.name}</button>
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


export default connect(({home}) => ({
  directorList: home.directorList
}))(Home)
