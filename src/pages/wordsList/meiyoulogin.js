
import React,{Component} from 'react';
import { Icon, Flex, Text, Toast } from 'antd-mobile';
import { connect } from 'dva';
import styles from '@/pages/wordsList/index.css';
import router from 'umi/router';
import { sk_user_token } from '@/config/StorageKeys';


class datainfo extends Component {

  state={
    dataList:[]
  }


  componentDidMount() {
  }


  returnPage = () => {
    if(this.props.location.query.filterData){
      router.push({
      pathname: '/home/HuaShuList',
      query: {
        filterData:this.props.location.query.filterData
      },
    });
    }else{
      router.push({
      pathname: '/home/HuaShuList/',
      query: {
        filterData:this.props.location.query.filterData
      },
    });
    }

  };


  render() {

    const{dataList} = this.state;
    return (
      <div>
        <div className={styles.header}>

          <Flex justify="start">
            <div className={styles.goback}>
              <Icon onClick={() => this.returnPage()} color='#fff' type="left" size='lg'/>
            </div>
            <span className={styles.headerFont}>话术详情</span>
          </Flex>
        </div>
        <div>
          暂时没有会员权限


          <Flex style={{ color: 'red', marginTop: 50 }} justify='center'>话术模块需要 永久会员 才能访问</Flex>
          <Flex style={{ color: 'red', marginTop: 50  }} justify='center'>你目前是：游客或没权限会员 ！</Flex>
          <Flex style={{ color: 'red', marginTop: 50  }} justify='center'>【登录账号升级会员,持续更新】或联系</Flex>
          <Flex style={{ color: 'red', marginTop: 50  }} justify='center'>客服人员开通会员就送聊天秘籍！</Flex>

        </div>

      </div>
    );
  }
}

export default connect(({wordList}) => ({
wordList
}))(datainfo)

