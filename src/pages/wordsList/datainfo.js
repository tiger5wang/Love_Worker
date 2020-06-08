
import React,{Component} from 'react';
import { Icon, Flex, Button, Toast } from 'antd-mobile';
import { connect } from 'dva';
import styles from '@/pages/wordsList/index.css';
import router from 'umi/router';
import { sk_user_token } from '@/config/StorageKeys';


class datainfo extends Component {

  state={
    dataList:[]
  }


  componentDidMount() {
    this.userInfo = JSON.parse(localStorage.getItem('MSUser'));
    this.token = localStorage.getItem(sk_user_token);
    this.get_dataInfo();
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
      pathname: '/wordsList',
      query: {
        token: this.props.location.query.token,
        id: this.props.location.query.titid,
        name: this.props.location.query.name
      },
    });
    }

  };

  get_dataInfo=() => {
    const{dispatch} = this.props;
    let user = null;
    if(this.userInfo){
      user=this.userInfo.userType
    }else{
      user="普通会员"
    }

    if (this.token && user==="超级会员" || this.props.location.query.titid===1&&this.props.location.query.uid<=10) {
      dispatch({
        type: 'wordList/getListInfo',
        payload: {
          uid: this.props.location.query.uid,
        },
        callback: response => {
          if (response.code === 200) {
            this.setState({
              dataList: response.data,
            });
          } else {
            console.log('错误');
          }
        },
      });
    } else {
      router.push({
        pathname: '/wordsList/meiyoulogin',
        query: {
          filterData: this.props.location.query.filterData,
          // id: this.props.location.query.titid,
          // name: this.props.location.query.name,
        },
      });
    }

    };

  // copyData=(data)=>{
  //   console.log(data)
  //   const activeCodeSpan = document.getElementById(data)
  //   const range = document.createRange();
  //   range.selectNodeContents(activeCodeSpan);
  //   window.getSelection().addRange(range);
  //   const tag = document.execCommand("Copy");
  //   if(tag){
  //     Toast.info('已经复制好了,可以粘贴拉……', 0.5);
  //   }
  // }
  //

  copyData = (data) => {
       var copyDOM = document.getElementById("p");  //需要复制文字的节点
    var range = document.createRange(); //创建一个range
    window.getSelection().removeAllRanges();   //清楚页面中已有的selection
    range.selectNodeContents(data);    // 选中需要复制的节点
    window.getSelection().addRange(range);   // 执行选中元素
    var successful = document.execCommand('copy');    // 执行 copy 操作
    if(successful){
         Toast.info('复制成功', 1)
    }else{
         Toast.info('复制失败', 1)
    }
    // 移除选中的元素
    window.getSelection().removeAllRanges();
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
        {dataList && dataList.length > 0 && dataList.map((item, index) => {
          let context = item.context.split('^');
          if(context.length > 4) {
            context = context.slice(0, 100)
          }
          return(
            <div>
              <Flex justify='center'><p style={{color: 'red'}}>(长按复制话术！！！)</p></Flex>
               {context.map((data, index) => {
                return (

                    <Flex justify={index === 0 ? 'center' : 'between'} style={{
                      margin: 10,
                      fontWeight: index === 0 ? 'bold' : '',
                      fontSize: index === 0 ? 25 : 15,
                      color: index === 0 ? 'red' : '#000',
                    }}>
                      {data}
                      {/*{index===0 || data.length<=0?'':<Button onClick={()=> this.copyData(data)} size='small' style={{ backgroundColor: '#ec1a5b' }}>复制</Button>}*/}
                    </Flex>
                )})}
            </div>



          )
        })}

      </div>
    );
  }
}

export default connect(({wordList}) => ({
wordList
}))(datainfo)

