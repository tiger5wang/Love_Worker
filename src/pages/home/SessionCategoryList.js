import React, {Component} from 'react';
import {connect} from 'dva'
import { WingBlank, SearchBar, Toast,Flex, Button, InputItem, List } from 'antd-mobile';
import styles from './index.css';
import { createForm } from 'rc-form';
import router from 'umi/router';
import { sk_user_token } from '@/config/StorageKeys';


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
    this.token = localStorage.getItem(sk_user_token)
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
          name: Name,
          token: this.token
        },
    })
    // }
  };

  loadData = () =>{
    const{dispatch} = this.props;
    dispatch({
      type: 'home/getDirectorList',
      payload: {},
      callback: () => {}
    })
  };

  SearchValue = () => {
    const { form } = this.props;
    const userInfo = form.getFieldsValue();
    router.push({
      pathname: '/home/HuaShuList',
      query: {
        filterData: userInfo.HuShu,
      },
    });
  };

  render() {

    const { getFieldProps } = this.props.form;
    return(
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
        <div className={styles.header}>
          <span className={styles.headerFont}>{this.props.header.name}</span>
        </div>
        {/*<SearchBar placeholder="搜索话术" onChange={this.SearchValue}/>*/}
        <Flex justify="between">
          <InputItem
          {...getFieldProps('HuShu',
          )}
          placeholder="请输入要搜索的话术"
          clear={true}
        >搜索话术:</InputItem>
          <Flex>
             <Button type="ghost" inline size="small" style={{ marginRight: '4px' }} onClick={()=>this.SearchValue()}>搜索</Button>
          </Flex>

        </Flex>
        <WingBlank>
          {this.props.directorList.length > 0 && this.props.directorList.map((item, index) => {
            return(
              <div className={styles.container}>
                <span className={styles.firstDic}>{item.name}</span>
                <div className={styles.itemContain}>
                  {
                    item.data && item.data.length> 0 && item.data.map((item2, index2) => {
                      return (
                          <button className={styles.btn} onClick={() => this.gotoWordsList(item2.id, item2.name)}>{item2.name}</button>
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


// export default connect(({home, header}) => ({
//   directorList: home.directorList,
//   header
// }))(SessionCategoryList)


const SessionCategory = createForm()(SessionCategoryList);
export default connect(({home, header})=>{
  return {
     directorList: home.directorList,
  header
  };
})(SessionCategory)
